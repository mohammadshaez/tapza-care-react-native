import { z } from "zod";

const isoDateString = z
  .string()
  .refine((value) => !Number.isNaN(Date.parse(value)), {
    message: "Value must be a valid ISO-8601 date-time string.",
  });

export const SlotSchema = z.object({
  id: z.string().trim().min(1),
  doctorId: z.string().trim().min(1),
  startsAt: isoDateString,
  endsAt: isoDateString,
  available: z.boolean(),
});

export const SlotArraySchema = z.array(SlotSchema).superRefine((slots, ctx) => {
  const ids = new Set<string>();
  for (const slot of slots) {
    if (ids.has(slot.id)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Duplicate slot id: ${slot.id}`,
        path: [slots.indexOf(slot), "id"],
      });
    }
    ids.add(slot.id);
  }
});
