import type { Metadata } from "next"
import type * as prismic from "@prismicio/client"
import { createClient } from "@/prismicio"
import { getDictionary, hasLocale } from '../dictionaries'
import type { PageProps } from '../types'
import { generateSeminariosMetadata } from './metadata'
import { SeminarCard, type Seminar } from './components/SeminarCard'

export async function generateMetadata({ params }: PageProps<'/[lang]/seminarios'>): Promise<Metadata> {
  return generateSeminariosMetadata({ params })
}

export default async function SeminariosPage({ params }: PageProps<'/[lang]/seminarios'>) {
  const { lang } = await params

  if (!hasLocale(lang)) {
    throw new Error(`Invalid locale: ${lang}`)
  }

  const dict = await getDictionary(lang)
  const client = createClient() as unknown as prismic.Client
  const prismicLang = lang === 'es' ? 'es-ar' : 'en-us'

  let seminars: Seminar[] = []

  try {
    const doc = await client.getSingle("seminars", { lang: prismicLang })
    const seminarSlice = doc.data.slices.find(
      (s: { slice_type: string }) => s.slice_type === 'seminar_list'
    )
    if (seminarSlice && 'primary' in seminarSlice && seminarSlice.primary.seminarios) {
      seminars = seminarSlice.primary.seminarios.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item: any, index: number): Seminar => ({
          id: `seminar-${index}`,
          slug: item.slug || '',
          imagen: item.imagen?.url
            ? { url: item.imagen.url, alt: item.imagen.alt || item.titulo || '' }
            : null,
          titulo: item.titulo || '',
          descripcion: item.descripcion || '',
          fecha: item.fecha || '',
          hora: item.hora || '',
          duracion: item.duracion || '',
          precio: item.precio || '',
          precioNumerico: typeof item.precio_numerico === 'number' ? item.precio_numerico : parseFloat(String(item.precio ?? '').replace(/[^0-9.]/g, '')) || 0,
          instructor: item.instructor || '',
          cupos: item.cupos || '',
          nivel: (['beginner', 'intermediate', 'advanced'].includes(item.nivel)
            ? item.nivel
            : 'beginner') as Seminar['nivel'],
          tecnica: item.tecnica || '',
          linkRegistro: item.link_registro?.url || null,
          estado: (['upcoming', 'past', 'cancelled'].includes(item.estado)
            ? item.estado
            : 'upcoming') as Seminar['estado'],
        })
      )
    }
  } catch (error) {
    console.error('Error loading seminars from Prismic:', error)
    try {
      const doc = await client.getSingle("seminars")
      const seminarSlice = doc.data.slices.find(
        (s: { slice_type: string }) => s.slice_type === 'seminar_list'
      )
      if (seminarSlice && 'primary' in seminarSlice && seminarSlice.primary.seminarios) {
        seminars = seminarSlice.primary.seminarios.map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (item: any, index: number): Seminar => ({
            id: `seminar-${index}`,
            slug: item.slug || '',
            imagen: item.imagen?.url
              ? { url: item.imagen.url, alt: item.imagen.alt || item.titulo || '' }
              : null,
            titulo: item.titulo || '',
            descripcion: item.descripcion || '',
            fecha: item.fecha || '',
            hora: item.hora || '',
            duracion: item.duracion || '',
            precio: item.precio || '',
            precioNumerico: typeof item.precio_numerico === 'number' ? item.precio_numerico : parseFloat(String(item.precio ?? '').replace(/[^0-9.]/g, '')) || 0,
            instructor: item.instructor || '',
            cupos: item.cupos || '',
            nivel: (['beginner', 'intermediate', 'advanced'].includes(item.nivel)
              ? item.nivel
              : 'beginner') as Seminar['nivel'],
            tecnica: item.tecnica || '',
            linkRegistro: item.link_registro?.url || null,
            estado: (['upcoming', 'past', 'cancelled'].includes(item.estado)
              ? item.estado
              : 'upcoming') as Seminar['estado'],
          })
        )
      }
    } catch (fallbackError) {
      console.error('Fallback also failed:', fallbackError)
      seminars = []
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="pt-32 pb-12 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance uppercase">
            {dict.seminarios.hero.title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {dict.seminarios.hero.description}
          </p>
        </div>
      </section>

      {/* Grid de seminarios */}
      <section className="px-4 pb-20">
        <div className="container mx-auto max-w-6xl">
          {seminars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {seminars.map((seminar) => (
                <SeminarCard
                  key={seminar.id}
                  seminar={seminar}
                  dict={dict.seminarios.card}
                  lang={lang}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold mb-4 text-muted-foreground">
                {dict.seminarios.empty.title}
              </h3>
              <p className="text-muted-foreground">
                {dict.seminarios.empty.description}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-20">
        <div className="container mx-auto max-w-3xl">
          <div className="bg-secondary rounded-sm p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
              {dict.seminarios.cta.title}
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {dict.seminarios.cta.description}
            </p>
            <a
              href={`/${lang}/contacto`}
              className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-sm font-medium hover:bg-primary/90 transition-colors"
            >
              {dict.seminarios.cta.button}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
