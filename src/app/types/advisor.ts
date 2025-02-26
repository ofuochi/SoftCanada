import { Booking } from "./booking"

export interface Advisor {
  id: string
  name: string
  title: string
  email: string
  rating?: number
  profilePictureUrl: string
  expertise: Expertise[]
  booking: Booking[]
}

export interface Expertise {
  id: string
  name: string
  yearsOfExperience: any
  qualification: any
  motivationStatement: any
}

