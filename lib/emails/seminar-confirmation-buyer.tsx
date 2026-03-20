interface BuyerConfirmationProps {
  buyerName: string
  buyerEmail: string
  seminarTitle: string
  seminarDate: string
  seminarTime: string
  seminarInstructor: string
  amount: number
  paymentId: string
}

export function BuyerConfirmationEmail({
  buyerName,
  seminarTitle,
  seminarDate,
  seminarTime,
  seminarInstructor,
  amount,
  paymentId,
}: BuyerConfirmationProps) {
  const formattedAmount = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  }).format(amount)

  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto", color: "#1a1a1a" }}>
      <div style={{ backgroundColor: "#1a1a1a", padding: "32px", textAlign: "center" }}>
        <h1 style={{ color: "#ffffff", margin: 0, fontSize: "24px", letterSpacing: "2px" }}>
          ESTUDIO 12
        </h1>
        <p style={{ color: "#9ca3af", margin: "8px 0 0", fontSize: "12px", letterSpacing: "1px" }}>
          TATTOO STUDIO
        </p>
      </div>

      <div style={{ padding: "40px 32px", backgroundColor: "#ffffff" }}>
        <h2 style={{ fontSize: "20px", marginBottom: "8px" }}>
          ¡Hola {buyerName}! Tu lugar está reservado 🎉
        </h2>
        <p style={{ color: "#6b7280", lineHeight: "1.6" }}>
          Confirmamos que recibimos tu pago. Te esperamos en el seminario.
        </p>

        <div style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "24px", margin: "32px 0" }}>
          <h3 style={{ margin: "0 0 16px", fontSize: "16px", borderBottom: "1px solid #e5e7eb", paddingBottom: "12px" }}>
            {seminarTitle}
          </h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              {seminarDate && (
                <tr>
                  <td style={{ padding: "6px 0", color: "#6b7280", fontSize: "14px", width: "40%" }}>📅 Fecha</td>
                  <td style={{ padding: "6px 0", fontWeight: "600", fontSize: "14px" }}>{seminarDate}</td>
                </tr>
              )}
              {seminarTime && (
                <tr>
                  <td style={{ padding: "6px 0", color: "#6b7280", fontSize: "14px" }}>🕐 Horario</td>
                  <td style={{ padding: "6px 0", fontWeight: "600", fontSize: "14px" }}>{seminarTime}</td>
                </tr>
              )}
              {seminarInstructor && (
                <tr>
                  <td style={{ padding: "6px 0", color: "#6b7280", fontSize: "14px" }}>👤 Instructor</td>
                  <td style={{ padding: "6px 0", fontWeight: "600", fontSize: "14px" }}>{seminarInstructor}</td>
                </tr>
              )}
              <tr>
                <td style={{ padding: "6px 0", color: "#6b7280", fontSize: "14px" }}>💰 Monto pagado</td>
                <td style={{ padding: "6px 0", fontWeight: "600", fontSize: "14px", color: "#059669" }}>{formattedAmount}</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "#6b7280", fontSize: "14px" }}>🔖 # Pago</td>
                <td style={{ padding: "6px 0", fontWeight: "600", fontSize: "14px", fontFamily: "monospace" }}>{paymentId}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p style={{ color: "#6b7280", fontSize: "14px", lineHeight: "1.6" }}>
          Recibirás más información sobre la ubicación y materiales necesarios en los próximos días.
          Si tenés alguna pregunta, podés escribirnos a{" "}
          <a href="https://wa.me/5491171601995" style={{ color: "#1a1a1a", fontWeight: "600" }}>
            WhatsApp
          </a>{" "}
          o responder este mail.
        </p>
      </div>

      <div style={{ backgroundColor: "#1a1a1a", padding: "24px 32px", textAlign: "center" }}>
        <p style={{ color: "#6b7280", fontSize: "12px", margin: 0 }}>
          © 2026 Estudio 12 Tattoos · Buenos Aires, Argentina
        </p>
        <p style={{ color: "#4b5563", fontSize: "12px", margin: "4px 0 0" }}>
          <a href="https://www.instagram.com/estudio.12_/" style={{ color: "#6b7280" }}>Instagram</a>
          {" · "}
          <a href="https://wa.me/5491171601995" style={{ color: "#6b7280" }}>WhatsApp</a>
        </p>
      </div>
    </div>
  )
}
