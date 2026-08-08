import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import RevealSection from "@/components/RevealSection";
import ContactForm from "@/components/ContactForm";
import MapEmbed from "@/components/MapEmbed";
import FaqAccordion from "@/components/FaqAccordion";
import { contact, whatsappUrl } from "@/config/contact";
import { getFaqs } from "@/lib/data";
import { getFaqPageJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Tea Tot Hotel. Konza Road, Machakos — rooms, conferencing, dining and events.",
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact" },
};

export default function ContactPage() {
  const faqs = getFaqs();

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getFaqPageJsonLd(faqs)) }}
      />
      <HeroSection
        label="GET IN TOUCH"
        headline="Find us."
        paragraph="Konza Road, opposite Machakos Level 5 Hospital. Call, email or WhatsApp — our team is here 24/7."
        imageSrc="/images/rooms/room-8.jpg"
        imageAlt="Hotel lobby interior"
        height="640px"
        parallax
        primaryButton={{
          text: "Chat on WhatsApp",
          href: whatsappUrl("general"),
          external: true,
        }}
        secondaryButton={{ text: "Call us", href: `tel:${contact.phone}`, external: true }}
      />

      <div className="mx-auto max-w-[var(--container-max)] px-6 py-24 flex flex-col gap-32">
        <RevealSection as="section">
          <div className="grid gap-16 md:grid-cols-2">
            <div className="space-y-10">
              <h2
                className="text-3xl font-semibold tracking-tight"
                style={{ fontFamily: "var(--font-inter-display)" }}
              >
                Contact Information
              </h2>
              <div className="space-y-6 text-[var(--color-text-subtle)]">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.15em] text-[var(--color-text-primary)]">Address</p>
                  <p className="mt-1">{contact.address}</p>
                </div>
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.15em] text-[var(--color-text-primary)]">Phone</p>
                  <a href={`tel:${contact.phone}`} className="mt-1 block hover:underline">{contact.phone}</a>
                </div>
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.15em] text-[var(--color-text-primary)]">WhatsApp</p>
                  <a
                    href={whatsappUrl("general")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block hover:underline"
                  >
                    {contact.phone}
                  </a>
                </div>
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.15em] text-[var(--color-text-primary)]">Email</p>
                  <a href={`mailto:${contact.email}`} className="mt-1 block hover:underline">{contact.email}</a>
                </div>
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.15em] text-[var(--color-text-primary)]">Hours</p>
                  <p className="mt-1">{contact.hours}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2
                className="text-3xl font-semibold tracking-tight"
                style={{ fontFamily: "var(--font-inter-display)" }}
              >
                Send a Message
              </h2>
              <ContactForm />
            </div>
          </div>
        </RevealSection>

        <RevealSection as="section" delay={0.1}>
          <FaqAccordion items={faqs} />
        </RevealSection>

        <RevealSection as="section" delay={0.15}>
          <MapEmbed />
        </RevealSection>
      </div>
    </div>
  );
}
