import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Ballet } from "next/font/google"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import "./globals.css"

const ballet = Ballet({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-marker",
})

export const metadata: Metadata = {
  title: {
    default: "estudio12 - Estudio de Tatuajes con Vista Panorámica | Buenos Aires",
    template: "%s | estudio12",
  },
  description:
    "Somos un estudio de tatuajes profesional en Buenos Aires con vista panorámica. Cada trazo cuenta una historia. Especialistas en realismo, tradicional, minimalista y más. Agenda tu consulta.",
  keywords: [
    "tatuajes",
    "estudio de tatuajes",
    "tatuajes buenos aires",
    "estudio12",
    "tatuajes realistas",
    "tatuajes tradicionales",
    "tatuajes minimalistas",
    "tatuajes profesionales",
    "tattoo studio",
    "tatuajes argentina",
    "tatuadores profesionales",
  ],
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
    title: "estudio12 - Estudio de Tatuajes con Vista Panorámica",
    description:
      "Estudio de tatuajes profesional en Buenos Aires. Cada trazo cuenta una historia. Artistas especializados en múltiples estilos.",
    url: "https://estudio12tattoos.com",
    siteName: "estudio12",
    locale: "es_AR",
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
    title: "estudio12 - Estudio de Tatuajes con Vista Panorámica",
    description:
      "Estudio de tatuajes profesional en Buenos Aires. Cada trazo cuenta una historia. Artistas especializados en múltiples estilos.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={ballet.variable}>
      <body className="antialiased">
        <Header />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
