import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type ConfigMode = "normal" | "diwali";

export type MockControls = {
  configMode: ConfigMode;
  latencyMs: number;
  offline: boolean;
  failConfig: boolean;
  failDoctors: boolean;
  failSlots: boolean;
  failBookings: boolean;
  failPrescriptions: boolean;
  emptyDoctors: boolean;
  emptySlots: boolean;
  emptyPrescriptions: boolean;
  conflictNextBooking: boolean;
};

export type MockControlsState = MockControls & {
  setConfigMode: (mode: ConfigMode) => void;
  setLatencyMs: (latencyMs: number) => void;
  toggleOffline: () => void;
  toggleFailConfig: () => void;
  toggleFailDoctors: () => void;
  toggleFailSlots: () => void;
  toggleFailBookings: () => void;
  toggleFailPrescriptions: () => void;
  toggleEmptyDoctors: () => void;
  toggleEmptySlots: () => void;
  toggleEmptyPrescriptions: () => void;
  triggerNextBookingConflict: () => void;
  reset: () => void;
};

const initialState: MockControls = {
  configMode: "normal",
  latencyMs: 300,
  offline: false,
  failConfig: false,
  failDoctors: false,
  failSlots: false,
  failBookings: false,
  failPrescriptions: false,
  emptyDoctors: false,
  emptySlots: false,
  emptyPrescriptions: false,
  conflictNextBooking: false,
};

export const useMockControlsStore = create<MockControlsState>()(
  persist(
    (set) => ({
      ...initialState,
      setConfigMode: (mode) => set({ configMode: mode }),
      setLatencyMs: (latencyMs) => set({ latencyMs: Math.max(0, latencyMs) }),
      toggleOffline: () => set((state) => ({ offline: !state.offline })),
      toggleFailConfig: () =>
        set((state) => ({ failConfig: !state.failConfig })),
      toggleFailDoctors: () =>
        set((state) => ({ failDoctors: !state.failDoctors })),
      toggleFailSlots: () => set((state) => ({ failSlots: !state.failSlots })),
      toggleFailBookings: () =>
        set((state) => ({ failBookings: !state.failBookings })),
      toggleFailPrescriptions: () =>
        set((state) => ({ failPrescriptions: !state.failPrescriptions })),
      toggleEmptyDoctors: () =>
        set((state) => ({ emptyDoctors: !state.emptyDoctors })),
      toggleEmptySlots: () =>
        set((state) => ({ emptySlots: !state.emptySlots })),
      toggleEmptyPrescriptions: () =>
        set((state) => ({ emptyPrescriptions: !state.emptyPrescriptions })),
      triggerNextBookingConflict: () => set({ conflictNextBooking: true }),
      reset: () => set(initialState),
    }),
    {
      name: "tapza-care:mock-controls:v1",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
