export interface Destination {
  id: string
  slug: string
  title: string
  subtitle: string
  description: string
  longDescription?: string
  image: string
  gallery?: string[]
  date: string
  location: string
  era: string
  duration: string
  price: string
  highlights?: string[]
  included?: string[]
  safetyRating: "low" | "medium" | "high"
  availability: "available" | "limited" | "sold-out"
  featured?: boolean
}

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export interface BookingInquiry {
  destinationId: string
  name: string
  email: string
  travelers: number
  preferredDate: string
  message?: string
}
