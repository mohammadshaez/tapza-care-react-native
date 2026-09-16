import type { ConfigMode } from "@/store/mock-controls.store";

export const queryKeys = {
  all: ["tapza-care"] as const,

  config: (mode: ConfigMode) => [...queryKeys.all, "config", mode] as const,

  doctors: () => [...queryKeys.all, "doctors"] as const,

  slots: (doctorId: string, date: string) =>
    [...queryKeys.all, "slots", doctorId, date] as const,

  prescriptions: () => [...queryKeys.all, "prescriptions"] as const,

  bookings: () => [...queryKeys.all, "bookings"] as const,
};
