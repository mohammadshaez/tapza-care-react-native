import { z } from "zod";

const HomeActionSchema = z.enum([
  "book",
  "prescriptions",
  "reminders",
  "family",
]);

export const HeroBannerItemSchema = z
  .object({
    id: z.string().trim().min(1),
    greeting: z.string().trim().min(1),
    description: z.string().trim().min(1),
    imageUrl: z.url(),
    ctaLabel: z.string().trim().min(1).optional(),
    action: HomeActionSchema.optional(),
  })
  .strict();

export const CategoryChipItemSchema = z
  .object({
    id: z.string().trim().min(1),
    label: z.string().trim().min(1),
    icon: z.string().trim().min(1),
  })
  .strict();

export const QuickActionItemSchema = z
  .object({
    id: z.string().trim().min(1),
    label: z.string().trim().min(1),
    icon: z.string().trim().min(1),
    action: HomeActionSchema,
  })
  .strict();

export const ServiceGridItemSchema = z
  .object({
    id: z.string().trim().min(1),
    name: z.string().trim().min(1),
    priceInr: z.number().nonnegative(),
    imageUrl: z.url(),
    badge: z.string().trim().min(1).optional(),
    doctorId: z.string().trim().min(1).optional(),
  })
  .strict();

export const DoctorCarouselItemSchema = z
  .object({
    doctorId: z.string().trim().min(1),
    nextAvailableLabel: z.string().trim().min(1),
  })
  .strict();

export const OfferStripItemSchema = z
  .object({
    id: z.string().trim().min(1),
    message: z.string().trim().min(1),
  })
  .strict();

export const HeroBannerItemsSchema = z.array(HeroBannerItemSchema);

export const CategoryChipItemsSchema = z.array(CategoryChipItemSchema);

export const QuickActionItemsSchema = z.array(QuickActionItemSchema);

export const ServiceGridItemsSchema = z.array(ServiceGridItemSchema);

export const DoctorCarouselItemsSchema = z.array(DoctorCarouselItemSchema);

export const OfferStripItemsSchema = z.array(OfferStripItemSchema);
