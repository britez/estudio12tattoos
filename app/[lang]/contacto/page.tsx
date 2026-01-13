import { Instagram, MessageCircle, Mail, MapPin, Phone } from "lucide-react"
import type { Metadata } from "next"
import { createClient } from "@/prismicio"
import type { HomeDocument } from "@/prismicio-types"
import { getDictionary, hasLocale } from '../dictionaries'
import type { PageProps } from '../types'
import ContactForm from './ContactForm'

export async function generateMetadata({ params }: PageProps<'/[lang]/contacto'>): Promise<Metadata> {
  const { lang } = await params
  
  // Validar que el locale sea válido
  if (!hasLocale(lang)) {
    throw new Error(`Invalid locale: ${lang}`)
  }
  
  const dict = await getDictionary(lang)
  
  return {
    title: dict.contact.metadata.title,
    description: dict.contact.metadata.description,
    openGraph: {
      title: dict.contact.metadata.og_title,
      description: dict.contact.metadata.og_description,
      type: 'website',
      locale: lang === 'es' ? 'es_AR' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.contact.metadata.og_title,
      description: dict.contact.metadata.og_description,
    },
  }
}

export default async function ContactoPage({ params }: PageProps<'/[lang]/contacto'>) {
  const { lang } = await params
  
  // Validar que el locale sea válido
  if (!hasLocale(lang)) {
    throw new Error(`Invalid locale: ${lang}`)
  }
  
  const dict = await getDictionary(lang)
  const client = createClient()
  
  // Mapear idiomas de Next.js a los códigos de Prismic
  const prismicLang = lang === 'es' ? 'es-ar' : 'en-us'
  
  // Obtener imágenes desde Prismic (mismas que el home)
  let carouselImages: Array<{
    src: string
    alt: string
  }> = []
  
  try {
    const homeDocument: HomeDocument = await client.getSingle("home", { 
      lang: prismicLang
    })
    
    console.log('Loading carousel images from Prismic for contact page')
    
    // Buscar el slice de portfolio 
    const portfolioSlice = homeDocument.data.slices.find(slice => slice.slice_type === 'portfolio')
    if (portfolioSlice && 'primary' in portfolioSlice && portfolioSlice.primary.imagenes) {
      console.log('Portfolio slice found for carousel with', portfolioSlice.primary.imagenes.length, 'images')
      carouselImages = portfolioSlice.primary.imagenes.map((imagen) => ({
        src: imagen.media.url || '',
        alt: imagen.title || imagen.subtitle || 'Imagen del estudio',
      }))
    } else {
      console.log('Portfolio slice not found for carousel, using fallback')
    }
  } catch (error) {
    console.error('Error loading carousel images from Prismic:', error)
    
    // Intentar sin especificar idioma como fallback
    try {
      console.log('Trying fallback without language specification for carousel')
      const homeDocument: HomeDocument = await client.getSingle("home")
      const portfolioSlice = homeDocument.data.slices.find(slice => slice.slice_type === 'portfolio')
      if (portfolioSlice && 'primary' in portfolioSlice && portfolioSlice.primary.imagenes) {
        console.log('Fallback successful for carousel with', portfolioSlice.primary.imagenes.length, 'images')
        carouselImages = portfolioSlice.primary.imagenes.map((imagen) => ({
          src: imagen.media.url || '',
          alt: imagen.title || imagen.subtitle || 'Imagen del estudio',
        }))
      }
    } catch (fallbackError) {
      console.error('Fallback also failed for carousel:', fallbackError)
      // Fallback con imágenes hardcodeadas si todo falla
      carouselImages = [
        { src: "/polynesian-hand-tattoo.webp", alt: "Tatuaje polinesio" },
        { src: "/tattoo-artist-working-panoramic-view.webp", alt: "Artista trabajando" },
        { src: "/mandala-stencil-application.webp", alt: "Aplicación de stencil" },
        { src: "/japanese-geisha-tattoo-colorful.webp", alt: "Tatuaje de geisha japonesa" },
        { src: "/female-artist-working-natural-light.webp", alt: "Artista concentrada" },
        { src: "/japanese-snake-cherry-blossom-forearm.webp", alt: "Serpiente japonesa" },
        { src: "/studio-window-cityview-silhouette.webp", alt: "Vista del estudio" }
      ]
    }
  }

  return (
    <div className="min-h-screen">
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{dict.contact.hero.title}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {dict.contact.hero.description}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <ContactForm dict={dict} />

            {/* Información de contacto */}
            <div className="space-y-8">
              <div className="bg-card border border-border rounded-sm p-8">
                <h2 className="text-2xl font-bold mb-6">{dict.contact.info.title}</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 mt-1 text-muted-foreground shrink-0" />
                    <div>
                      <p className="font-medium">{dict.contact.info.address_label}</p>
                      <p className="text-muted-foreground whitespace-pre-line">
                        {dict.contact.info.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 mt-1 text-muted-foreground shrink-0" />
                    <div>
                      <p className="font-medium">{dict.contact.info.phone_label}</p>
                      <p className="text-muted-foreground">+549 11 71601995</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 mt-1 text-muted-foreground shrink-0" />
                    <div>
                      <p className="font-medium">{dict.contact.info.email_label}</p>
                      <p className="text-muted-foreground">estudio12.tattoos@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Redes sociales */}
              <div className="bg-black rounded-sm p-8">
                <h3 className="text-xl font-bold mb-6 text-white">{dict.contact.social.title}</h3>
                <div className="space-y-4">
                  <a
                    href="https://www.instagram.com/estudio.12_/?hl=es"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-zinc-900 border border-zinc-800 rounded-sm hover:bg-zinc-800 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <Instagram className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Instagram</p>
                      <p className="text-sm text-zinc-400">@estudio.12_</p>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/5491171601995"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-zinc-900 border border-zinc-800 rounded-sm hover:bg-zinc-800 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-white">WhatsApp</p>
                      <p className="text-sm text-zinc-400">+549 11 71601995</p>
                    </div>
                  </a>
                </div>

                <p className="text-sm text-zinc-400 mt-6 leading-relaxed">
                  {dict.contact.social.schedule}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <div className="bg-card border border-border rounded-sm overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.7654321!2d-58.3816!3d-34.6158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccac2f0e3d5b1%3A0x0!2sHumberto%201%C2%B0%20985%2C%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1234567890"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Estudio 12 Tattoos"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 text-white">{dict.contact.gallery.title}</h2>

          <div className="relative overflow-hidden">
            <div className="flex gap-6 animate-scroll-infinite pause-animation">
              {/* Primera serie de imágenes */}
              <div className="flex gap-6 shrink-0">
                {carouselImages.map((image, index) => (
                  <img
                    key={`first-${index}`}
                    src={image.src}
                    alt={image.alt}
                    className="h-96 w-auto object-cover rounded-sm"
                  />
                ))}
              </div>
              {/* Duplicado para scroll infinito */}
              <div className="flex gap-6 shrink-0">
                {carouselImages.map((image, index) => (
                  <img
                    key={`second-${index}`}
                    src={image.src}
                    alt={image.alt}
                    className="h-96 w-auto object-cover rounded-sm"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
