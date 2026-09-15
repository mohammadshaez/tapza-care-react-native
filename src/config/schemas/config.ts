import { z } from "zod";

import { ColorSchema } from "@/config/schemas/color";
import type {
  AppScreen,
  LayoutConfig,
  LayoutConfigSection,
  LayoutTab,
  SectionBackground,
} from "@/types/config";

const appScreenSchema = z.enum([
  "home",
  "bookings",
  "prescriptions",
  "profile",
]);

const festivalSchema = z.object({
  name: z.string().trim().min(1),
  greeting: z.string().trim().min(1),
  bannerImageUrl: z.string().url(),
});

const layoutThemeSchema = z.object({
  primary: ColorSchema,
  secondary: ColorSchema,
  background: ColorSchema,
  surface: ColorSchema,
  textPrimary: ColorSchema,
  textSecondary: ColorSchema,
  accent: ColorSchema,
  festival: festivalSchema,
});

const tabSchema = z
  .object({
    id: z.string().trim().min(1),
    label: z.string().trim().min(1),
    icon: z.string().trim().min(1),
    screen: appScreenSchema,
  })
  .superRefine((tab, ctx) => {
    if (tab.id.trim().length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Tab id must be non-empty.",
      });
    }
  });

const sectionBackgroundSchema = z.union([
  z.object({ kind: z.literal("color"), value: ColorSchema }),
  z.object({ kind: z.literal("gradient"), value: z.string().trim().min(1) }),
  z.object({ kind: z.literal("image"), value: z.string().url() }),
]);

const layoutSectionSchema = z
  .object({
    id: z.string().trim().min(1),
    type: z.string().trim().min(1),
    background: sectionBackgroundSchema,
    title: z.string().trim().min(1),
    items: z.array(z.unknown()),
  })
  .superRefine((section, ctx) => {
    if (section.id.trim().length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Section id must be non-empty.",
      });
    }
  });

export const LayoutConfigSchema = z
  .object({
    version: z.number().int().positive(),
    theme: layoutThemeSchema,
    tabs: z.array(tabSchema).superRefine((tabs, ctx) => {
      const ids = new Set<string>();
      for (const tab of tabs) {
        if (ids.has(tab.id)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Duplicate tab id: ${tab.id}`,
            path: [tabs.indexOf(tab), "id"],
          });
        }
        ids.add(tab.id);
      }
    }),
    sections: z.array(layoutSectionSchema).superRefine((sections, ctx) => {
      const ids = new Set<string>();
      for (const section of sections) {
        if (ids.has(section.id)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Duplicate section id: ${section.id}`,
            path: [sections.indexOf(section), "id"],
          });
        }
        ids.add(section.id);
      }
    }),
  })
  .strict();

export type LayoutConfigInput = z.infer<typeof LayoutConfigSchema>;

export const AppScreenSchema = appScreenSchema;
export const SectionBackgroundSchema = sectionBackgroundSchema;
export const LayoutTabSchema = tabSchema;
export const LayoutSectionSchema = layoutSectionSchema;

export type AppScreenValue = AppScreen;
export type SectionBackgroundValue = SectionBackground;
export type LayoutTabValue = LayoutTab;
export type LayoutConfigSectionValue = LayoutConfigSection;
export type LayoutConfigValue = LayoutConfig;
