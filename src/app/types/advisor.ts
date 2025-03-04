import { Booking } from "./booking"

export interface Advisor {
  id: string
  name: string
  isVerified: boolean
  title: string
  email: string
  rating?: number
  profilePictureUrl: string
  expertise: Expertise[]
  booking: Booking[]
}

export interface Expertise {
  id: string
  areaOfExpertise: string
  yearsOfExperience: number
}

