import { addDays, set } from "date-fns";

import type { Slot } from "@/types/slot";

type SlotDefinition = {
  id: string;
  doctorId: string;
  dayOffset: number;
  hour: number;
  minute?: number;
  available: boolean;
};

const definitions: SlotDefinition[] = [
  {
    id: "slot-1",
    doctorId: "doc-1",
    dayOffset: 0,
    hour: 10,
    available: true,
  },
  {
    id: "slot-2",
    doctorId: "doc-1",
    dayOffset: 0,
    hour: 12,
    available: true,
  },
  {
    id: "slot-3",
    doctorId: "doc-1",
    dayOffset: 1,
    hour: 16,
    available: true,
  },
  {
    id: "slot-4",
    doctorId: "doc-2",
    dayOffset: 0,
    hour: 14,
    available: true,
  },
  {
    id: "slot-5",
    doctorId: "doc-2",
    dayOffset: 1,
    hour: 11,
    available: false,
  },
  {
    id: "slot-6",
    doctorId: "doc-3",
    dayOffset: 1,
    hour: 15,
    available: true,
  },
  {
    id: "slot-7",
    doctorId: "doc-3",
    dayOffset: 2,
    hour: 10,
    available: true,
  },
  {
    id: "slot-8",
    doctorId: "doc-4",
    dayOffset: 2,
    hour: 13,
    minute: 30,
    available: true,
  },
  {
    id: "slot-9",
    doctorId: "doc-5",
    dayOffset: 1,
    hour: 17,
    available: true,
  },
  {
    id: "slot-10",
    doctorId: "doc-6",
    dayOffset: 3,
    hour: 12,
    available: true,
  },
];

function createDate(dayOffset: number, hour: number, minute = 0): Date {
  return set(addDays(new Date(), dayOffset), {
    hours: hour,
    minutes: minute,
    seconds: 0,
    milliseconds: 0,
  });
}

export const slots: Slot[] = definitions.map((definition) => {
  const startsAt = createDate(
    definition.dayOffset,
    definition.hour,
    definition.minute,
  );

  const endsAt = new Date(startsAt.getTime() + 30 * 60 * 1000);

  return {
    id: definition.id,
    doctorId: definition.doctorId,
    startsAt: startsAt.toISOString(),
    endsAt: endsAt.toISOString(),
    available: definition.available,
  };
});
