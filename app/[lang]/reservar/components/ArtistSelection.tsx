"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Star } from 'lucide-react'

interface Artist {
  id: string
  name: string
  specialties: string[]
  image: string
  instagram?: string
}

interface ArtistSelectionProps {
  dict: any
  selectedArtist?: Artist
  onArtistSelect: (artist: Artist) => void
  artists: Artist[]
}

export default function ArtistSelection({ dict, selectedArtist, onArtistSelect, artists }: ArtistSelectionProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-gray-600 font-[family-name:var(--font-asap)]">
          {dict.artists.select_prompt}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {artists.map((artist, index) => (
          <motion.div
            key={artist.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`
              relative p-4 rounded-sm border-2 cursor-pointer transition-all hover:shadow-md
              ${selectedArtist?.id === artist.id ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'}
            `}
            onClick={() => onArtistSelect(artist)}
          >
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                {artist.image ? (
                  <Image 
                    src={artist.image} 
                    alt={artist.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                    <Star className="w-6 h-6 text-gray-500" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-lg font-[family-name:var(--font-forma)]">
                  {artist.name}
                </h3>
                
                {artist.instagram && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(`https://instagram.com/${artist.instagram.replace("@", "")}`, '_blank')
                    }}
                    className="text-xs text-black hover:text-gray-600 font-[family-name:var(--font-asap)] mb-2 block"
                  >
                    {artist.instagram}
                  </button>
                )}
                
                <div className="mt-1">
                  <div className="flex flex-wrap gap-1 justify-start">
                    {artist.specialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 text-xs bg-gray-100 rounded-full text-gray-700 font-[family-name:var(--font-asap)]"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {selectedArtist?.id === artist.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-2 right-2 w-6 h-6 bg-black rounded-full flex items-center justify-center"
              >
                <div className="w-2 h-2 bg-white rounded-full" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}