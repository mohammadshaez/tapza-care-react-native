import type { Booking, CreateBookingInput } from "@/types/booking";
import type { Doctor } from "@/types/doctor";
import type { LayoutConfig } from "@/types/config";
import type { Prescription } from "@/types/prescription";
import type { Slot } from "@/types/slot";

export interface ApiClient {
  getConfig(): Promise<LayoutConfig>;
  getDoctors(): Promise<Doctor[]>;
  getSlots(doctorId: string, date: string): Promise<Slot[]>;
  createBooking(input: CreateBookingInput): Promise<Booking>;
  getPrescriptions(): Promise<Prescription[]>;
}
