"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"

interface HeaderProps {
  lang: string
  dict: {
    header: {
      nav: {
        home: string
        work: string
        about: string
        contact: string
      }
      toggle_menu: string
      language_selector: {
        spanish: string
        english: string
        switch_to_spanish: string
        switch_to_english: string
      }
    }
  }
}

export function Header({ lang, dict }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  
  // Obtener la ruta sin el prefijo de idioma
  const pathWithoutLang = pathname.replace(/^\/[a-z]{2}/, '') || '/'
  
  // Crear las URLs para cambiar de idioma
  const spanishUrl = `/es${pathWithoutLang}`
  const englishUrl = `/en${pathWithoutLang}`

  return (
    <header className="fixed top-0 left-0 right-0 bg-[#fbfbfb] backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-between h-20 md:justify-center">
          {/* Mobile menu button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label={dict.header.toggle_menu}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <nav className="hidden md:flex items-center gap-8">
            <Link href={`/${lang}`} className="text-sm font-medium hover:text-muted-foreground transition-colors uppercase">
              {dict.header.nav.home}
            </Link>
            <Link
              href={`/${lang}/trabajos`}
              className="text-sm font-medium hover:text-muted-foreground transition-colors uppercase"
            >
              {dict.header.nav.work}
            </Link>

            <Link href={`/${lang}`}>
              <div className="relative w-[140px] h-[40px]">
                <Image src="/logo-estudio12-clean.png" alt="ESTUDIO12" fill className="object-contain" priority />
              </div>
            </Link>

            <Link
              href={`/${lang}/acerca-de`}
              className="text-sm font-medium hover:text-muted-foreground transition-colors uppercase"
            >
              {dict.header.nav.about}
            </Link>
            <Link
              href={`/${lang}/contacto`}
              className="text-sm font-medium hover:text-muted-foreground transition-colors uppercase"
            >
              {dict.header.nav.contact}
            </Link>
          </nav>
          
          {/* Language selector - Desktop (absolute positioned) */}
          <div className="hidden md:flex absolute right-4 top-1/2 transform -translate-y-1/2 flex-col gap-1">
            <Link 
              href={spanishUrl} 
              className={`flex items-center justify-center w-10 h-8 rounded transition-colors ${
                lang === 'es' ? 'bg-gray-200' : 'hover:bg-gray-100'
              }`}
              title={dict.header.language_selector.switch_to_spanish}
            >
              <span className="text-lg">🇦🇷</span>
            </Link>
            <Link 
              href={englishUrl} 
              className={`flex items-center justify-center w-10 h-8 rounded transition-colors ${
                lang === 'en' ? 'bg-gray-200' : 'hover:bg-gray-100'
              }`}
              title={dict.header.language_selector.switch_to_english}
            >
              <span className="text-lg">🇺🇸</span>
            </Link>
          </div>

          <div className="md:hidden flex justify-center">
            <Link href={`/${lang}`}>
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
              href={`/${lang}`}
              className="block text-sm font-medium hover:text-muted-foreground transition-colors py-2 uppercase"
              onClick={() => setIsMenuOpen(false)}
            >
              {dict.header.nav.home}
            </Link>
            <Link
              href={`/${lang}/trabajos`}
              className="block text-sm font-medium hover:text-muted-foreground transition-colors py-2 uppercase"
              onClick={() => setIsMenuOpen(false)}
            >
              {dict.header.nav.work}
            </Link>
            <Link
              href={`/${lang}/acerca-de`}
              className="block text-sm font-medium hover:text-muted-foreground transition-colors py-2 uppercase"
              onClick={() => setIsMenuOpen(false)}
            >
              {dict.header.nav.about}
            </Link>
            <Link
              href={`/${lang}/contacto`}
              className="block text-sm font-medium hover:text-muted-foreground transition-colors py-2 uppercase"
              onClick={() => setIsMenuOpen(false)}
            >
              {dict.header.nav.contact}
            </Link>
            
            {/* Language selector - Mobile Menu */}
            <div className="flex justify-center gap-4 pt-4 border-t border-gray-200 mt-4">
              <Link 
                href={spanishUrl} 
                className={`flex items-center gap-2 px-4 py-2 rounded transition-colors ${
                  lang === 'es' ? 'bg-gray-200' : 'hover:bg-gray-100'
                }`}
                title={dict.header.language_selector.switch_to_spanish}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="text-lg">🇦🇷</span>
                <span className="text-sm font-medium">ES</span>
              </Link>
              <Link 
                href={englishUrl} 
                className={`flex items-center gap-2 px-4 py-2 rounded transition-colors ${
                  lang === 'en' ? 'bg-gray-200' : 'hover:bg-gray-100'
                }`}
                title={dict.header.language_selector.switch_to_english}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="text-lg">🇺🇸</span>
                <span className="text-sm font-medium">EN</span>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
