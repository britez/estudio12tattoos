"use client"

import { motion } from 'framer-motion'
import { Palette, Heart, Compass, Droplets, Grid, Circle } from 'lucide-react'

interface StyleOption {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
  description: string
}

interface StyleSelectionProps {
  dict: any
  selectedStyle?: string
  onStyleSelect: (style: string) => void
}

export default function StyleSelection({ dict, selectedStyle, onStyleSelect }: StyleSelectionProps) {
  const styleOptions: StyleOption[] = [
    {
      id: 'realistic',
      name: dict.styles.realistic,
      icon: Heart,
      description: 'Técnica detallada que recrea imágenes con gran realismo'
    },
    {
      id: 'traditional',
      name: dict.styles.traditional,
      icon: Compass,
      description: 'Estilo clásico con líneas gruesas y colores sólidos'
    },
    {
      id: 'minimalist',
      name: dict.styles.minimalist,
      icon: Circle,
      description: 'Diseños simples y elegantes con líneas finas'
    },
    {
      id: 'geometric',
      name: dict.styles.geometric,
      icon: Grid,
      description: 'Patrones y formas geométricas precisas'
    },
    {
      id: 'watercolor',
      name: dict.styles.watercolor,
      icon: Droplets,
      description: 'Efecto de acuarela con colores difuminados'
    },
    {
      id: 'blackwork',
      name: dict.styles.blackwork,
      icon: Palette,
      description: 'Diseños en tinta negra sólida y contrastante'
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {styleOptions.map((style, index) => {
          const Icon = style.icon
          
          return (
            <motion.div
              key={style.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`
                relative p-6 rounded-sm border-2 cursor-pointer transition-all hover:shadow-md
                ${selectedStyle === style.id ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'}
              `}
              onClick={() => onStyleSelect(style.id)}
            >
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <Icon className={`w-8 h-8 ${selectedStyle === style.id ? 'text-black' : 'text-gray-600'}`} />
                </div>
                
                <h3 className="font-semibold text-lg mb-2 font-[family-name:var(--font-forma)]">
                  {style.name}
                </h3>
                
                <p className="text-sm text-gray-600 font-[family-name:var(--font-asap)]">
                  {style.description}
                </p>
              </div>
              
              {selectedStyle === style.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-3 right-3 w-6 h-6 bg-black rounded-full flex items-center justify-center"
                >
                  <div className="w-2 h-2 bg-white rounded-full" />
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>
      
      {/* Opción "Otro" */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className={`
          relative p-4 rounded-sm border-2 cursor-pointer transition-all hover:shadow-md
          ${selectedStyle === 'other' ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'}
        `}
        onClick={() => onStyleSelect('other')}
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center">
            <Palette className={`w-6 h-6 ${selectedStyle === 'other' ? 'text-black' : 'text-gray-600'}`} />
          </div>
          
          <div>
            <h3 className="font-semibold text-lg font-[family-name:var(--font-forma)]">
              {dict.styles.other}
            </h3>
            <p className="text-sm text-gray-600 font-[family-name:var(--font-asap)]">
              Tengo otra idea en mente
            </p>
          </div>
          
          {selectedStyle === 'other' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="ml-auto w-6 h-6 bg-black rounded-full flex items-center justify-center"
            >
              <div className="w-2 h-2 bg-white rounded-full" />
            </motion.div>
          )}
        </div>
      </motion.div>

    </div>
  )
}
