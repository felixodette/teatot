import type { Metadata } from "next";
import { inter, interDisplay } from "@/lib/fonts";
import { LenisProvider } from "@/providers/LenisProvider";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { getHotelJsonLd } from "@/lib/structured-data";
import "./globals.css";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://teatot.co.ke";

export const metadata: Metadata = {
  title: {
    default: "Tea Tot Hotels — Hospitality & Service at its Best",
    template: "%s | Tea Tot Hotels",
  },
  description:
    "56 elegantly furnished rooms, world-class conferencing, outside catering and breathtaking gardens in Machakos, Kenya.",
  metadataBase: new URL(BASE_URL),
  openGraph: {
    type: "website",
    siteName: "Tea Tot Hotels",
    locale: "en_KE",
    images: [{ url: "/images/hero/hotel-lobby.jpg", width: 1920, height: 1080, alt: "Tea Tot Hotels" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/hero/hotel-lobby.jpg"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: BASE_URL },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${interDisplay.variable}`}>
      <body className="font-[family-name:var(--font-inter)]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getHotelJsonLd()) }}
        />
        <LenisProvider>
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <Navigation />
          <main id="main-content">{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
