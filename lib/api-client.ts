const BASE =
  (process.env.NEXT_PUBLIC_API_BASE_URL ?? "api").replace(/\/$/, "") || "";

export function buildApiUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${BASE}${normalizedPath}`;
}
