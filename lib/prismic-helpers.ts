import { createClient } from '@/prismicio'

export interface ContactInfo {
  whatsapp: string
  instagram: string
  instagramUrl: string
  email: string
  address: string
  city: string
  country: string
}

export async function getContactInfo(lang: 'es' | 'en'): Promise<ContactInfo> {
  const client = createClient()
  const prismicLang = lang === 'es' ? 'es-ar' : 'en-us'
  
  try {
    // El custom type `settings` todavia no esta en prismicio-types.d.ts, asi que
    // `getSingle` solo acepta "aboutus" | "home" | "work". Se suprime con
    // `@ts-expect-error` (no `@ts-ignore`) a proposito: el dia que se regeneren
    // los tipos, TypeScript marca este supresor como innecesario y avisa.
    // @ts-expect-error - falta regenerar los tipos de Prismic con el type Settings
    const settingsDoc = await client.getSingle("settings", { lang: prismicLang })
    const contactSlice = settingsDoc.data.slices.find((s: any) => s.slice_type === 'contact_info')
    
    if (contactSlice && 'primary' in contactSlice) {
      return {
        whatsapp: (contactSlice.primary as any).whatsapp_number || '',
        instagram: (contactSlice.primary as any).instagram_handle || '',
        instagramUrl: (contactSlice.primary as any).instagram_url?.url || '',
        email: (contactSlice.primary as any).email || '',
        address: `${(contactSlice.primary as any).address_line1 || ''}\n${(contactSlice.primary as any).address_line2 || ''}`.trim(),
        city: (contactSlice.primary as any).city || '',
        country: (contactSlice.primary as any).country || ''
      }
    }
  } catch (error) {
    console.error('Error loading contact info from Prismic:', error)
  }
  
  // Fallback a valores hardcodeados actuales
  return {
    whatsapp: '+5491171601995',
    instagram: '@estudio.12_',
    instagramUrl: 'https://www.instagram.com/estudio.12_/',
    email: 'estudio12.tattoos@gmail.com',
    address: 'Humberto 1° 985, piso 12\nBuenos Aires, Argentina',
    city: 'Buenos Aires',
    country: 'Argentina'
  }
}
