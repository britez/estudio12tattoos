import { NextRequest, NextResponse } from "next/server"

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

  if (
    typeof body !== "object" ||
    body === null ||
    !("slug" in body) ||
    !("email" in body)
  ) {
    return NextResponse.json(
      { code: "BAD_REQUEST", message: "Missing required fields" },
      { status: 400 }
    )
  }

  const backendUrl =
    process.env.SEMINAR_API_URL ||
    "https://api.estudio12tattoos.com/seminarios/comprar"

  try {
    const res = await fetch(backendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    })

    const text = await res.text()

    if (!text) {
      return new NextResponse(null, { status: res.status })
    }

    // Se propaga el body del backend tal cual, también en error: el cliente
    // necesita distinguir SEMINAR_PRICE_UNAVAILABLE de PAYMENT_PROVIDER_UNAVAILABLE.
    try {
      return NextResponse.json(JSON.parse(text), { status: res.status })
    } catch {
      console.error(`[proxy] Respuesta no-JSON del backend (${res.status})`)
      return NextResponse.json(
        {
          code: "INTERNAL_ERROR",
          message: "Respuesta inesperada del servicio de pagos",
        },
        { status: 502 }
      )
    }
  } catch (error) {
    console.error("[proxy] Failed to reach backend:", error)
    return NextResponse.json(
      {
        code: "PAYMENT_PROVIDER_UNAVAILABLE",
        message: "Failed to reach payment service",
      },
      { status: 503 }
    )
  }
}
