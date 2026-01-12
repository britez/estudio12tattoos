import type React from 'react'
import type { Locale } from './dictionaries'

export interface PageProps<T extends string> {
  params: Promise<{ lang: Locale }>
}

export interface LayoutProps<T extends string> {
  children: React.ReactNode
  params: Promise<{ lang: Locale }>
}