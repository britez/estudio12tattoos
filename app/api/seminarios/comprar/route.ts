import { NextRequest, NextResponse } from "next/server"

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
    !("email" in body)
  ) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  const backendUrl =
    process.env.SEMINAR_API_URL ||
    "https://ddsm6deawd.us-east-1.awsapprunner.com/seminarios/comprar"

  try {
    const res = await fetch(backendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      const errorText = await res.text()
      console.error(`[proxy] Backend error ${res.status}:`, errorText)
      return NextResponse.json(
        { error: "Backend service error" },
        { status: res.status }
      )
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("[proxy] Failed to reach backend:", error)
    return NextResponse.json(
      { error: "Failed to reach payment service" },
      { status: 503 }
    )
  }
}
