export const queryKeys = {
  config: (mode: string) => ["config", mode] as const,
  doctors: ["doctors"] as const,
  slots: (doctorId: string, date: string) => ["slots", doctorId, date] as const,
  prescriptions: ["prescriptions"] as const,
  bookings: ["bookings"] as const,
};
