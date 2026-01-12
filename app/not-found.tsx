import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export default async function GlobalNotFound() {
  const headersList = await headers()
  const acceptLanguage = headersList.get('accept-language') || ''
  
  // Detectar idioma preferido del usuario
  const preferredLang = acceptLanguage.toLowerCase().includes('es') ? 'es' : 'en'
  
  // Redirigir a la página 404 con el idioma detectado
  redirect(`/${preferredLang}/not-found`)
}