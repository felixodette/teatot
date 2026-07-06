export const navLinks = [
  { label: "Rooms", href: "/rooms" },
  { label: "Services", href: "/services" },
  { label: "Dining", href: "/dining" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
] as const;

export const ctaLink = {
  label: "Book Now",
  href: "https://teatot.co.ke/event-booking/",
  external: true,
} as const;

export const footerLinks = {
  tagline:
    "Warmth, comfort and authentic Kenyan hospitality in the heart of Machakos. Gardens for 4,000 · Conference for 200 · 56 rooms · Outside Catering.",
  navigate: [
    { label: "Rooms", href: "/rooms" },
    { label: "Services", href: "/services" },
    { label: "Dining", href: "/dining" },
    { label: "About", href: "/about" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/legal-page/privacy-policy" },
    { label: "Terms & Conditions", href: "/legal-page/terms-conditions" },
  ],
  contact: {
    phone: "+254-718-009684",
    email: "info@teatot.co.ke",
  },
  social: [
    { platform: "Facebook", href: "https://www.facebook.com/teatothotelmachakos" },
    { platform: "Instagram", href: "https://instagram.com/teatotmachakos" },
    { platform: "WhatsApp", href: "https://wa.me/254718009684" },
    { platform: "Messenger", href: "https://www.facebook.com/teatothotelmachakos" },
    { platform: "Telegram", href: "https://twitter.com/teatothotel" },
  ],
} as const;
