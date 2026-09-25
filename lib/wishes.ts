import { fetchSheet, readSheetResult } from "@/lib/google-sheet";

export type Wish = {
  name: string;
  message: string;
};

type WishResponse = {
  ok?: boolean;
  wishes?: Array<{ name?: string; message?: string }>;
};

export async function fetchWishes(): Promise<Wish[]> {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) return [];

  const endpoint = new URL(webhookUrl);
  const secret = process.env.GOOGLE_SHEETS_SECRET;
  if (secret) endpoint.searchParams.set("secret", secret);

  try {
    const response = await fetchSheet(endpoint.toString(), {
      method: "GET",
      signal: AbortSignal.timeout(20000),
    });
    const result = readSheetResult<WishResponse>(await response.text());
    if (!response.ok || result?.ok !== true || !Array.isArray(result.wishes)) return [];

    return result.wishes.flatMap((wish) => {
      const message = String(wish.message ?? "").trim();
      if (!message) return [];
      return [{ name: String(wish.name ?? "").trim() || "Tetamu", message }];
    });
  } catch (error) {
    console.error("Could not load ucapan", error);
    return [];
  }
}
