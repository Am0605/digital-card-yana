"use server";

import {
  attendanceOptions,
  isGuestCount,
  type Attendance,
  type RsvpActionState,
  type RsvpFieldErrors,
} from "@/lib/rsvp";

const attendanceValues = new Set(attendanceOptions.map((option) => option.value));
const attendanceLabels: Record<Attendance, string> = {
  attending: "Hadir",
  declining: "Tidak hadir",
};

function readField(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function submitRsvp(
  _prevState: RsvpActionState,
  formData: FormData,
): Promise<RsvpActionState> {
  const fullName = readField(formData, "fullName");
  const attendance = readField(formData, "attendance");
  const guestCount = readField(formData, "guestCount");
  const message = readField(formData, "message");

  const fieldErrors: RsvpFieldErrors = {};

  if (fullName.length < 2) {
    fieldErrors.fullName = "Sila masukkan nama penuh.";
  }

  if (!attendanceValues.has(attendance as Attendance)) {
    fieldErrors.attendance = "Sila maklumkan sama ada anda dapat hadir.";
  }

  if (attendance === "attending" && !isGuestCount(guestCount)) {
    fieldErrors.guestCount = "Sila pilih bilangan tetamu dari 1 hingga 10.";
  }

  if (message.length > 500) {
    fieldErrors.message = "Ucapan terlalu panjang. Sila ringkaskan.";
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
    attendance: attendanceLabels[attendance as Attendance],
    guestCount: attendance === "attending" ? Number(guestCount) : "",
    message,
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
