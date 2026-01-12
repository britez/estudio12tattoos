"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 bg-[#fbfbfb] backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 md:justify-center">
          {/* Mobile menu button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium hover:text-muted-foreground transition-colors uppercase">
              INICIO
            </Link>
            <Link
              href="/trabajos"
              className="text-sm font-medium hover:text-muted-foreground transition-colors uppercase"
            >
              TRABAJOS
            </Link>

            <Link href="/">
              <div className="relative w-[140px] h-[40px]">
                <Image src="/logo-estudio12-clean.png" alt="ESTUDIO12" fill className="object-contain" priority />
              </div>
            </Link>

            <Link
              href="/acerca-de"
              className="text-sm font-medium hover:text-muted-foreground transition-colors uppercase"
            >
              ACERCA DE
            </Link>
            <Link
              href="/contacto"
              className="text-sm font-medium hover:text-muted-foreground transition-colors uppercase"
            >
              CONTACTO
            </Link>
          </nav>

          <div className="md:hidden flex justify-center">
            <Link href="/">
              <div className="relative w-[120px] h-[35px]">
                <Image src="/logo-estudio12-clean.png" alt="ESTUDIO12" fill className="object-contain" priority />
              </div>
            </Link>
          </div>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 space-y-3">
            <Link
              href="/"
              className="block text-sm font-medium hover:text-muted-foreground transition-colors py-2 uppercase"
              onClick={() => setIsMenuOpen(false)}
            >
              INICIO
            </Link>
            <Link
              href="/trabajos"
              className="block text-sm font-medium hover:text-muted-foreground transition-colors py-2 uppercase"
              onClick={() => setIsMenuOpen(false)}
            >
              TRABAJOS
            </Link>
            <Link
              href="/acerca-de"
              className="block text-sm font-medium hover:text-muted-foreground transition-colors py-2 uppercase"
              onClick={() => setIsMenuOpen(false)}
            >
              ACERCA DE
            </Link>
            <Link
              href="/contacto"
              className="block text-sm font-medium hover:text-muted-foreground transition-colors py-2 uppercase"
              onClick={() => setIsMenuOpen(false)}
            >
              CONTACTO
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
