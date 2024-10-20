export interface SvgTypes {
  className?: string
  color?: string
  width?: number
  height?: number
  onClick?: () => void
}

export interface VisitorsType {
  id: number
  page_views: number[]
  unique_visitors: number[]
  bounce_rate: number[]
  avg_session_duration: number[]
  dates: string[]
}

export interface VisitorsType2 {
  id: number
  page_views: number
  unique_visitors: number
  bounce_rate: number
  avg_session_duration: number
  dates: string
}

export interface CustomerType {
  id: number
  customer_name: string
  email: string
  signup_date: string
  last_activity: string
  password?: string
}

export interface registerType {
  customer_name: string
  email: string
  password: string
  retypedPassword: string
}
