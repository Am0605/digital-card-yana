import { wedding } from "@/lib/wedding";

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function toUtcStamp(date: Date) {
  return (
    `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}` +
    `T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`
  );
}

function icsEscape(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

export function getEventBounds() {
  return {
    start: new Date(wedding.start),
    end: new Date(wedding.end),
  };
}

export function getGoogleCalendarUrl() {
  const { start, end } = getEventBounds();
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `The Wedding of ${wedding.names}`,
    dates: `${toUtcStamp(start)}/${toUtcStamp(end)}`,
    details: `${wedding.tagline}\n\n${wedding.venue.name}\n${wedding.venue.address}, ${wedding.venue.city}`,
    location: `${wedding.venue.name}, ${wedding.venue.address}, ${wedding.venue.city}`,
    ctz: wedding.timezone,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function getIcsContents() {
  const { start, end } = getEventBounds();
  const stamp = toUtcStamp(new Date());
  const uid = `${toUtcStamp(start)}-${wedding.couple.partnerOne.toLowerCase()}-${wedding.couple.partnerTwo.toLowerCase()}@invitation`;

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Yana Wedding Invitation//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${toUtcStamp(start)}`,
    `DTEND:${toUtcStamp(end)}`,
    `SUMMARY:${icsEscape(`The Wedding of ${wedding.names}`)}`,
    `DESCRIPTION:${icsEscape(`${wedding.tagline}\n${wedding.venue.details}`)}`,
    `LOCATION:${icsEscape(`${wedding.venue.name}, ${wedding.venue.address}, ${wedding.venue.city}`)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function downloadIcsFile() {
  const blob = new Blob([getIcsContents()], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${wedding.couple.partnerOne}-${wedding.couple.partnerTwo}-wedding.ics`.toLowerCase();
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
