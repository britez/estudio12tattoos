import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import type * as prismic from "@prismicio/client"
import { notFound } from "next/navigation"
import {
  Calendar,
  Clock,
  Timer,
  Users,
  User,
  DollarSign,
  ArrowLeft,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"
import { createClient } from "@/prismicio"
import { getDictionary, hasLocale } from "../../dictionaries"
import type { Seminar } from "../components/SeminarCard"
import { BuyButton } from "./components/BuyButton"

interface SlugPageProps {
  params: Promise<{ lang: string; slug: string }>
  searchParams: Promise<{ payment?: string }>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapItem(item: any, index: number): Seminar {
  return {
    id: `seminar-${index}`,
    slug: item.slug || "",
    imagen: item.imagen?.url
      ? { url: item.imagen.url, alt: item.imagen.alt || item.titulo || "" }
      : null,
    titulo: item.titulo || "",
    descripcion: item.descripcion || "",
    fecha: item.fecha || "",
    hora: item.hora || "",
    duracion: item.duracion || "",
    precio: item.precio || "",
    precioNumerico:
      typeof item.precio_numerico === "number"
        ? item.precio_numerico
        : parseFloat(String(item.precio ?? "").replace(/[^0-9.]/g, "")) || 0,
    instructor: item.instructor || "",
    cupos: item.cupos || "",
    nivel: (["beginner", "intermediate", "advanced"].includes(item.nivel)
      ? item.nivel
      : "beginner") as Seminar["nivel"],
    tecnica: item.tecnica || "",
    linkRegistro: item.link_registro?.url || null,
    estado: (["upcoming", "past", "cancelled"].includes(item.estado)
      ? item.estado
      : "upcoming") as Seminar["estado"],
  }
}

async function getSeminarBySlug(
  slug: string,
  prismicLang: string
): Promise<Seminar | null> {
  const client = createClient() as unknown as prismic.Client

  const fetchSeminars = async (lang?: string) => {
    const doc = lang
      ? await client.getSingle("seminars", { lang })
      : await client.getSingle("seminars")

    const seminarSlice = doc.data.slices.find(
      (s: { slice_type: string }) => s.slice_type === "seminar_list"
    )
    if (seminarSlice && "primary" in seminarSlice && seminarSlice.primary.seminarios) {
      return (seminarSlice.primary.seminarios as unknown[]).map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item: any, i: number) => mapItem(item, i)
      )
    }
    return []
  }

  try {
    const seminars = await fetchSeminars(prismicLang)
    const found = seminars.find((s) => s.slug === slug)
    if (found) return found

    // Fallback sin idioma
    const fallback = await fetchSeminars()
    return fallback.find((s) => s.slug === slug) ?? null
  } catch {
    return null
  }
}

export async function generateMetadata({
  params,
}: SlugPageProps): Promise<Metadata> {
  const { lang, slug } = await params
  if (!hasLocale(lang)) throw new Error(`Invalid locale: ${lang}`)

  const prismicLang = lang === "es" ? "es-ar" : "en-us"
  const seminar = await getSeminarBySlug(slug, prismicLang)

  const dict = await getDictionary(lang)
  const fallbackTitle = dict.seminarios.metadata.title

  return {
    title: seminar?.titulo ?? fallbackTitle,
    description: seminar?.descripcion || dict.seminarios.metadata.description,
    openGraph: {
      title: seminar?.titulo ?? fallbackTitle,
      description: seminar?.descripcion || dict.seminarios.metadata.og_description,
      images: seminar?.imagen ? [seminar.imagen.url] : [],
      locale: lang === "es" ? "es_AR" : "en_US",
      type: "website",
    },
  }
}

const levelColors: Record<Seminar["nivel"], string> = {
  beginner: "bg-emerald-900/50 text-emerald-300 border border-emerald-800",
  intermediate: "bg-amber-900/50 text-amber-300 border border-amber-800",
  advanced: "bg-red-900/50 text-red-300 border border-red-800",
}

const levelLabels: Record<string, Record<Seminar["nivel"], string>> = {
  es: { beginner: "Principiante", intermediate: "Intermedio", advanced: "Avanzado" },
  en: { beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced" },
}

export default async function SeminarDetailPage({
  params,
  searchParams,
}: SlugPageProps) {
  const { lang, slug } = await params
  const { payment } = await searchParams

  if (!hasLocale(lang)) throw new Error(`Invalid locale: ${lang}`)

  const [dict, seminar] = await Promise.all([
    getDictionary(lang),
    getSeminarBySlug(slug, lang === "es" ? "es-ar" : "en-us"),
  ])

  if (!seminar) return notFound()

  const detailDict = dict.seminarios.detail
  const isUpcoming = seminar.estado === "upcoming"
  const isCancelled = seminar.estado === "cancelled"
  const canBuy = isUpcoming && seminar.precioNumerico > 0

  return (
    <div className="min-h-screen bg-background">
      {/* Back link */}
      <div className="pt-28 pb-4 px-4">
        <div className="container mx-auto max-w-5xl">
          <Link
            href={`/${lang}/seminarios`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {detailDict.back_button}
          </Link>
        </div>
      </div>

      {/* Payment status banner */}
      {payment && (
        <div className="px-4 pb-4">
          <div className="container mx-auto max-w-5xl">
            {payment === "success" && (
              <div className="flex items-center gap-3 bg-emerald-900/30 border border-emerald-700 text-emerald-300 rounded-sm px-4 py-3">
                <CheckCircle className="w-5 h-5 shrink-0" />
                <span>{detailDict.payment_success}</span>
              </div>
            )}
            {payment === "failure" && (
              <div className="flex items-center gap-3 bg-red-900/30 border border-red-700 text-red-300 rounded-sm px-4 py-3">
                <XCircle className="w-5 h-5 shrink-0" />
                <span>{detailDict.payment_failure}</span>
              </div>
            )}
            {payment === "pending" && (
              <div className="flex items-center gap-3 bg-amber-900/30 border border-amber-700 text-amber-300 rounded-sm px-4 py-3">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{detailDict.payment_pending}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main content */}
      <section className="px-4 pb-20">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Imagen */}
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-secondary">
              {seminar.imagen ? (
                <Image
                  src={seminar.imagen.url}
                  alt={seminar.imagen.alt}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  <span className="text-6xl">🎨</span>
                </div>
              )}

              {!isUpcoming && (
                <div className="absolute top-4 right-4">
                  <span
                    className={`text-sm font-medium px-3 py-1.5 rounded-sm uppercase tracking-wider ${
                      isCancelled
                        ? "bg-red-900/80 text-red-300"
                        : "bg-black/70 text-gray-300"
                    }`}
                  >
                    {isCancelled
                      ? dict.seminarios.card.cancelled
                      : dict.seminarios.card.sold_out}
                  </span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col gap-6">
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {seminar.tecnica && (
                  <span className="text-xs uppercase tracking-wider px-2 py-1 bg-secondary text-muted-foreground rounded-sm">
                    {seminar.tecnica}
                  </span>
                )}
                <span
                  className={`text-xs uppercase tracking-wider px-2 py-1 rounded-sm ${levelColors[seminar.nivel]}`}
                >
                  {levelLabels[lang]?.[seminar.nivel] ??
                    dict.seminarios.card.levels[seminar.nivel]}
                </span>
              </div>

              {/* Título */}
              <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                {seminar.titulo}
              </h1>

              {/* Descripción */}
              {seminar.descripcion && (
                <p className="text-muted-foreground leading-relaxed">
                  {seminar.descripcion}
                </p>
              )}

              {/* Info grid */}
              <dl className="grid grid-cols-2 gap-4 border border-border rounded-sm p-4">
                {seminar.fecha && (
                  <div className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                    <div>
                      <dt className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">
                        {dict.seminarios.card.date_label}
                      </dt>
                      <dd className="text-sm font-medium">{seminar.fecha}</dd>
                    </div>
                  </div>
                )}
                {seminar.hora && (
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                    <div>
                      <dt className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">
                        {dict.seminarios.card.time_label}
                      </dt>
                      <dd className="text-sm font-medium">{seminar.hora}</dd>
                    </div>
                  </div>
                )}
                {seminar.duracion && (
                  <div className="flex items-start gap-2">
                    <Timer className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                    <div>
                      <dt className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">
                        {dict.seminarios.card.duration_label}
                      </dt>
                      <dd className="text-sm font-medium">{seminar.duracion}</dd>
                    </div>
                  </div>
                )}
                {seminar.cupos && (
                  <div className="flex items-start gap-2">
                    <Users className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                    <div>
                      <dt className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">
                        {dict.seminarios.card.spots_label}
                      </dt>
                      <dd className="text-sm font-medium">{seminar.cupos}</dd>
                    </div>
                  </div>
                )}
                {seminar.instructor && (
                  <div className="flex items-start gap-2 col-span-2">
                    <User className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                    <div>
                      <dt className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">
                        {dict.seminarios.card.instructor_label}
                      </dt>
                      <dd className="text-sm font-medium">{seminar.instructor}</dd>
                    </div>
                  </div>
                )}
              </dl>

              {/* Precio + CTA */}
              <div className="flex flex-col gap-4 pt-2 border-t border-border">
                {seminar.precio && (
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-muted-foreground" />
                    <span className="text-2xl font-bold">{seminar.precio}</span>
                  </div>
                )}

                {canBuy && (
                  <BuyButton
                    slug={seminar.slug}
                    lang={lang}
                    label={detailDict.buy_button}
                    errorLabel={detailDict.buy_error}
                  />
                )}

                {!isUpcoming && (
                  <p className="text-muted-foreground italic text-sm">
                    {isCancelled
                      ? dict.seminarios.card.cancelled
                      : dict.seminarios.card.sold_out}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
