import type { TextStyle } from "react-native";

export type ThemeColors = {
  primary: string;
  onPrimary: string;
  secondary: string;
  onSecondary: string;
  background: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  onAccent: string;
  success: string;
  error: string;
  warning: string;
};

export type ThemeSpacing = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
};

export type ThemeTextStyle = {
  fontSize: number;
  lineHeight: number;
  fontWeight: NonNullable<TextStyle["fontWeight"]>;
};

export type ThemeTypography = {
  body: ThemeTextStyle;
  bodySmall: ThemeTextStyle;
  title: ThemeTextStyle;
  subtitle: ThemeTextStyle;
};

export type AppTheme = {
  colors: ThemeColors;
  spacing: ThemeSpacing;
  typography: ThemeTypography;
  radii: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  sizes: {
    minimumTapTarget: number;
  };
  motion: {
    fast: number;
    normal: number;
  };
  elevation: {
    none: number;
    md: number;
    lg: number;
  };
};
