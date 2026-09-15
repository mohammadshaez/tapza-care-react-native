import { baseTokens } from "@/theme/base-tokens";
import type { AppTheme } from "@/theme/theme.types";
import type { LayoutConfig } from "@/types/config";

const fallbackTheme: AppTheme = {
  colors: {
    primary: "#0E5BD7",
    secondary: "#2FBF8F",
    background: "#F5F9FF",
    surface: "#FFFFFF",
    textPrimary: "#132238",
    textSecondary: "#5C6B7A",
    accent: "#F7B267",
    success: "#2FBF8F",
    error: "#D14343",
    warning: "#F7B267",
  },
  spacing: baseTokens.spacing,
  typography: baseTokens.typography,
  radii: baseTokens.radii,
  sizes: baseTokens.sizes,
  motion: baseTokens.motion,
  elevation: baseTokens.elevation,
};

export function createTheme(config?: LayoutConfig | null): AppTheme {
  if (!config) {
    return fallbackTheme;
  }

  return {
    colors: {
      primary: config.theme.primary,
      secondary: config.theme.secondary,
      background: config.theme.background,
      surface: config.theme.surface,
      textPrimary: config.theme.textPrimary,
      textSecondary: config.theme.textSecondary,
      accent: config.theme.accent,
      success: "#2FBF8F",
      error: "#D14343",
      warning: "#F7B267",
    },
    spacing: baseTokens.spacing,
    typography: baseTokens.typography,
    radii: baseTokens.radii,
    sizes: baseTokens.sizes,
    motion: baseTokens.motion,
    elevation: baseTokens.elevation,
  };
}
