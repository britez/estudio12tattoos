"use client"

import Image from "next/image"
import { useState } from "react"

interface ImageWithSkeletonProps {
  src: string
  alt: string
  title: string
  category: string
}

export function ImageWithSkeleton({ src, alt, title, category }: ImageWithSkeletonProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      {/* Skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-muted animate-pulse">
          <div className="absolute bottom-6 left-6 right-6 space-y-2">
            <div className="h-3 w-20 bg-muted-foreground/20 rounded" />
            <div className="h-4 w-32 bg-muted-foreground/20 rounded" />
          </div>
        </div>
      )}

      {/* Image */}
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        fill
        className={`object-cover transition-all duration-500 group-hover:scale-105 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={() => setIsLoading(false)}
      />

      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Text content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <p className="text-xs font-medium mb-1 text-white/80">{category}</p>
        <h3 className="text-lg font-semibold text-balance">{title}</h3>
      </div>
    </>
  )
}
