import { NextRequest, NextResponse } from "next/server"
import { MercadoPagoConfig, Payment } from "mercadopago"
import { Resend } from "resend"
import { createClient } from "@/prismicio"
import type * as prismic from "@prismicio/client"
import { BuyerConfirmationEmail } from "@/lib/emails/seminar-confirmation-buyer"
import { StudioNotificationEmail } from "@/lib/emails/seminar-notification-studio"
import { createElement } from "react"

const resend = new Resend(process.env.RESEND_API_KEY)

function verifySignature(request: NextRequest, dataId: string): boolean {
  const secret = process.env.MP_WEBHOOK_SECRET
  if (!secret) return true // Skip in dev if not configured

  const xSignature = request.headers.get("x-signature")
  const xRequestId = request.headers.get("x-request-id") ?? ""
  if (!xSignature) return false

  // Parse "ts=...,v1=..." — use indexOf to avoid splitting on "=" inside the value
  let ts = ""
  let v1 = ""
  for (const part of xSignature.split(",")) {
    const idx = part.indexOf("=")
    if (idx === -1) continue
    const key = part.slice(0, idx).trim()
    const val = part.slice(idx + 1).trim()
    if (key === "ts") ts = val
    if (key === "v1") v1 = val
  }
  if (!ts || !v1) return false

  // MP signature: HMAC-SHA256 of "id:{data.id};request-id:{x-request-id};ts:{ts}"
  const crypto = require("crypto")
  const message = `id:${dataId};request-id:${xRequestId};ts:${ts}`
  const expected = crypto.createHmac("sha256", secret).update(message).digest("hex")
  return expected === v1
}

async function getSeminarBySlug(slug: string, lang: string) {
  const client = createClient() as unknown as prismic.Client
  const prismicLang = lang === "es" ? "es-ar" : "en-us"

  try {
    const doc = await client.getSingle("seminars", { lang: prismicLang })
    const items: prismic.GroupField = (doc.data as Record<string, prismic.GroupField>)["seminarios"] ?? []

    for (const item of items) {
      const fields = item as Record<string, unknown>
      if (fields["slug"] === slug) {
        const precio_numerico = typeof fields["precio_numerico"] === "number" ? fields["precio_numerico"] : null
        const precioText = String(fields["precio"] ?? "")
        const precioNumerico = precio_numerico ?? (parseFloat(precioText.replace(/[^0-9.]/g, "")) || 0)

        return {
          titulo: String(fields["titulo"] ?? ""),
          fecha: String(fields["fecha"] ?? ""),
          hora: String(fields["hora"] ?? ""),
          instructor: String(fields["instructor"] ?? ""),
          precioNumerico,
        }
      }
    }
    return null
  } catch {
    return null
  }
}

export async function POST(request: NextRequest) {
  let rawBody: string
  try {
    rawBody = await request.text()
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 })
  }

  let notification: unknown
  try {
    notification = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  // Extract data.id before signature verification (needed to build the HMAC message)
  const notifObj = typeof notification === "object" && notification !== null
    ? notification as Record<string, unknown>
    : {}
  const dataId = String((notifObj["data"] as Record<string, unknown> | undefined)?.["id"] ?? "")

  // Verify signature using data.id from body
  if (!verifySignature(request, dataId)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
  }

  if (!("type" in notifObj)) {
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  const data = notifObj

  // Only process payment events
  if (data["type"] !== "payment") {
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  const paymentData = data["data"] as Record<string, unknown> | undefined
  const paymentId = paymentData?.["id"]
  if (!paymentId) {
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  // Fetch payment details from MercadoPago
  const mpAccessToken = process.env.MP_ACCESS_TOKEN
  if (!mpAccessToken) {
    console.error("[webhook] MP_ACCESS_TOKEN not configured")
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  const mp = new MercadoPagoConfig({ accessToken: mpAccessToken })
  const paymentClient = new Payment(mp)

  let paymentDetails: Awaited<ReturnType<typeof paymentClient.get>>
  try {
    paymentDetails = await paymentClient.get({ id: String(paymentId) })
  } catch (err) {
    console.error("[webhook] Failed to fetch payment:", err)
    // Return 200 to prevent MP from retrying infinitely on our error
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  if (paymentDetails.status !== "approved") {
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  // Extract payment info
  const payer = paymentDetails.payer as Record<string, unknown> | undefined
  const buyerEmail = String(payer?.["email"] ?? "")
  const buyerFirstName = String(payer?.["first_name"] ?? "")
  const buyerLastName = String(payer?.["last_name"] ?? "")
  const buyerName = [buyerFirstName, buyerLastName].filter(Boolean).join(" ") || buyerEmail
  const phone = payer?.["phone"] as Record<string, unknown> | undefined
  const buyerPhone = phone ? `${phone["area_code"] ?? ""}${phone["number"] ?? ""}` : undefined
  const identification = payer?.["identification"] as Record<string, unknown> | undefined
  const buyerDni = identification?.["number"] ? String(identification["number"]) : undefined

  const amount = Number(paymentDetails.transaction_amount ?? 0)
  const externalRef = String(paymentDetails.external_reference ?? "")
  const [slug, lang] = externalRef.split("|")

  if (!slug || !buyerEmail) {
    console.error("[webhook] Missing slug or buyer email in payment", paymentDetails.id)
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  // Fetch seminar info from Prismic
  const seminar = await getSeminarBySlug(slug, lang ?? "es")

  const seminarTitle = seminar?.titulo ?? slug
  const seminarDate = seminar?.fecha ?? ""
  const seminarTime = seminar?.hora ?? ""
  const seminarInstructor = seminar?.instructor ?? ""
  const paymentIdStr = String(paymentDetails.id ?? paymentId)

  // Send emails (fire and forget failures — we already received the payment)
  const studioEmail = process.env.STUDIO_EMAIL ?? ""
  const fromAddress = process.env.EMAIL_FROM ?? "noreply@estudio12tattoos.com"

  try {
    const emailPromises: Promise<unknown>[] = [
      resend.emails.send({
        from: fromAddress,
        to: buyerEmail,
        subject: `Inscripción confirmada — ${seminarTitle}`,
        react: createElement(BuyerConfirmationEmail, {
          buyerName,
          buyerEmail,
          seminarTitle,
          seminarDate,
          seminarTime,
          seminarInstructor,
          amount,
          paymentId: paymentIdStr,
        }),
      }),
    ]

    if (studioEmail) {
      emailPromises.push(
        resend.emails.send({
          from: fromAddress,
          to: studioEmail,
          subject: `Nuevo inscripto: ${buyerName} — ${seminarTitle}`,
          react: createElement(StudioNotificationEmail, {
            buyerName,
            buyerEmail,
            buyerPhone,
            buyerDni,
            seminarTitle,
            seminarDate,
            seminarTime,
            amount,
            paymentId: paymentIdStr,
            seminarSlug: slug,
          }),
        })
      )
    }

    await Promise.all(emailPromises)
    console.log(`[webhook] Emails sent for payment ${paymentIdStr}`)
  } catch (emailErr) {
    // Log but don't fail — money was already received
    console.error("[webhook] Email send failed:", emailErr)
  }

  return NextResponse.json({ ok: true }, { status: 200 })
}
