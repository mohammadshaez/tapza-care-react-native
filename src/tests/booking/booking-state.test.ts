import { mockApiClient } from "@/services/api/mock-api-client";
import { useMockControlsStore } from "@/store/mock-controls.store";

describe("mock booking state", () => {
  beforeEach(() => {
    mockApiClient.resetMockState();

    useMockControlsStore.setState({
      latencyMs: 0,
      offline: false,
      failConfig: false,
      failDoctors: false,
      failSlots: false,
      failBookings: false,
      failPrescriptions: false,
      emptyDoctors: false,
      emptySlots: false,
      emptyPrescriptions: false,
      forceBookingConflict: false,
    });
  });

  it("books an available slot and prevents it being booked twice", async () => {
    const doctors = await mockApiClient.getDoctors();
    const doctor = doctors[0];

    if (!doctor) {
      throw new Error("Doctor fixture is required for this test");
    }

    const date = new Date().toISOString().slice(0, 10);
    const slots = await mockApiClient.getSlots(doctor.id, date);
    const slot = slots.find((candidate) => candidate.available);

    if (!slot) {
      throw new Error("Available slot fixture is required for this test");
    }

    const booking = await mockApiClient.createBooking({
      doctorId: doctor.id,
      slotId: slot.id,
    });

    expect(booking.doctorId).toBe(doctor.id);
    expect(booking.slotId).toBe(slot.id);
    expect(booking.status).toBe("confirmed");

    await expect(
      mockApiClient.createBooking({
        doctorId: doctor.id,
        slotId: slot.id,
      }),
    ).rejects.toMatchObject({
      status: 409,
    });
  });

  it("supports a forced booking conflict", async () => {
    useMockControlsStore.setState({
      forceBookingConflict: true,
    });

    await expect(
      mockApiClient.createBooking({
        doctorId: "doctor-1",
        slotId: "slot-1",
      }),
    ).rejects.toMatchObject({
      status: 409,
    });
  });
});
