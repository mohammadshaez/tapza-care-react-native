import type { AppTheme, ThemeColors } from "@/theme/theme.types";

export const baseTokens: Omit<AppTheme, "colors"> = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
  },
  typography: {
    body: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: "500",
    },
    bodySmall: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: "500",
    },
    title: {
      fontSize: 32,
      lineHeight: 40,
      fontWeight: "700",
    },
    subtitle: {
      fontSize: 24,
      lineHeight: 32,
      fontWeight: "600",
    },
  },
  radii: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
  },
  sizes: {
    minimumTapTarget: 44,
  },
  motion: {
    fast: 150,
    normal: 240,
  },
  elevation: {
    none: 0,
    md: 4,
    lg: 8,
  },
};

export const fallbackColors: ThemeColors = {
  primary: "#0E5BD7",
  onPrimary: "#FFFFFF",
  secondary: "#2FBF8F",
  onSecondary: "#132238",
  background: "#F5F9FF",
  surface: "#FFFFFF",
  textPrimary: "#132238",
  textSecondary: "#5C6B7A",
  accent: "#F7B267",
  onAccent: "#132238",
  success: "#1F8A65",
  error: "#B42318",
  warning: "#B54708",
};
