import type { Metadata } from "next"
import { getDictionary, hasLocale } from '../dictionaries'
import type { PageProps } from '../types'

export async function generateSeminariosMetadata({ params }: PageProps<'/[lang]/seminarios'>): Promise<Metadata> {
  const { lang } = await params

  if (!hasLocale(lang)) {
    throw new Error(`Invalid locale: ${lang}`)
  }

  const dict = await getDictionary(lang)

  return {
    title: dict.seminarios.metadata.title,
    description: dict.seminarios.metadata.description,
    openGraph: {
      title: dict.seminarios.metadata.og_title,
      description: dict.seminarios.metadata.og_description,
      type: 'website',
      locale: lang === 'es' ? 'es_AR' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.seminarios.metadata.og_title,
      description: dict.seminarios.metadata.og_description,
    },
  }
}
