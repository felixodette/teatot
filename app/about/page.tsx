import type { Metadata } from "next";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import RevealSection from "@/components/RevealSection";
import AnimatedCounter from "@/components/AnimatedCounter";
import ImageWithFallback from "@/components/ImageWithFallback";
import BookNowButton from "@/components/BookNowButton";
import ParallaxImage from "@/components/ParallaxImage";
import { getGallery } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description:
    "Tea Tot Hotel on Konza Road, Machakos — 56 rooms, conference for 200, gardens for large gatherings, and dining on site. Built for business, events, and family stays.",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about" },
};

const stats = [
  { label: "Furnished rooms", value: 56 },
  { label: "Conference halls", value: 3 },
  { label: "Garden capacity", value: 4000 },
  { label: "Max conference pax", value: 200 },
] as const;

const ctaClass =
  "mt-6 inline-block cursor-pointer rounded-none border border-[var(--color-border)] bg-transparent px-4 py-2 text-sm font-medium transition-colors duration-200 hover:bg-[var(--color-bg-subtle)]";

const primaryCtaClass =
  "mt-6 inline-block cursor-pointer rounded-none bg-[var(--color-text-primary)] px-4 py-2 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90";

const audiences = [
  {
    slug: "business",
    label: "Business & hospital trips",
    body: "Opposite Machakos Level 5 Hospital on Konza Road. Quiet, sound-proofed rooms, free Wi-Fi, and 24-hour guarded parking — useful when the day runs long.",
    image: "/images/reception/reception-1.jpg",
    imageAlt: "Reception at Tea Tot Hotel, Machakos",
    cta: { type: "book" as const, label: "Book a room" },
  },
  {
    slug: "conference",
    label: "Conferences & training",
    body: "Three halls for up to 200 people, with catering and AV support. Gardens work for outdoor breaks between sessions.",
    image: "/images/conference/baraza-hall.jpeg",
    imageAlt: "Baraza Hall conference space at Tea Tot Hotel",
    cta: { type: "link" as const, label: "Enquire about conferences", href: "/contact" },
  },
  {
    slug: "events",
    label: "Weddings & outdoor events",
    body: "Gardens sized for large gatherings, plus outside catering that stays with you from setup through service.",
    image: "/images/grounds/gardens-2.jpeg",
    imageAlt: "Gardens at Tea Tot Hotel for outdoor events",
    cta: { type: "link" as const, label: "Plan your event", href: "/contact" },
  },
  {
    slug: "families",
    label: "Families & weekends",
    body: "Space to rest, food on site at ANAM, the Coffee Shop and TeaTot Pizzeria, and People’s Park about 2 km away.",
    image: "/images/rooms/bedroom-2.jpeg",
    imageAlt: "Guest room at Tea Tot Hotel",
    cta: { type: "link" as const, label: "View rooms", href: "/rooms" },
  },
] as const;

export default function AboutPage() {
  const gallery = getGallery();

  return (
    <div className="pb-24">
      <HeroSection
        label="OUR PHILOSOPHY"
        headline="A practical base in Machakos."
        paragraph="56 quiet rooms opposite Level 5, halls for up to 200, gardens for large gatherings, and food on site. Built for hospital visits, training weeks, weddings and family weekends."
        imageSrc="/images/dining/chandelier-1.jpg"
        imageAlt="Dining chandelier at Tea Tot Hotel, Machakos"
        height="720px"
        parallax
        primaryButton={{ text: "Book Now", href: "/rooms", openBooking: true }}
        secondaryButton={{ text: "Enquire", href: "/contact" }}
      />

      <div className="mx-auto flex max-w-[1284px] flex-col gap-24 px-6 py-12 tablet:gap-20 tablet:py-20 desktop:gap-32 desktop:py-24">
        {/* Who We Are */}
        <RevealSection as="section">
          <div className="flex flex-col bg-[var(--color-bg-subtle)] desktop:flex-row">
            <div className="relative h-[320px] w-full overflow-hidden desktop:h-[640px] desktop:flex-1">
              <ImageWithFallback
                src="/images/rooms/deluxe-room.jpeg"
                alt="Deluxe room at Tea Tot Hotel"
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
                A practical base in Machakos.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[var(--color-text-secondary)]">
                Tea Tot Hotel offers 56 tastefully furnished, sound-proofed rooms with natural light, free high-speed Wi-Fi, ANAM Restaurant, Coffee Shop and TeaTot Pizzeria on-site, and free secure guarded parking available 24 hours.
              </p>
              <p className="mt-5 text-base leading-relaxed text-[var(--color-text-secondary)]">
                On Konza Road, opposite Machakos Level 5 Hospital — about 60 km from Nairobi. Check in from 2:00 PM, check out by 12:00 noon.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                ANAM Restaurant and the full dining menu are hosted at{" "}
                <a
                  href="https://anam.teatot.co.ke/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2"
                >
                  anam.teatot.co.ke
                </a>{" "}
                — a dedicated site for our food &amp; beverage offering, part of Tea Tot Hotel.
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

        {/* Who We Host — replaces team section */}
        <section className="flex flex-col gap-12 desktop:gap-16">
          <RevealSection>
            <p className="text-xs font-medium uppercase tracking-[0.15em]">
              WHO WE HOST
            </p>
            <h2
              className="mt-3 text-4xl font-semibold tracking-tight desktop:text-5xl"
              style={{ fontFamily: "var(--font-inter-display)" }}
            >
              Built for why you’re in Machakos.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--color-text-secondary)]">
              Hospital visits, training weeks, weddings, and family weekends all land here for the same reasons: a quiet room, food downstairs, and space that works for the day you actually planned.
            </p>
          </RevealSection>

          <RevealSection delay={0.1}>
            <div className="grid grid-cols-1 gap-12 tablet:grid-cols-2 tablet:gap-x-8 tablet:gap-y-16">
              {audiences.map((item) => (
                <article key={item.slug} className="flex flex-col gap-4">
                  <div className="relative h-[280px] w-full overflow-hidden desktop:h-[360px]">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="(max-width: 809px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3
                      className="text-2xl font-semibold"
                      style={{ fontFamily: "var(--font-inter-display)" }}
                    >
                      {item.label}
                    </h3>
                    <p className="text-base leading-relaxed text-[var(--color-text-secondary)]">
                      {item.body}
                    </p>
                    {item.cta.type === "book" ? (
                      <BookNowButton className={primaryCtaClass}>{item.cta.label}</BookNowButton>
                    ) : (
                      <Link href={item.cta.href} className={ctaClass}>
                        {item.cta.label}
                      </Link>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </RevealSection>
        </section>

        {/* Restaurant wide shot */}
        <RevealSection>
          <figure className="h-[480px] w-full overflow-hidden desktop:h-[640px]">
            <ParallaxImage
              src="/images/dining/restaurant-3.jpg"
              alt="ANAM Restaurant at Tea Tot Hotel"
              sizes="100vw"
              speed={0.25}
              layerHeight="140%"
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
              A look inside.
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

          <RevealSection delay={0.15}>
            <Link href="/gallery" className="btn-secondary">
              Open full gallery
            </Link>
          </RevealSection>
        </section>
      </div>
    </div>
  );
}
