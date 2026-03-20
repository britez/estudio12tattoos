# Feature: Sección Seminarios

**Estado:** Planificación  
**Prioridad:** Media  
**Header:** NO incluir por ahora (modo prueba)  
**URLs objetivo:** `/es/seminarios`, `/en/seminarios`

---

## Contexto

El estudio quiere ofrecer talleres / workshops de tatuaje (por técnica, nivel, artista invitado, etc.). La sección mostrará los seminarios disponibles con información de fecha, instructor, precio y cupos, y permitirá al visitante ir a registrarse.

---

## Decisiones de Arquitectura

| Decisión | Elección | Motivo |
|----------|---------|--------|
| Tipo de documento Prismic | `seminars` (singleton) | Consistente con `home`, `work`, `aboutus` |
| Estructura de datos | Slice `SeminarList` con Group repeatable | Mismo patrón que `Portfolio` y `Works2` |
| Fetch data | Manual (sin `<SliceZone>`) | Patrón establecido en el proyecto |
| i18n | `lang === 'es' ? 'es-ar' : 'en-us'` | Mismo mapping inline que el resto |
| Metadata | Archivo `metadata.ts` separado | Igual que `contacto/` y `reservar/` |
| Componentes | Colocados en `seminarios/components/` | Mismo patrón que `reservar/components/` |

---

## Estructura de Archivos a Crear / Modificar

```
customtypes/
  seminars/
    index.json                          ← NUEVO: Custom Type Prismic (singleton)

slices/
  SeminarList/
    index.tsx                           ← NUEVO: Slice component (placeholder)
    model.json                          ← NUEVO: Slice schema con Group repeatable
    mocks.json                          ← NUEVO: Mock data para Slice Simulator
  index.ts                              ← MODIFICAR: registrar `seminar_list`

app/[lang]/
  seminarios/
    page.tsx                            ← NUEVO: Página principal
    metadata.ts                         ← NUEVO: generateMetadata separado
    components/
      SeminarCard.tsx                   ← NUEVO: Card de un seminario
      SeminarHero.tsx                   ← NUEVO: Hero section de la página

dictionaries/
  es.json                               ← MODIFICAR: agregar sección `seminarios`
  en.json                               ← MODIFICAR: agregar sección `seminarios`
```

---

## Modelo de Datos

### Custom Type `seminars` (Singleton)

```json
{
  "id": "seminars",
  "label": "Seminarios",
  "repeatable": false,
  "tabs": {
    "Main": {
      "uid": { "type": "UID" },
      "slices": { "type": "Slices", "fieldset": "Slice Zone" }
    }
  }
}
```

### Slice `SeminarList` — campos del Group `seminarios`

| Campo | Tipo Prismic | Descripción |
|-------|-------------|-------------|
| `imagen` | Image | Cover photo del seminario |
| `titulo` | Text | Nombre del seminario |
| `descripcion` | RichText | Descripción corta |
| `fecha` | Text | Fecha formateada (ej: "15 de Julio, 2026") |
| `hora` | Text | Horario (ej: "14:00 – 18:00") |
| `duracion` | Text | Duración (ej: "4 horas") |
| `precio` | Text | Precio (ej: "$25,000" o "USD 50") |
| `instructor` | Text | Nombre del instructor |
| `cupos` | Text | Cupos disponibles (ej: "6 lugares") |
| `nivel` | Select | beginner \| intermediate \| advanced |
| `tecnica` | Text | Técnica (ej: "Realismo", "Tradicional") |
| `link_registro` | Link | URL de registro (WhatsApp, Eventbrite, etc.) |
| `estado` | Select | upcoming \| past \| cancelled |

---

## Tasks Atómicas

Cada task → 1 commit. Orden de ejecución secuencial por dependencias.

---

### TASK-001 — Agregar entradas al diccionario i18n

**Archivos:** `dictionaries/es.json`, `dictionaries/en.json`  
**Dependencias:** ninguna  
**Commit:** `feat(i18n): add seminarios dictionary entries`

Agregar al final de cada archivo la sección `seminarios`:

**`es.json`** — bloque a agregar:
```json
"seminarios": {
  "hero": {
    "title": "Seminarios",
    "description": "Aprendé de nuestros artistas. Talleres intensivos de tatuaje para todos los niveles, con cupos limitados y fechas únicas."
  },
  "filters": {
    "all": "Todos",
    "upcoming": "Próximos",
    "past": "Anteriores"
  },
  "card": {
    "register_button": "Reservar lugar",
    "sold_out": "Sin cupos",
    "cancelled": "Cancelado",
    "date_label": "Fecha",
    "time_label": "Horario",
    "duration_label": "Duración",
    "price_label": "Precio",
    "instructor_label": "Instructor",
    "spots_label": "Cupos",
    "level_label": "Nivel",
    "levels": {
      "beginner": "Principiante",
      "intermediate": "Intermedio",
      "advanced": "Avanzado"
    }
  },
  "empty": {
    "title": "Próximamente",
    "description": "Estamos preparando nuevos seminarios. Seguinos en Instagram para enterarte primero."
  },
  "cta": {
    "title": "¿Querés que avisemos cuando haya novedades?",
    "description": "Mandanos un mensaje y te sumamos a la lista de interesados.",
    "button": "Contactanos"
  },
  "metadata": {
    "title": "Seminarios",
    "description": "Talleres intensivos de tatuaje con artistas del Estudio 12. Cupos limitados.",
    "og_title": "Seminarios de Tatuaje | Estudio 12",
    "og_description": "Aprendé con los artistas del Estudio 12. Talleres de técnicas de tatuaje con cupos limitados."
  }
}
```

**`en.json`** — bloque equivalente en inglés:
```json
"seminarios": {
  "hero": {
    "title": "Seminars",
    "description": "Learn from our artists. Intensive tattoo workshops for all levels, with limited spots and unique dates."
  },
  "filters": {
    "all": "All",
    "upcoming": "Upcoming",
    "past": "Past"
  },
  "card": {
    "register_button": "Reserve a spot",
    "sold_out": "Sold out",
    "cancelled": "Cancelled",
    "date_label": "Date",
    "time_label": "Schedule",
    "duration_label": "Duration",
    "price_label": "Price",
    "instructor_label": "Instructor",
    "spots_label": "Spots",
    "level_label": "Level",
    "levels": {
      "beginner": "Beginner",
      "intermediate": "Intermediate",
      "advanced": "Advanced"
    }
  },
  "empty": {
    "title": "Coming Soon",
    "description": "We are preparing new seminars. Follow us on Instagram to be the first to know."
  },
  "cta": {
    "title": "Want us to notify you when there's news?",
    "description": "Send us a message and we'll add you to the interested list.",
    "button": "Contact us"
  },
  "metadata": {
    "title": "Seminars",
    "description": "Intensive tattoo workshops with Estudio 12 artists. Limited spots.",
    "og_title": "Tattoo Seminars | Estudio 12",
    "og_description": "Learn with the artists of Estudio 12. Tattoo technique workshops with limited spots."
  }
}
```

---

### TASK-002 — Crear Custom Type `seminars` en Prismic

**Archivos:** `customtypes/seminars/index.json`  
**Dependencias:** ninguna (puede hacerse en paralelo con TASK-001)  
**Commit:** `feat(prismic): add seminars custom type`

Crear el archivo `customtypes/seminars/index.json` con el siguiente contenido:

```json
{
  "id": "seminars",
  "label": "Seminarios",
  "repeatable": false,
  "status": true,
  "json": {
    "Main": {
      "uid": {
        "type": "UID",
        "config": {
          "label": "UID",
          "placeholder": "seminarios"
        }
      },
      "slices": {
        "type": "Slices",
        "fieldset": "Slice Zone",
        "config": {
          "choices": {
            "seminar_list": {
              "type": "SharedSlice"
            }
          }
        }
      }
    }
  }
}
```

> ⚠️ **Paso manual requerido:** Después de crear el archivo, hay que correr `pnpm slicemachine` y pushear el custom type al repositorio de Prismic para que sea reconocido en el dashboard.

---

### TASK-003 — Crear Slice `SeminarList`

**Archivos:**  
- `slices/SeminarList/model.json`  
- `slices/SeminarList/index.tsx`  
- `slices/SeminarList/mocks.json`  

**Dependencias:** TASK-002  
**Commit:** `feat(slices): add SeminarList slice with seminar group model`

**`model.json`:**
```json
{
  "id": "seminar_list",
  "type": "SharedSlice",
  "name": "SeminarList",
  "description": "Lista de seminarios/talleres",
  "variations": [
    {
      "id": "default",
      "name": "Default",
      "docURL": "...",
      "version": "initial",
      "description": "Default",
      "primary": {
        "seminarios": {
          "type": "Group",
          "config": {
            "label": "Seminarios",
            "repeat": true,
            "fields": {
              "imagen":       { "type": "Image",   "config": { "label": "Imagen de portada" } },
              "titulo":       { "type": "Text",    "config": { "label": "Título" } },
              "descripcion":  { "type": "RichText","config": { "label": "Descripción" } },
              "fecha":        { "type": "Text",    "config": { "label": "Fecha" } },
              "hora":         { "type": "Text",    "config": { "label": "Horario" } },
              "duracion":     { "type": "Text",    "config": { "label": "Duración" } },
              "precio":       { "type": "Text",    "config": { "label": "Precio" } },
              "instructor":   { "type": "Text",    "config": { "label": "Instructor" } },
              "cupos":        { "type": "Text",    "config": { "label": "Cupos disponibles" } },
              "nivel":        { 
                "type": "Select", 
                "config": { 
                  "label": "Nivel", 
                  "options": ["beginner", "intermediate", "advanced"],
                  "default_value": "beginner"
                }
              },
              "tecnica":      { "type": "Text",    "config": { "label": "Técnica" } },
              "link_registro":{ "type": "Link",    "config": { "label": "Link de registro", "allowTargetBlank": true } },
              "estado":       {
                "type": "Select",
                "config": {
                  "label": "Estado",
                  "options": ["upcoming", "past", "cancelled"],
                  "default_value": "upcoming"
                }
              }
            }
          }
        }
      },
      "items": {}
    }
  ]
}
```

**`index.tsx`** (placeholder auto-generado — la página lo consume manualmente):
```tsx
import { FC } from "react"
import { Content } from "@prismicio/client"
import { SliceComponentProps } from "@prismicio/react"

export type SeminarListProps = SliceComponentProps<Content.SeminarListSlice>

const SeminarList: FC<SeminarListProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for seminar_list (variation: {slice.variation}) slices.
    </section>
  )
}

export default SeminarList
```

**`mocks.json`** — datos de ejemplo para Slice Simulator:
```json
{
  "id": "seminar_list-default-mock",
  "type": "shared_slice",
  "name": "SeminarList",
  "slice_type": "seminar_list",
  "variation": "default",
  "primary": {
    "seminarios": [
      {
        "titulo": "Taller de Realismo — Nivel Básico",
        "descripcion": [{ "type": "paragraph", "text": "Aprendé las bases del realismo en tatuaje.", "spans": [] }],
        "fecha": "15 de Julio, 2026",
        "hora": "14:00 – 18:00",
        "duracion": "4 horas",
        "precio": "$30,000",
        "instructor": "Juan Britez",
        "cupos": "6 lugares",
        "nivel": "beginner",
        "tecnica": "Realismo",
        "estado": "upcoming",
        "link_registro": { "link_type": "Web", "url": "https://wa.me/5491171601995" },
        "imagen": { "dimensions": { "width": 800, "height": 600 }, "alt": "Taller de Realismo", "url": "" }
      },
      {
        "titulo": "Masterclass Japonés Tradicional",
        "descripcion": [{ "type": "paragraph", "text": "Técnicas avanzadas de tatuaje japonés.", "spans": [] }],
        "fecha": "22 de Agosto, 2026",
        "hora": "10:00 – 17:00",
        "duracion": "7 horas",
        "precio": "$50,000",
        "instructor": "Artista Invitado",
        "cupos": "4 lugares",
        "nivel": "advanced",
        "tecnica": "Japonés Tradicional",
        "estado": "upcoming",
        "link_registro": { "link_type": "Web", "url": "https://wa.me/5491171601995" },
        "imagen": { "dimensions": { "width": 800, "height": 600 }, "alt": "Masterclass Japonés", "url": "" }
      }
    ]
  }
}
```

---

### TASK-004 — Registrar `SeminarList` en el slice registry

**Archivos:** `slices/index.ts`  
**Dependencias:** TASK-003  
**Commit:** `feat(slices): register SeminarList in slice registry`

Agregar una línea al objeto `components` en `slices/index.ts`:

```ts
// Agregar junto al resto:
seminar_list: dynamic(() => import("./SeminarList")),
```

---

### TASK-005 — Crear `metadata.ts` para la página de seminarios

**Archivos:** `app/[lang]/seminarios/metadata.ts`  
**Dependencias:** TASK-001  
**Commit:** `feat(seminarios): add page metadata`

Seguir el patrón de `contacto/metadata.ts` y `reservar/metadata.ts`:

```ts
import type { Metadata } from "next"
import type { Locale } from "../dictionaries"

type SeminariosDict = {
  seminarios: {
    metadata: {
      title: string
      description: string
      og_title: string
      og_description: string
    }
  }
}

export function generateSeminariosMetadata(dict: SeminariosDict, lang: Locale): Metadata {
  const meta = dict.seminarios.metadata
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.og_title,
      description: meta.og_description,
      locale: lang === "es" ? "es_AR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.og_title,
      description: meta.og_description,
    },
  }
}
```

---

### TASK-006 — Crear componente `SeminarCard`

**Archivos:** `app/[lang]/seminarios/components/SeminarCard.tsx`  
**Dependencias:** TASK-001  
**Commit:** `feat(seminarios): add SeminarCard component`

Componente presentacional que recibe los datos de un seminario y los renderiza como tarjeta. Diseño alineado con el estilo existente (fondo oscuro, tipografía Ballet, Tailwind).

```ts
// Tipo de datos del seminario (inferido del modelo Prismic)
type Seminar = {
  id: string
  imagen: { url: string; alt: string } | null
  titulo: string
  descripcion: string
  fecha: string
  hora: string
  duracion: string
  precio: string
  instructor: string
  cupos: string
  nivel: "beginner" | "intermediate" | "advanced"
  tecnica: string
  linkRegistro: string | null
  estado: "upcoming" | "past" | "cancelled"
}
```

**Estructura visual de la card:**
```
┌─────────────────────────────┐
│  [imagen cover — aspect 4/3] │
├─────────────────────────────┤
│  Badge: Técnica   Badge: Nivel│
│  Título del seminario        │
│  Instructor                  │
├─────────────────────────────┤
│  📅 Fecha    🕐 Hora         │
│  ⏱ Duración  👥 Cupos        │
│  💰 Precio                   │
├─────────────────────────────┤
│  [Botón CTA / Estado badge]  │
└─────────────────────────────┘
```

---

### TASK-007 — Crear página `app/[lang]/seminarios/page.tsx`

**Archivos:** `app/[lang]/seminarios/page.tsx`  
**Dependencias:** TASK-001, TASK-002, TASK-003, TASK-005, TASK-006  
**Commit:** `feat(seminarios): add /seminarios page with Prismic data`

Patrón a seguir (idéntico a `trabajos/page.tsx`):

```ts
export async function generateMetadata({ params }: PageProps<'/[lang]/seminarios'>): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) throw new Error(`Invalid locale: ${lang}`)
  const dict = await getDictionary(lang)
  return generateSeminariosMetadata(dict, lang)
}

export default async function SeminariosPage({ params }: PageProps<'/[lang]/seminarios'>) {
  const { lang } = await params
  if (!hasLocale(lang)) throw new Error(`Invalid locale: ${lang}`)
  const dict = await getDictionary(lang)

  const prismicLang = lang === 'es' ? 'es-ar' : 'en-us'
  const client = createClient()

  let seminars: Seminar[] = []

  try {
    const doc = await client.getSingle("seminars", { lang: prismicLang })
    const seminarSlice = doc.data.slices.find(
      (s: { slice_type: string }) => s.slice_type === "seminar_list"
    )
    if (seminarSlice?.primary?.seminarios) {
      seminars = seminarSlice.primary.seminarios.map(
        (item: SeminarPrismicItem, index: number) => ({
          id: `seminar-${index}`,
          imagen: item.imagen?.url ? { url: item.imagen.url, alt: item.imagen.alt || item.titulo || "" } : null,
          titulo: item.titulo || "",
          descripcion: item.descripcion?.[0]?.text || "",
          fecha: item.fecha || "",
          hora: item.hora || "",
          duracion: item.duracion || "",
          precio: item.precio || "",
          instructor: item.instructor || "",
          cupos: item.cupos || "",
          nivel: (item.nivel as Seminar["nivel"]) || "beginner",
          tecnica: item.tecnica || "",
          linkRegistro: item.link_registro?.url || null,
          estado: (item.estado as Seminar["estado"]) || "upcoming",
        })
      )
    }
  } catch {
    try {
      const doc = await client.getSingle("seminars")
      // mismo mapeo sin lang
    } catch {
      // seminars vacío → se muestra estado "Próximamente"
    }
  }

  return (
    <main>
      {/* Hero section */}
      {/* Grid de SeminarCard */}
      {/* Estado vacío si no hay seminarios */}
      {/* CTA */}
    </main>
  )
}
```

---

## Checklist de Validación Pre-Deploy

- [ ] Custom type `seminars` pusheado a Prismic (via Slice Machine UI)
- [ ] Documento `seminars` creado en Prismic dashboard con al menos 1 seminario
- [ ] `/es/seminarios` renderiza sin errores
- [ ] `/en/seminarios` renderiza sin errores  
- [ ] Estado vacío (sin datos en Prismic) → muestra "Próximamente" sin crashear
- [ ] `generateMetadata` produce title/OG correcto en ambos idiomas
- [ ] `<ImageWithSkeleton>` usado para cover images (no `<img>` directo)
- [ ] No aparece en el header (verificar `header.tsx` sin cambios)
- [ ] TypeScript no rompe el build (`pnpm build`)

---

## Notas Técnicas

### Deuda técnica a NO introducir
- No agregar `typescript.ignoreBuildErrors` adicional — tipar correctamente desde el inicio
- No hardcodear textos en el componente — todo pasa por el diccionario

### Dependencias ya disponibles (sin instalar nada)
- `framer-motion` → animaciones sutiles de entrada en las cards (opcional)
- `lucide-react` → iconos para fecha/hora/precio en las cards
- `@prismicio/client` → ya configurado para fetch

### Riesgo: Prismic document no existe en producción
- La página debe manejar gracefully el caso `404` de Prismic (documento aún no creado)
- El try/catch existente en el patrón ya lo cubre → `seminars = []` → estado vacío

---

## Orden de Ejecución Recomendado

```
TASK-001 (dict) ──┐
                   ├──> TASK-005 (metadata) ──┐
TASK-002 (CT)  ──>│                            ├──> TASK-007 (page)
TASK-003 (slice)──┤                            │
                   └──> TASK-006 (card)   ──────┘
TASK-004 (registry) ← después de TASK-003
```

TASK-001 y TASK-002 se pueden hacer **en paralelo**. El resto tiene dependencias.
