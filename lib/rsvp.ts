export const attendanceOptions = [
  { value: "attending", label: "Hadir dengan sukacita" },
  { value: "declining", label: "Mohon maaf, tidak dapat hadir" },
] as const;

export const mealOptions = [
  { value: "beef", label: "Daging" },
  { value: "chicken", label: "Ayam" },
  { value: "vegetarian", label: "Sayuran" },
] as const;

export const guestCountMin = 1;
export const guestCountMax = 10;

export const guestCountOptions = Array.from(
  { length: guestCountMax - guestCountMin + 1 },
  (_, index) => guestCountMin + index,
);

export function isGuestCount(value: string) {
  if (!/^\d+$/.test(value)) return false;
  const count = Number(value);
  return count >= guestCountMin && count <= guestCountMax;
}

export type Attendance = (typeof attendanceOptions)[number]["value"];
export type MealPreference = (typeof mealOptions)[number]["value"];

export type RsvpFieldErrors = Partial<
  Record<
    | "fullName"
    | "email"
    | "attendance"
    | "mealPreference"
    | "dietaryRestrictions"
    | "plusOneName",
    string
  >
>;

export type RsvpActionState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: RsvpFieldErrors;
};

export const initialRsvpState: RsvpActionState = {
  status: "idle",
};

export type RsvpPayload = {
  submittedAt: string;
  fullName: string;
  email: string;
  attendance: Attendance | "";
  mealPreference: MealPreference | "";
  dietaryRestrictions: string;
  plusOneName: string;
};
