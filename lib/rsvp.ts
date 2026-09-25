export const attendanceOptions = [
  { value: "attending", label: "Hadir dengan sukacita" },
  { value: "declining", label: "Mohon maaf, tidak dapat hadir" },
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

export type RsvpFieldErrors = Partial<
  Record<"fullName" | "attendance" | "guestCount" | "message", string>
>;

export type RsvpActionState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: RsvpFieldErrors;
};

export const initialRsvpState: RsvpActionState = {
  status: "idle",
};
