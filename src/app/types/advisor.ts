export interface Advisor {
  id: string
  name: string
  email: string
  rating: number
  profilePictureUrl: string
  expertise: Expertise[]
  availabilities: Availability[]
  bookings: Booking[]
}

export interface Expertise {
  id: string
  name: string
  yearsOfExperience: any
  qualification: any
  motivationStatement: any
}

export interface Availability {
  id: string
  day: string
  timeSlots: TimeSlot[]
  dnd: string
}

export interface TimeSlot {
  id: string
  time: string
  status: string
}

export interface Booking {
  id: string
  clientEmail: string
  advisorId: string
  advisorName: any
  date: string
  availabilityId: any
  timeSlotId: any
  notes: string
}
