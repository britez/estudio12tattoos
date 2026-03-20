interface StudioNotificationProps {
  buyerName: string
  buyerEmail: string
  buyerPhone?: string
  buyerDni?: string
  seminarTitle: string
  seminarDate: string
  seminarTime: string
  amount: number
  paymentId: string
  seminarSlug: string
}

export function StudioNotificationEmail({
  buyerName,
  buyerEmail,
  buyerPhone,
  buyerDni,
  seminarTitle,
  seminarDate,
  seminarTime,
  amount,
  paymentId,
  seminarSlug,
}: StudioNotificationProps) {
  const formattedAmount = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  }).format(amount)

  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto", color: "#1a1a1a" }}>
      <div style={{ backgroundColor: "#1a1a1a", padding: "24px 32px" }}>
        <h1 style={{ color: "#ffffff", margin: 0, fontSize: "18px" }}>
          🎉 Nuevo inscripto — {seminarTitle}
        </h1>
      </div>

      <div style={{ padding: "32px", backgroundColor: "#ffffff" }}>
        <h2 style={{ fontSize: "16px", color: "#059669", marginBottom: "24px" }}>
          ✅ Pago aprobado por MercadoPago
        </h2>

        <h3 style={{ fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px", color: "#6b7280", margin: "0 0 12px" }}>
          Datos del comprador
        </h3>
        <div style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "20px", marginBottom: "24px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              <tr>
                <td style={{ padding: "5px 0", color: "#6b7280", fontSize: "14px", width: "35%" }}>Nombre</td>
                <td style={{ padding: "5px 0", fontWeight: "600", fontSize: "14px" }}>{buyerName}</td>
              </tr>
              <tr>
                <td style={{ padding: "5px 0", color: "#6b7280", fontSize: "14px" }}>Email</td>
                <td style={{ padding: "5px 0", fontSize: "14px" }}>
                  <a href={`mailto:${buyerEmail}`} style={{ color: "#1a1a1a" }}>{buyerEmail}</a>
                </td>
              </tr>
              {buyerPhone && (
                <tr>
                  <td style={{ padding: "5px 0", color: "#6b7280", fontSize: "14px" }}>Teléfono</td>
                  <td style={{ padding: "5px 0", fontSize: "14px" }}>{buyerPhone}</td>
                </tr>
              )}
              {buyerDni && (
                <tr>
                  <td style={{ padding: "5px 0", color: "#6b7280", fontSize: "14px" }}>DNI</td>
                  <td style={{ padding: "5px 0", fontSize: "14px" }}>{buyerDni}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <h3 style={{ fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px", color: "#6b7280", margin: "0 0 12px" }}>
          Datos del pago
        </h3>
        <div style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "20px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              <tr>
                <td style={{ padding: "5px 0", color: "#6b7280", fontSize: "14px", width: "35%" }}>Seminario</td>
                <td style={{ padding: "5px 0", fontWeight: "600", fontSize: "14px" }}>{seminarTitle}</td>
              </tr>
              {seminarDate && (
                <tr>
                  <td style={{ padding: "5px 0", color: "#6b7280", fontSize: "14px" }}>Fecha</td>
                  <td style={{ padding: "5px 0", fontSize: "14px" }}>{seminarDate}</td>
                </tr>
              )}
              {seminarTime && (
                <tr>
                  <td style={{ padding: "5px 0", color: "#6b7280", fontSize: "14px" }}>Horario</td>
                  <td style={{ padding: "5px 0", fontSize: "14px" }}>{seminarTime}</td>
                </tr>
              )}
              <tr>
                <td style={{ padding: "5px 0", color: "#6b7280", fontSize: "14px" }}>Monto</td>
                <td style={{ padding: "5px 0", fontWeight: "600", fontSize: "14px", color: "#059669" }}>{formattedAmount}</td>
              </tr>
              <tr>
                <td style={{ padding: "5px 0", color: "#6b7280", fontSize: "14px" }}>ID de pago</td>
                <td style={{ padding: "5px 0", fontSize: "13px", fontFamily: "monospace" }}>{paymentId}</td>
              </tr>
              <tr>
                <td style={{ padding: "5px 0", color: "#6b7280", fontSize: "14px" }}>Slug</td>
                <td style={{ padding: "5px 0", fontSize: "13px", fontFamily: "monospace" }}>{seminarSlug}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ backgroundColor: "#f3f4f6", padding: "16px 32px", textAlign: "center" }}>
        <p style={{ color: "#6b7280", fontSize: "12px", margin: 0 }}>
          Notificación automática — Estudio 12 Tattoos
        </p>
      </div>
    </div>
  )
}
