export * from './flight'
// Common utility types
export type ApiResponse<T> = {
  data: T
  message?: string
  status: number
  success: boolean
}

export type PaginatedResponse<T> = ApiResponse<{
  items: T[]
  total: number
  page: number
  limit: number
  hasNext: boolean
  hasPrev: boolean
}>

export type ErrorResponse = {
  message: string
  code: string
  details?: unknown
  status: number
}

export type QueryParams = {
  page?: number
  limit?: number
  sort?: string
  order?: 'asc' | 'desc'
  search?: string
  filters?: Record<string, unknown>
}

export type Theme = 'light' | 'dark' | 'system'
export type Language = 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ru' | 'zh' | 'ja' | 'ko' | 'ar'
export type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CAD' | 'AUD' | 'CHF' | 'CNY' | 'INR' | 'BRL'

export interface Coordinates {
  latitude: number
  longitude: number
}

export interface TimeRange {
  start: string
  end: string
}

export interface PriceRange {
  min: number
  max: number
  currency: string
}

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface FileUpload {
  id: string
  name: string
  type: string
  size: number
  url: string
  uploadedAt: string
}

export interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  read: boolean
  createdAt: string
  action?: {
    label: string
    url: string
  }
}

export interface BreadcrumbItem {
  label: string
  href: string
  current?: boolean
}

export interface SEOData {
  title: string
  description: string
  keywords: string[]
  image?: string
  canonical?: string
}

export interface AnalyticsEvent {
  category: string
  action: string
  label?: string
  value?: number
}

export interface SystemConfig {
  maintenance: boolean
  version: string
  environment: 'development' | 'staging' | 'production'
  features: Record<string, boolean>
  limits: Record<string, number>
}