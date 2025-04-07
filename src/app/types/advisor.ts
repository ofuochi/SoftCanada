import { Booking } from "./booking";

export interface Advisor {
  id: string;
  name: string;
  title: string;
  email: string;
  rating?: number;
  booking: Booking[];
  isVerified: boolean;
  advisorType: string[];
  expertise: Expertise[];
  profilePictureUrl: string;
}

export interface Expertise {
  id: string;
  areaOfExpertise: string;
  yearsOfExperience: number;
}

