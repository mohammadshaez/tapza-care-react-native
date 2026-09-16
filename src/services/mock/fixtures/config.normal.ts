import type { LayoutConfig } from "@/types/config";

export const normalConfig: LayoutConfig = {
  version: 1,
  theme: {
    primary: "#176B5B",
    secondary: "#DDF3EC",
    background: "#F5F8F7",
    surface: "#FFFFFF",
    textPrimary: "#17332E",
    textSecondary: "#60736F",
    accent: "#F4A261",
    festival: {
      name: "Everyday Care",
      greeting: "Good morning",
      bannerImageUrl:
        "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80",
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
      id: "bookings",
      label: "Bookings",
      icon: "calendar",
      screen: "bookings",
    },
    {
      id: "prescriptions",
      label: "Prescriptions",
      icon: "clipboard-list",
      screen: "prescriptions",
    },
    {
      id: "profile",
      label: "Profile",
      icon: "user",
      screen: "profile",
    },
  ],
  sections: [
    {
      id: "normal-hero",
      type: "hero_banner",
      title: "Your health, made simpler",
      background: {
        kind: "gradient",
        value: "#DDF3EC|#F5F8F7",
      },
      items: [
        {
          id: "normal-hero-item",
          greeting: "Namaste, Ramesh",
          description: "Book trusted doctors and manage your family’s care.",
          imageUrl:
            "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80",
          ctaLabel: "Book a doctor",
          action: "book",
        },
      ],
    },
    {
      id: "normal-categories",
      type: "category_chips",
      title: "What do you need?",
      background: {
        kind: "color",
        value: "#F5F8F7",
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
      id: "normal-actions",
      type: "quick_actions",
      title: "Quick actions",
      background: {
        kind: "color",
        value: "#EAF6F2",
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
          label: "Prescriptions",
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
      id: "normal-services",
      type: "service_grid",
      title: "Popular services",
      background: {
        kind: "color",
        value: "#FFFFFF",
      },
      items: [
        {
          id: "general-consult",
          name: "General consultation",
          priceInr: 499,
          imageUrl:
            "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=600&q=80",
          badge: "Popular",
          doctorId: "doc-1",
        },
        {
          id: "diabetes-care",
          name: "Diabetes consultation",
          priceInr: 599,
          imageUrl:
            "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80",
          doctorId: "doc-2",
        },
        {
          id: "blood-test",
          name: "Basic health check",
          priceInr: 799,
          imageUrl:
            "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=600&q=80",
          badge: "Home visit",
        },
      ],
    },
    {
      id: "normal-doctors",
      type: "doctor_carousel",
      title: "Doctors available today",
      background: {
        kind: "gradient",
        value: "#F1F6FF|#FFFFFF",
      },
      items: [
        {
          doctorId: "doc-1",
          nextAvailableLabel: "Today, 2:30 PM",
        },
        {
          doctorId: "doc-2",
          nextAvailableLabel: "Today, 4:00 PM",
        },
        {
          doctorId: "doc-3",
          nextAvailableLabel: "Tomorrow, 10:00 AM",
        },
      ],
    },
    {
      id: "normal-offer",
      type: "offer_strip",
      title: "Family care offer",
      background: {
        kind: "color",
        value: "#FFF2DF",
      },
      items: [
        {
          id: "family-offer",
          message:
            "Save 15% when booking health checks for two family members.",
        },
      ],
    },
  ],
};
