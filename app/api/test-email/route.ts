import { NextResponse } from "next/server"
import { Resend } from "resend"
import { BuyerConfirmationEmail } from "@/lib/emails/seminar-confirmation-buyer"
import { StudioNotificationEmail } from "@/lib/emails/seminar-notification-studio"
import { createElement } from "react"

// TEMP: solo disponible fuera de producción para testear emails
export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available in production" }, { status: 404 })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)
  const fromAddress = process.env.EMAIL_FROM ?? "onboarding@resend.dev"
  const studioEmail = process.env.STUDIO_EMAIL ?? ""

  const testData = {
    buyerName: "Juan Pérez",
    buyerEmail: "maxi03.15@gmail.com", // va a tu email de Resend
    seminarTitle: "Seminario de Prueba",
    seminarDate: "15 de Abril de 2026",
    seminarTime: "18:00",
    seminarInstructor: "Estudio 12",
    amount: 15000,
    paymentId: "TEST-12345678",
  }

  const results: Record<string, unknown> = {}

  // Email al comprador
  try {
    const r = await resend.emails.send({
      from: fromAddress,
      to: testData.buyerEmail,
      subject: `[TEST] Inscripción confirmada — ${testData.seminarTitle}`,
      react: createElement(BuyerConfirmationEmail, testData),
    })
    results.buyer = { ok: true, id: r.data?.id }
  } catch (e) {
    results.buyer = { ok: false, error: String(e) }
  }

  // Email al estudio
  if (studioEmail) {
    try {
      const r = await resend.emails.send({
        from: fromAddress,
        to: studioEmail,
        subject: `[TEST] Nuevo inscripto: ${testData.buyerName} — ${testData.seminarTitle}`,
        react: createElement(StudioNotificationEmail, {
          ...testData,
          buyerPhone: "1155551234",
          buyerDni: "30123456",
          seminarSlug: "seminario-de-prueba",
        }),
      })
      results.studio = { ok: true, id: r.data?.id }
    } catch (e) {
      results.studio = { ok: false, error: String(e) }
    }
  } else {
    results.studio = { ok: false, error: "STUDIO_EMAIL not configured" }
  }

  return NextResponse.json(results)
}
