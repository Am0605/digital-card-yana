export const attendanceOptions = [
  { value: "attending", label: "Joyfully Attending" },
  { value: "declining", label: "Regretfully Declines" },
] as const;

export const mealOptions = [
  { value: "beef", label: "Beef" },
  { value: "chicken", label: "Chicken" },
  { value: "vegetarian", label: "Vegetarian" },
] as const;

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
