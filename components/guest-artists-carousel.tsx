"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Artist {
  id: number
  nombre: string
  especialidad: string
  imagen: string
  instagram: string
  periodo: string
  descripcion: string
}

interface GuestArtistsCarouselProps {
  artists: Artist[]
}

export default function GuestArtistsCarousel({ artists }: GuestArtistsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const itemsPerView = 3 // Número de artistas visibles a la vez
  const maxIndex = Math.max(0, artists.length - itemsPerView)

  // Detectar si es mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
  }

  return (
    <div className="relative">
      {/* Botón Anterior - Solo visible en desktop */}
      <button
        onClick={handlePrev}
        disabled={currentIndex === 0}
        className="hidden md:block absolute left-5 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 disabled:bg-white/5 disabled:cursor-not-allowed p-3 rounded-full transition-colors"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Botón Siguiente - Solo visible en desktop */}
      <button
        onClick={handleNext}
        disabled={currentIndex === maxIndex}
        className="hidden md:block absolute right-5 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 disabled:bg-white/5 disabled:cursor-not-allowed p-3 rounded-full transition-colors"
        aria-label="Siguiente"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Carrusel */}
      <div className="overflow-x-auto md:overflow-hidden px-4 md:px-16 scroll-smooth">
        <div
          className="flex gap-6 md:transition-transform md:duration-500 md:ease-out"
          style={{
            transform: !isMobile ? `translateX(-${currentIndex * (300 + 24)}px)` : 'none', // Solo transform en desktop
          }}
        >
          {artists.map((artista) => (
            <div
              key={artista.id}
              className="flex-shrink-0 w-[280px] md:w-[300px] bg-zinc-900 rounded-sm overflow-hidden group"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={artista.imagen || "/placeholder.svg"}
                  alt={artista.nombre}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Overlay con descripción al hacer hover */}
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 z-10">
                  <p className="text-white text-sm leading-relaxed text-center">{artista.descripcion}</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">{artista.nombre}</h3>
                <p className="text-sm text-gray-400 mb-2">{artista.especialidad}</p>
                <p className="text-xs text-gray-500 mb-3">{artista.periodo}</p>
                <a
                  href={`https://instagram.com/${artista.instagram.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white hover:underline"
                >
                  {artista.instagram}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Indicadores de posición - Solo visible en desktop */}
      <div className="hidden md:flex justify-center gap-2 mt-8">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "w-8 bg-white" : "w-2 bg-gray-600"
            }`}
            aria-label={`Ir a página ${index + 1}`}
          />
        ))}
      </div>

      {/* Indicador de scroll para mobile */}
      <div className="md:hidden text-center mt-6">
        <p className="text-sm text-gray-400">← Desliza para ver más artistas →</p>
      </div>
    </div>
  )
}
