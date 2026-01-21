"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle, MessageCircle, Home } from 'lucide-react'

interface SuccessStepProps {
  dict: any
  lang: string
}

export default function SuccessStep({ dict, lang }: SuccessStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-12"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
      >
        <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-forma)]">
          {dict.success.title}
        </h2>
        
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto font-[family-name:var(--font-asap)]">
          {dict.success.message}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-4"
      >
        {/* WhatsApp link */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 inline-block">
          <p className="text-green-800 font-[family-name:var(--font-asap)] mb-3">
            {dict.success.whatsapp_message}
          </p>
          <a
            href="https://wa.me/5491171601995"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-sm hover:bg-green-700 transition-colors font-[family-name:var(--font-asap)]"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
        </div>

        {/* Botón volver al inicio */}
        <div>
          <Link
            href={`/${lang}`}
            className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-sm hover:bg-gray-800 transition-colors font-[family-name:var(--font-asap)]"
          >
            <Home className="w-4 h-4" />
            {dict.success.back_home}
          </Link>
        </div>
      </motion.div>

      {/* Información adicional */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 bg-gray-50 rounded-sm p-6 max-w-2xl mx-auto"
      >
        <h3 className="font-semibold text-gray-900 mb-4 font-[family-name:var(--font-forma)]">
          Mientras esperás...
        </h3>
        <div className="space-y-3 text-sm text-gray-600 font-[family-name:var(--font-asap)]">
          <p>
            • Podés seguirnos en <strong>@estudio12tattoos</strong> para ver nuestros trabajos más recientes
          </p>
          <p>
            • Si tenés más referencias o ideas, guardálas para compartir en nuestra consulta
          </p>
          <p>
            • Recordá que la consulta inicial es gratuita y sin compromiso
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}