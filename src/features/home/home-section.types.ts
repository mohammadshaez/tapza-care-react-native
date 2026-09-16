export type HomeAction = "book" | "prescriptions" | "reminders" | "family";

export type HeroBannerItem = {
  id: string;
  greeting: string;
  description: string;
  imageUrl: string;
  ctaLabel?: string;
  action?: HomeAction;
};

export type CategoryChipItem = {
  id: string;
  label: string;
  icon: string;
};

export type QuickActionItem = {
  id: string;
  label: string;
  icon: string;
  action: HomeAction;
};

export type ServiceGridItem = {
  id: string;
  name: string;
  priceInr: number;
  imageUrl: string;
  badge?: string;
  doctorId?: string;
};

export type DoctorCarouselItem = {
  doctorId: string;
  nextAvailableLabel: string;
};

export type OfferStripItem = {
  id: string;
  message: string;
};

export type KnownHomeSectionType =
  | "hero_banner"
  | "category_chips"
  | "quick_actions"
  | "service_grid"
  | "doctor_carousel"
  | "offer_strip";
