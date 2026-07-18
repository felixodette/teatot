import type { Metadata } from "next";
import { getServices } from "@/lib/data";
import HeroSection from "@/components/HeroSection";
import RevealSection from "@/components/RevealSection";
import ImageWithFallback from "@/components/ImageWithFallback";

export const metadata: Metadata = {
  title: "Services — Tea Tot Hotels",
  description:
    "Conference halls, garden venues, dining, outside catering and guest services at Tea Tot Hotels, Machakos.",
};

export default function ServicesPage() {
  const services = getServices();

  return (
    <main>
      <HeroSection
        label="HOTEL SERVICES"
        headline="Everything you could need."
        paragraph="Conference for 200, gardens for 4,000, restaurant-quality dining and professional outside catering — all under one roof in Machakos."
        imageSrc="/images/reception/reception-1.jpg"
        imageAlt="Tea Tot Hotels reception"
        height="640px"
      />

      <div className="mx-auto max-w-[var(--container-max)] px-6 py-24">
        <div className="space-y-24">
          {services.map((service) => (
            <RevealSection key={service.slug} as="section">
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
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </main>
  );
}
