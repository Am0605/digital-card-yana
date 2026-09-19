"use server";

import {
  attendanceOptions,
  mealOptions,
  type Attendance,
  type MealPreference,
  type RsvpActionState,
  type RsvpFieldErrors,
} from "@/lib/rsvp";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const attendanceValues = new Set(attendanceOptions.map((option) => option.value));
const mealValues = new Set(mealOptions.map((option) => option.value));

function readField(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function submitRsvp(
  _prevState: RsvpActionState,
  formData: FormData,
): Promise<RsvpActionState> {
  const fullName = readField(formData, "fullName");
  const email = readField(formData, "email");
  const attendance = readField(formData, "attendance");
  const mealPreference = readField(formData, "mealPreference");
  const dietaryRestrictions = readField(formData, "dietaryRestrictions");
  const plusOneName = readField(formData, "plusOneName");

  const fieldErrors: RsvpFieldErrors = {};

  if (fullName.length < 2) {
    fieldErrors.fullName = "Please enter your full name.";
  }

  if (!EMAIL_RE.test(email)) {
    fieldErrors.email = "Please enter a valid email address.";
  }

  if (!attendanceValues.has(attendance as Attendance)) {
    fieldErrors.attendance = "Please let us know if you can celebrate with us.";
  }

  if (attendance === "attending" && !mealValues.has(mealPreference as MealPreference)) {
    fieldErrors.mealPreference = "Please choose a meal preference.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Please check the highlighted fields and try again.",
      fieldErrors,
    };
  }

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    return {
      status: "error",
      message: "RSVP is not configured yet. Please try again later.",
    };
  }

  const payload = {
    submittedAt: new Date().toISOString(),
    fullName,
    email,
    attendance,
    mealPreference: attendance === "attending" ? mealPreference : "",
    dietaryRestrictions,
    plusOneName: attendance === "attending" ? plusOneName : "",
    secret: process.env.GOOGLE_SHEETS_SECRET ?? "",
  };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      redirect: "follow",
    });

    // Apps Script often 302s after doPost has already appended the row.
    if (response.status >= 400) {
      return {
        status: "error",
        message: "We could not save your RSVP just now. Please try again.",
      };
    }

    return {
      status: "success",
      message: "Thank you — your RSVP has been received with love.",
    };
  } catch {
    return {
      status: "error",
      message: "Something went wrong on the way to our guestbook. Please try again.",
    };
  }
}
