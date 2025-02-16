import { Advisor } from "./advisor";

export interface Booking {
  id: string;
  clientEmail: string;
  startDate: Date,
  endDate: Date,
  advisor: Advisor;
  status: string;
  notes: any;
  createdAt: string;
}
