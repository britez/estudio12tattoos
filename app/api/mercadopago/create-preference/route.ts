import { NextRequest, NextResponse } from "next/server"
import { MercadoPagoConfig, Preference } from "mercadopago"
import { createClient } from "@/prismicio"
import type * as prismic from "@prismicio/client"

export async function POST(request: NextRequest) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }

  if (
    typeof body !== "object" ||
    body === null ||
    !("slug" in body) ||
    !("lang" in body)
  ) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  const { slug, lang } = body as { slug: unknown; lang: unknown }

  if (typeof slug !== "string" || slug.trim() === "") {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 })
  }

  if (typeof lang !== "string" || !["es", "en"].includes(lang)) {
    return NextResponse.json({ error: "Invalid lang" }, { status: 400 })
  }

  const accessToken = process.env.MP_ACCESS_TOKEN
  if (!accessToken) {
    console.error("MP_ACCESS_TOKEN is not set")
    return NextResponse.json(
      { error: "Payment service unavailable" },
      { status: 503 }
    )
  }

  // Obtener datos del seminario desde Prismic (fuente de verdad del precio)
  let titulo: string
  let precioNumerico: number

  try {
    const client = createClient() as unknown as prismic.Client
    const prismicLang = lang === "es" ? "es-ar" : "en-us"

    const fetchItems = async (l?: string) => {
      const doc = l
        ? await client.getSingle("seminars", { lang: l })
        : await client.getSingle("seminars")
      const seminarSlice = doc.data.slices.find(
        (s: { slice_type: string }) => s.slice_type === "seminar_list"
      )
      if (seminarSlice && "primary" in seminarSlice) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (seminarSlice.primary.seminarios as any[]) ?? []
      }
      return []
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let item: any = null
    const items = await fetchItems(prismicLang)
    item = items.find((i: { slug: string }) => i.slug === slug)
    if (!item) {
      const fallbackItems = await fetchItems()
      item = fallbackItems.find((i: { slug: string }) => i.slug === slug)
    }

    if (!item) {
      return NextResponse.json({ error: "Seminar not found" }, { status: 404 })
    }

    if (item.estado !== "upcoming") {
      return NextResponse.json({ error: "Seminar is not available for purchase" }, { status: 409 })
    }

    titulo = item.titulo || slug
    precioNumerico =
      typeof item.precio_numerico === "number"
        ? item.precio_numerico
        : parseFloat(String(item.precio ?? "").replace(/[^0-9.]/g, "")) || 0

    if (precioNumerico <= 0) {
      return NextResponse.json({ error: "Seminar has no valid price" }, { status: 422 })
    }
  } catch (error) {
    console.error("Failed to fetch seminar from Prismic:", error)
    return NextResponse.json(
      { error: "Failed to retrieve seminar data" },
      { status: 503 }
    )
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://estudio12tattoos.com"

  const seminarDetailUrl = `${siteUrl}/${lang}/seminarios/${slug}`
  // TODO: restore to seminarDetailUrl once redirect loop is confirmed fixed
  const backBaseUrl = `${siteUrl}/${lang}`

  try {
    const client = new MercadoPagoConfig({ accessToken })
    const preference = new Preference(client)

    const result = await preference.create({
      body: {
        items: [
          {
            id: slug,
            title: titulo,
            quantity: 1,
            unit_price: precioNumerico,
            currency_id: "ARS",
          },
        ],
        external_reference: `${slug}|${lang}`,
        back_urls: {
          success: `${backBaseUrl}?payment=success&seminar=${slug}`,
          failure: `${seminarDetailUrl}?payment=failure`,
          pending: `${seminarDetailUrl}?payment=pending`,
        },
        // auto_return solo funciona en producción con HTTPS
        ...(process.env.NODE_ENV === "production" && {
          auto_return: "approved",
        }),
      },
    })

    return NextResponse.json({
      init_point: result.init_point,
      sandbox_init_point: result.sandbox_init_point,
    })
  } catch (error) {
    console.error("MercadoPago preference creation failed:", error)
    return NextResponse.json(
      { error: "Failed to create payment preference" },
      { status: 500 }
    )
  }
}
