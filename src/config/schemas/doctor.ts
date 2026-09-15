import { z } from "zod";

export const DoctorSchema = z.object({
  id: z.string().trim().min(1),
  name: z.string().trim().min(1),
  specialty: z.string().trim().min(1),
  photoUrl: z.string().url(),
  feeInr: z.number().nonnegative(),
  languages: z.array(z.string().trim().min(1)).min(1),
});

export const DoctorArraySchema = z
  .array(DoctorSchema)
  .superRefine((doctors, ctx) => {
    const ids = new Set<string>();
    for (const doctor of doctors) {
      if (ids.has(doctor.id)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Duplicate doctor id: ${doctor.id}`,
          path: [doctors.indexOf(doctor), "id"],
        });
      }
      ids.add(doctor.id);
    }
  });
