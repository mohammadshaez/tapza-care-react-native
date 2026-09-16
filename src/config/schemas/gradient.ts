import { z } from "zod";

import { ColorSchema } from "@/config/schemas/color";

const GRADIENT_SEPARATOR = "|";

export const GradientValueSchema = z
  .string()
  .trim()
  .refine(
    (value) => {
      const parts = value.split(GRADIENT_SEPARATOR).map((part) => part.trim());

      return (
        parts.length === 2 &&
        ColorSchema.safeParse(parts[0]).success &&
        ColorSchema.safeParse(parts[1]).success
      );
    },
    {
      message: "Gradient value must use the format startColor|endColor",
    },
  );

export type ParsedGradient = readonly [string, string];

export type GradientParseResult =
  | {
      success: true;
      value: ParsedGradient;
    }
  | {
      success: false;
      value: null;
    };

export function parseGradient(value: string): GradientParseResult {
  const parsedValue = GradientValueSchema.safeParse(value);

  if (!parsedValue.success) {
    return {
      success: false,
      value: null,
    };
  }

  const parts = parsedValue.data
    .split(GRADIENT_SEPARATOR)
    .map((part) => part.trim());

  const startColor = parts[0];
  const endColor = parts[1];

  if (!startColor || !endColor) {
    return {
      success: false,
      value: null,
    };
  }

  return {
    success: true,
    value: [startColor, endColor],
  };
}
