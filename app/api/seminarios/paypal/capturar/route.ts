import { NextRequest, NextResponse } from "next/server"

/**
 * Proxy server-side de la captura de PayPal.
 *
 * El backend no habilita CORS, así que el browser no puede llamarlo directo.
 * Este handler reenvía a
 * `POST {SEMINAR_API_BASE_URL}/seminarios/paypal/ordenes/{orderId}/capturas`
 * y propaga status y body tal cual: el cliente necesita distinguir
 * PAYPAL_ORDER_NOT_FOUND de PAYPAL_INSTRUMENT_DECLINED para mostrar el mensaje
 * correcto. Aplastar el error acá rompe el contrato de be-spec §7.3.
 */

const DEFAULT_API_BASE_URL = "https://api.estudio12tattoos.com"

// Mismo formato que valida el backend: un orderId malformado ni sale de acá.
const ORDER_ID_PATTERN = /^[A-Za-z0-9]{10,100}$/

export async function POST(request: NextRequest) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { code: "BAD_REQUEST", message: "Invalid request body" },
      { status: 400 }
    )
  }

  const orderId =
    typeof body === "object" && body !== null && "orderId" in body
      ? (body as { orderId: unknown }).orderId
      : undefined

  if (typeof orderId !== "string" || !ORDER_ID_PATTERN.test(orderId)) {
    return NextResponse.json(
      { code: "BAD_REQUEST", message: "orderId inválido" },
      { status: 400 }
    )
  }

  const baseUrl = (
    process.env.SEMINAR_API_BASE_URL || DEFAULT_API_BASE_URL
  ).replace(/\/+$/, "")

  const backendUrl = `${baseUrl}/seminarios/paypal/ordenes/${encodeURIComponent(orderId)}/capturas`

  try {
    const res = await fetch(backendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    })

    const text = await res.text()

    if (!text) {
      return new NextResponse(null, { status: res.status })
    }

    try {
      return NextResponse.json(JSON.parse(text), { status: res.status })
    } catch {
      console.error(
        `[proxy:capturar] Respuesta no-JSON del backend (${res.status})`
      )
      return NextResponse.json(
        {
          code: "INTERNAL_ERROR",
          message: "Respuesta inesperada del servicio de pagos",
        },
        { status: 502 }
      )
    }
  } catch (error) {
    console.error("[proxy:capturar] Failed to reach backend:", error)
    return NextResponse.json(
      {
        code: "PAYMENT_PROVIDER_UNAVAILABLE",
        message: "No pudimos contactar al servicio de pagos",
      },
      { status: 503 }
    )
  }
}
