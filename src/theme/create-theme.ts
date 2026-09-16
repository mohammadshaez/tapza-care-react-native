import { baseTokens, fallbackColors } from "@/theme/base-tokens";
import type { AppTheme, ThemeColors } from "@/theme/theme.types";
import type { LayoutConfig } from "@/types/config";

type RgbColor = {
  red: number;
  green: number;
  blue: number;
};

function normalizeHexColor(value: string): string {
  const hex = value.replace("#", "");

  if (hex.length === 3) {
    return hex
      .split("")
      .map((character) => character.repeat(2))
      .join("");
  }

  return hex.slice(0, 6);
}

function hexToRgb(value: string): RgbColor {
  const normalized = normalizeHexColor(value);

  return {
    red: Number.parseInt(normalized.slice(0, 2), 16),
    green: Number.parseInt(normalized.slice(2, 4), 16),
    blue: Number.parseInt(normalized.slice(4, 6), 16),
  };
}

function linearizeChannel(channel: number): number {
  const normalized = channel / 255;

  return normalized <= 0.03928
    ? normalized / 12.92
    : ((normalized + 0.055) / 1.055) ** 2.4;
}

function getRelativeLuminance(color: string): number {
  const { red, green, blue } = hexToRgb(color);

  return (
    0.2126 * linearizeChannel(red) +
    0.7152 * linearizeChannel(green) +
    0.0722 * linearizeChannel(blue)
  );
}

function getContrastRatio(firstColor: string, secondColor: string): number {
  const firstLuminance = getRelativeLuminance(firstColor);
  const secondLuminance = getRelativeLuminance(secondColor);

  const lighter = Math.max(firstLuminance, secondLuminance);
  const darker = Math.min(firstLuminance, secondLuminance);

  return (lighter + 0.05) / (darker + 0.05);
}

function selectReadableForeground(
  background: string,
  lightCandidate: string,
  darkCandidate: string,
): string {
  const lightContrast = getContrastRatio(background, lightCandidate);

  const darkContrast = getContrastRatio(background, darkCandidate);

  return lightContrast >= darkContrast ? lightCandidate : darkCandidate;
}

function createColors(config: LayoutConfig): ThemeColors {
  const { theme } = config;

  return {
    primary: theme.primary,
    onPrimary: selectReadableForeground(
      theme.primary,
      theme.surface,
      theme.textPrimary,
    ),
    secondary: theme.secondary,
    onSecondary: selectReadableForeground(
      theme.secondary,
      theme.surface,
      theme.textPrimary,
    ),
    background: theme.background,
    surface: theme.surface,
    textPrimary: theme.textPrimary,
    textSecondary: theme.textSecondary,
    accent: theme.accent,
    onAccent: selectReadableForeground(
      theme.accent,
      theme.surface,
      theme.textPrimary,
    ),
    success: fallbackColors.success,
    error: fallbackColors.error,
    warning: fallbackColors.warning,
  };
}

export function createTheme(config?: LayoutConfig | null): AppTheme {
  return {
    colors: config ? createColors(config) : fallbackColors,
    ...baseTokens,
  };
}
