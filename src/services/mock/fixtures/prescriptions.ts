import type { Prescription } from "@/types/prescription";

export const prescriptions: Prescription[] = [
  {
    id: "rx-1",
    issuedAt: "2026-09-01T09:15:00.000Z",
    doctorName: "Dr. Asha Reddy",
    clinicName: "CareSpring Clinic, Hyderabad",
    medicines: [
      {
        id: "med-1",
        name: "Metformin",
        dose: "500 mg",
        days: 30,
        timing: ["morning", "night"],
      },
      {
        id: "med-2",
        name: "Vitamin D3",
        dose: "60,000 IU",
        days: 15,
        timing: ["morning"],
      },
    ],
  },
  {
    id: "rx-2",
    issuedAt: "2026-09-05T14:10:00.000Z",
    doctorName: "Dr. Vikas Rao",
    clinicName: "Arogya Centre, Vijayawada",
    medicines: [
      {
        id: "med-3",
        name: "Amlodipine",
        dose: "5 mg",
        days: 21,
        timing: ["morning"],
      },
      {
        id: "med-4",
        name: "Omega-3",
        dose: "1 capsule",
        days: 30,
        timing: ["night"],
      },
    ],
  },
  {
    id: "rx-3",
    issuedAt: "2026-09-09T11:30:00.000Z",
    doctorName: "Dr. Nandini Sharma",
    clinicName: "Family Health Hub, Secunderabad",
    medicines: [
      {
        id: "med-5",
        name: "Paracetamol",
        dose: "650 mg",
        days: 5,
        timing: ["morning", "afternoon"],
      },
      {
        id: "med-6",
        name: "Cough syrup",
        dose: "10 ml",
        days: 7,
        timing: ["night"],
      },
    ],
  },
];
