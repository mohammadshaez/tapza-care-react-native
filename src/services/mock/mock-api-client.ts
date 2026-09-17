import {
  BookingSchema,
  CreateBookingInputSchema,
} from "@/config/schemas/booking";
import { LayoutConfigSchema } from "@/config/schemas/config";
import { DoctorArraySchema } from "@/config/schemas/doctor";
import { PrescriptionArraySchema } from "@/config/schemas/prescription";
import { SlotArraySchema } from "@/config/schemas/slot";
import { ApiError } from "@/types/api";
import type { Booking, CreateBookingInput } from "@/types/booking";
import type { Doctor } from "@/types/doctor";
import type { LayoutConfig } from "@/types/config";
import type { Prescription } from "@/types/prescription";
import type { Slot } from "@/types/slot";
import { useMockControlsStore } from "@/store/mock-controls.store";
import { normalConfig } from "@/services/mock/fixtures/config.normal";
import { diwaliConfig } from "@/services/mock/fixtures/config.diwali";
import { doctors } from "@/services/mock/fixtures/doctors";
import { prescriptions } from "@/services/mock/fixtures/prescriptions";
import { slots } from "@/services/mock/fixtures/slots";

const DEFAULT_DELAY_MS = 250;

let mockBookedSlots = new Set<string>();

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function getCurrentConfigFixture(): LayoutConfig {
  const { configMode } = useMockControlsStore.getState();
  return configMode === "diwali" ? diwaliConfig : normalConfig;
}

function ensureNotOffline(): void {
  if (useMockControlsStore.getState().offline) {
    throw new ApiError(0, "offline", "Device is offline.");
  }
}

function ensureNoFailure(flag: boolean, code: string, message: string): void {
  if (flag) {
    throw new ApiError(500, code, message);
  }
}

async function withLatency(): Promise<void> {
  const latencyMs =
    useMockControlsStore.getState().latencyMs ?? DEFAULT_DELAY_MS;
  await wait(latencyMs);
}

async function validateAndClone<T>(
  value: unknown,
  schema: { parse: (input: unknown) => T },
): Promise<T> {
  return schema.parse(value);
}

function getConfigRecords(): LayoutConfig[] {
  return [normalConfig, diwaliConfig];
}

export class MockApiClient {
  async getConfig(): Promise<LayoutConfig> {
    ensureNotOffline();
    await withLatency();

    const { failConfig } = useMockControlsStore.getState();
    ensureNoFailure(failConfig, "mock_failure", "Config request failed.");

    const config = getCurrentConfigFixture();
    const validated = await validateAndClone(config, LayoutConfigSchema);
    // await AsyncStorage.setItem(
    //   "tapza-care:last-good-config:v1",
    //   JSON.stringify(validated),
    // );
    return structuredClone(validated);
  }

  async getDoctors(): Promise<Doctor[]> {
    ensureNotOffline();
    await withLatency();

    const { failDoctors, emptyDoctors } = useMockControlsStore.getState();
    ensureNoFailure(failDoctors, "mock_failure", "Doctors request failed.");

    const result = emptyDoctors ? [] : doctors;
    return await validateAndClone(result, DoctorArraySchema);
  }

  async getSlots(doctorId: string, date: string): Promise<Slot[]> {
    ensureNotOffline();
    await withLatency();

    const { failSlots, emptySlots } = useMockControlsStore.getState();
    ensureNoFailure(failSlots, "mock_failure", "Slots request failed.");

    const targetDate = new Date(date);
    if (Number.isNaN(targetDate.getTime())) {
      throw new ApiError(
        400,
        "validation_error",
        "The chosen date is invalid.",
      );
    }

    const filtered = slots.filter((slot) => {
      if (slot.doctorId !== doctorId) return false;
      const slotStarts = new Date(slot.startsAt);
      if (Number.isNaN(slotStarts.getTime())) return false;
      return (
        slotStarts.toISOString().slice(0, 10) ===
        targetDate.toISOString().slice(0, 10)
      );
    });

    const result = emptySlots ? [] : filtered;
    return await validateAndClone(result, SlotArraySchema);
  }

  async createBooking(input: CreateBookingInput): Promise<Booking> {
    ensureNotOffline();
    await withLatency();

    const { failBookings, conflictNextBooking, forceBookingConflict } =
      useMockControlsStore.getState();
    ensureNoFailure(failBookings, "mock_failure", "Booking request failed.");

    const parsed = CreateBookingInputSchema.parse(input);
    const doctor = doctors.find((item) => item.id === parsed.doctorId);
    if (!doctor) {
      throw new ApiError(404, "validation_error", "Doctor not found.");
    }

    const slot = slots.find(
      (item) => item.id === parsed.slotId && item.doctorId === parsed.doctorId,
    );
    if (!slot) {
      throw new ApiError(404, "validation_error", "Slot not found.");
    }

    if (
      mockBookedSlots.has(slot.id) ||
      !slot.available ||
      conflictNextBooking ||
      forceBookingConflict
    ) {
      useMockControlsStore.setState({
        conflictNextBooking: false,
        forceBookingConflict: false,
      });
      throw new ApiError(
        409,
        "conflict",
        "The selected slot is no longer available.",
      );
    }

    const booking: Booking = {
      id: `booking-${Date.now()}`,
      doctorId: doctor.id,
      slotId: slot.id,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };

    mockBookedSlots.add(slot.id);
    const validated = BookingSchema.parse(booking);
    return validated;
  }

  async getPrescriptions(): Promise<Prescription[]> {
    ensureNotOffline();
    await withLatency();

    const { failPrescriptions, emptyPrescriptions } =
      useMockControlsStore.getState();
    ensureNoFailure(
      failPrescriptions,
      "mock_failure",
      "Prescriptions request failed.",
    );

    const result = emptyPrescriptions ? [] : prescriptions;
    return await validateAndClone(result, PrescriptionArraySchema);
  }

  resetMockState(): void {
    mockBookedSlots.clear();
    useMockControlsStore.getState().reset();
  }
}

export const mockApiClient = new MockApiClient();

export const getMockApiClient = (): MockApiClient => mockApiClient;

export function __mockConfigRecordsForTests(): LayoutConfig[] {
  return getConfigRecords();
}
