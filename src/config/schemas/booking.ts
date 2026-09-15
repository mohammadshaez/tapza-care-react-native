import { z } from "zod";

export const BookingStatusSchema = z.enum(["pending", "confirmed"]);

export const BookingSchema = z.object({
  id: z.string().trim().min(1),
  doctorId: z.string().trim().min(1),
  slotId: z.string().trim().min(1),
  status: BookingStatusSchema,
  createdAt: z.string().refine((value) => !Number.isNaN(Date.parse(value)), {
    message: "Value must be a valid ISO-8601 date-time string.",
  }),
});

export const CreateBookingInputSchema = z.object({
  doctorId: z.string().trim().min(1),
  slotId: z.string().trim().min(1),
});
