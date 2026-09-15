import type { LayoutConfig } from "@/types/config";

export const diwaliConfig: LayoutConfig = {
  version: 1,
  theme: {
    primary: "#B71C1C",
    secondary: "#FFB703",
    background: "#FFF8F3",
    surface: "#FFFFFF",
    textPrimary: "#2A1A12",
    textSecondary: "#6E5148",
    accent: "#FF7F50",
    festival: {
      name: "Diwali",
      greeting: "Shubh Deepavali care for your family",
      bannerImageUrl:
        "https://images.unsplash.com/photo-1605792657660-d3987d8a4a5b?auto=format&fit=crop&w=1200&q=80",
    },
  },
  tabs: [
    { id: "home", label: "Home", icon: "home", screen: "home" },
    {
      id: "prescriptions",
      label: "Prescriptions",
      icon: "clipboard",
      screen: "prescriptions",
    },
    { id: "bookings", label: "Bookings", icon: "calendar", screen: "bookings" },
    { id: "profile", label: "Profile", icon: "user", screen: "profile" },
  ],
  sections: [
    {
      id: "hero-1",
      type: "hero_banner",
      background: { kind: "gradient", value: "#FFF4E5|#FFFFFF" },
      title: "Festival care, lighter on the mind",
      items: [{ kind: "banner", text: "Book family consultations with ease" }],
    },
    {
      id: "chips-1",
      type: "category_chips",
      background: { kind: "color", value: "#FFF9F4" },
      title: "Festival essentials",
      items: [
        { id: "family", label: "Family clinic" },
        { id: "lab", label: "Tests" },
        { id: "pharmacy", label: "Pharmacy" },
      ],
    },
    {
      id: "quick-1",
      type: "quick_actions",
      background: { kind: "color", value: "#FDF1ED" },
      title: "Today’s care",
      items: [
        { id: "general", label: "General care", icon: "doctor" },
        { id: "vaccines", label: "Vaccines", icon: "shield" },
      ],
    },
    {
      id: "services-1",
      type: "service_grid",
      background: { kind: "color", value: "#FFFFFF" },
      title: "Popular Diwali care plans",
      items: [
        { id: "diabetes", label: "Diabetes follow-up", priceInr: 499 },
        { id: "lab", label: "Blood tests", priceInr: 699 },
        { id: "home-care", label: "Home care support", priceInr: 1299 },
      ],
    },
    {
      id: "doctors-1",
      type: "doctor_carousel",
      background: { kind: "gradient", value: "#FFF9F0|#FFF4EE" },
      title: "Doctors available now",
      items: [{ id: "doc-2" }, { id: "doc-4" }, { id: "doc-5" }],
    },
    {
      id: "offer-1",
      type: "offer_strip",
      background: {
        kind: "image",
        value:
          "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
      },
      title: "Festive wellness offers",
      items: [{ id: "offer-2", label: "Up to 20% off family consults" }],
    },
    {
      id: "festival-countdown",
      type: "festival_countdown",
      background: { kind: "color", value: "#FFF4E5" },
      title: "Festival countdown",
      items: [{ id: "countdown-1", label: "Count down to celebration care" }],
    },
  ],
};
