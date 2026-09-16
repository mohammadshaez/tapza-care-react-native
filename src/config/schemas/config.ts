import { z } from "zod";

import { ColorSchema } from "@/config/schemas/color";
import { GradientValueSchema } from "@/config/schemas/gradient";

export const AppScreenSchema = z.enum([
  "home",
  "bookings",
  "prescriptions",
  "profile",
]);

export const FestivalSchema = z
  .object({
    name: z.string().trim().min(1),
    greeting: z.string().trim().min(1),
    bannerImageUrl: z.url(),
  })
  .strict();

export const LayoutThemeSchema = z
  .object({
    primary: ColorSchema,
    secondary: ColorSchema,
    background: ColorSchema,
    surface: ColorSchema,
    textPrimary: ColorSchema,
    textSecondary: ColorSchema,
    accent: ColorSchema,
    festival: FestivalSchema,
  })
  .strict();

export const LayoutTabSchema = z
  .object({
    id: z.string().trim().min(1),
    label: z.string().trim().min(1),
    icon: z.string().trim().min(1),
    screen: AppScreenSchema,
  })
  .strict();

export const SectionBackgroundSchema = z.discriminatedUnion("kind", [
  z
    .object({
      kind: z.literal("color"),
      value: ColorSchema,
    })
    .strict(),
  z
    .object({
      kind: z.literal("gradient"),
      value: GradientValueSchema,
    })
    .strict(),
  z
    .object({
      kind: z.literal("image"),
      value: z.url(),
    })
    .strict(),
]);

export const LayoutSectionSchema = z
  .object({
    id: z.string().trim().min(1),
    type: z.string().trim().min(1),
    background: SectionBackgroundSchema,
    title: z.string().trim().min(1),
    items: z.array(z.unknown()),
  })
  .strict();

export const LayoutConfigSchema = z
  .object({
    version: z.number().int().positive(),
    theme: LayoutThemeSchema,
    tabs: z.array(LayoutTabSchema).min(1),
    sections: z.array(LayoutSectionSchema),
  })
  .strict()
  .superRefine((config, context) => {
    const tabIds = new Set<string>();

    config.tabs.forEach((tab, index) => {
      if (tabIds.has(tab.id)) {
        context.addIssue({
          code: "custom",
          message: `Duplicate tab id: ${tab.id}`,
          path: ["tabs", index, "id"],
        });
      }

      tabIds.add(tab.id);
    });

    const sectionIds = new Set<string>();

    config.sections.forEach((section, index) => {
      if (sectionIds.has(section.id)) {
        context.addIssue({
          code: "custom",
          message: `Duplicate section id: ${section.id}`,
          path: ["sections", index, "id"],
        });
      }

      sectionIds.add(section.id);
    });
  });

export type LayoutConfigInput = z.input<typeof LayoutConfigSchema>;
export type ValidatedLayoutConfig = z.output<typeof LayoutConfigSchema>;
