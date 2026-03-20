import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, Timer, Users, DollarSign, User, ArrowRight } from "lucide-react"

export type Seminar = {
  id: string
  slug: string
  imagen: { url: string; alt: string } | null
  titulo: string
  descripcion: string
  fecha: string
  hora: string
  duracion: string
  precio: string
  precioNumerico: number
  instructor: string
  cupos: string
  nivel: "beginner" | "intermediate" | "advanced"
  tecnica: string
  linkRegistro: string | null
  estado: "upcoming" | "past" | "cancelled"
}

type CardDict = {
  register_button: string
  sold_out: string
  cancelled: string
  date_label: string
  time_label: string
  duration_label: string
  price_label: string
  instructor_label: string
  spots_label: string
  level_label: string
  levels: {
    beginner: string
    intermediate: string
    advanced: string
  }
}

interface SeminarCardProps {
  seminar: Seminar
  dict: CardDict
  lang: string
}

const levelColors: Record<Seminar["nivel"], string> = {
  beginner: "bg-emerald-900/50 text-emerald-300 border border-emerald-800",
  intermediate: "bg-amber-900/50 text-amber-300 border border-amber-800",
  advanced: "bg-red-900/50 text-red-300 border border-red-800",
}

export function SeminarCard({ seminar, dict, lang }: SeminarCardProps) {
  const isUpcoming = seminar.estado === "upcoming"
  const isCancelled = seminar.estado === "cancelled"
  const hasDetail = Boolean(seminar.slug)
  const detailHref = `/${lang}/seminarios/${seminar.slug}`

  const cardContent = (
    <>
      {/* Imagen cover */}
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        {seminar.imagen ? (
          <Image
            src={seminar.imagen.url}
            alt={seminar.imagen.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            <span className="text-4xl">🎨</span>
          </div>
        )}
        {!isUpcoming && (
          <div className="absolute top-3 right-3">
            <span className={`text-xs font-medium px-2 py-1 rounded-sm uppercase tracking-wider ${isCancelled ? "bg-red-900/80 text-red-300" : "bg-black/70 text-gray-300"}`}>
              {isCancelled ? dict.cancelled : dict.sold_out}
            </span>
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="flex flex-col flex-1 p-5 gap-4">
        <div className="flex flex-wrap gap-2">
          {seminar.tecnica && (
            <span className="text-xs uppercase tracking-wider px-2 py-1 bg-secondary text-muted-foreground rounded-sm">
              {seminar.tecnica}
            </span>
          )}
          <span className={`text-xs uppercase tracking-wider px-2 py-1 rounded-sm ${levelColors[seminar.nivel]}`}>
            {dict.levels[seminar.nivel]}
          </span>
        </div>

        <div>
          <h3 className="text-lg font-bold leading-tight mb-1">{seminar.titulo}</h3>
          {seminar.descripcion && (
            <p className="text-sm text-muted-foreground line-clamp-2">{seminar.descripcion}</p>
          )}
        </div>

        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          {seminar.fecha && (
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Calendar className="w-3.5 h-3.5 shrink-0" />
              <span>{seminar.fecha}</span>
            </div>
          )}
          {seminar.hora && (
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="w-3.5 h-3.5 shrink-0" />
              <span>{seminar.hora}</span>
            </div>
          )}
          {seminar.duracion && (
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Timer className="w-3.5 h-3.5 shrink-0" />
              <span>{seminar.duracion}</span>
            </div>
          )}
          {seminar.cupos && (
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Users className="w-3.5 h-3.5 shrink-0" />
              <span>{seminar.cupos}</span>
            </div>
          )}
          {seminar.instructor && (
            <div className="flex items-center gap-1.5 text-muted-foreground col-span-2">
              <User className="w-3.5 h-3.5 shrink-0" />
              <span>{seminar.instructor}</span>
            </div>
          )}
        </dl>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
          {seminar.precio && (
            <div className="flex items-center gap-1.5 font-semibold">
              <DollarSign className="w-4 h-4 text-muted-foreground" />
              <span>{seminar.precio}</span>
            </div>
          )}
          {hasDetail && isUpcoming ? (
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-2.5 transition-all">
              Ver detalle <ArrowRight className="w-4 h-4" />
            </span>
          ) : !isUpcoming ? (
            <span className="text-sm text-muted-foreground italic">
              {isCancelled ? dict.cancelled : dict.sold_out}
            </span>
          ) : null}
        </div>
      </div>
    </>
  )

  if (hasDetail) {
    return (
      <Link href={detailHref} className="group bg-card rounded-sm overflow-hidden border border-border flex flex-col hover:border-primary/50 transition-colors">
        {cardContent}
      </Link>
    )
  }

  return (
    <article className="group bg-card rounded-sm overflow-hidden border border-border flex flex-col">
      {cardContent}
    </article>
  )
}
