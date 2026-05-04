export function formatDownloads(n: number): string {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return String(n);
}

export function iconUrl(packageName: string): string {
  return `https://play-lh.googleusercontent.com/vi/${packageName}/512`;
}

export const FALLBACK_ICON =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='14' fill='%23e5e7eb'/><text x='50%' y='54%' font-family='Arial' font-size='28' fill='%239ca3af' text-anchor='middle' dominant-baseline='middle'>?</text></svg>`,
  );
