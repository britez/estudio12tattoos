'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Home, MessageCircle, Palette, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

// Traducciones inline para evitar problemas con server-only
const translations = {
  es: {
    title: "¡Oops! Esta página se fue a tatuar",
    subtitle: "404 - No encontrado",
    message: "Parece que esta página se escapó del estudio para hacerse un tatuaje y no volvió nunca más. Mientras tanto, podés explorar el resto de nuestro trabajo.",
    fun_fact: "Dato curioso: El 73.8% de las páginas 404 nunca regresa de su sesión de tatuaje. ¿Será que les gusta tanto la experiencia?",
    cta: {
      home: "Volver al inicio",
      contact: "Contactanos", 
      work: "Ver trabajos"
    },
    ascii_art: "( ͡° ͜ʖ ͡°)"
  },
  en: {
    title: "Oops! This page went to get a tattoo",
    subtitle: "404 - Not found", 
    message: "Looks like this page escaped from the studio to get a tattoo and never came back. Meanwhile, you can explore the rest of our work.",
    fun_fact: "Fun fact: 73.8% of 404 pages never return from their tattoo session. Maybe they just love the experience that much?",
    cta: {
      home: "Back to home",
      contact: "Contact us",
      work: "View work"
    },
    ascii_art: "( ͡° ͜ʖ ͡°)"
  }
}

export default function NotFoundPage() {
  const params = useParams()
  const lang = (params.lang as 'es' | 'en') || 'es'
  const dict = translations[lang]
  const [showEasterEgg, setShowEasterEgg] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black relative overflow-hidden">
      {/* Elementos decorativos animados */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-4 h-4 bg-white/20 rounded-full animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}}></div>
        <div className="absolute top-32 right-20 w-3 h-3 bg-purple-400/30 rounded-full animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
        <div className="absolute bottom-40 left-1/4 w-2 h-2 bg-white/10 rounded-full animate-bounce" style={{animationDelay: '2s', animationDuration: '5s'}}></div>
        <div className="absolute top-1/2 right-10 w-5 h-5 bg-purple-300/20 rounded-full animate-bounce" style={{animationDelay: '0.5s', animationDuration: '3.5s'}}></div>
        
        {/* Líneas decorativas animadas */}
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
        <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/20 to-transparent animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* ASCII Art divertido */}
          <div className="mb-8 text-6xl md:text-8xl font-mono text-purple-300/70 animate-pulse select-none">
            {dict.ascii_art}
          </div>

          {/* Título principal con efecto */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent animate-fade-in">
            {dict.title}
          </h1>

          {/* Subtítulo con animación de typing */}
          <div className="text-xl md:text-2xl text-purple-300 mb-8 font-mono">
            <span className="inline-block animate-typing overflow-hidden whitespace-nowrap border-r-4 border-purple-300">
              {dict.subtitle}
            </span>
          </div>

          {/* Mensaje principal */}
          <div className="max-w-2xl mx-auto mb-8">
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
              {dict.message}
            </p>
            
            {/* Dato curioso con hover effect */}
            <div 
              className="bg-gradient-to-r from-purple-900/30 to-transparent border border-purple-500/30 rounded-lg p-6 cursor-pointer transition-all hover:from-purple-900/50 hover:border-purple-500/50 hover:scale-105"
              onClick={() => setShowEasterEgg(!showEasterEgg)}
            >
              <p className="text-purple-200 italic">
                💡 {dict.fun_fact}
              </p>
              
              {showEasterEgg && (
                <div className="mt-4 text-sm text-purple-300/70 animate-fade-in">
                  <p>🎨 Easter egg desbloqueado: ¡Acabas de encontrar nuestro mensaje secreto! 
                  Los tatuadores dicen que las páginas 404 son las más rebeldes del internet.</p>
                </div>
              )}
            </div>
          </div>

          {/* Botones con efectos hover */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link 
              href={`/${lang}`}
              className="group relative px-8 py-4 bg-white text-black rounded-sm font-medium overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
              <span className="relative z-10 flex items-center gap-2">
                <Home className="w-4 h-4" />
                {dict.cta.home}
              </span>
            </Link>

            <Link 
              href={`/${lang}/trabajos`}
              className="group relative px-8 py-4 border-2 border-purple-400 text-purple-400 rounded-sm font-medium overflow-hidden transition-all hover:scale-105 hover:text-white"
            >
              <div className="absolute inset-0 bg-purple-400 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <span className="relative z-10 flex items-center gap-2">
                <Palette className="w-4 h-4" />
                {dict.cta.work}
              </span>
            </Link>

            <Link 
              href={`/${lang}/contacto`}
              className="group relative px-8 py-4 border border-gray-600 text-gray-300 rounded-sm font-medium overflow-hidden transition-all hover:scale-105 hover:text-white hover:border-white"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
              <span className="relative z-10 flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                {dict.cta.contact}
              </span>
            </Link>
          </div>

          {/* Footer divertido */}
          <div className="text-center text-gray-500 text-sm">
            <p className="mb-2">🔍 Error 404: Página en sesión de tatuaje</p>
            <p>Mientras tanto, nuestros artistas siguen creando arte increíble ✨</p>
            
            {/* Línea de navegación rápida */}
            <div className="mt-8 flex justify-center">
              <Link 
                href={`/${lang}`} 
                className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-xs uppercase tracking-wider"
              >
                <ArrowLeft className="w-3 h-3" />
                Volver al estudio
              </Link>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-typing {
          animation: typing 2s steps(20, end) infinite alternate;
        }
      `}</style>
    </div>
  )
}
