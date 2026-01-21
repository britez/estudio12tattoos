"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, CheckCircle, User, Palette, MessageSquare, Phone, MessageCircle } from 'lucide-react'
import ArtistSelection from './components/ArtistSelection'
import StyleSelection from './components/StyleSelection'  
import ProjectDetails from './components/ProjectDetails'
import ContactInfo from './components/ContactInfo'
import SuccessStep from './components/SuccessStep'

interface BookingData {
  artist?: {
    id: string
    name: string
    specialties: string[]
    image: string
  }
  style?: string
  description?: string
  budget?: string
  name?: string
  email?: string
  phone?: string
  preferredDate?: string
  additionalNotes?: string
}

interface BookingWizardProps {
  dict: any
  lang: string
  artists: Array<{
    id: string
    name: string
    specialties: string[]
    image: string
    instagram?: string
  }>
}

const steps = [
  { id: 'artist', icon: User },
  { id: 'style', icon: Palette },
  { id: 'details', icon: MessageSquare },
  { id: 'contact', icon: Phone }
]

export default function BookingWizard({ dict, lang, artists }: BookingWizardProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [bookingData, setBookingData] = useState<BookingData>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData(prev => ({ ...prev, ...data }))
  }

  const canProceedToNext = () => {
    switch (currentStep) {
      case 0: return bookingData.artist !== undefined
      case 1: return bookingData.style !== undefined && bookingData.style !== ''
      case 2: return bookingData.description !== undefined && bookingData.description.trim() !== ''
      case 3: return bookingData.name && bookingData.email && bookingData.phone
      default: return false
    }
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    // Formatear el mensaje de WhatsApp
    const message = dict.whatsapp.message_template
      .replace('{artist}', bookingData.artist?.name || '')
      .replace('{instagram}', bookingData.artist?.instagram ? `@${bookingData.artist.instagram}` : 'N/A')
      .replace('{style}', bookingData.style || '')
      .replace('{description}', bookingData.description || '')
      .replace('{name}', bookingData.name || '')
      .replace('{email}', bookingData.email || '')
      .replace('{phone}', bookingData.phone || '')
      .replace('{date}', bookingData.preferredDate || 'No especificada')
    
    // Crear URL de WhatsApp
    const whatsappUrl = `https://wa.me/${dict.whatsapp.phone_number.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`
    
    // Simular un pequeño delay para mostrar el estado de carga
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Abrir WhatsApp
    window.open(whatsappUrl, '_blank')
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return <SuccessStep dict={dict} lang={lang} />
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <ArtistSelection 
            dict={dict}
            selectedArtist={bookingData.artist}
            onArtistSelect={(artist) => updateBookingData({ artist })}
            artists={artists}
          />
        )
      case 1:
        return (
          <StyleSelection
            dict={dict}
            selectedStyle={bookingData.style}
            onStyleSelect={(style) => updateBookingData({ style })}
          />
        )
      case 2:
        return (
          <ProjectDetails
            dict={dict}
            data={bookingData}
            onUpdate={updateBookingData}
          />
        )
      case 3:
        return (
          <ContactInfo
            dict={dict}
            data={bookingData}
            onUpdate={updateBookingData}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="bg-white rounded-sm shadow-sm overflow-hidden">
      {/* Progress indicator */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = index === currentStep
            const isCompleted = index < currentStep
            
            return (
              <div key={step.id} className="flex items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center transition-all
                  ${isActive ? 'bg-black text-white' : isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}
                `}>
                  {isCompleted ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </div>
                
                {index < steps.length - 1 && (
                  <div className={`
                    w-12 md:w-20 h-0.5 mx-2
                    ${index < currentStep ? 'bg-green-500' : 'bg-gray-200'}
                  `} />
                )}
              </div>
            )
          })}
        </div>
        
        <div className="text-center mb-2">
          <span className="text-sm text-gray-500 font-[family-name:var(--font-asap)]">
            {dict.navigation.step_counter.replace('{{current}}', (currentStep + 1).toString()).replace('{{total}}', steps.length.toString())}
          </span>
        </div>
        
        <div className="text-center">
          <h2 className="text-lg font-semibold font-[family-name:var(--font-forma)]">
            {dict.steps[steps[currentStep].id].title}
          </h2>
        </div>
        
        <p className="text-sm text-gray-600 mt-1 font-[family-name:var(--font-asap)]">
          {dict.steps[steps[currentStep].id].description}
        </p>
      </div>

      {/* Step content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="px-6 py-4 bg-black border-t border-gray-800 flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-sm border border-white/20 text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed disabled:border-white font-[family-name:var(--font-asap)]"
        >
          <ChevronLeft className="w-4 h-4" />
          {dict.navigation.previous}
        </button>

        {currentStep === steps.length - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={!canProceedToNext() || isSubmitting}
            className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-sm hover:bg-green-700 disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed font-[family-name:var(--font-asap)]"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {dict.navigation.sending}
              </>
            ) : (
              <>
                <MessageCircle className="w-4 h-4" />
                {dict.navigation.send_whatsapp}
              </>
            )}
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={!canProceedToNext()}
            className="flex items-center gap-2 px-6 py-2 bg-white text-black rounded-sm hover:bg-gray-100 disabled:bg-white disabled:text-gray-400 disabled:cursor-not-allowed font-[family-name:var(--font-asap)]"
          >
            {dict.navigation.next}
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}