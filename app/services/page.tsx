import type { Metadata } from "next";
import { getServices } from "@/lib/data";
import { whatsappUrl } from "@/config/contact";
import HeroSection from "@/components/HeroSection";
import RevealSection from "@/components/RevealSection";
import ImageWithFallback from "@/components/ImageWithFallback";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Conference halls, garden venues, dining, outside catering and guest services at Tea Tot Hotel, Machakos.",
};

function enquireFor(slug: string): { label: string; href: string } {
  switch (slug) {
    case "conference-events":
      return { label: "Enquire on WhatsApp", href: whatsappUrl("conference") };
    case "garden-venue":
    case "outside-catering":
      return { label: "Enquire on WhatsApp", href: whatsappUrl("events") };
    case "restaurant":
      return { label: "Reserve on WhatsApp", href: whatsappUrl("dining") };
    default:
      return { label: "Enquire on WhatsApp", href: whatsappUrl("general") };
  }
}

export default function ServicesPage() {
  const services = getServices();

  return (
    <div>
      <HeroSection
        label="HOTEL SERVICES"
        headline="Everything you could need."
        paragraph="Conference for 200, gardens for 4,000, restaurant-quality dining and professional outside catering — all under one roof in Machakos."
        imageSrc="/images/reception/reception-1.jpg"
        imageAlt="Tea Tot Hotel reception"
        height="640px"
        parallax
        primaryButton={{
          text: "Enquire on WhatsApp",
          href: whatsappUrl("conference"),
          external: true,
        }}
        secondaryButton={{ text: "Contact us", href: "/contact" }}
      />

      <div className="mx-auto max-w-[var(--container-max)] px-6 py-24">
        <div className="space-y-24">
          {services.map((service) => {
            const enquire = enquireFor(service.slug);
            return (
              <RevealSection key={service.slug} as="section" id={service.slug} className="scroll-mt-28">
                <div className="grid gap-12 desktop:grid-cols-2 desktop:items-center desktop:gap-24">
                  <div className="aspect-[560/320] w-full overflow-hidden">
                    <ImageWithFallback
                      src={service.image.url}
                      alt={service.image.alt || service.name}
                      width={560}
                      height={320}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--color-text-primary)]">
                      {service.category}
                    </p>
                    <h2
                      className="mt-3 text-4xl font-semibold tracking-tight tablet:text-[40px] desktop:text-5xl"
                      style={{ fontFamily: "var(--font-inter-display)" }}
                    >
                      {service.name}
                    </h2>
                    <div
                      className="mt-6 max-w-full text-[var(--color-text-secondary)] leading-relaxed desktop:max-w-[90%]"
                      dangerouslySetInnerHTML={{ __html: service.fullDescription }}
                    />
                    <a
                      href={enquire.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 inline-block cursor-pointer rounded-none bg-[var(--color-text-primary)] px-4 py-2 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-text-primary)]"
                    >
                      {enquire.label}
                    </a>
                  </div>
                </div>
              </RevealSection>
            );
          })}
        </div>
      </div>
    </div>
  );
}
