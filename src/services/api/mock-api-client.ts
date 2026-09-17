import { addDays, addMinutes, format, setHours, setMinutes } from "date-fns";

import { diwaliConfig } from "@/services/mock/fixtures/config.diwali";
import { normalConfig } from "@/services/mock/fixtures/config.normal";
import { doctors } from "@/services/mock/fixtures/doctors";
import { prescriptions } from "@/services/mock/fixtures/prescriptions";
import type { Booking, CreateBookingRequest } from "@/types/booking";
import type { LayoutConfig } from "@/types/config";
import type { Doctor } from "@/types/doctor";
import type { Prescription } from "@/types/prescription";
import type { Slot } from "@/types/slot";
import { useMockControlsStore } from "@/store/mock-controls.store";

const DEFAULT_DELAY_MS = 600;

const bookedSlotIds = new Set<string>();

export class MockApiError extends Error {
  readonly status: number;
  readonly code: string;

  constructor(message: string, status: number, code: string) {
    super(message);

    this.name = "MockApiError";
    this.status = status;
    this.code = code;
  }
}

function wait(milliseconds: number): Promise<void> {
  if (milliseconds <= 0) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

async function simulateRequest(options?: {
  shouldFail?: boolean;
  emptyMessage?: string;
}): Promise<void> {
  const controls = useMockControlsStore.getState();
  const latencyMs = controls.latencyMs ?? DEFAULT_DELAY_MS;

  await wait(latencyMs);

  if (controls.offline) {
    throw new MockApiError(
      "You appear to be offline. Please check your connection.",
      503,
      "offline",
    );
  }

  if (options?.shouldFail) {
    throw new MockApiError(
      options.emptyMessage ?? "Something went wrong. Please try again.",
      500,
      "server_error",
    );
  }
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function createSlots(doctorId: string, date: string): Slot[] {
  const slotTimes = [
    { hour: 9, minute: 30 },
    { hour: 10, minute: 15 },
    { hour: 11, minute: 0 },
    { hour: 12, minute: 30 },
    { hour: 15, minute: 0 },
    { hour: 16, minute: 30 },
    { hour: 18, minute: 0 },
  ];

  const selectedDate = new Date(`${date}T00:00:00`);

  return slotTimes.map(({ hour, minute }, index) => {
    const startsAtDate = setMinutes(setHours(selectedDate, hour), minute);

    const slotId = `${doctorId}-${date}-${hour}-${minute}`;

    return {
      id: slotId,
      doctorId,
      startsAt: startsAtDate.toISOString(),
      endsAt: addMinutes(startsAtDate, 30).toISOString(),
      available: index !== 2 && index !== 5 && !bookedSlotIds.has(slotId),
    };
  });
}

function createBookingId(): string {
  return `booking-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export const mockApiClient = {
  async getConfig(): Promise<LayoutConfig> {
    const controls = useMockControlsStore.getState();

    await simulateRequest({
      shouldFail: controls.failConfig,
      emptyMessage: "Unable to load the app configuration.",
    });

    const config =
      controls.configMode === "diwali" ? diwaliConfig : normalConfig;

    return clone(config);
  },

  async getDoctors(): Promise<Doctor[]> {
    const controls = useMockControlsStore.getState();

    await simulateRequest({
      shouldFail: controls.failDoctors,
      emptyMessage: "Unable to load doctors.",
    });

    if (controls.emptyDoctors) {
      return [];
    }

    return clone(doctors);
  },

  async getSlots(doctorId: string, date: string): Promise<Slot[]> {
    const controls = useMockControlsStore.getState();

    await simulateRequest({
      shouldFail: controls.failSlots,
      emptyMessage: "Unable to load available appointments.",
    });

    if (controls.emptySlots) {
      return [];
    }

    const doctorExists = doctors.some(
      (doctor: { id: string }) => doctor.id === doctorId,
    );

    if (!doctorExists) {
      throw new MockApiError(
        "The selected doctor could not be found.",
        404,
        "doctor_not_found",
      );
    }

    return clone(createSlots(doctorId, date));
  },

  async createBooking(request: CreateBookingRequest): Promise<Booking> {
    const controls = useMockControlsStore.getState();

    await simulateRequest({
      shouldFail: controls.failBookings,
      emptyMessage: "Unable to confirm this appointment.",
    });

    if (controls.forceBookingConflict || controls.conflictNextBooking) {
      throw new MockApiError(
        "This slot was just booked. Please choose another time.",
        409,
        "slot_taken",
      );
    }

    const doctor = doctors.find(
      (candidate: { id: string }) => candidate.id === request.doctorId,
    );

    if (!doctor) {
      throw new MockApiError(
        "The selected doctor could not be found.",
        404,
        "doctor_not_found",
      );
    }

    if (bookedSlotIds.has(request.slotId)) {
      throw new MockApiError(
        "This slot is no longer available.",
        409,
        "slot_taken",
      );
    }

    bookedSlotIds.add(request.slotId);

    return {
      id: createBookingId(),
      doctorId: request.doctorId,
      slotId: request.slotId,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };
  },

  async getPrescriptions(): Promise<Prescription[]> {
    const controls = useMockControlsStore.getState();

    await simulateRequest({
      shouldFail: controls.failPrescriptions,
      emptyMessage: "Unable to load prescriptions.",
    });

    if (controls.emptyPrescriptions) {
      return [];
    }

    return clone(prescriptions);
  },

  resetMockState(): void {
    bookedSlotIds.clear();
  },

  getDemoDates(): string[] {
    return Array.from({ length: 7 }, (_, index) =>
      format(addDays(new Date(), index), "yyyy-MM-dd"),
    );
  },
};
