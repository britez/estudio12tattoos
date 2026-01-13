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

export interface CarouselImage {
  id: number | string
  src: string
  alt: string
  title?: string
  description?: string
}

type CarouselItem = GuestArtist | CarouselImage

interface CarouselProps {
  items: CarouselItem[]
  type: 'artists' | 'images'
  autoplayDelay?: number
  itemWidth?: number
  className?: string
}

export function GenericCarousel({ 
  items, 
  type, 
  autoplayDelay = 3000, 
  itemWidth = 300,
  className = ""
}: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    dragFree: true,
    align: 'start',
    containScroll: false
  }, [Autoplay({ 
    delay: autoplayDelay, 
    stopOnInteraction: false, 
    pauseOnMouseEnter: true,
    stopOnFocusIn: false,
    stopOnLastSnap: false
  })])
  
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Log para debuggear
  useEffect(() => {
    console.log('GenericCarousel rendered with:', { 
      itemsCount: items.length, 
      type, 
      itemWidth,
      firstItemSrc: type === 'images' ? (items[0] as CarouselImage)?.src : 'N/A'
    })
  }, [items, type, itemWidth])

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

  // Duplicamos los items para crear un efecto infinito más fluido
  const duplicatedItems = [...items, ...items, ...items]

  const renderArtistCard = (artist: GuestArtist, index: number) => (
    <div className="bg-zinc-900 rounded-sm overflow-hidden group h-full">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={artist.imagen || "/placeholder.svg"}
          alt={artist.nombre}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes={`${itemWidth}px`}
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
  )

  const renderImageCard = (image: CarouselImage, index: number) => (
    <div className="relative h-96 overflow-hidden rounded-sm group">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        sizes={`${itemWidth}px`}
        priority={index < 3}
      />
      
      {image.title && (
        <div className={`
          absolute inset-0 bg-black/70 transition-all duration-300 flex items-end p-6 z-10
          ${hoveredIndex === index ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}>
          <div>
            <h3 className="text-white text-lg font-bold mb-1">{image.title}</h3>
            {image.description && (
              <p className="text-gray-300 text-sm">{image.description}</p>
            )}
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div className={`embla relative ${className}`} ref={emblaRef}>
      <div className="embla__container flex transition-transform duration-1000 ease-linear">
        {duplicatedItems.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="embla__slide flex-shrink-0 mx-3"
            style={{ 
              width: `${itemWidth}px`,
              minWidth: `${itemWidth}px`
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {type === 'artists' 
              ? renderArtistCard(item as GuestArtist, index)
              : renderImageCard(item as CarouselImage, index)
            }
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center z-20 transition-all duration-200 hover:scale-110 backdrop-blur-sm"
        onClick={scrollPrev}
        aria-label="Previous item"
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
        aria-label="Next item"
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

// Componente específico para artistas (retrocompatibilidad)
interface GuestArtistsCarouselProps {
  artists: GuestArtist[]
}

export function GuestArtistsCarousel({ artists }: GuestArtistsCarouselProps) {
  return <GenericCarousel items={artists} type="artists" />
}

export default GuestArtistsCarousel
