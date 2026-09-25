export async function fetchSheet(url: string, init: RequestInit = {}) {
  const response = await fetch(url, {
    ...init,
    redirect: "manual",
    cache: "no-store",
  });

  // Apps Script answers with a 302. Following it automatically lands on an error page.
  if (response.status >= 300 && response.status < 400) {
    const location = response.headers.get("location");
    if (location) {
      return fetch(location, {
        method: "GET",
        redirect: "follow",
        cache: "no-store",
      });
    }
  }

  return response;
}

export function readSheetResult<T extends { ok?: boolean }>(body: string): T | null {
  try {
    const result = JSON.parse(body) as T;
    if (typeof result.ok === "boolean") return result;
  } catch {
    return null;
  }

  return null;
}
