import { z } from "zod";

const hexColorRegex = /^#(?:[0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/;

export const ColorSchema = z
  .string()
  .trim()
  .regex(hexColorRegex, "Invalid hex color");
