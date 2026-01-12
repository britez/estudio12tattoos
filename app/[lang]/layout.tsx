import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Ballet } from "next/font/google"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getDictionary, hasLocale } from './dictionaries'
import type { LayoutProps } from './types'
import "../globals.css"

const ballet = Ballet({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-marker",
})

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }]
}

export async function generateMetadata({ params }: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params
  
  // Validar que el locale sea válido
  if (!hasLocale(lang)) {
    throw new Error(`Invalid locale: ${lang}`)
  }
  
  const dict = await getDictionary(lang)
  
  return {
    title: {
      default: dict.layout.metadata.title,
      template: dict.layout.metadata.title_template,
    },
    description: dict.layout.metadata.description,
    keywords: dict.layout.metadata.keywords,
    authors: [{ name: "estudio12" }],
    creator: "estudio12",
    publisher: "estudio12",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL("https://estudio12tattoos.com"),
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title: dict.layout.metadata.og_title,
      description: dict.layout.metadata.og_description,
      url: "https://estudio12tattoos.com",
      siteName: "estudio12",
      locale: dict.layout.metadata.locale,
      type: "website",
      images: [
        {
          url: "/logo-estudio12.jpg",
          width: 1200,
          height: 630,
          alt: "estudio12 - Estudio de Tatuajes",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.layout.metadata.twitter_title,
      description: dict.layout.metadata.twitter_description,
      images: ["/logo-estudio12.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    generator: "v0.app",
    icons: {
      icon: [
        {
          url: "/icon.png",
          media: "(prefers-color-scheme: light)",
        },
        {
          url: "/icon.png",
          media: "(prefers-color-scheme: dark)",
        },
        {
          url: "/icon.png",
          type: "image/png",
        },
      ],
      apple: "/apple-icon.png",
    },
  }
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<'/[lang]'>) {
  const { lang } = await params
  
  // Validar que el locale sea válido
  if (!hasLocale(lang)) {
    throw new Error(`Invalid locale: ${lang}`)
  }
  
  const dict = await getDictionary(lang)
  
  return (
    <html lang={lang} className={ballet.variable}>
      <body className={`font-sans antialiased ${ballet.variable}`}>
        <Header lang={lang} dict={dict} />
        {children}
        <Footer dict={dict} />
        <Analytics />
      </body>
    </html>
  )
}
