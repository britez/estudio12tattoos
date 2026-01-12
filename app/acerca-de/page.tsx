import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Acerca de Nosotros - Nuestro Equipo de Artistas",
  description:
    "Conoce a nuestro equipo de artistas profesionales especializados en realismo, tradicional, minimalista, oriental y más. Fundado en 2015 con los más altos estándares de calidad y seguridad.",
  openGraph: {
    title: "Acerca de estudio12 - Nuestro Equipo de Artistas",
    description:
      "Conoce a nuestro equipo de artistas profesionales especializados en múltiples estilos de tatuaje. Más de 10 años de experiencia combinada.",
    images: ["/studio.webp"],
  },
}

export default function AcercaDe() {
  const artistasFijos = [
    {
      id: 1,
      nombre: "Martina Padula",
      especialidad: "Fineline & Diseños Delicados",
      imagen: "/martina-padula-portrait.jpg",
      experiencia: "3 años",
      descripcion:
        "Mi búsqueda en el tattoo es lograr tatuajes delicados y prolijos, con gran valor en los detalles. Les doy un aura oscura, que es mi marca personal.",
      instagram: "@mar.fineline",
    },
    {
      id: 2,
      nombre: "Ivo Bardon",
      especialidad: "Dotwork & Simbolismo",
      imagen: "/ivo-bardon-portrait.jpg",
      experiencia: "8 años",
      descripcion:
        "Soy de San Telmo y todo mi trabajo está realizado con puntos. Me dedico a hacer piezas con mucha carga simbólica para cada cliente y mi desafío es crear piezas con la estética ornamental porteña.",
      instagram: "Pendiente",
    },
    {
      id: 3,
      nombre: "Sofía Campanaro",
      especialidad: "Arte Abstracto & Texturas",
      imagen: "/sofia-campanaro-portrait.jpg",
      experiencia: "5 años",
      descripcion:
        "Mi búsqueda artística va mucho de inspiraciones cotidianas, las texturas y movimientos que tienen las cosas que vemos y sentimos para poder llegar a una abstracción de eso.",
      instagram: "@kcit0", // Agregando Instagram de Sofía
    },
    {
      id: 4,
      nombre: "Mateo Díaz",
      especialidad: "Realismo & Cultura Argentina",
      imagen: "/mateo-diaz-portrait.jpg",
      experiencia: "4 años",
      descripcion:
        "Tengo 21 años y mi búsqueda artística está enfocada en la cultura tradicional argentina, la música y el fútbol. Me desvela la búsqueda del sentido y del propósito, e intento inmortalizar símbolos en la piel a partir del realismo en diálogo con el minimalismo y el diseño gráfico.",
      instagram: "@mateodiaz.ar",
    },
  ]

  const artistaInvitado = {
    nombre: "Macarena Troiani",
    especialidad: "Fundadora & Directora Artística",
    imagen: "/macarena-founder-portrait.webp",
    experiencia: "11 años",
    descripcion:
      "Me gusta incentivar a las personas a vivir de lo que les apasiona y compartir lo que he aprendido en estos 11 años. He tomado seminarios, talleres y capacitaciones de todo tipo para crecer como profesional y enriquecer mi ojo artístico. Aún sigo aprendiendo, es una constante en mi vida.",
    instagram: "@maca.tatua",
    fundacion: "2022",
  }

  const artistasTemporales = [
    {
      id: 1,
      nombre: "Ana Martínez",
      especialidad: "Acuarela & Color",
      imagen: "/female-tattoo-artist-portrait-colorful-artistic.jpg",
      instagram: "@ana.ink",
      periodo: "Enero - Marzo 2026",
    },
    {
      id: 2,
      nombre: "Lucas Torres",
      especialidad: "Geométrico & Dotwork",
      imagen: "/male-tattoo-artist-portrait-professional.jpg",
      instagram: "@lucas.dots",
      periodo: "Febrero - Abril 2026",
    },
    {
      id: 3,
      nombre: "Sofia Vega",
      especialidad: "Ilustración & Fine Line",
      imagen: "/female-tattoo-artist-portrait-professional-minimal.jpg",
      instagram: "@sofia.fineline",
      periodo: "Marzo - Mayo 2026",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-12 text-balance uppercase">Acerca del estudio</h1>
          <div className="grid md:grid-cols-2 gap-12 items-center text-left">
            <div>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
                Fundado en 2022, Estudio 12 abrió sus puertas en el barrio de San Telmo, Ciudad Autónoma de Buenos
                Aires, con la misión de compartir el arte del tatuaje desde una mirada contemporánea, sin perder los
                valores que lo definen como un oficio.
              </p>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
                El estudio se mantiene en constante actualización y capacitación, con el objetivo de ofrecer un servicio
                acorde a las expectativas y necesidades de cada cliente.
              </p>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                En Estudio 12 trabajamos bajo altos estándares de higiene, seguridad y profesionalismo. Utilizamos
                equipamiento de última generación y aplicamos protocolos sanitarios estrictos para garantizar una
                experiencia segura, cuidada y cómoda en cada sesión.
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
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center text-white">Artista Fundadora</h2>
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
                <p className="text-sm text-gray-400 mb-6">{artistaInvitado.experiencia} de experiencia</p>
                <p className="text-lg leading-relaxed mb-6 text-gray-300">{artistaInvitado.descripcion}</p>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className="bg-white/10 px-4 py-2 rounded-sm">
                    <p className="text-sm font-medium">
                      Fundó el estudio en: <span className="font-bold">{artistaInvitado.fundacion}</span>
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
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center">Nuestro Equipo</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Conoce a los artistas que dan vida a tus ideas. Cada uno con su estilo único y pasión por el arte del
            tatuaje.
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
                <p className="text-xs text-muted-foreground mb-3">{artista.experiencia} de experiencia</p>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">¿Quieres trabajar con nuestro equipo?</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Agenda una consulta gratuita para discutir tu idea con el artista que mejor se ajuste a tu estilo.
          </p>
          <a
            href="/contacto"
            className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Agendar Consulta
          </a>
        </div>
      </section>

      {/* Artistas Temporales con carrusel */}
      <section className="px-4 py-16 bg-black text-white overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center">Artistas Invitados</h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Conoce a los artistas temporales que colaboran con nosotros. Cada uno trae su estilo único y perspectiva al
            estudio.
          </p>
          <div className="relative">
            <div className="flex gap-6 animate-scroll-infinite hover:pause-animation">
              {/* Duplicamos el array para crear el efecto infinito */}
              {[...artistasTemporales, ...artistasTemporales].map((artista, index) => (
                <div
                  key={`${artista.id}-${index}`}
                  className="flex-shrink-0 w-[300px] bg-zinc-900 rounded-sm overflow-hidden group"
                >
                  <div className="relative aspect-square">
                    <Image
                      src={artista.imagen || "/placeholder.svg"}
                      alt={artista.nombre}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">{artista.nombre}</h3>
                    <p className="text-sm text-gray-400 mb-2">{artista.especialidad}</p>
                    <p className="text-xs text-gray-500 mb-3">{artista.periodo}</p>
                    <a
                      href={`https://instagram.com/${artista.instagram.replace("@", "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white hover:underline"
                    >
                      {artista.instagram}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
