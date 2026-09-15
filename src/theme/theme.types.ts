export type ThemeColors = {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
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

export type ThemeTypography = {
  body: { fontSize: number; lineHeight: number; fontWeight: string };
  bodySmall: { fontSize: number; lineHeight: number; fontWeight: string };
  title: { fontSize: number; lineHeight: number; fontWeight: string };
  subtitle: { fontSize: number; lineHeight: number; fontWeight: string };
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
