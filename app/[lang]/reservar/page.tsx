import type { Metadata } from "next"
import { createClient } from "@/prismicio"
import type { AboutusDocument } from "@/prismicio-types"
import { getDictionary, hasLocale } from '../dictionaries'
import type { PageProps } from '../types'
import BookingWizard from './BookingWizard'

export async function generateMetadata({ params }: PageProps<'/[lang]/reservar'>): Promise<Metadata> {
  const { lang } = await params
  
  // Validar que el locale sea válido
  if (!hasLocale(lang)) {
    throw new Error(`Invalid locale: ${lang}`)
  }
  
  const dict = await getDictionary(lang)
  
  return {
    title: dict.book.metadata.title,
    description: dict.book.metadata.description,
    openGraph: {
      title: dict.book.metadata.og_title,
      description: dict.book.metadata.og_description,
      type: 'website',
      locale: lang === 'es' ? 'es_AR' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.book.metadata.og_title,
      description: dict.book.metadata.og_description,
    },
  }
}

export default async function BookPage({ params }: PageProps<'/[lang]/reservar'>) {
  const { lang } = await params
  
  // Validar que el locale sea válido
  if (!hasLocale(lang)) {
    throw new Error(`Invalid locale: ${lang}`)
  }
  
  const dict = await getDictionary(lang)
  const client = createClient()
  
  // Mapear idiomas de Next.js a los códigos de Prismic
  const prismicLang = lang === 'es' ? 'es-ar' : 'en-us'
  
  // Obtener datos de artistas desde Prismic
  let allArtists: Array<{
    id: string
    name: string
    specialties: string[]
    image: string
    instagram?: string
  }> = []
  
  try {
    const aboutDocument: AboutusDocument = await client.getSingle("aboutus", { 
      lang: prismicLang
    })
    
    console.log('Loading artists data from Prismic for booking')
    
    // Buscar el slice de permanent staff 
    const permanentStaffSlice = aboutDocument.data.slices.find(slice => slice.slice_type === 'permanent_staff')
    if (permanentStaffSlice && 'primary' in permanentStaffSlice && permanentStaffSlice.primary.artists) {
      console.log('Permanent staff slice found with', permanentStaffSlice.primary.artists.length, 'artists')
      allArtists = permanentStaffSlice.primary.artists.map((artista, index) => ({
        id: `artist-${index + 2}`, // +2 para dejar el id 1 para la fundadora
        name: artista.name || '',
        specialties: artista.category ? [artista.category] : [],
        image: artista.picture.url || '',
        instagram: artista.instagram || '',
      }))
    }
  } catch (error) {
    console.error('Error loading artists data from Prismic:', error)
  }
  
  // Agregar la artista fundadora al principio
  const artistaFundadora = {
    id: 'founder-1',
    name: lang === 'es' ? 'Macarena Troiani' : 'Macarena Troiani',
    specialties: [lang === 'es' ? 'Fundadora & Directora Artística' : 'Founder & Artistic Director'],
    image: "/macarena-founder-portrait.webp",
    instagram: "@maca.tatua",
  }
  
  allArtists = [artistaFundadora, ...allArtists]
  
  return (
    <div className="min-h-screen">
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-12 text-balance uppercase">{dict.book.title}</h1>
          <div className="max-w-2xl mx-auto mb-12">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {dict.book.subtitle}
            </p>
          </div>
          
          <BookingWizard dict={dict.book} lang={lang} artists={allArtists} />
        </div>
      </section>
    </div>
  )
}
