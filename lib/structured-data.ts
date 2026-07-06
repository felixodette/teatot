import { contact } from "@/config/contact";

export function getHotelJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: contact.hotelName,
    description:
      "Hospitality and service at its best in Machakos, Kenya. 56 furnished rooms, conference facilities, dining, gardens and outside catering.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Konza Road, Opposite Machakos Level 5 Hospital",
      addressLocality: "Machakos",
      postalCode: "90100",
      addressCountry: "KE",
    },
    telephone: contact.phone,
    email: contact.email,
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://teatot.co.ke",
    starRating: { "@type": "Rating", ratingValue: "3" },
  };
}
