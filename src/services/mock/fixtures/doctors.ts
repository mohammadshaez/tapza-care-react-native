import type { Doctor } from "@/types/doctor";

export const doctors: Doctor[] = [
  {
    id: "doc-1",
    name: "Dr. Asha Reddy",
    specialty: "General Physician",
    photoUrl:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80",
    feeInr: 499,
    languages: ["English", "Hindi", "Telugu"],
  },
  {
    id: "doc-2",
    name: "Dr. Vikas Rao",
    specialty: "Diabetes Care",
    photoUrl:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80",
    feeInr: 699,
    languages: ["English", "Telugu"],
  },
  {
    id: "doc-3",
    name: "Dr. Nandini Sharma",
    specialty: "Family Medicine",
    photoUrl:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=800&q=80",
    feeInr: 599,
    languages: ["Hindi", "English"],
  },
  {
    id: "doc-4",
    name: "Dr. Imran Khan",
    specialty: "Cardiology",
    photoUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    feeInr: 899,
    languages: ["English", "Hindi"],
  },
  {
    id: "doc-5",
    name: "Dr. Sravya Iyer",
    specialty: "Pediatrician",
    photoUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
    feeInr: 549,
    languages: ["English", "Telugu"],
  },
  {
    id: "doc-6",
    name: "Dr. Mohan Babu",
    specialty: "Dermatology",
    photoUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
    feeInr: 749,
    languages: ["Telugu", "English"],
  },
];
