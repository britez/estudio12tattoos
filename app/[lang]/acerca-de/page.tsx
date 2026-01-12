import Image from "next/image"
import type { Metadata } from "next"
import GuestArtistsCarousel from "@/components/guest-artists-carousel"
import { getDictionary, hasLocale } from '../dictionaries'
import type { PageProps } from '../types'

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
  const artistasFijos = [
    {
      id: 1,
      nombre: dict.about.artists.team.martina.name,
      especialidad: dict.about.artists.team.martina.specialty,
      imagen: "/martina-padula-portrait.jpg",
      experiencia: dict.about.artists.team.martina.experience,
      descripcion: dict.about.artists.team.martina.description,
      instagram: "@mar.fineline",
    },
    {
      id: 2,
      nombre: dict.about.artists.team.ivo.name,
      especialidad: dict.about.artists.team.ivo.specialty,
      imagen: "/ivo-bardon-portrait.jpg",
      experiencia: dict.about.artists.team.ivo.experience,
      descripcion: dict.about.artists.team.ivo.description,
      instagram: "Pendiente",
    },
    {
      id: 3,
      nombre: dict.about.artists.team.sofia.name,
      especialidad: dict.about.artists.team.sofia.specialty,
      imagen: "/sofia-campanaro-portrait.jpg",
      experiencia: dict.about.artists.team.sofia.experience,
      descripcion: dict.about.artists.team.sofia.description,
      instagram: "@kcit0",
    },
    {
      id: 4,
      nombre: dict.about.artists.team.mateo.name,
      especialidad: dict.about.artists.team.mateo.specialty,
      imagen: "/mateo-diaz-portrait.jpg",
      experiencia: dict.about.artists.team.mateo.experience,
      descripcion: dict.about.artists.team.mateo.description,
      instagram: "@mateodiaz.ar",
    },
  ]

  const artistaInvitado = {
    nombre: dict.about.artists.founder.name,
    especialidad: dict.about.artists.founder.specialty,
    imagen: "/macarena-founder-portrait.webp",
    experiencia: dict.about.artists.founder.experience,
    descripcion: dict.about.artists.founder.description,
    instagram: "@maca.tatua",
    fundacion: dict.about.artists.founder.founded,
  }

  const artistasTemporales = [
    {
      id: 1,
      nombre: "Ayelen Vera Echegaray",
      especialidad: "Black & Grey, Color & Realismo",
      imagen: "/ayelen-vera-echegaray-portrait.jpg",
      instagram: "@ayeaguafuerte",
      periodo: "Por confirmar",
      descripcion: "Tatúo hace más de 10 años. Me podés encontrar en Buenos Aires y en Córdoba. En el tatuaje busco desarrollar la composición integral y mantener la premisa primigenia del tatuaje. Me especializo en piezas grandes, pensadas para dialogar con el cuerpo completo. Mi estilo está basado en el black and grey y el color, orientado hacia el realismo o ilustrativo tomando conceptos del neotradicional.",
    },
    {
      id: 2,
      nombre: "Lucas Ghilardi",
      especialidad: "Universo Oscuro & Expresivo",
      imagen: "/lucas-ghilardi-portrait.jpg",
      instagram: "@luks.gh",
      periodo: "Por confirmar",
      descripcion: "10 años tatuando. Dentro de mi estilo, la búsqueda es formal y conceptual, teniendo en cuenta la relación de la pieza dentro de la lógica y movimiento del cuerpo humano. Así, integrar el dinamismo de las formas, la luz y sombra, aplicado a cada elemento, relato o ser dentro de un universo oscuro y expresivo.",
    },
    {
      id: 3,
      nombre: "Tomás Chiecchio",
      especialidad: "Piezas Únicas & Simbolismo",
      imagen: "/tomas-chiecchio-portrait.jpg",
      instagram: "@a.t.0.0.m",
      periodo: "Por confirmar",
      descripcion: "Tatuó hace 11 años. En sentido profesional lo que busco y hago con el tatuaje es que la persona que elija mi arte se lleve una pieza única, original y sumamente simbólica, desde el momento de inicio con el boceto hasta el final con el tatuaje. El hecho de que alguien elija mis diseños es algo con lo que una vez pensé imposible. Que el hecho del tatuaje no sea un acto superficial solamente sino algo consciente.",
    },
    {
      id: 4,
      nombre: "Celina",
      especialidad: dict.about.artists.status_labels.pending_style,
      imagen: "/celina-portrait.jpg",
      instagram: "@celina.tattoo",
      periodo: dict.about.artists.status_labels.pending,
      descripcion: dict.about.artists.status_labels.pending_bio,
    },
    {
      id: 5,
      nombre: "Clara Bajicoff",
      especialidad: "Diseño & Joyas Permanentes",
      imagen: "/clara-bajicoff-portrait.jpg",
      instagram: "@claratatua",
      periodo: "Por confirmar",
      descripcion: "Tatuando hace 2 años. Como diseñadora que tatúa, Clara está enfocada en traducir elementos y formas de la vida cotidiana, donde la búsqueda está en resaltar lo bello de las cosas, creando algo así como una joya permanente en la piel.",
    },
    {
      id: 6,
      nombre: "Camila",
      especialidad: dict.about.artists.status_labels.pending_style,
      imagen: "/camila-portrait.jpg",
      instagram: "@camila.tattoo",
      periodo: dict.about.artists.status_labels.pending,
      descripcion: dict.about.artists.status_labels.pending_bio,
    },
    {
      id: 7,
      nombre: "Michell",
      especialidad: dict.about.artists.status_labels.pending_style,
      imagen: "/michell-portrait.jpg",
      instagram: "@michell.tattoo",
      periodo: dict.about.artists.status_labels.pending,
      descripcion: dict.about.artists.status_labels.pending_bio,
    },
    {
      id: 8,
      nombre: "Malena Chiesino",
      especialidad: "Trazo & Simbolismo Conceptual",
      imagen: "/malena-chiesino-portrait.jpg",
      instagram: "@malena.tattoo",
      periodo: "Por confirmar",
      descripcion: "Tatuando hace 4 años. Mi búsqueda en el tattoo es conceptual, priorizo el trazo y el simbolismo. Integro lo anatómico con el diseño, buscando un limpio recorrido visual.",
    },
  ]

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
                  src={artistaInvitado.imagen || "/placeholder.svg"}
                  alt={artistaInvitado.nombre}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="md:col-span-3 p-8 md:p-12 flex flex-col justify-center">
                <h3 className="text-3xl md:text-4xl font-bold mb-2">{artistaInvitado.nombre}</h3>
                <p className="text-white font-semibold mb-2">{artistaInvitado.especialidad}</p>
                <p className="text-sm text-gray-400 mb-6">{artistaInvitado.experiencia} {dict.about.team.experience_label}</p>
                <p className="text-lg leading-relaxed mb-6 text-gray-300">{artistaInvitado.descripcion}</p>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className="bg-white/10 px-4 py-2 rounded-sm">
                    <p className="text-sm font-medium">
                      {dict.about.founder.founded_label} <span className="font-bold">{artistaInvitado.fundacion}</span>
                    </p>
                  </div>
                  <a
                    href={`https://instagram.com/${artistaInvitado.instagram.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:underline font-medium"
                  >
                    {artistaInvitado.instagram}
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
            {artistasFijos.map((artista) => (
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

      {/* CTA Section */}
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

      {/* Artistas Temporales con carrusel */}
      <section className="px-4 py-16 bg-black text-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center">{dict.about.guests.title}</h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            {dict.about.guests.description}
          </p>

          <GuestArtistsCarousel artists={artistasTemporales} />
        </div>
      </section>
    </div>
  )
}