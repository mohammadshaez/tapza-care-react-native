import {
  CategoryChipItemsSchema,
  DoctorCarouselItemsSchema,
  HeroBannerItemsSchema,
  OfferStripItemsSchema,
  QuickActionItemsSchema,
  ServiceGridItemsSchema,
} from "@/config/schemas/home-sections";
import {
  CategoryChipsSection,
  DoctorCarouselSection,
  HeroBannerSection,
  OfferStripSection,
  QuickActionsSection,
  ServiceGridSection,
  type SectionComponentProps,
} from "@/features/home/sections/home-sections";

export function HomeSectionRenderer({
  section,
  scrollY,
  doctorState,
  onAction,
  onBook,
}: SectionComponentProps) {
  switch (section.type) {
    case "hero_banner": {
      const result = HeroBannerItemsSchema.safeParse(section.items);

      if (!result.success) {
        return null;
      }

      return (
        <HeroBannerSection
          background={section.background}
          items={result.data}
          onAction={onAction}
          scrollY={scrollY}
          title={section.title}
        />
      );
    }

    case "category_chips": {
      const result = CategoryChipItemsSchema.safeParse(section.items);

      if (!result.success) {
        return null;
      }

      return (
        <CategoryChipsSection
          background={section.background}
          items={result.data}
          title={section.title}
        />
      );
    }

    case "quick_actions": {
      const result = QuickActionItemsSchema.safeParse(section.items);

      if (!result.success) {
        return null;
      }

      return (
        <QuickActionsSection
          background={section.background}
          items={result.data}
          onAction={onAction}
          title={section.title}
        />
      );
    }

    case "service_grid": {
      const result = ServiceGridItemsSchema.safeParse(section.items);

      if (!result.success) {
        return null;
      }

      return (
        <ServiceGridSection
          background={section.background}
          items={result.data}
          onBook={onBook}
          title={section.title}
        />
      );
    }

    case "doctor_carousel": {
      const result = DoctorCarouselItemsSchema.safeParse(section.items);

      if (!result.success) {
        return null;
      }

      return (
        <DoctorCarouselSection
          background={section.background}
          items={result.data}
          onBook={(doctorId) => onBook(doctorId)}
          state={doctorState}
          title={section.title}
        />
      );
    }

    case "offer_strip": {
      const result = OfferStripItemsSchema.safeParse(section.items);

      if (!result.success) {
        return null;
      }

      return (
        <OfferStripSection
          background={section.background}
          items={result.data}
          title={section.title}
        />
      );
    }

    default:
      return null;
  }
}
