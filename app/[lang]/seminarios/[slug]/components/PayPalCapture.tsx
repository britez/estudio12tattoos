"use client"

import { useEffect, useRef, useState } from "react"
import { AlertCircle, CheckCircle, Loader2, XCircle } from "lucide-react"

/**
 * Cierra el flujo de PayPal cuando el comprador vuelve del `return_url`.
 *
 * El backend arma `returnUrl` como `{...}/seminarios/{slug}?paypal=success` y
 * PayPal le agrega `token` (el orderId) y `PayerID`. Este componente detecta
 * esa vuelta y dispara la captura.
 *
 * No es el único camino al cobro: el webhook `CHECKOUT.ORDER.APPROVED` también
 * captura del lado del servidor, para el comprador que aprueba y cierra la
 * pestaña. Por eso, ante cualquier duda sobre el resultado (red caída, 503,
 * throttle) este componente NO dice que el pago falló: decirlo empuja a pagar
 * de nuevo algo que probablemente ya se cobró.
 */

type Estado =
  | { tipo: "capturando" }
  | { tipo: "exito" }
  | { tipo: "aviso"; mensaje: string }
  | { tipo: "error"; mensaje: string }

export interface TextosCaptura {
  capturando: string
  exito: string
  cancelado: string
  rechazado: string
  sinConfirmar: string
  esperando: string
  generico: string
}

interface PayPalCaptureProps {
  /** Valor de `?paypal=` — `success` o `cancel`. */
  resultado?: string
  /** Valor de `?token=` — el orderId de PayPal. */
  orderId?: string
  textos: TextosCaptura
}

/**
 * Se resuelve ya en el render del servidor para que el comprador vea el banner
 * en el HTML inicial, sin un parpadeo vacío hasta que corra el efecto.
 */
function estadoInicial(
  resultado: string | undefined,
  orderId: string | undefined,
  textos: TextosCaptura,
): Estado | null {
  if (resultado === "cancel") {
    return { tipo: "aviso", mensaje: textos.cancelado }
  }
  if (resultado === "success" && orderId) {
    return { tipo: "capturando" }
  }
  return null
}

/**
 * Saca `token` y `PayerID` de la barra de direcciones una vez consumidos.
 * Sin esto, refrescar reenvía la captura y al décimo intento el rate limit
 * del backend responde 429, que se vería como un fallo sobre un pago exitoso.
 *
 * Usa `history.replaceState` en vez de `router.replace` a propósito: no
 * dispara una navegación de Next, así que este componente conserva su estado
 * y el banner no desaparece mientras el comprador lo está leyendo.
 */
function limpiarUrl() {
  if (typeof window === "undefined") return
  window.history.replaceState(null, "", window.location.pathname)
}

function mensajeSegunCodigo(
  codigo: string | undefined,
  textos: TextosCaptura,
): Estado {
  switch (codigo) {
    case "PAYPAL_INSTRUMENT_DECLINED":
      // Rechazo explícito del medio de pago: no hubo cobro y reintentar sirve.
      return { tipo: "error", mensaje: textos.rechazado }

    case "PAYPAL_CAPTURE_FAILED":
    case "PAYPAL_ORDER_NOT_FOUND":
      // El comprador aprobó pero el cobro quedó en un estado que no podemos
      // resolver solos. Que hable con el estudio antes de reintentar.
      return { tipo: "error", mensaje: textos.sinConfirmar }

    case "PAYPAL_ORDER_NOT_APPROVED":
    case "PAYPAL_UNAVAILABLE":
    case "PAYMENT_PROVIDER_UNAVAILABLE":
      // Transitorio. El webhook todavía puede cerrar el cobro.
      return { tipo: "aviso", mensaje: textos.esperando }

    default:
      return { tipo: "error", mensaje: textos.generico }
  }
}

export function PayPalCapture({
  resultado,
  orderId,
  textos,
}: PayPalCaptureProps) {
  const [estado, setEstado] = useState<Estado | null>(() =>
    estadoInicial(resultado, orderId, textos),
  )
  // En desarrollo React monta los efectos dos veces. El backend es idempotente,
  // pero una segunda llamada gasta cupo del rate limit sin aportar nada.
  const yaCorrio = useRef(false)

  useEffect(() => {
    if (yaCorrio.current) return
    yaCorrio.current = true

    if (resultado === "cancel") {
      limpiarUrl()
      return
    }

    if (resultado !== "success" || !orderId) return

    const capturar = async (id: string) => {
      try {
        const res = await fetch("/api/seminarios/paypal/capturar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId: id }),
        })

        if (res.ok) {
          // Incluye el caso idempotente: si el webhook capturó primero, el
          // backend responde 200 con `alreadyProcessed: true`. Para el
          // comprador es el mismo resultado.
          setEstado({ tipo: "exito" })
          return
        }

        if (res.status === 429) {
          setEstado({ tipo: "aviso", mensaje: textos.esperando })
          return
        }

        const data: { code?: string } | null = await res
          .json()
          .catch(() => null)
        setEstado(mensajeSegunCodigo(data?.code, textos))
      } catch {
        // Se cortó la red del lado del cliente. No sabemos si el backend llegó
        // a capturar, así que no afirmamos nada.
        setEstado({ tipo: "aviso", mensaje: textos.esperando })
      } finally {
        limpiarUrl()
      }
    }

    void capturar(orderId)
    // Corre una sola vez al montar: los parámetros de la URL ya están fijados
    // cuando el comprador aterriza acá, y repetir la captura solo gastaría
    // cupo del rate limit.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!estado) return null

  if (estado.tipo === "capturando") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex items-center gap-3 bg-secondary border border-border text-muted-foreground rounded-sm px-4 py-3"
      >
        <Loader2 className="w-5 h-5 shrink-0 animate-spin" />
        <span>{textos.capturando}</span>
      </div>
    )
  }

  if (estado.tipo === "exito") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex items-center gap-3 bg-emerald-900/30 border border-emerald-700 text-emerald-300 rounded-sm px-4 py-3"
      >
        <CheckCircle className="w-5 h-5 shrink-0" />
        <span>{textos.exito}</span>
      </div>
    )
  }

  if (estado.tipo === "aviso") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex items-center gap-3 bg-amber-900/30 border border-amber-700 text-amber-300 rounded-sm px-4 py-3"
      >
        <AlertCircle className="w-5 h-5 shrink-0" />
        <span>{estado.mensaje}</span>
      </div>
    )
  }

  return (
    <div
      role="alert"
      className="flex items-center gap-3 bg-red-900/30 border border-red-700 text-red-300 rounded-sm px-4 py-3"
    >
      <XCircle className="w-5 h-5 shrink-0" />
      <span>{estado.mensaje}</span>
    </div>
  )
}
