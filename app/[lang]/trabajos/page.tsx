import Image from "next/image"
import type { Metadata } from "next"
import { createClient } from "@/prismicio"
import type { WorkDocument } from "@/prismicio-types"
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
  const client = createClient()
  
  // Mapear idiomas de Next.js a los códigos de Prismic
  const prismicLang = lang === 'es' ? 'es-ar' : 'en-us'
  
  // Obtener el documento de trabajos desde Prismic
  let portfolioWorks: Array<{
    id: number
    image: string
    title: string
    artist: string
    category: string
  }> = []
  
  try {
    // Intentar obtener el documento con el idioma específico
    const workDocument: WorkDocument = await client.getSingle("work", { 
      lang: prismicLang
    })
    
    // Extraer los trabajos del slice Works2
    const worksSlice = workDocument.data.slices.find(slice => slice.slice_type === 'works2')
    if (worksSlice && 'primary' in worksSlice && worksSlice.primary.works) {
      portfolioWorks = worksSlice.primary.works.map((work, index) => ({
        id: index + 1,
        image: work.picture.url || '',
        title: work.title || '',
        artist: work.subtitle || 'Estudio 12',
        category: work.heading || 'Tatuaje',
      }))
    }
  } catch (error) {
    console.error('Error loading works from Prismic:', error)
    
    // Intentar sin especificar idioma como fallback
    try {
      const workDocument: WorkDocument = await client.getSingle("work")
      const worksSlice = workDocument.data.slices.find(slice => slice.slice_type === 'works2')
      if (worksSlice && 'primary' in worksSlice && worksSlice.primary.works) {
        portfolioWorks = worksSlice.primary.works.map((work, index) => ({
          id: index + 1,
          image: work.picture.url || '',
          title: work.title || '',
          artist: work.subtitle || 'Estudio 12',
          category: work.heading || 'Tatuaje',
        }))
      }
    } catch (fallbackError) {
      console.error('Fallback also failed:', fallbackError)
      portfolioWorks = []
    }
  }

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
          {portfolioWorks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {portfolioWorks.map((work) => (
                <div
                  key={work.id}
                  className="group relative overflow-hidden bg-card rounded-sm"
                >
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={work.image}
                      alt={`${work.title} - ${work.category} por ${work.artist}`}
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
          ) : (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold mb-4 text-muted-foreground">
                {lang === 'es' ? 'Próximamente...' : 'Coming Soon...'}
              </h3>
              <p className="text-muted-foreground">
                {lang === 'es' 
                  ? 'Estamos preparando nuestro portafolio. ¡Vuelve pronto!' 
                  : 'We are preparing our portfolio. Come back soon!'}
              </p>
            </div>
          )}
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
