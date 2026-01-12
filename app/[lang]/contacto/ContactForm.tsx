"use client"

import { FormEvent } from "react"

interface ContactFormProps {
  dict: any
}

export default function ContactForm({ dict }: ContactFormProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const message = formData.get('message') as string
    
    // Componer el mensaje para WhatsApp
    const whatsappMessage = `${dict.contact.form.whatsapp_intro}

*${dict.contact.form.name_label}:* ${name}
*${dict.contact.form.email_label}:* ${email}
${phone ? `*${dict.contact.form.phone_label}:* ${phone}\n` : ''}
*${dict.contact.form.message_label}:*
${message}`
    
    // Número de WhatsApp (sin espacios ni guiones)
    const whatsappNumber = '5491171601995'
    
    // Crear URL de WhatsApp con el mensaje
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`
    
    // Abrir WhatsApp
    window.open(whatsappURL, '_blank')
  }

  return (
    <div className="bg-black border border-zinc-800 rounded-sm p-8">
      <h2 className="text-2xl font-bold mb-6 text-white">{dict.contact.form.title}</h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2 text-white">
            {dict.contact.form.name_label}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 text-white rounded-sm focus:outline-none focus:ring-2 focus:ring-white"
            placeholder={dict.contact.form.name_placeholder}
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2 text-white">
            {dict.contact.form.email_label}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 text-white rounded-sm focus:outline-none focus:ring-2 focus:ring-white"
            placeholder={dict.contact.form.email_placeholder}
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2 text-white">
            {dict.contact.form.phone_label}
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 text-white rounded-sm focus:outline-none focus:ring-2 focus:ring-white"
            placeholder={dict.contact.form.phone_placeholder}
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2 text-white">
            {dict.contact.form.message_label}
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 text-white rounded-sm focus:outline-none focus:ring-2 focus:ring-white resize-none"
            placeholder={dict.contact.form.message_placeholder}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-white text-black py-3 rounded-sm font-medium hover:bg-zinc-200 transition-colors"
        >
          {dict.contact.form.submit_button}
        </button>
      </form>
    </div>
  )
}
