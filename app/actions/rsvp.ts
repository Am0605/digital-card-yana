"use server";

import {
  attendanceOptions,
  isGuestCount,
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
    fieldErrors.fullName = "Sila masukkan nama penuh.";
  }

  if (!EMAIL_RE.test(email)) {
    fieldErrors.email = "Sila masukkan alamat e-mel yang sah.";
  }

  if (!attendanceValues.has(attendance as Attendance)) {
    fieldErrors.attendance = "Sila maklumkan sama ada anda dapat hadir.";
  }

  if (attendance === "attending" && !mealValues.has(mealPreference as MealPreference)) {
    fieldErrors.mealPreference = "Sila pilih hidangan.";
  }

  if (attendance === "attending" && !isGuestCount(plusOneName)) {
    fieldErrors.plusOneName = "Sila pilih bilangan tetamu dari 1 hingga 10.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Sila semak ruangan yang ditanda dan cuba lagi.",
      fieldErrors,
    };
  }

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    return {
      status: "error",
      message: "Borang kehadiran belum disediakan. Sila cuba sebentar lagi.",
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
        message: "Kehadiran anda tidak dapat disimpan. Sila cuba lagi.",
      };
    }

    return {
      status: "success",
      message: "Terima kasih. Kehadiran anda telah kami terima.",
    };
  } catch {
    return {
      status: "error",
      message: "Ada sedikit gangguan. Sila cuba lagi.",
    };
  }
}
