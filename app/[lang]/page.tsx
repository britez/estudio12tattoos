import { ImageWithSkeleton } from "@/components/image-with-skeleton"
import type { Metadata } from "next"
import { createClient } from "@/prismicio"
import type { HomeDocument } from "@/prismicio-types"
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
  const client = createClient()
  
  // Mapear idiomas de Next.js a los códigos de Prismic
  const prismicLang = lang === 'es' ? 'es-ar' : 'en-us'
  
  // Video que se intercala (mantener hardcodeado ya que Prismic no acepta videos)
  const videoItem = {
    id: 999, // ID especial para el video
    title: dict.home.works.studio12_experience,
    video: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%40natha_streetink%20en%20el%2012%21%20Ya%20nos%20conoces%20Tuviste%20la%20experiencia%20de%20tatuarte%20con%20vista%20panora%CC%81mic-JoeWWFQPOQo1Hjp8MzS2Uvh0Y7RIAH.mp4",
    category: dict.home.categories.experience,
    type: "video",
  }
  
  // Obtener imágenes desde Prismic
  let prismicImages: Array<{
    id: number
    title: string
    image: string
    category: string
    type: string
  }> = []
  
  try {
    const homeDocument: HomeDocument = await client.getSingle("home", { 
      lang: prismicLang
    })
    
    console.log('Home document loaded:', homeDocument.data.slices.length, 'slices found')
    console.log('Available slice types:', homeDocument.data.slices.map(s => s.slice_type))
    
    // Buscar el slice de portfolio 
    const portfolioSlice = homeDocument.data.slices.find(slice => slice.slice_type === 'portfolio')
    if (portfolioSlice && 'primary' in portfolioSlice && portfolioSlice.primary.imagenes) {
      console.log('Portfolio slice found with', portfolioSlice.primary.imagenes.length, 'images')
      prismicImages = portfolioSlice.primary.imagenes.map((imagen, index) => ({
        id: index + 1,
        title: imagen.title || `Imagen ${index + 1}`,
        image: imagen.media.url || '',
        category: imagen.subtitle || dict.home.categories.studio,
        type: "image",
      }))
    } else {
      console.log('Portfolio slice not found or has no imagenes')
    }
  } catch (error) {
    console.error('Error loading home images from Prismic:', error)
    
    // Intentar sin especificar idioma como fallback
    try {
      console.log('Trying fallback without language specification')
      const homeDocument: HomeDocument = await client.getSingle("home")
      const portfolioSlice = homeDocument.data.slices.find(slice => slice.slice_type === 'portfolio')
      if (portfolioSlice && 'primary' in portfolioSlice && portfolioSlice.primary.imagenes) {
        console.log('Fallback successful with', portfolioSlice.primary.imagenes.length, 'images')
        prismicImages = portfolioSlice.primary.imagenes.map((imagen, index) => ({
          id: index + 1,
          title: imagen.title || `Imagen ${index + 1}`,
          image: imagen.media.url || '',
          category: imagen.subtitle || dict.home.categories.studio,
          type: "image",
        }))
      }
    } catch (fallbackError) {
      console.error('Fallback also failed:', fallbackError)
      // Si todo falla, usar array vacío - el video se agregará de todas formas
      prismicImages = []
    }
  }
  
  // Intercalar el video en la posición 4 (como estaba antes)
  const featured = [
    ...prismicImages.slice(0, 3), // Primeras 3 imágenes
    videoItem, // Video en posición 4
    ...prismicImages.slice(3) // Resto de las imágenes
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
