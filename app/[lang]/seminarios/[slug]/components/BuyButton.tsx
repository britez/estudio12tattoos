"use client"

import { useState } from "react"
import { ShoppingCart, Loader2, AlertCircle } from "lucide-react"

interface BuyButtonProps {
  slug: string
  label: string
  errorLabel: string
  emailLabel: string
  emailPlaceholder: string
}

export function BuyButton({
  slug,
  label,
  errorLabel,
  emailLabel,
  emailPlaceholder,
}: BuyButtonProps) {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isValidEmail = email.includes("@") && email.includes(".")

  const handleBuy = async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/seminarios/comprar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, slug }),
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
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-start gap-3 w-full">
      <div className="w-full">
        <label
          htmlFor="buy-email"
          className="block text-sm text-muted-foreground mb-1.5"
        >
          {emailLabel}
        </label>
        <input
          id="buy-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={emailPlaceholder}
          disabled={loading}
          className="w-full bg-secondary border border-border rounded-sm px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
        />
      </div>

      <button
        onClick={handleBuy}
        disabled={loading || !isValidEmail}
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
