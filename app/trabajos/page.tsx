"use client"

import Image from "next/image"
import type { Metadata } from "next"

export default function Trabajos() {
  // Portafolio de trabajos
  const portfolioWorks = [
    {
      id: 1,
      image: "/cats-tattoo-realistic.webp",
      title: "Gatos Realistas",
      artist: "Artista",
      category: "Realismo",
    },
    {
      id: 2,
      image: "/realistic-horse-tattoo.webp",
      title: "Caballo Realista",
      artist: "Artista",
      category: "Realismo",
    },
    {
      id: 3,
      image: "/japanese-geisha-tattoo-colorful.webp",
      title: "Geisha Tradicional",
      artist: "Artista",
      category: "Japonés Tradicional",
    },
    {
      id: 4,
      image: "/japanese-snake-cherry-blossom-forearm.webp",
      title: "Serpiente Japonesa",
      artist: "Artista",
      category: "Japonés",
    },
    {
      id: 5,
      image: "/polynesian-hand-tattoo.webp",
      title: "Polinesio",
      artist: "Artista",
      category: "Polinesio",
    },
    {
      id: 6,
      image: "/mandala-stencil-application.webp",
      title: "Aplicación de Stencil",
      artist: "Artista",
      category: "Proceso",
    },
    {
      id: 7,
      image: "/tattoo-artist-working-panoramic-view.webp",
      title: "Artista en Acción",
      artist: "Artista",
      category: "Proceso",
    },
    {
      id: 8,
      image: "/female-artist-working-natural-light.webp",
      title: "Artista Concentrada",
      artist: "Artista",
      category: "Proceso",
    },
    {
      id: 9,
      image: "/studio-tattoo-chair.webp",
      title: "Nuestro Estudio",
      artist: "Estudio",
      category: "Instalaciones",
    },
    {
      id: 10,
      image: "/images/84ef3090-eaae-44d6-815c-a81bae093663.webp",
      title: "Vista Panorámica",
      artist: "Estudio",
      category: "Instalaciones",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance uppercase">Nuestros Trabajos</h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Explora nuestro portafolio de tatuajes. Cada pieza cuenta una historia única.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="px-4 pb-20">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolioWorks.map((work) => (
              <div
                key={work.id}
                className="group relative overflow-hidden bg-card rounded-sm"
              >
                <div className="relative aspect-[3/4]">
                  <Image
                    src={work.image}
                    alt={work.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-xs uppercase tracking-wider mb-1 text-gray-300">
                        {work.category}
                      </p>
                      <h3 className="text-xl font-bold text-white mb-1">{work.title}</h3>
                      <p className="text-sm text-gray-400">{work.artist}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 pb-20">
        <div className="container mx-auto max-w-3xl">
          <div className="bg-secondary rounded-sm p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">¿Te inspiraste?</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Agenda una consulta para discutir tu próximo tatuaje con nuestro equipo de artistas.
            </p>
            <a
              href="/contacto"
              className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Agendar Consulta
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
