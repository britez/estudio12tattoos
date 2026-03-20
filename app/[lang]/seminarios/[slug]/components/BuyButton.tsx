"use client"

import { useState } from "react"
import { ShoppingCart, Loader2, AlertCircle } from "lucide-react"

interface BuyButtonProps {
  slug: string
  lang: string
  label: string
  errorLabel: string
}

export function BuyButton({
  slug,
  lang,
  label,
  errorLabel,
}: BuyButtonProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleBuy = async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/mercadopago/create-preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, lang }),
      })

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`)
      }

      const data: { init_point?: string; sandbox_init_point?: string } =
        await res.json()

      const url =
        process.env.NODE_ENV === "production"
          ? data.init_point
          : (data.sandbox_init_point ?? data.init_point)

      if (!url) throw new Error("No checkout URL received")

      window.location.href = url
    } catch {
      setError(errorLabel)
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        onClick={handleBuy}
        disabled={loading}
        className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-sm font-medium text-base hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <ShoppingCart className="w-5 h-5" />
        )}
        {label}
      </button>

      {error && (
        <div className="flex items-center gap-2 text-sm text-red-400">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}
