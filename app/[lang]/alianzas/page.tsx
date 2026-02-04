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
    {
      id: 2,
      name: "Dermaglós",
      description: lang === 'es' 
        ? "Somos una marca que trasciende las generaciones, con más de 50 años de trayectoria cuidando la piel de los argentinos. Dermaglós te acompaña en todas las etapas de la vida."
        : "We are a brand that transcends generations, with more than 50 years of experience caring for the skin of Argentines. Dermaglós accompanies you through all stages of life.",
      subtitle: lang === 'es'
        ? "Si te tatuaste con nosotros no te olvides de pedir tu código de descuento."
        : "If you got tattooed with us, don't forget to ask for your discount code.",
      logo: "/dermaglos.png",
      website: "https://www.dermaglos.com/terapeutica/tatuajes",
      featured: true
    },
    {
      id: 3,
      name: "Ephemeral",
      description: lang === 'es' 
        ? "Tu tatuaje puede ser para toda la vida o podés elegir Ephemeral, es una tinta hecha para desvanecerse."
        : "Your tattoo can be for life or you can choose Ephemeral, it's an ink made to fade away.",
      subtitle: lang === 'es'
        ? "Debés solicitar cita previa con Maca."
        : "You must request a prior appointment with Maca.",
      logo: "/ephemeral.jpeg",
      website: "https://www.instagram.com/ephemeraltattoo.arg?igsh=dmdvcDkxcnFlYndv",
      featured: true
    },
    {
      id: 4,
      name: "Sport Club",
      description: lang === 'es' 
        ? "Si sos socio Sport Club contás con un 25% abonando en efectivo, debés presentar tu app sport club en el estudio."
        : "If you are a Sport Club member, you get 25% off paying in cash, you must present your Sport Club app at the studio.",
      subtitle: lang === 'es'
        ? "No acumulable con otras promociones."
        : "Not combinable with other promotions.",
      logo: "/sportclub.png",
      website: "https://beneficios.sportclub.com.ar/beneficios/estu12io?id=4107",
      featured: true
    },
    {
      id: 5,
      name: "Alaska Patagonia Hostel",
      description: lang === 'es' 
        ? "15% off en tu alojamiento en Bariloche. Disfrutá de la Patagonia con descuento exclusivo para clientes de estudio12."
        : "15% off on your accommodation in Bariloche. Enjoy Patagonia with exclusive discount for estudio12 clients.",
      subtitle: lang === 'es'
        ? "Válido solo para clientes que se tatuaron con nosotros este año."
        : "Valid only for clients who got tattooed with us this year.",
      logo: "/alaska.jpeg",
      website: "https://www.alaskapatagoniahostel.com/",
      featured: true
    },
    {
      id: 6,
      name: "Periko's Youth Hostel",
      description: lang === 'es' 
        ? "15% off en tu alojamiento en Bariloche. La mejor experiencia de juventud en la Patagonia con descuento exclusivo."
        : "15% off on your accommodation in Bariloche. The best youth experience in Patagonia with exclusive discount.",
      subtitle: lang === 'es'
        ? "Válido solo para clientes que se tatuaron con nosotros este año."
        : "Valid only for clients who got tattooed with us this year.",
      logo: "/periko.jpeg",
      website: "https://www.perikos.com/",
      featured: true
    },
    // Aquí se pueden agregar más aliados en el futuro
  ]

  const featuredPartners = partners.filter(partner => partner.featured && !partner.name.includes('Hostel'))
  const hostels = partners.filter(partner => partner.featured && partner.name.includes('Hostel'))
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
                    <div className="p-12 flex justify-center items-center bg-white">
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`block hover:opacity-80 transition-opacity ${partner.name === 'Sport Club' ? 'bg-black p-4 rounded-sm' : ''}`}
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
                      {partner.subtitle && (
                        <p className="text-sm font-medium text-accent mb-6 bg-accent/10 p-3 rounded-sm">
                          {partner.subtitle}
                        </p>
                      )}
                      {partner.website !== "#" && (
                        <a
                          href={partner.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-sm font-medium hover:bg-primary/90 transition-colors"
                        >
                          {lang === 'es' ? 'Visitar sitio web' : 'Visit website'}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Hostels Section */}
      {hostels.length > 0 && (
        <section className="px-4 py-20">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center">
              {lang === 'es' ? 'Beneficios de Alojamiento' : 'Accommodation Benefits'}
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              {lang === 'es' 
                ? 'Descuentos exclusivos en alojamiento en Bariloche para nuestros clientes.' 
                : 'Exclusive accommodation discounts in Bariloche for our clients.'}
            </p>
            
            {/* Hostels in one row */}
            <div className="bg-background rounded-sm overflow-hidden shadow-lg">
              <div className="grid md:grid-cols-2 gap-8">
                {hostels.map((hostel) => (
                  <div key={hostel.id} className="grid grid-cols-2 gap-4 items-center">
                    {/* Hostel Image */}
                    <div className="p-4 flex justify-center items-center bg-gray-100 rounded-sm">
                      <a
                        href={hostel.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block hover:opacity-80 transition-opacity"
                      >
                        <Image
                          src={hostel.logo}
                          alt={hostel.name}
                          width={150}
                          height={120}
                          className="object-cover rounded-sm"
                        />
                      </a>
                    </div>
                    
                    {/* Hostel Description */}
                    <div className="p-4">
                      <h3 className="text-lg font-bold mb-2">{hostel.name}</h3>
                      <p className="text-xs leading-relaxed text-muted-foreground mb-3">
                        {hostel.description}
                      </p>
                      {hostel.subtitle && (
                        <p className="text-xs font-medium text-accent mb-3 bg-accent/10 p-2 rounded-sm">
                          {hostel.subtitle}
                        </p>
                      )}
                      <a
                        href={hostel.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-primary text-primary-foreground px-3 py-1 rounded-sm text-xs font-medium hover:bg-primary/90 transition-colors"
                      >
                        {lang === 'es' ? 'Ver hostel' : 'View hostel'}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

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