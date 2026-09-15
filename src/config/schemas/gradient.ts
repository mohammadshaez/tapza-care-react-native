import { z } from "zod";

import { ColorSchema } from "@/config/schemas/color";

const GradientValueSchema = z.string().refine((value) => {
  const parts = value.split("|");
  return (
    parts.length === 2 &&
    ColorSchema.safeParse(parts[0]).success &&
    ColorSchema.safeParse(parts[1]).success
  );
}, "Gradient value must be in the format startColor|endColor");

export type ParsedGradient = readonly [string, string];

export function parseGradient(
  value: string,
): { success: true; value: ParsedGradient } | { success: false; value: null } {
  const trimmed = value.trim();
  const parsed = GradientValueSchema.safeParse(trimmed);

  if (!parsed.success) {
    return { success: false, value: null };
  }

  const [startColor, endColor] = trimmed.split("|");
  return { success: true, value: [startColor, endColor] as const };
}

export const GradientValueSchema = GradientValueSchema;
