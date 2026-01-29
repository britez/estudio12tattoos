import Image from "next/image"
import type { Metadata } from "next"
import { getDictionary, hasLocale } from '../dictionaries'
import type { PageProps } from '../types'

export async function generateMetadata({ params }: PageProps<'/[lang]/alianzas'>): Promise<Metadata> {
  const { lang } = await params
  
  // Validar que el locale sea válido
  if (!hasLocale(lang)) {
    throw new Error(`Invalid locale: ${lang}`)
  }
  
  const dict = await getDictionary(lang)
  
  return {
    title: dict.partnerships.metadata.title,
    description: dict.partnerships.metadata.description,
    openGraph: {
      title: dict.partnerships.metadata.og_title,
      description: dict.partnerships.metadata.og_description,
      type: 'website',
      locale: lang === 'es' ? 'es_AR' : 'en_US',
      images: ["/studio.webp"],
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.partnerships.metadata.og_title,
      description: dict.partnerships.metadata.og_description,
    },
  }
}

export default async function AlianzasPage({ params }: PageProps<'/[lang]/alianzas'>) {
  const { lang } = await params
  
  // Validar que el locale sea válido
  if (!hasLocale(lang)) {
    throw new Error(`Invalid locale: ${lang}`)
  }
  
  const dict = await getDictionary(lang)
  
  // Datos de aliados (por ahora hardcodeado, después se puede migrar a Prismic)
  const partners = [
    {
      id: 1,
      name: "Muebles Capelli",
      description: lang === 'es' 
        ? "Especialistas en mobiliario para estudios de tatuajes. Nos acompañan con muebles de alta calidad que combinan funcionalidad y estética."
        : "Specialists in furniture for tattoo studios. They provide us with high-quality furniture that combines functionality and aesthetics.",
      logo: "/muebles-capelli.jpeg",
      website: "https://mueblestattoo.com.ar/",
      featured: true
    },
    // Aquí se pueden agregar más aliados en el futuro
  ]

  const featuredPartners = partners.filter(partner => partner.featured)
  const regularPartners = partners.filter(partner => !partner.featured)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-12 text-balance uppercase">
            {dict.partnerships.hero.title}
          </h1>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {dict.partnerships.hero.description}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Partners Section */}
      {featuredPartners.length > 0 && (
        <section className="px-4 py-20 bg-secondary/50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center">
              {dict.partnerships.featured.title}
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              {dict.partnerships.featured.description}
            </p>
            
            <div className="grid md:grid-cols-1 gap-12">
              {featuredPartners.map((partner) => (
                <div key={partner.id} className="bg-background rounded-sm overflow-hidden shadow-lg">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Logo Section */}
                    <div className="p-12 flex justify-center items-center bg-gray-100">
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block hover:opacity-80 transition-opacity"
                      >
                        <Image
                          src={partner.logo}
                          alt={partner.name}
                          width={400}
                          height={200}
                          className="object-contain"
                        />
                      </a>
                    </div>
                    
                    {/* Description Section */}
                    <div className="p-8 md:p-12">
                      <h3 className="text-2xl md:text-3xl font-bold mb-4">{partner.name}</h3>
                      <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                        {partner.description}
                      </p>
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-sm font-medium hover:bg-primary/90 transition-colors"
                      >
                        {lang === 'es' ? 'Visitar sitio web' : 'Visit website'}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Special Offers Section */}
      <section className="px-4 py-20 bg-gray-900 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
            {dict.partnerships.special_offers.title}
          </h2>
          <div className="bg-white/10 rounded-sm p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              {dict.partnerships.special_offers.tattoo_discount.question}
            </h3>
            <p className="text-lg md:text-xl leading-relaxed mb-4">
              {dict.partnerships.special_offers.tattoo_discount.description}
            </p>
            <p className="text-sm text-gray-300 italic">
              {dict.partnerships.special_offers.tattoo_discount.disclaimer}
            </p>
            
            {/* Hostels Grid */}
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <a
                href="https://www.alaskapatagoniahostel.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-6 rounded-sm hover:bg-white/20 transition-colors block"
              >
                <div className="aspect-[4/5] bg-white/20 rounded-sm mb-4 overflow-hidden">
                  <Image
                    src="/alaska.jpeg"
                    alt="Alaska Patagonia Hostel"
                    width={300}
                    height={375}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-bold mb-2">Alaska Patagonia Hostel</h4>
                <p className="text-sm text-gray-300">15% off - Bariloche</p>
              </a>
              
              <a
                href="https://www.perikos.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-6 rounded-sm hover:bg-white/20 transition-colors block"
              >
                <div className="aspect-[4/5] bg-white/20 rounded-sm mb-4 overflow-hidden">
                  <Image
                    src="/periko.jpeg"
                    alt="Periko's Youth Hostel"
                    width={300}
                    height={375}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-bold mb-2">Periko's Youth Hostel</h4>
                <p className="text-sm text-gray-300">15% off - Bariloche</p>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Regular Partners Grid */}
      {regularPartners.length > 0 && (
        <section className="px-4 py-20">
          <div className="container mx-auto max-w-6xl">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPartners.map((partner) => (
                <div key={partner.id} className="bg-background rounded-sm overflow-hidden shadow-lg group">
                  <div className="aspect-video bg-gray-100 flex items-center justify-center p-8">
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:opacity-80 transition-opacity"
                    >
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        width={200}
                        height={100}
                        className="object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </a>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{partner.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {partner.description}
                    </p>
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-sm font-medium"
                    >
                      {lang === 'es' ? 'Visitar sitio web' : 'Visit website'}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="px-4 py-20 bg-black text-white">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            {dict.partnerships.cta.title}
          </h2>
          <p className="text-gray-300 mb-8 leading-relaxed">
            {dict.partnerships.cta.description}
          </p>
          <a
            href={`/${lang}/contacto`}
            className="inline-block bg-white text-black px-8 py-3 rounded-sm font-medium hover:bg-gray-200 transition-colors"
          >
            {dict.partnerships.cta.button}
          </a>
        </div>
      </section>
    </div>
  )
}