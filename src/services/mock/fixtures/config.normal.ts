import type { LayoutConfig } from "@/types/config";

export const normalConfig: LayoutConfig = {
  version: 1,
  theme: {
    primary: "#0E5BD7",
    secondary: "#2FBF8F",
    background: "#F5F9FF",
    surface: "#FFFFFF",
    textPrimary: "#132238",
    textSecondary: "#5C6B7A",
    accent: "#F7B267",
    festival: {
      name: "Normal Day",
      greeting: "Care that keeps pace with life",
      bannerImageUrl:
        "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80",
    },
  },
  tabs: [
    { id: "home", label: "Home", icon: "home", screen: "home" },
    { id: "bookings", label: "Bookings", icon: "calendar", screen: "bookings" },
    {
      id: "prescriptions",
      label: "Prescriptions",
      icon: "clipboard",
      screen: "prescriptions",
    },
    { id: "profile", label: "Profile", icon: "user", screen: "profile" },
  ],
  sections: [
    {
      id: "hero-1",
      type: "hero_banner",
      background: { kind: "gradient", value: "#EFF6FF|#FFFFFF" },
      title: "Your care, aligned for the day",
      items: [{ kind: "banner", text: "Book a doctor in minutes" }],
    },
    {
      id: "chips-1",
      type: "category_chips",
      background: { kind: "color", value: "#F8FBFF" },
      title: "Quick access",
      items: [
        { id: "bp", label: "General physician" },
        { id: "lab", label: "Blood tests" },
        { id: "pharmacy", label: "Pharmacy" },
      ],
    },
    {
      id: "quick-1",
      type: "quick_actions",
      background: { kind: "color", value: "#EEF7F1" },
      title: "Immediate needs",
      items: [
        { id: "consult", label: "Consult now", icon: "stethoscope" },
        { id: "refill", label: "Refill", icon: "pill" },
      ],
    },
    {
      id: "services-1",
      type: "service_grid",
      background: { kind: "color", value: "#FFFFFF" },
      title: "Popular care services",
      items: [
        { id: "diabetes", label: "Diabetes consultation", priceInr: 499 },
        { id: "vaccination", label: "Vaccinations", priceInr: 699 },
        { id: "family", label: "Family health", priceInr: 899 },
      ],
    },
    {
      id: "doctors-1",
      type: "doctor_carousel",
      background: { kind: "gradient", value: "#F9FAFF|#F4F8FF" },
      title: "Trusted doctors",
      items: [{ id: "doc-1" }, { id: "doc-2" }, { id: "doc-3" }],
    },
    {
      id: "offer-1",
      type: "offer_strip",
      background: {
        kind: "image",
        value:
          "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
      },
      title: "Care plans for the family",
      items: [{ id: "offer-1", label: "Save on family checkups" }],
    },
  ],
};
