export type AnalyticsEvent =
  | "whatsapp_click"
  | "book_start"
  | "contact_submit";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function gaId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  return id || undefined;
}

export function metaPixelId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim();
  return id || undefined;
}

/** Fire conversion events — no-ops when pixels unset or off-window. */
export function track(
  event: AnalyticsEvent,
  props: Record<string, string | number | boolean | undefined> = {},
): void {
  if (typeof window === "undefined") return;

  const clean = Object.fromEntries(
    Object.entries(props).filter(([, v]) => v !== undefined),
  );

  if (gaId() && typeof window.gtag === "function") {
    window.gtag("event", event, clean);
  }

  if (metaPixelId() && typeof window.fbq === "function") {
    window.fbq("trackCustom", event, clean);
  }
}
