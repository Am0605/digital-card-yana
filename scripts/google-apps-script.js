/**
 * Google Apps Script for the wedding RSVP sheet.
 *
 * 1. Create a Google Sheet with a tab named "RSVPs".
 * 2. Add a header row:
 *    Masa | Nama | Kehadiran | Bilangan tetamu | Ucapan
 * 3. Extensions → Apps Script, paste this file, then Deploy → New deployment → Web app.
 *    Execute as: Me
 *    Who has access: Anyone
 * 4. Copy the web app URL into GOOGLE_SHEETS_WEBHOOK_URL.
 */

const SHARED_SECRET = ""; // optional: match GOOGLE_SHEETS_SECRET
const SHEET_NAME = "RSVPs";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    if (SHARED_SECRET && data.secret !== SHARED_SECRET) {
      return json_({ ok: false, error: "Unauthorized" });
    }

    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet =
      spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.getSheets()[0];

    sheet.appendRow([
      data.submittedAt || new Date(),
      data.fullName || "",
      data.attendance || "",
      data.guestCount || "",
      data.message || "",
    ]);

    return json_({ ok: true });
  } catch (error) {
    return json_({ ok: false, error: String(error) });
  }
}

function json_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
