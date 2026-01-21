"use client"

import { motion } from 'framer-motion'

interface BookingData {
  name?: string
  email?: string
  phone?: string
  preferredDate?: string
}

interface ContactInfoProps {
  dict: any
  data: BookingData
  onUpdate: (data: Partial<BookingData>) => void
}

export default function ContactInfo({ dict, data, onUpdate }: ContactInfoProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 text-left"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 font-[family-name:var(--font-asap)]">
            {dict.form.name} *
          </label>
          <input
            type="text"
            value={data.name || ''}
            onChange={(e) => onUpdate({ name: e.target.value })}
            placeholder={dict.form.name_placeholder}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent font-[family-name:var(--font-asap)]"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 font-[family-name:var(--font-asap)]">
            {dict.form.email} *
          </label>
          <input
            type="email"
            value={data.email || ''}
            onChange={(e) => onUpdate({ email: e.target.value })}
            placeholder={dict.form.email_placeholder}
            className="w-full p-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-black focus:border-transparent font-[family-name:var(--font-asap)]"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Teléfono */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 font-[family-name:var(--font-asap)]">
            {dict.form.phone} *
          </label>
          <input
            type="tel"
            value={data.phone || ''}
            onChange={(e) => onUpdate({ phone: e.target.value })}
            placeholder={dict.form.phone_placeholder}
            className="w-full p-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-black focus:border-transparent font-[family-name:var(--font-asap)]"
            required
          />
        </div>

        {/* Fecha preferida */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 font-[family-name:var(--font-asap)]">
            {dict.form.preferred_date}
          </label>
          <input
            type="text"
            value={data.preferredDate || ''}
            onChange={(e) => onUpdate({ preferredDate: e.target.value })}
            placeholder={dict.form.preferred_date_placeholder}
            className="w-full p-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-black focus:border-transparent font-[family-name:var(--font-asap)]"
          />
        </div>
      </div>

      {/* Información sobre privacidad */}
      <div className="bg-gray-50 border border-gray-200 rounded-sm p-4">
        <h4 className="font-semibold text-gray-900 mb-2 font-[family-name:var(--font-forma)]">
          🔒 Tu privacidad es importante
        </h4>
        <p className="text-sm text-gray-600 font-[family-name:var(--font-asap)]">
          Toda tu información personal será tratada de forma confidencial y utilizada únicamente para coordinar tu cita de tatuaje. No compartimos datos con terceros.
        </p>
      </div>

      {/* Información sobre el proceso */}
      <div className="bg-green-50 border border-green-200 rounded-sm p-4">
        <h4 className="font-semibold text-green-900 mb-2 font-[family-name:var(--font-forma)]">
          ⏰ ¿Qué pasa después?
        </h4>
        <ul className="text-sm text-green-800 space-y-1 font-[family-name:var(--font-asap)]">
          <li>• Te contactaremos dentro de las 24 horas</li>
          <li>• Coordinaremos una consulta inicial (sin costo)</li>
          <li>• Revisaremos tu proyecto y haremos ajustes</li>
          <li>• Acordaremos fecha, precio y detalles finales</li>
        </ul>
      </div>
    </motion.div>
  )
}
