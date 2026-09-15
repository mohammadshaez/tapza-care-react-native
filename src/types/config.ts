export type AppScreen = "home" | "bookings" | "prescriptions" | "profile";

export type SectionBackground =
  | {
      kind: "color";
      value: string;
    }
  | {
      kind: "gradient";
      value: string;
    }
  | {
      kind: "image";
      value: string;
    };

export type LayoutTab = {
  id: string;
  label: string;
  icon: string;
  screen: AppScreen;
};

export type LayoutConfigSection = {
  id: string;
  type: string;
  background: SectionBackground;
  title: string;
  items: unknown[];
};

export type LayoutTheme = {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  festival: {
    name: string;
    greeting: string;
    bannerImageUrl: string;
  };
};

export type LayoutConfig = {
  version: number;
  theme: LayoutTheme;
  tabs: LayoutTab[];
  sections: LayoutConfigSection[];
};
