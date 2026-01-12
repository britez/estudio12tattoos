'use client'

import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

export interface GuestArtist {
  id: number
  nombre: string
  especialidad: string
  imagen: string
  instagram: string
  periodo: string
  descripcion: string
}

interface GuestArtistsCarouselProps {
  artists: GuestArtist[]
}

export function GuestArtistsCarousel({ artists }: GuestArtistsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    dragFree: true,
    align: 'start',
    containScroll: 'trimSnaps'
  }, [Autoplay({ delay: 3000, stopOnInteraction: false, pauseOnMouseEnter: true, resetProgress: false })])
  
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  useEffect(() => {
    if (emblaApi) {
      // Stop autoplay on hover
      const handlePointerEnter = () => emblaApi.plugins().autoPlay?.stop()
      const handlePointerLeave = () => emblaApi.plugins().autoPlay?.play()
      
      emblaApi.on('pointerDown', handlePointerEnter)
      emblaApi.on('pointerUp', handlePointerLeave)
      
      return () => {
        emblaApi.off('pointerDown', handlePointerEnter)
        emblaApi.off('pointerUp', handlePointerLeave)
      }
    }
  }, [emblaApi])

  return (
    <div className="embla relative" ref={emblaRef}>
      <div className="embla__container flex">
        {artists.map((artist, index) => (
          <div
            key={`${artist.id}-${index}`}
            className="embla__slide flex-shrink-0 w-[300px] mx-3"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="bg-zinc-900 rounded-sm overflow-hidden group h-full">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={artist.imagen || "/placeholder.svg"}
                  alt={artist.nombre}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="300px"
                />
                
                {/* Overlay con descripción al hacer hover */}
                <div className={`
                  absolute inset-0 bg-black/90 transition-all duration-300 flex items-center justify-center p-6 z-10
                  ${hoveredIndex === index ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                `}>
                  <div className="text-center">
                    <p className="text-white text-sm leading-relaxed mb-4">
                      {artist.descripcion}
                    </p>
                    <div className="w-12 h-px bg-white/30 mx-auto"></div>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1 text-white">{artist.nombre}</h3>
                <p className="text-sm text-gray-400 mb-2">{artist.especialidad}</p>
                <p className="text-xs text-gray-500 mb-3">{artist.periodo}</p>
                <a
                  href={`https://instagram.com/${artist.instagram.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white hover:text-gray-300 transition-colors hover:underline"
                >
                  {artist.instagram}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center z-20 transition-all duration-200 hover:scale-110 backdrop-blur-sm"
        onClick={scrollPrev}
        aria-label="Previous artist"
      >
        <svg
          className="w-5 h-5 -translate-x-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center z-20 transition-all duration-200 hover:scale-110 backdrop-blur-sm"
        onClick={scrollNext}
        aria-label="Next artist"
      >
        <svg
          className="w-5 h-5 translate-x-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Gradient overlays para efecto visual */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
    </div>
  )
}

export default GuestArtistsCarousel
