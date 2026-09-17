export type BookingStatus = "pending" | "confirmed";

export type Booking = {
  id: string;
  doctorId: string;
  slotId: string;
  status: BookingStatus;
  createdAt: string;
};

export type CreateBookingInput = {
  doctorId: string;
  slotId: string;
};

export type CreateBookingRequest = CreateBookingInput;
