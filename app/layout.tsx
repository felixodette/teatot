import type { Metadata } from "next";
import { inter, interDisplay } from "@/lib/fonts";
import { BookingProvider } from "@/providers/BookingProvider";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { getHotelJsonLd } from "@/lib/structured-data";
import { getRooms } from "@/lib/data";
import "./globals.css";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://teatot.co.ke";

export const metadata: Metadata = {
  title: {
    default: "Tea Tot Hotel — Hospitality & Service at its Best",
    template: "%s | Tea Tot Hotel",
  },
  description:
    "Tea Tot Hotel on Konza Road, Machakos — 56 rooms, conference for 200, gardens for large events, ANAM Restaurant and TeaTot Pizzeria. Book direct or enquire on WhatsApp.",
  metadataBase: new URL(BASE_URL),
  openGraph: {
    type: "website",
    siteName: "Tea Tot Hotel",
    locale: "en_KE",
    images: [
      {
        url: "/images/home/hotel-front.jpeg",
        width: 1298,
        height: 960,
        alt: "Tea Tot Hotel facade on Konza Road, Machakos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/home/hotel-front.jpeg"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: BASE_URL },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const roomOptions = getRooms().map((r) => r.name);

  return (
    <html lang="en" className={`${inter.variable} ${interDisplay.variable}`}>
      <body className="font-[family-name:var(--font-inter)]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getHotelJsonLd()) }}
        />
        <BookingProvider roomOptions={roomOptions}>
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <Navigation />
          <main id="main-content">{children}</main>
          <Footer />
        </BookingProvider>
      </body>
    </html>
  );
}
