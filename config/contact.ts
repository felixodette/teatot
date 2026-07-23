export const contact = {
  hotelName: "Tea Tot Hotel",
  address: "Konza Road, Opposite Machakos Level 5 Hospital, P.O. Box 599-90100, Machakos",
  phone: "+254-718-009684",
  /** Digits only for wa.me / sms / tel (no +) */
  whatsapp: "254718009684",
  /** E.164 with + for tel: and sms: */
  phoneE164: "+254718009684",
  email: "info@teatot.co.ke",
  hours: "Reception: 24/7 | Restaurant, Coffee Shop & Pizzeria on-site",
  mapLocation: "Tea+Tot+Hotel,+Konza+Road,+Machakos",
  mapZoom: 16,
  messenger: "https://m.me/teatothotelmachakos",
} as const;

/** Prefill WhatsApp chat — rooms, events, or general. */
export function whatsappUrl(
  intent: "rooms" | "conference" | "events" | "general" = "general",
): string {
  const messages = {
    rooms: "Hi Tea Tot — I'd like to check room availability.",
    conference: "Hi — I'd like to enquire about conference facilities.",
    events: "Hi — outdoor / garden event enquiry.",
    general: "Hi Tea Tot — I'd like to get in touch.",
  } as const;
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(messages[intent])}`;
}

export function telUrl(): string {
  return `tel:${contact.phoneE164}`;
}

export function smsUrl(
  body = "Hi Tea Tot — I'd like to get in touch.",
): string {
  return `sms:${contact.phoneE164}?body=${encodeURIComponent(body)}`;
}
