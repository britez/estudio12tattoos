import Image from "next/image"
import type { Metadata } from "next"
import { getDictionary, hasLocale } from '../dictionaries'
import type { PageProps } from '../types'

export async function generateMetadata({ params }: PageProps<'/[lang]/trabajos'>): Promise<Metadata> {
  const { lang } = await params
  
  // Validar que el locale sea válido
  if (!hasLocale(lang)) {
    throw new Error(`Invalid locale: ${lang}`)
  }
  
  const dict = await getDictionary(lang)
  
  return {
    title: dict.work.metadata.title,
    description: dict.work.metadata.description,
    openGraph: {
      title: dict.work.metadata.og_title,
      description: dict.work.metadata.og_description,
      type: 'website',
      locale: lang === 'es' ? 'es_AR' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.work.metadata.og_title,
      description: dict.work.metadata.og_description,
    },
  }
}

export default async function Trabajos({ params }: PageProps<'/[lang]/trabajos'>) {
  const { lang } = await params
  
  // Validar que el locale sea válido
  if (!hasLocale(lang)) {
    throw new Error(`Invalid locale: ${lang}`)
  }
  
  const dict = await getDictionary(lang)
  // Portafolio de trabajos
  const portfolioWorks = [
    {
      id: 1,
      image: "/cats-tattoo-realistic.webp",
      title: dict.home.works.realistic_cats,
      artist: "Artista",
      category: dict.home.categories.realism,
    },
    {
      id: 2,
      image: "/realistic-horse-tattoo.webp",
      title: dict.home.works.realistic_horse,
      artist: "Artista",
      category: dict.home.categories.realism,
    },
    {
      id: 3,
      image: "/japanese-geisha-tattoo-colorful.webp",
      title: dict.home.works.traditional_geisha,
      artist: "Artista",
      category: dict.home.categories.japanese_traditional,
    },
    {
      id: 4,
      image: "/japanese-snake-cherry-blossom-forearm.webp",
      title: dict.home.works.japanese_snake,
      artist: "Artista",
      category: dict.home.categories.japanese,
    },
    {
      id: 5,
      image: "/polynesian-hand-tattoo.webp",
      title: dict.home.works.polynesian,
      artist: "Artista",
      category: dict.home.categories.polynesian,
    },
    {
      id: 6,
      image: "/mandala-stencil-application.webp",
      title: dict.home.works.stencil_application,
      artist: "Artista",
      category: dict.home.categories.process,
    },
    {
      id: 7,
      image: "/tattoo-artist-working-panoramic-view.webp",
      title: dict.home.works.artist_in_action,
      artist: "Artista",
      category: dict.home.categories.process,
    },
    {
      id: 8,
      image: "/female-artist-working-natural-light.webp",
      title: dict.home.works.focused_artist,
      artist: "Artista",
      category: dict.home.categories.process,
    },
    {
      id: 9,
      image: "/studio-tattoo-chair.webp",
      title: dict.home.works.our_studio,
      artist: dict.home.categories.studio,
      category: dict.home.categories.studio,
    },
    {
      id: 10,
      image: "/images/84ef3090-eaae-44d6-815c-a81bae093663.webp",
      title: dict.home.works.panoramic_view,
      artist: dict.home.categories.studio,
      category: dict.home.categories.studio,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance uppercase">{dict.work.hero.title}</h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {dict.work.hero.description}
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">{dict.work.cta.title}</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {dict.work.cta.description}
            </p>
            <a
              href={`/${lang}/contacto`}
              className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-sm font-medium hover:bg-primary/90 transition-colors"
            >
              {dict.work.cta.button}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
