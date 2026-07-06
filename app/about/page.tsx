import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import RevealSection from "@/components/RevealSection";
import AnimatedCounter from "@/components/AnimatedCounter";
import ImageWithFallback from "@/components/ImageWithFallback";
import { getGallery, getTeam } from "@/lib/data";

export const metadata: Metadata = {
  title: "About — Tea Tot Hotels",
  description:
    "At Tea Tot Hotels we are driven by the desire to provide wellbeing and comfort in the heart of Machakos, Kenya.",
};

const stats = [
  { label: "Furnished rooms", value: 56 },
  { label: "Conference halls", value: 3 },
  { label: "Garden capacity", value: 4000 },
  { label: "Max conference pax", value: 200 },
] as const;

export default function AboutPage() {
  const team = getTeam();
  const gallery = getGallery();

  return (
    <main className="pb-24">
      <HeroSection
        label="OUR PHILOSOPHY"
        headline="Where comfort meets local warmth."
        paragraph="At Tea Tot Hotels we are driven by the desire to provide wellbeing and comfort. Your satisfaction is our daily purpose — met with warmth, enthusiasm and respect."
        imageSrc="/images/hero/about-hero.jpg"
        imageAlt="Tea Tot Hotels exterior"
        height="720px"
        rating="★★★ Machakos Premier"
      />

      <div className="mx-auto flex max-w-[1284px] flex-col gap-24 px-6 py-12 tablet:gap-20 tablet:py-20 desktop:gap-32 desktop:py-24">
        {/* Who We Are */}
        <RevealSection as="section">
          <div className="flex flex-col bg-[var(--color-bg-subtle)] desktop:flex-row">
            <div className="relative h-[320px] w-full overflow-hidden desktop:h-[640px] desktop:flex-1">
              <ImageWithFallback
                src="/images/about/who-we-are.jpg"
                alt="Tea Tot Hotels"
                width={1284}
                height={640}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col justify-center gap-2.5 px-6 py-12 desktop:max-w-[50%] desktop:p-16">
              <p className="text-xs font-medium uppercase tracking-[0.15em]">
                WHO WE ARE
              </p>
              <h2
                className="text-4xl font-semibold tracking-tight desktop:text-5xl"
                style={{ fontFamily: "var(--font-inter-display)" }}
              >
                Hospitality &amp; service at its best.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[var(--color-text-secondary)]">
                Tea Tot Hotels offers 56 tastefully furnished, sound-proofed rooms with natural light, free high-speed Wi-Fi, ANAM Restaurant, Coffee Shop and TeaTot Pizzeria on-site, and free secure guarded parking available 24 hours.
              </p>
              <p className="mt-5 text-base leading-relaxed text-[var(--color-text-secondary)]">
                Perfectly located on Konza Road, opposite Machakos Level 5 Hospital — 60km from Nairobi, in the heart of Machakos. Check in from 2:00 PM, check out by 12:00 noon.
              </p>
            </div>
          </div>
        </RevealSection>

        {/* Stats */}
        <RevealSection as="section">
          <div className="grid grid-cols-1 gap-0.5 tablet:grid-cols-2 desktop:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col gap-4 bg-[var(--color-bg-subtle)] p-12"
              >
                <AnimatedCounter
                  value={stat.value}
                  className="text-[72px] font-bold leading-none tracking-tight [font-family:var(--font-inter-display)]"
                />
                <p className="text-lg font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </RevealSection>

        {/* The Team */}
        <section className="flex flex-col gap-12 desktop:gap-16">
          <RevealSection>
            <p className="text-xs font-medium uppercase tracking-[0.15em]">
              THE TEAM
            </p>
            <h2
              className="mt-3 text-4xl font-semibold tracking-tight desktop:text-5xl"
              style={{ fontFamily: "var(--font-inter-display)" }}
            >
              The people behind the stay.
            </h2>
          </RevealSection>

          <RevealSection delay={0.1}>
            <div className="flex flex-col gap-12 desktop:flex-row desktop:gap-8">
              {team.map((member) => (
                <div
                  key={member.slug}
                  className="flex flex-col gap-4 tablet:flex-row tablet:items-center tablet:gap-12 desktop:flex-1 desktop:flex-col desktop:items-start desktop:gap-6"
                >
                  <div className="h-[320px] w-full shrink-0 overflow-hidden desktop:h-[480px]">
                    <ImageWithFallback
                      src={member.photo.url}
                      alt={member.photo.alt || member.name}
                      width={514}
                      height={480}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <h3
                        className="text-2xl font-semibold"
                        style={{ fontFamily: "var(--font-inter-display)" }}
                      >
                        {member.name}
                      </h3>
                      <p className="text-base font-semibold">{member.role}</p>
                    </div>
                    <div
                      className="text-base leading-relaxed text-[var(--color-text-secondary)]"
                      dangerouslySetInnerHTML={{ __html: member.bio }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </RevealSection>
        </section>

        {/* Restaurant wide shot */}
        <RevealSection>
          <figure className="h-[480px] w-full overflow-hidden desktop:h-[640px]">
            <ImageWithFallback
              src="/images/about/restaurant.jpg"
              alt="ANAM Restaurant at Tea Tot Hotels"
              width={5000}
              height={3333}
              className="h-full w-full object-cover"
            />
          </figure>
        </RevealSection>

        {/* The Hotel gallery */}
        <section className="flex flex-col gap-12 desktop:gap-16">
          <RevealSection>
            <p className="text-xs font-medium uppercase tracking-[0.15em]">
              THE HOTEL
            </p>
            <h2
              className="mt-3 text-4xl font-semibold tracking-tight desktop:text-5xl"
              style={{ fontFamily: "var(--font-inter-display)" }}
            >
              A visual tour.
            </h2>
          </RevealSection>

          <RevealSection delay={0.1}>
            <div className="grid grid-cols-1 gap-2 tablet:grid-cols-2 desktop:grid-cols-3">
              {gallery.map((item) => (
                <div key={item.slug} className="overflow-hidden">
                  <ImageWithFallback
                    src={item.image.url}
                    alt={item.image.alt || item.caption}
                    width={1400}
                    height={933}
                    className="h-[320px] w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </RevealSection>
        </section>
      </div>
    </main>
  );
}
