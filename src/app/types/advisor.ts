export interface PaginatedList {
  totalRecords: number
  pageNumber: number
  pageSize: number
  totalPages: number
  careerAdvisors: Advisor[]
}

export interface Advisor {
  id: string
  name: string
  email: string
  rating: number
  profilePictureName: any
  expertise: Expertise[]
  availabilities: Availability[]
  bookings: any
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
