import Image from "next/image"

interface FooterProps {
  dict: {
    footer: {
      tagline: string
      copyright: string
      social: {
        instagram_alt: string
        whatsapp_alt: string
        email_alt: string
      }
    }
  }
}

export function Footer({ dict }: FooterProps) {
  return (
    <footer className="border-t border-border py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
            <div className="relative w-[120px] h-[35px] mb-2">
              <Image src="/logo-estudio12-clean.png" alt="estudio12 logo" fill className="object-contain" />
            </div>
            <p className="text-sm text-muted-foreground">{dict.footer.tagline}</p>
          </div>
          <div className="flex gap-4 items-center">
            <a
              href="https://www.instagram.com/estudio.12_/?hl=es"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
            >
              <Image src="/social-icons/instagram.png" alt={dict.footer.social.instagram_alt} width={32} height={32} className="w-8 h-8" />
            </a>
            <a
              href="https://wa.me/5491171601995"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
            >
              <Image src="/social-icons/whatsapp.png" alt={dict.footer.social.whatsapp_alt} width={32} height={32} className="w-8 h-8" />
            </a>
            <a href="mailto:estudio12.tattoos@gmail.com" className="hover:opacity-70 transition-opacity">
              <Image src="/social-icons/email.png" alt={dict.footer.social.email_alt} width={32} height={32} className="w-8 h-8" />
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border text-center text-xs text-muted-foreground">
          <p>{dict.footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
