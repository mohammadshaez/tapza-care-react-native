import type { LayoutConfig } from "@/types/config";

export const diwaliConfig: LayoutConfig = {
  version: 2,
  theme: {
    primary: "#8F2D20",
    secondary: "#FFD166",
    background: "#FFF9F3",
    surface: "#FFFFFF",
    textPrimary: "#3D241F",
    textSecondary: "#725D57",
    accent: "#E76F51",
    festival: {
      name: "Diwali",
      greeting: "Shubh Deepavali",
      bannerImageUrl:
        "https://images.unsplash.com/photo-1605792657660-d3987d8a4a5b?auto=format&fit=crop&w=1200&q=80",
    },
  },
  tabs: [
    {
      id: "home",
      label: "Home",
      icon: "home",
      screen: "home",
    },
    {
      id: "prescriptions",
      label: "Medicines",
      icon: "clipboard-list",
      screen: "prescriptions",
    },
    {
      id: "bookings",
      label: "Bookings",
      icon: "calendar",
      screen: "bookings",
    },
    {
      id: "profile",
      label: "Family",
      icon: "users",
      screen: "profile",
    },
  ],
  sections: [
    {
      id: "diwali-hero",
      type: "hero_banner",
      title: "Healthy celebrations",
      background: {
        kind: "gradient",
        value: "#FFE3A3|#FFF9F3",
      },
      items: [
        {
          id: "diwali-hero-item",
          greeting: "Shubh Deepavali, Ramesh",
          description:
            "Keep your family’s health on track throughout the celebrations.",
          imageUrl:
            "https://images.unsplash.com/photo-1605792657660-d3987d8a4a5b?auto=format&fit=crop&w=1200&q=80",
          ctaLabel: "Find a doctor",
          action: "book",
        },
      ],
    },
    {
      id: "diwali-offer",
      type: "offer_strip",
      title: "Diwali care offer",
      background: {
        kind: "color",
        value: "#8F2D20",
      },
      items: [
        {
          id: "diwali-consult-offer",
          message:
            "Diwali special: save 20% on family consultations this week.",
        },
      ],
    },
    {
      id: "diwali-actions",
      type: "quick_actions",
      title: "Festival care",
      background: {
        kind: "color",
        value: "#FFF0D0",
      },
      items: [
        {
          id: "book",
          label: "Book",
          icon: "calendar-plus",
          action: "book",
        },
        {
          id: "prescriptions",
          label: "Medicines",
          icon: "clipboard-list",
          action: "prescriptions",
        },
        {
          id: "reminders",
          label: "Reminders",
          icon: "alarm-clock",
          action: "reminders",
        },
        {
          id: "family",
          label: "Family",
          icon: "users",
          action: "family",
        },
      ],
    },
    {
      id: "diwali-services",
      type: "service_grid",
      title: "Festival health services",
      background: {
        kind: "color",
        value: "#FFFFFF",
      },
      items: [
        {
          id: "family-consult",
          name: "Family consultation",
          priceInr: 699,
          imageUrl:
            "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80",
          badge: "Diwali offer",
          doctorId: "doc-1",
        },
        {
          id: "sugar-check",
          name: "Blood sugar check",
          priceInr: 299,
          imageUrl:
            "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=600&q=80",
          badge: "Home visit",
        },
        {
          id: "general-care",
          name: "General consultation",
          priceInr: 449,
          imageUrl:
            "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=600&q=80",
          doctorId: "doc-3",
        },
      ],
    },
    {
      id: "diwali-doctors",
      type: "doctor_carousel",
      title: "Doctors available during Diwali",
      background: {
        kind: "gradient",
        value: "#FFF3E6|#FFFFFF",
      },
      items: [
        {
          doctorId: "doc-2",
          nextAvailableLabel: "Today, 4:00 PM",
        },
        {
          doctorId: "doc-4",
          nextAvailableLabel: "Tomorrow, 9:30 AM",
        },
        {
          doctorId: "doc-5",
          nextAvailableLabel: "Tomorrow, 11:00 AM",
        },
      ],
    },
    {
      id: "diwali-categories",
      type: "category_chips",
      title: "Browse care",
      background: {
        kind: "color",
        value: "#FFF9F3",
      },
      items: [
        {
          id: "consult",
          label: "Consult",
          icon: "stethoscope",
        },
        {
          id: "lab-tests",
          label: "Lab tests",
          icon: "test-tube",
        },
        {
          id: "pharmacy",
          label: "Pharmacy",
          icon: "pill",
        },
        {
          id: "vaccines",
          label: "Vaccines",
          icon: "shield-plus",
        },
      ],
    },
    {
      id: "unknown-festival-section",
      type: "festival_countdown",
      title: "Unsupported section",
      background: {
        kind: "color",
        value: "#FFF0D0",
      },
      items: [],
    },
  ],
};
