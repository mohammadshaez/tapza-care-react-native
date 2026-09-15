import type { Slot } from "@/types/slot";

const baseSlots: Slot[] = [
  {
    id: "slot-1",
    doctorId: "doc-1",
    startsAt: "2026-09-16T09:00:00.000Z",
    endsAt: "2026-09-16T09:30:00.000Z",
    available: true,
  },
  {
    id: "slot-2",
    doctorId: "doc-1",
    startsAt: "2026-09-16T10:00:00.000Z",
    endsAt: "2026-09-16T10:30:00.000Z",
    available: false,
  },
  {
    id: "slot-3",
    doctorId: "doc-1",
    startsAt: "2026-09-17T11:00:00.000Z",
    endsAt: "2026-09-17T11:30:00.000Z",
    available: true,
  },
  {
    id: "slot-4",
    doctorId: "doc-2",
    startsAt: "2026-09-16T12:00:00.000Z",
    endsAt: "2026-09-16T12:30:00.000Z",
    available: true,
  },
  {
    id: "slot-5",
    doctorId: "doc-2",
    startsAt: "2026-09-16T18:00:00.000Z",
    endsAt: "2026-09-16T18:30:00.000Z",
    available: true,
  },
  {
    id: "slot-6",
    doctorId: "doc-3",
    startsAt: "2026-09-18T14:00:00.000Z",
    endsAt: "2026-09-18T14:30:00.000Z",
    available: true,
  },
  {
    id: "slot-7",
    doctorId: "doc-3",
    startsAt: "2026-09-18T15:00:00.000Z",
    endsAt: "2026-09-18T15:30:00.000Z",
    available: false,
  },
  {
    id: "slot-8",
    doctorId: "doc-4",
    startsAt: "2026-09-19T09:30:00.000Z",
    endsAt: "2026-09-19T10:00:00.000Z",
    available: true,
  },
  {
    id: "slot-9",
    doctorId: "doc-5",
    startsAt: "2026-09-17T16:00:00.000Z",
    endsAt: "2026-09-17T16:30:00.000Z",
    available: true,
  },
];

export const slots: Slot[] = baseSlots;
