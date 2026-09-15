export type MedicineTiming = "morning" | "afternoon" | "night";

export type Medicine = {
  id: string;
  name: string;
  dose: string;
  days: number;
  timing: MedicineTiming[];
};

export type Prescription = {
  id: string;
  issuedAt: string;
  doctorName: string;
  clinicName: string;
  medicines: Medicine[];
};
