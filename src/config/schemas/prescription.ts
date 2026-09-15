import { z } from "zod";

export const MedicineTimingSchema = z.enum(["morning", "afternoon", "night"]);

export const MedicineSchema = z.object({
  id: z.string().trim().min(1),
  name: z.string().trim().min(1),
  dose: z.string().trim().min(1),
  days: z.number().int().positive(),
  timing: z.array(MedicineTimingSchema).min(1),
});

export const PrescriptionSchema = z.object({
  id: z.string().trim().min(1),
  issuedAt: z.string().refine((value) => !Number.isNaN(Date.parse(value)), {
    message: "Value must be a valid ISO-8601 date-time string.",
  }),
  doctorName: z.string().trim().min(1),
  clinicName: z.string().trim().min(1),
  medicines: z.array(MedicineSchema).min(1),
});

export const PrescriptionArraySchema = z.array(PrescriptionSchema);
