"use client"

import { motion } from 'framer-motion'

interface BookingData {
  description?: string
  budget?: string
  additionalNotes?: string
}

interface ProjectDetailsProps {
  dict: any
  data: BookingData
  onUpdate: (data: Partial<BookingData>) => void
}

export default function ProjectDetails({ dict, data, onUpdate }: ProjectDetailsProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 text-left"
    >
      <div className="space-y-4">
        {/* Descripción del tatuaje */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 font-[family-name:var(--font-asap)]">
            {dict.form.tattoo_description} *
          </label>
          <textarea
            value={data.description || ''}
            onChange={(e) => onUpdate({ description: e.target.value })}
            placeholder={dict.form.tattoo_description_placeholder}
            className="w-full p-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-black focus:border-transparent resize-none h-32 font-[family-name:var(--font-asap)]"
            required
          />
        </div>

        {/* Presupuesto */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 font-[family-name:var(--font-asap)]">
            {dict.form.budget}
          </label>
          <input
            type="text"
            value={data.budget || ''}
            onChange={(e) => onUpdate({ budget: e.target.value })}
            placeholder={dict.form.budget_placeholder}
            className="w-full p-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-black focus:border-transparent font-[family-name:var(--font-asap)]"
          />
          <p className="text-xs text-gray-500 mt-1 font-[family-name:var(--font-asap)]">
            Opcional - Nos ayuda a darte una mejor estimación
          </p>
        </div>

        {/* Notas adicionales */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 font-[family-name:var(--font-asap)]">
            {dict.form.additional_notes}
          </label>
          <textarea
            value={data.additionalNotes || ''}
            onChange={(e) => onUpdate({ additionalNotes: e.target.value })}
            placeholder={dict.form.additional_notes_placeholder}
            className="w-full p-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-black focus:border-transparent resize-none h-24 font-[family-name:var(--font-asap)]"
          />
        </div>
      </div>

      {/* Información adicional */}
      <div className="bg-blue-50 border border-blue-200 rounded-sm p-4">
        <h4 className="font-semibold text-blue-900 mb-2 font-[family-name:var(--font-forma)]">
          💡 Consejos para describir tu tatuaje:
        </h4>
        <ul className="text-sm text-blue-800 space-y-1 font-[family-name:var(--font-asap)]">
          <li>• Incluye el tamaño aproximado (ej: 10cm x 15cm)</li>
          <li>• Menciona la ubicación en el cuerpo</li>
          <li>• Describe los colores que preferís</li>
          <li>• Adjunta referencias si las tenés</li>
          <li>• Mencioná si es tu primer tatuaje</li>
        </ul>
      </div>
    </motion.div>
  )
}