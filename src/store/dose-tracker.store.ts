import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type DoseIdentity = {
  prescriptionId: string;
  medicineId: string;
  timing: "morning" | "afternoon" | "night";
  date: string;
};

type DoseTrackerState = {
  takenDoses: Record<string, true>;
  toggleDose: (dose: DoseIdentity) => void;
  clearDate: (date: string) => void;
  reset: () => void;
};

export function createDoseKey(dose: DoseIdentity): string {
  return [dose.prescriptionId, dose.medicineId, dose.timing, dose.date].join(
    ":",
  );
}

export const useDoseTrackerStore = create<DoseTrackerState>()(
  persist(
    (set) => ({
      takenDoses: {},

      toggleDose: (dose) =>
        set((state) => {
          const key = createDoseKey(dose);
          const nextTakenDoses = {
            ...state.takenDoses,
          };

          if (nextTakenDoses[key]) {
            delete nextTakenDoses[key];
          } else {
            nextTakenDoses[key] = true;
          }

          return {
            takenDoses: nextTakenDoses,
          };
        }),

      clearDate: (date) =>
        set((state) => ({
          takenDoses: Object.fromEntries(
            Object.entries(state.takenDoses).filter(
              ([key]) => !key.endsWith(`:${date}`),
            ),
          ),
        })),

      reset: () => ({
        takenDoses: {},
      }),
    }),
    {
      name: "tapza-care:taken-doses:v1",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        takenDoses: state.takenDoses,
      }),
    },
  ),
);
