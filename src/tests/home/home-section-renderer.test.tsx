import type { SharedValue } from "react-native-reanimated";

import { HomeSectionRenderer } from "@/features/home/sections/home-section-renderer";
import type { LayoutSection } from "@/types/config";

jest.mock("@/features/home/sections/home-sections", () => ({
  HeroBannerSection: jest.fn(() => null),
  CategoryChipsSection: jest.fn(() => null),
  QuickActionsSection: jest.fn(() => null),
  ServiceGridSection: jest.fn(() => null),
  DoctorCarouselSection: jest.fn(() => null),
  OfferStripSection: jest.fn(() => null),
}));

describe("HomeSectionRenderer", () => {
  it("returns nothing for an unknown section type", () => {
    const section: LayoutSection = {
      id: "unsupported-section",
      type: "future_section",
      title: "Unsupported",
      background: {
        kind: "color",
        value: "#FFFFFF",
      },
      items: [],
    };

    const result = HomeSectionRenderer({
      section,
      scrollY: { value: 0 } as SharedValue<number>,
      doctorState: {
        doctors: [],
        isLoading: false,
        error: null,
        retry: jest.fn(),
      },
      onAction: jest.fn(),
      onBook: jest.fn(),
    });

    expect(result).toBeNull();
  });
});
