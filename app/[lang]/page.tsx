import { ImageWithSkeleton } from "@/components/image-with-skeleton"
import type { Metadata } from "next"
import { getDictionary, hasLocale } from './dictionaries'
import type { PageProps } from './types'


export async function generateMetadata({ params }: PageProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params
  
  // Validar que el locale sea válido
  if (!hasLocale(lang)) {
    throw new Error(`Invalid locale: ${lang}`)
  }
  
  const dict = await getDictionary(lang)
  
  return {
    title: dict.home.metadata.title,
    description: dict.home.metadata.description,
    openGraph: {
      title: dict.home.metadata.og_title,
      description: dict.home.metadata.og_description,
      images: ["/artist-designing-tattoo-ipad.jpg"],
    },
  }
}

export default async function Home({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params
 
  // Validar que el locale sea válido
  if (!hasLocale(lang)) {
    throw new Error(`Invalid locale: ${lang}`)
  }
 
  const dict = await getDictionary(lang)

  const featured = [
    {
      id: 1,
      title: dict.home.works.panoramic_view,
      image: "/images/84ef3090-eaae-44d6-815c-a81bae093663.webp",
      category: dict.home.categories.studio,
      type: "image",
    },
    {
      id: 2,
      title: dict.home.works.our_studio,
      image: "/studio-tattoo-chair.webp",
      category: dict.home.categories.studio,
      type: "image",
    },
    {
      id: 3,
      title: dict.home.works.realistic_cats,
      image: "/cats-tattoo-realistic.webp",
      category: dict.home.categories.realism,
      type: "image",
    },
    {
      id: 4,
      title: dict.home.works.studio12_experience,
      video: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%40natha_streetink%20en%20el%2012%21%20Ya%20nos%20conoces%20Tuviste%20la%20experiencia%20de%20tatuarte%20con%20vista%20panora%CC%81mic-JoeWWFQPOQo1Hjp8MzS2Uvh0Y7RIAH.mp4",
      category: dict.home.categories.experience,
      type: "video",
    },
    {
      id: 5,
      title: dict.home.works.realistic_horse,
      image: "/realistic-horse-tattoo.webp",
      category: dict.home.categories.realism,
      type: "image",
    },
    {
      id: 6,
      title: dict.home.works.polynesian,
      image: "/polynesian-hand-tattoo.webp",
      category: dict.home.categories.polynesian,
      type: "image",
    },
    {
      id: 7,
      title: dict.home.works.artist_in_action,
      image: "/tattoo-artist-working-panoramic-view.webp",
      category: dict.home.categories.process,
      type: "image",
    },
    {
      id: 8,
      title: dict.home.works.stencil_application,
      image: "/mandala-stencil-application.webp",
      category: dict.home.categories.process,
      type: "image",
    },
    {
      id: 9,
      title: dict.home.works.traditional_geisha,
      image: "/japanese-geisha-tattoo-colorful.webp",
      category: dict.home.categories.japanese_traditional,
      type: "image",
    },
    {
      id: 10,
      title: dict.home.works.focused_artist,
      image: "/female-artist-working-natural-light.webp",
      category: dict.home.categories.process,
      type: "image",
    },
    {
      id: 11,
      title: dict.home.works.japanese_snake,
      image: "/japanese-snake-cherry-blossom-forearm.webp",
      category: dict.home.categories.japanese,
      type: "image",
    },
    {
      id: 12,
      title: dict.home.works.studio_view,
      image: "/studio-window-cityview-silhouette.webp",
      category: dict.home.categories.studio,
      type: "image",
    },
    {
      id: 13,
      title: dict.home.works.sunset_consultation,
      image: "/artists-consultation-sunset-studio.webp",
      category: dict.home.categories.studio,
      type: "image",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance uppercase leading-none">
            {dict.home.hero.title}
            <br />
            <span className="font-marker normal-case text-6xl md:text-9xl block mt-2">{dict.home.hero.subtitle}</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {dict.home.description}
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="px-4 pb-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
            {featured.map((work, index) => {
              const isVideo = index === 3
              const isSecondRowThirdColumn = index === 4
              const isFourthRowFirstItem = index === 9
              const isFourthRowSecondItem = index === 10
              const isFourthRowWideItem = index === 11
              const isLastRowWideItem = index === 12

              return (
                <div
                  key={work.id}
                  className={`group relative overflow-hidden bg-card rounded-sm ${
                    isVideo ? "lg:col-span-2 lg:row-span-2" : ""
                  } ${isSecondRowThirdColumn ? "lg:col-start-3 lg:row-start-2" : ""} ${
                    isFourthRowFirstItem ? "lg:col-start-1 lg:row-start-4" : ""
                  } ${isFourthRowSecondItem ? "lg:col-start-1 lg:row-start-5" : ""} ${
                    isFourthRowWideItem ? "lg:col-span-2 lg:col-start-2 lg:row-start-4 lg:row-span-2" : ""
                  } ${isLastRowWideItem ? "lg:col-span-2 lg:col-start-1 lg:row-start-6" : ""}`}
                >
                  {work.type === "video" ? (
                    <div className="relative aspect-[4/5] lg:aspect-[8/10]">
                      <video
                        src={work.video}
                        className="absolute inset-0 w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                          <p className="text-xs uppercase tracking-wider mb-1">{work.category}</p>
                          <h3 className="text-lg font-semibold">{work.title}</h3>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className={`relative ${isLastRowWideItem ? "aspect-[8/5]" : "aspect-[4/5]"}`}>
                      <ImageWithSkeleton
                        src={work.image || "/placeholder.svg"}
                        alt={work.title}
                        title={work.title}
                        category={work.category}
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 pb-20">
        <div className="container mx-auto max-w-3xl">
          <div className="bg-secondary rounded-sm p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance uppercase">{dict.home.cta.title}</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {dict.home.cta.description}
            </p>
            <a
              href={`/${lang}/contacto`}
              className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-sm font-medium hover:bg-primary/90 transition-colors"
            >
              {dict.home.cta.button}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
