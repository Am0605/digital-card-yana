import { getIcsContents } from "@/lib/calendar";

export function GET() {
  return new Response(getIcsContents(), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'inline; filename="majlis.ics"',
    },
  });
}
