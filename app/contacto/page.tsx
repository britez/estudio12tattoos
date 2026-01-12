import { Instagram, MessageCircle, Mail, MapPin, Phone } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contacto - Agenda tu Consulta Gratuita",
  description:
    "Contáctanos para agendar una consulta gratuita. Estamos en Buenos Aires. Respuesta rápida por WhatsApp e Instagram.",
  openGraph: {
    title: "Contacto - estudio12 Tatuajes",
    description:
      "Agenda tu consulta gratuita. Contáctanos por WhatsApp, Instagram o completa nuestro formulario. Respuesta rápida garantizada.",
    images: ["/logo-estudio12.jpg"],
  },
}

export default function ContactoPage() {
  return (
    <div className="min-h-screen">
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Hablemos de tu idea</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Completa el formulario o contáctanos directamente por WhatsApp o Instagram. Respondemos todas las
              consultas.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-black border border-zinc-800 rounded-sm p-8">
              <h2 className="text-2xl font-bold mb-6 text-white">Envíanos un mensaje</h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-white">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 text-white rounded-sm focus:outline-none focus:ring-2 focus:ring-white"
                    placeholder="Tu nombre"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 text-white rounded-sm focus:outline-none focus:ring-2 focus:ring-white"
                    placeholder="tu@email.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2 text-white">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 text-white rounded-sm focus:outline-none focus:ring-2 focus:ring-white"
                    placeholder="+54 9 11 1234-5678"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-white">
                    Cuéntanos tu idea
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 text-white rounded-sm focus:outline-none focus:ring-2 focus:ring-white resize-none"
                    placeholder="Describe el tatuaje que tienes en mente, estilo preferido, tamaño aproximado..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-white text-black py-3 rounded-sm font-medium hover:bg-zinc-200 transition-colors"
                >
                  Enviar mensaje
                </button>
              </form>
            </div>

            {/* Información de contacto */}
            <div className="space-y-8">
              <div className="bg-card border border-border rounded-sm p-8">
                <h2 className="text-2xl font-bold mb-6">Información de contacto</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 mt-1 text-muted-foreground shrink-0" />
                    <div>
                      <p className="font-medium">Dirección</p>
                      <p className="text-muted-foreground">
                        Humberto 1° 985, piso 12
                        <br />
                        Buenos Aires, Argentina
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 mt-1 text-muted-foreground shrink-0" />
                    <div>
                      <p className="font-medium">Teléfono</p>
                      <p className="text-muted-foreground">+549 11 71601995</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 mt-1 text-muted-foreground shrink-0" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">estudio12.tattoos@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Redes sociales */}
              <div className="bg-black rounded-sm p-8">
                <h3 className="text-xl font-bold mb-6 text-white">Síguenos en redes</h3>
                <div className="space-y-4">
                  <a
                    href="https://www.instagram.com/estudio.12_/?hl=es"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-zinc-900 border border-zinc-800 rounded-sm hover:bg-zinc-800 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <Instagram className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Instagram</p>
                      <p className="text-sm text-zinc-400">@estudio.12_</p>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/5491171601995"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-zinc-900 border border-zinc-800 rounded-sm hover:bg-zinc-800 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-white">WhatsApp</p>
                      <p className="text-sm text-zinc-400">+549 11 71601995</p>
                    </div>
                  </a>
                </div>

                <p className="text-sm text-zinc-400 mt-6 leading-relaxed">
                  Respuesta rápida por WhatsApp de Lun a Sab, 10:00 - 20:00 hs
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <div className="bg-card border border-border rounded-sm overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.7654321!2d-58.3816!3d-34.6158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccac2f0e3d5b1%3A0x0!2sHumberto%201%C2%B0%20985%2C%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1234567890"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Estudio 12 Tattoos"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 text-white">Nuestros trabajos</h2>

          <div className="relative overflow-hidden">
            <div className="flex gap-6 animate-scroll-infinite pause-animation">
              {/* Primera serie de imágenes */}
              <div className="flex gap-6 shrink-0">
                <img
                  src="/polynesian-hand-tattoo.webp"
                  alt="Tatuaje polinesio"
                  className="h-96 w-auto object-cover rounded-sm"
                />
                <img
                  src="/tattoo-artist-working-panoramic-view.webp"
                  alt="Artista trabajando"
                  className="h-96 w-auto object-cover rounded-sm"
                />
                <img
                  src="/mandala-stencil-application.webp"
                  alt="Aplicación de stencil"
                  className="h-96 w-auto object-cover rounded-sm"
                />
                <img
                  src="/japanese-geisha-tattoo-colorful.webp"
                  alt="Tatuaje de geisha japonesa"
                  className="h-96 w-auto object-cover rounded-sm"
                />
                <img
                  src="/female-artist-working-natural-light.webp"
                  alt="Artista concentrada"
                  className="h-96 w-auto object-cover rounded-sm"
                />
                <img
                  src="/japanese-snake-cherry-blossom-forearm.webp"
                  alt="Serpiente japonesa"
                  className="h-96 w-auto object-cover rounded-sm"
                />
                <img
                  src="/studio-window-cityview-silhouette.webp"
                  alt="Vista del estudio"
                  className="h-96 w-auto object-cover rounded-sm"
                />
              </div>
              {/* Duplicado para scroll infinito */}
              <div className="flex gap-6 shrink-0">
                <img
                  src="/polynesian-hand-tattoo.webp"
                  alt="Tatuaje polinesio"
                  className="h-96 w-auto object-cover rounded-sm"
                />
                <img
                  src="/tattoo-artist-working-panoramic-view.webp"
                  alt="Artista trabajando"
                  className="h-96 w-auto object-cover rounded-sm"
                />
                <img
                  src="/mandala-stencil-application.webp"
                  alt="Aplicación de stencil"
                  className="h-96 w-auto object-cover rounded-sm"
                />
                <img
                  src="/japanese-geisha-tattoo-colorful.webp"
                  alt="Tatuaje de geisha japonesa"
                  className="h-96 w-auto object-cover rounded-sm"
                />
                <img
                  src="/female-artist-working-natural-light.webp"
                  alt="Artista concentrada"
                  className="h-96 w-auto object-cover rounded-sm"
                />
                <img
                  src="/japanese-snake-cherry-blossom-forearm.webp"
                  alt="Serpiente japonesa"
                  className="h-96 w-auto object-cover rounded-sm"
                />
                <img
                  src="/studio-window-cityview-silhouette.webp"
                  alt="Vista del estudio"
                  className="h-96 w-auto object-cover rounded-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
