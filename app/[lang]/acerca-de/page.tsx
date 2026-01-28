import Image from "next/image"
import type { Metadata } from "next"
import { createClient } from "@/prismicio"
import type { AboutusDocument } from "@/prismicio-types"
import { getDictionary, hasLocale } from '../dictionaries'
import type { PageProps } from '../types'
import { GenericCarousel, type CarouselImage, type GuestArtist } from '@/components/guest-artists-carousel'

export async function generateMetadata({ params }: PageProps<'/[lang]/acerca-de'>): Promise<Metadata> {
  const { lang } = await params
  
  // Validar que el locale sea válido
  if (!hasLocale(lang)) {
    throw new Error(`Invalid locale: ${lang}`)
  }
  
  const dict = await getDictionary(lang)
  
  return {
    title: dict.about.metadata.title,
    description: dict.about.metadata.description,
    openGraph: {
      title: dict.about.metadata.og_title,
      description: dict.about.metadata.og_description,
      type: 'website',
      locale: lang === 'es' ? 'es_AR' : 'en_US',
      images: ["/studio.webp"],
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.about.metadata.og_title,
      description: dict.about.metadata.og_description,
    },
  }
}

export default async function AcercaDe({ params }: PageProps<'/[lang]/acerca-de'>) {
  const { lang } = await params
  
  // Validar que el locale sea válido
  if (!hasLocale(lang)) {
    throw new Error(`Invalid locale: ${lang}`)
  }
  
  const dict = await getDictionary(lang)
  const client = createClient()
  
  // Mapear idiomas de Next.js a los códigos de Prismic
  const prismicLang = lang === 'es' ? 'es-ar' : 'en-us'
  
  // Obtener datos desde Prismic
  let permanentStaff: Array<{
    id: number
    nombre: string
    especialidad: string
    imagen: string
    experiencia: string
    descripcion: string
    instagram: string
  }> = []
  
  let guestArtists: GuestArtist[] = []
  
  try {
    const aboutDocument: AboutusDocument = await client.getSingle("aboutus", { 
      lang: prismicLang
    })
    
    console.log('Loading about us data from Prismic')
    
    // Buscar el slice de permanent staff 
    const permanentStaffSlice = aboutDocument.data.slices.find(slice => slice.slice_type === 'permanent_staff')
    if (permanentStaffSlice && 'primary' in permanentStaffSlice && permanentStaffSlice.primary.artists) {
      console.log('Permanent staff slice found with', permanentStaffSlice.primary.artists.length, 'artists')
      permanentStaff = permanentStaffSlice.primary.artists.map((artista, index) => ({
        id: index + 1,
        nombre: artista.name || '',
        especialidad: artista.category || '',
        imagen: artista.picture.url || '',
        experiencia: artista.experience || '',
        descripcion: artista.bio || '',
        instagram: artista.instagram || '',
      }))
    }
    
    // Buscar el slice de guest artists
    const guestArtistsSlice = aboutDocument.data.slices.find(slice => slice.slice_type === 'guest_artists')
    if (guestArtistsSlice && 'primary' in guestArtistsSlice && guestArtistsSlice.primary.artists) {
      console.log('Guest artists slice found with', guestArtistsSlice.primary.artists.length, 'artists')
      guestArtists = guestArtistsSlice.primary.artists.map((artista, index) => ({
        id: index + 1,
        nombre: artista.name || '',
        especialidad: artista.category || '',
        imagen: artista.picture.url || '',
        instagram: artista.instagram || '',
        periodo: artista.schedule || 'Por confirmar',
        descripcion: artista.bio || '',
      }))
    }
  } catch (error) {
    console.error('Error loading about us data from Prismic:', error)
    // Si no hay datos desde Prismic, mostrar mensaje de error o datos vacíos
    permanentStaff = []
    guestArtists = []
  }
  
  // Datos de la artista fundadora (información fija)
  const artistaFundadora = {
    nombre: lang === 'es' ? 'Macarena Troiani' : 'Macarena Troiani',
    especialidad: lang === 'es' ? 'Fundadora & Directora Artística' : 'Founder & Artistic Director',
    imagen: "/macarena-founder-portrait.webp",
    experiencia: lang === 'es' ? '11 años' : '11 years',
    descripcion: lang === 'es' 
      ? 'Me gusta incentivar a las personas a vivir de lo que les apasiona y compartir lo que he aprendido en estos 11 años. He tomado seminarios, talleres y capacitaciones de todo tipo para crecer como profesional y enriquecer mi ojo artístico. Aún sigo aprendiendo, es una constante en mi vida.'
      : 'I like to encourage people to live from what they are passionate about and share what I have learned in these 11 years. I have taken seminars, workshops and training of all kinds to grow as a professional and enrich my artistic eye. I am still learning, it is a constant in my life.',
    instagram: "@maca.tatua",
    fundacion: "2022",
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-12 text-balance uppercase">{dict.about.hero.title}</h1>
          <div className="grid md:grid-cols-2 gap-12 items-center text-left">
            <div>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
                {dict.about.hero.description_1}
              </p>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
                {dict.about.hero.description_2}
              </p>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {dict.about.hero.description_3}
              </p>
            </div>
            <div className="relative aspect-[3/4] rounded-sm overflow-hidden bg-muted">
              <Image src="/studio.webp" alt="Interior de estudio12" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Artista Fundadora */}
      <section className="px-4 py-20 bg-black text-white">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center text-white">{dict.about.founder.title}</h2>
          <div className="bg-zinc-800 rounded-sm overflow-hidden">
            <div className="grid md:grid-cols-5 gap-8">
              <div className="md:col-span-2 relative aspect-square md:aspect-auto">
                <Image
                  src={artistaFundadora.imagen || "/placeholder.svg"}
                  alt={artistaFundadora.nombre}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="md:col-span-3 p-8 md:p-12 flex flex-col justify-center">
                <h3 className="text-3xl md:text-4xl font-bold mb-2">{artistaFundadora.nombre}</h3>
                <p className="text-white font-semibold mb-2">{artistaFundadora.especialidad}</p>
                <p className="text-sm text-gray-400 mb-6">{artistaFundadora.experiencia} {dict.about.team.experience_label}</p>
                <p className="text-lg leading-relaxed mb-6 text-gray-300">{artistaFundadora.descripcion}</p>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className="bg-white/10 px-4 py-2 rounded-sm">
                    <p className="text-sm font-medium">
                      {dict.about.founder.founded_label} <span className="font-bold">{artistaFundadora.fundacion}</span>
                    </p>
                  </div>
                  <a
                    href={`https://instagram.com/${artistaFundadora.instagram.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:underline font-medium"
                  >
                    {artistaFundadora.instagram}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Artistas Fijos */}
      <section className="px-4 py-20">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center">{dict.about.team.title}</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            {dict.about.team.description}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {permanentStaff.map((artista) => (
              <div key={artista.id} className="group">
                <div className="relative aspect-square rounded-sm overflow-hidden mb-4 bg-muted">
                  <Image
                    src={artista.imagen || "/placeholder.svg"}
                    alt={artista.nombre}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">{artista.nombre}</h3>
                <p className="text-sm font-medium text-accent mb-2">{artista.especialidad}</p>
                <p className="text-xs text-muted-foreground mb-3">{artista.experiencia} {dict.about.team.experience_label}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{artista.descripcion}</p>
                {artista.instagram && (
                  <a
                    href={`https://instagram.com/${artista.instagram.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-accent hover:underline mt-2 inline-block"
                  >
                    {artista.instagram}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Banner Promocional */}
      <section className="px-4 py-20 bg-gray-200">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            {dict.about.promotional_banner.title}
          </h2>
          <div className="flex justify-center items-center">
            <div className="bg-white p-8 rounded-sm">
              <a
                href="https://mueblestattoo.com.ar/"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/muebles-capelli.jpeg"
                  alt="Muebles Capelli"
                  width={300}
                  height={150}
                  className="object-contain"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section 
      <section className="px-4 py-20 bg-secondary/50">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">{dict.about.cta.title}</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            {dict.about.cta.description}
          </p>
          <a
            href={`/${lang}/contacto`}
            className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-sm font-medium hover:bg-primary/90 transition-colors"
          >
            {dict.about.cta.button}
          </a>
        </div>
      </section>
    */}
      {/* Artistas Temporales con carrusel */}
      <section className="py-16 bg-black text-white overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center">{dict.about.guests.title}</h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            {dict.about.guests.description}
          </p>
        </div>
        <GenericCarousel 
          items={guestArtists} 
          type="artists" 
          autoplayDelay={5000}
          itemWidth={300}
        />
      </section>
    </div>
  )
}
