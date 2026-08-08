import { contact } from "@/config/contact";
import type { Faq, Testimonial } from "@/types/cms";
import { stripHtml } from "@/lib/format";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://teatot.co.ke";

export function getHotelJsonLd(testimonials?: Testimonial[]) {
  const base = {
    "@context": "https://schema.org",
    "@type": ["Hotel", "LodgingBusiness"],
    name: contact.hotelName,
    description:
      "Hospitality and service at its best in Machakos, Kenya. 56 furnished rooms, conference facilities for up to 200, dining, gardens and outside catering.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Konza Road, Opposite Machakos Level 5 Hospital",
      addressLocality: "Machakos",
      postalCode: "90100",
      postOfficeBoxNumber: "599",
      addressCountry: "KE",
    },
    telephone: contact.phone,
    email: contact.email,
    url: BASE_URL,
    image: `${BASE_URL}/images/home/hotel-front.jpeg`,
    numberOfRooms: 56,
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Free Wi-Fi", value: true },
      { "@type": "LocationFeatureSpecification", name: "Free Parking", value: true },
      { "@type": "LocationFeatureSpecification", name: "Air Conditioning", value: true },
      { "@type": "LocationFeatureSpecification", name: "Conference Facilities", value: true },
      { "@type": "LocationFeatureSpecification", name: "Restaurant", value: true },
      { "@type": "LocationFeatureSpecification", name: "24-Hour Reception", value: true },
    ],
    checkinTime: "14:00",
    checkoutTime: "12:00",
    currenciesAccepted: "KES",
    priceRange: "$$",
  } as Record<string, unknown>;

  // Add real guest reviews without fabricating an aggregate rating
  if (testimonials && testimonials.length > 0) {
    base.review = testimonials.map((t) => ({
      "@type": "Review",
      author: { "@type": "Person", name: t.guestName },
      datePublished: t.date,
      reviewBody: stripHtml(t.quote),
      reviewRating: {
        "@type": "Rating",
        ratingValue: t.rating,
        bestRating: 5,
        worstRating: 1,
      },
    }));
  }

  return base;
}

export function getFaqPageJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: stripHtml(faq.answer),
      },
    })),
  };
}

export function getRoomProductJsonLd(room: {
  name: string;
  slug: string;
  priceSingle: number;
  priceDouble: number;
  currency: string;
  roomSize: number;
  bedType: string;
  maxGuests: number;
  thumbnail: { url: string; alt?: string };
}) {
  const currencyCode = "KES";
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: room.name,
    description: `${room.bedType}, ${room.roomSize} m², up to ${room.maxGuests} guests. Free Wi-Fi, AC, hot shower. Tea Tot Hotel, Machakos.`,
    image: `${BASE_URL}${room.thumbnail.url}`,
    url: `${BASE_URL}/rooms/${room.slug}`,
    brand: { "@type": "Brand", name: contact.hotelName },
    offers: [
      {
        "@type": "Offer",
        name: "Single B&B",
        price: room.priceSingle,
        priceCurrency: currencyCode,
        availability: "https://schema.org/InStock",
        seller: { "@type": "Organization", name: contact.hotelName },
      },
      {
        "@type": "Offer",
        name: "Double B&B",
        price: room.priceDouble,
        priceCurrency: currencyCode,
        availability: "https://schema.org/InStock",
        seller: { "@type": "Organization", name: contact.hotelName },
      },
    ],
  };
}
