/**
 * Script de diagnóstico para verificar datos de Prismic
 * 
 * Uso:
 * npx tsx scripts/check-prismic-data.ts [idioma]
 * 
 * Ejemplos:
 * npx tsx scripts/check-prismic-data.ts es
 * npx tsx scripts/check-prismic-data.ts en
 */

import { createClient } from '../prismicio'
import type { AboutusDocument } from '../prismicio-types'

const lang = process.argv[2] || 'es'
const prismicLang = lang === 'es' ? 'es-ar' : 'en-us'

console.log(`\n🔍 Verificando datos de Prismic para idioma: ${prismicLang}\n`)
console.log('━'.repeat(80))

async function checkPrismicData() {
  const client = createClient()

  try {
    // Obtener el documento aboutus
    const aboutDocument: AboutusDocument = await client.getSingle("aboutus", { 
      lang: prismicLang
    })

    console.log(`\n✅ Documento "aboutus" encontrado\n`)
    console.log(`📦 Total de slices en el documento: ${aboutDocument.data.slices.length}`)
    console.log(`\nSlices encontrados:`)
    aboutDocument.data.slices.forEach((slice, index) => {
      console.log(`  ${index + 1}. ${slice.slice_type} (variation: ${slice.variation})`)
    })

    // Buscar el slice de founder
    console.log('\n' + '━'.repeat(80))
    console.log('\n👑 FOUNDER (Fundadora)\n')
    
    const founderSlice = aboutDocument.data.slices.find(slice => slice.slice_type === 'founder')
    
    if (founderSlice && 'primary' in founderSlice) {
      console.log(`✅ Slice encontrado\n`)
      console.log(`Fundadora:`)
      console.log(`  • Nombre: ${founderSlice.primary.name || '(vacío)'}`)
      console.log(`  • Rol: ${founderSlice.primary.role || '(vacío)'}`)
      console.log(`  • Experiencia: ${founderSlice.primary.experience || '(vacío)'}`)
      console.log(`  • Bio: ${founderSlice.primary.bio ? founderSlice.primary.bio.substring(0, 60) + '...' : '(vacío)'}`)
      console.log(`  • Instagram: ${founderSlice.primary.instagram || '(vacío)'}`)
      console.log(`  • Año de fundación: ${founderSlice.primary.founded_year || '(vacío)'}`)
      console.log(`  • Imagen: ${founderSlice.primary.picture?.url ? '✓ Presente' : '✗ Faltante'}`)
      console.log()
    } else {
      console.log('❌ Slice "founder" NO encontrado en el documento')
      console.log('\n💡 Verificá en Prismic que:')
      console.log('   1. El slice "Founder" existe en el custom type "aboutus"')
      console.log('   2. El slice está agregado al documento en el idioma correcto')
      console.log('   3. El documento está publicado (no en draft)')
    }

    // Buscar el slice de permanent staff
    console.log('\n' + '━'.repeat(80))
    console.log('\n👥 PERMANENT STAFF (Nuestro Equipo)\n')
    
    const permanentStaffSlice = aboutDocument.data.slices.find(slice => slice.slice_type === 'permanent_staff')
    
    if (permanentStaffSlice && 'primary' in permanentStaffSlice) {
      const artists = permanentStaffSlice.primary.artists || []
      console.log(`✅ Slice encontrado con ${artists.length} artista(s)\n`)
      
      if (artists.length === 0) {
        console.log('⚠️  El slice existe pero no tiene artistas cargados')
      } else {
        artists.forEach((artista, index) => {
          console.log(`Artista ${index + 1}:`)
          console.log(`  • Nombre: ${artista.name || '(vacío)'}`)
          console.log(`  • Categoría: ${artista.category || '(vacío)'}`)
          console.log(`  • Experiencia: ${artista.experience || '(vacío)'}`)
          console.log(`  • Bio: ${artista.bio ? artista.bio.substring(0, 60) + '...' : '(vacío)'}`)
          console.log(`  • Instagram: ${artista.instagram || '(vacío)'}`)
          console.log(`  • Imagen: ${artista.picture?.url ? '✓ Presente' : '✗ Faltante'}`)
          console.log()
        })
      }
    } else {
      console.log('❌ Slice "permanent_staff" NO encontrado en el documento')
      console.log('\n💡 Verificá en Prismic que:')
      console.log('   1. El slice "Permanent Staff" existe en el custom type "aboutus"')
      console.log('   2. El slice está agregado al documento en el idioma correcto')
      console.log('   3. El documento está publicado (no en draft)')
    }

    // Buscar el slice de guest artists
    console.log('━'.repeat(80))
    console.log('\n🎨 GUEST ARTISTS (Artistas Invitados)\n')
    
    const guestArtistsSlice = aboutDocument.data.slices.find(slice => slice.slice_type === 'guest_artists')
    
    if (guestArtistsSlice && 'primary' in guestArtistsSlice) {
      const artists = guestArtistsSlice.primary.artists || []
      console.log(`✅ Slice encontrado con ${artists.length} artista(s)\n`)
      
      if (artists.length === 0) {
        console.log('⚠️  El slice existe pero no tiene artistas cargados')
      } else {
        artists.forEach((artista, index) => {
          console.log(`Artista invitado ${index + 1}:`)
          console.log(`  • Nombre: ${artista.name || '(vacío)'}`)
          console.log(`  • Categoría: ${artista.category || '(vacío)'}`)
          console.log(`  • Schedule: ${artista.schedule || '(vacío)'}`)
          console.log(`  • Bio: ${artista.bio ? artista.bio.substring(0, 60) + '...' : '(vacío)'}`)
          console.log(`  • Instagram: ${artista.instagram || '(vacío)'}`)
          console.log(`  • Imagen: ${artista.picture?.url ? '✓ Presente' : '✗ Faltante'}`)
          console.log()
        })
      }
    } else {
      console.log('❌ Slice "guest_artists" NO encontrado en el documento')
      console.log('\n💡 Verificá en Prismic que:')
      console.log('   1. El slice "Guest Artists" existe en el custom type "aboutus"')
      console.log('   2. El slice está agregado al documento en el idioma correcto')
      console.log('   3. El documento está publicado (no en draft)')
    }

    console.log('━'.repeat(80))
    console.log('\n✨ Verificación completada\n')

  } catch (error) {
    console.error('\n❌ Error al consultar Prismic:\n')
    if (error instanceof Error) {
      console.error(`   ${error.message}\n`)
      
      if (error.message.includes('404')) {
        console.log('💡 El documento "aboutus" no existe para el idioma:', prismicLang)
        console.log('   Verificá que existe un documento en Prismic con ese idioma')
      } else if (error.message.includes('Unauthorized')) {
        console.log('💡 Problema de autenticación con Prismic')
        console.log('   Verificá la variable NEXT_PUBLIC_PRISMIC_ENVIRONMENT en .env.local')
      }
    } else {
      console.error(error)
    }
    console.log()
  }
}

checkPrismicData()
