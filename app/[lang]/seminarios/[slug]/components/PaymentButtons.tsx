"use client"

import { useState } from "react"
import { Loader2, AlertCircle } from "lucide-react"
import Image from "next/image"

interface PaymentButtonsProps {
  slug: string
  precioArs?: string
  precioNumericoArs?: number
  precioUsd?: string
  precioNumericoUsd?: number
  emailLabel: string
  emailPlaceholder: string
  errorLabel: string
  lang: string
}

export function PaymentButtons({
  slug,
  precioArs,
  precioNumericoArs,
  precioUsd,
  precioNumericoUsd,
  emailLabel,
  emailPlaceholder,
  errorLabel,
  lang,
}: PaymentButtonsProps) {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState<"mercadopago" | "paypal" | null>(null)
  const [error, setError] = useState<string | null>(null)

  const isValidEmail = email.includes("@") && email.includes(".")

  const handleBuy = async (provider: "mercadopago" | "paypal") => {
    setLoading(provider)
    setError(null)

    try {
      const res = await fetch("/api/seminarios/comprar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, slug, provider }),
      })

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`)
      }

      const data: { redirectUrl?: string; url?: string } = await res.json()

      const checkoutUrl = data.redirectUrl ?? data.url
      if (!checkoutUrl) throw new Error("No checkout URL received")

      window.location.href = checkoutUrl
    } catch {
      setError(errorLabel)
      setLoading(null)
    }
  }

  // Si no hay ningún precio configurado, no mostrar nada
  if (!precioArs && !precioUsd) {
    return null
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="w-full">
        <label
          htmlFor="payment-email"
          className="block text-sm text-muted-foreground mb-1.5"
        >
          {emailLabel}
        </label>
        <input
          id="payment-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={emailPlaceholder}
          disabled={loading !== null}
          className="w-full bg-secondary border border-border rounded-sm px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        {/* Botón MercadoPago (solo si hay precio ARS) */}
        {precioArs && precioNumericoArs && (
          <button
            onClick={() => handleBuy("mercadopago")}
            disabled={loading !== null || !isValidEmail}
            className="flex-1 flex items-center justify-center gap-3 bg-[#009ee3] text-white px-6 py-3 rounded-sm font-medium text-base hover:bg-[#0088cc] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading === "mercadopago" ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Image
                src="/MP_RGB_HANDSHAKE_pluma_horizontal.svg"
                alt="MercadoPago"
                width={100}
                height={24}
              />
            )}
            <span>
              {lang === "es" ? "Pagar" : "Pay"} {precioArs}
            </span>
          </button>
        )}

        {/* Botón PayPal (solo si hay precio USD) */}
        {precioUsd && precioNumericoUsd && (
          <button
            onClick={() => handleBuy("paypal")}
            disabled={loading !== null || !isValidEmail}
            className="flex-1 flex items-center justify-center gap-3 bg-[#0070ba] text-white px-6 py-3 rounded-sm font-medium text-base hover:bg-[#005a94] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading === "paypal" ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Image
                src="/paypal-logotype-on-white-background-paypal-logo-debit-electronic-payment-system-financial-management-electronic-wallet-nfc-banking-app-bank-application-editorial-free-vector.jpg"
                alt="PayPal"
                width={25}
                height={12}
                className="rounded-md"
              />
            )}
            <span>
              {lang === "es" ? "Pagar" : "Pay"} {precioUsd}
            </span>
          </button>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 text-sm text-red-400">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}
