import type { Metadata } from "next";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import RevealSection from "@/components/RevealSection";
import ImageWithFallback from "@/components/ImageWithFallback";
import ParallaxImage from "@/components/ParallaxImage";
import { getBlogPosts, getFeaturedRooms, getServices, getTestimonials } from "@/lib/data";

export const metadata: Metadata = {
  title: "Tea Tot Hotels — Hospitality & Service at its Best",
  description:
    "56 elegantly furnished rooms, world-class conferencing, outside catering and breathtaking gardens accommodating up to 4,000 guests in Machakos, Kenya.",
};

function FiveStars() {
  return (
    <div className="flex gap-1" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-[var(--color-black)]"
          aria-hidden
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "");
}

export default function Home() {
  const featuredRooms = getFeaturedRooms();
  const services = getServices();
  const testimonials = getTestimonials();
  const blogPosts = getBlogPosts().slice(0, 3);

  return (
    <main>
      <HeroSection
        label="Machakos, Kenya"
        headline="A Premier Machakos Stay"
        paragraph="56 elegantly furnished rooms, world-class conferencing, outside catering and breathtaking gardens accommodating up to 4,000 guests."
        imageSrc="/images/hero/hotel-lobby.jpg"
        imageAlt="Tea Tot Hotels"
        height="100vh"
        primaryButton={{ text: "View Rooms", href: "/rooms" }}
        secondaryButton={{ text: "Our Story", href: "/about" }}
        rating="★★★ Machakos Premier"
      />

      <div
        className="mx-auto max-w-[var(--container-max)] px-6"
        style={{ display: "flex", flexDirection: "column", gap: "128px", padding: "80px 24px" }}
      >
        {/* Rooms & Suites */}
        <section>
          <RevealSection>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-text-subtle)]">
              Rooms &amp; Suites
            </p>
            <h2
              className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl"
              style={{ fontFamily: "var(--font-inter-display)" }}
            >
              Find your room.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--color-text-secondary)]">
              Four comfortable room types — each with satellite TV, AC, hot showers and complimentary Wi-Fi.
            </p>
            <div className="mt-6">
              <Link
                href="/rooms"
                className="rounded-full border border-[var(--color-border)] px-6 py-3 text-sm font-medium transition-colors hover:bg-[var(--color-bg-subtle)]"
              >
                View All Rooms
              </Link>
            </div>
          </RevealSection>

          <RevealSection delay={0.1} className="mt-12 flex gap-2">
            {featuredRooms.slice(0, 3).map((room) => (
              <Link key={room.slug} href={`/rooms/${room.slug}`} className="group flex-1">
                <div className="overflow-hidden rounded-lg">
                  <ImageWithFallback
                    src={room.thumbnail.url}
                    alt={room.thumbnail.alt || room.name}
                    width={400}
                    height={450}
                    className="h-[450px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-4 text-lg font-medium">{room.name}</h3>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.15em] text-[var(--color-text-subtle)]">
                  {room.category}
                </p>
                <p className="mt-2 text-sm font-medium">
                  {room.currency} {room.pricePerNight}{" "}
                  <span className="font-normal text-[var(--color-text-subtle)]">/ night</span>
                </p>
              </Link>
            ))}
          </RevealSection>
        </section>

        {/* Hotel Services — before Our Story per Framer section order */}
        <section>
          <div className="sticky top-0 h-[528px] overflow-hidden">
            <ParallaxImage
              src="/images/home/services-parallax.jpg"
              alt="Hotel services"
              width={1200}
              height={700}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="relative z-[2] bg-[var(--color-bg-subtle)] px-6 py-16 tablet:px-16">
            <RevealSection>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-text-subtle)]">
                Hotel Services
              </p>
              <h2
                className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl"
                style={{ fontFamily: "var(--font-inter-display)" }}
              >
                Everything you need.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--color-text-secondary)]">
                Conference halls, garden venues, dining, outside catering and 24/7 guest service — all on Konza Road, Machakos.
              </p>
            </RevealSection>

            <RevealSection delay={0.1} className="mt-12 grid gap-2 sm:grid-cols-2 desktop:grid-cols-4">
              {services.slice(0, 4).map((service) => (
                <div key={service.slug} className="p-8">
                  <p className="text-xs text-[var(--color-text-subtle)]">{service.number}</p>
                  <h3 className="mt-2 text-base font-medium">{service.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    {service.shortDescription}
                  </p>
                </div>
              ))}
            </RevealSection>
          </div>
        </section>

        {/* Our Story */}
        <section className="grid items-center gap-12 lg:grid-cols-2 lg:gap-0">
          <RevealSection className="lg:pr-16">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-text-subtle)]">
              OUR PHILOSOPHY
            </p>
            <h2
              className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl"
              style={{ fontFamily: "var(--font-inter-display)" }}
            >
              Where comfort meets local warmth.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-text-secondary)]">
              At Tea Tot Hotels we are driven by the desire to provide wellbeing and comfort. Your satisfaction is our daily purpose — met with warmth, enthusiasm and respect. Perfectly located on Konza Road, opposite Machakos Level 5 Hospital.
            </p>
            <div className="mt-8">
              <Link
                href="/about"
                className="rounded-full border border-[var(--color-border)] px-6 py-3 text-sm font-medium transition-colors hover:bg-[var(--color-bg-subtle)]"
              >
                Meet the Team
              </Link>
            </div>
          </RevealSection>

          <RevealSection delay={0.1}>
            <div className="overflow-hidden rounded-lg" style={{ height: 640 }}>
              <ImageWithFallback
                src="/images/home/our-story.jpg"
                alt="Tea Tot Hotels — Our Story"
                width={640}
                height={640}
                className="h-full w-full object-cover"
              />
            </div>
          </RevealSection>
        </section>

        {/* Guest Reviews */}
        <section>
          <RevealSection>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-text-subtle)]">
              GUEST REVIEWS
            </p>
            <h2
              className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl"
              style={{ fontFamily: "var(--font-inter-display)" }}
            >
              What our guests say.
            </h2>
          </RevealSection>

          <RevealSection delay={0.1} className="mt-12 grid gap-2 sm:grid-cols-2 desktop:grid-cols-3">
            {testimonials.slice(0, 3).map((t) => (
              <article
                key={t.slug}
                className="bg-[var(--color-bg-subtle)] p-8"
              >
                <FiveStars />
                <p className="mt-4 text-base leading-relaxed text-[var(--color-text-secondary)]">
                  {stripHtml(t.quote)}
                </p>
                <div className="mt-6">
                  <p className="text-sm font-medium">{t.guestName}</p>
                  <p className="text-sm text-[var(--color-text-secondary)]">{t.location}</p>
                  <p className="mt-3 text-xs text-[var(--color-text-subtle)]">Stayed at</p>
                  <p className="text-sm font-medium">{t.roomStayed}</p>
                </div>
              </article>
            ))}
          </RevealSection>
        </section>

        {/* The Restaurant */}
        <section>
          <RevealSection>
            <div className="overflow-hidden" style={{ height: 528 }}>
              <ParallaxImage
                src="/images/dining/dining-interior.jpg"
                alt="Dining at Tea Tot Hotels"
                width={1200}
                height={700}
                className="w-full"
              />
            </div>
          </RevealSection>
          <RevealSection delay={0.1}>
            <div className="flex justify-end">
              <div
                className="bg-[var(--color-bg-subtle)] p-16"
                style={{ maxWidth: "50%" }}
              >
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-text-subtle)]">
                  Food &amp; Beverage
                </p>
                <h2
                  className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl"
                  style={{ fontFamily: "var(--font-inter-display)" }}
                >
                  A world of flavours.
                </h2>
                <p className="mt-6 text-base leading-relaxed text-[var(--color-text-secondary)]">
                  From Kenyan classics to continental cuisine, artisan pizza and world-class coffee at ANAM Restaurant, TeaTot Pizzeria and our Coffee Shop.
                </p>
                <p className="mt-4 text-base leading-relaxed text-[var(--color-text-secondary)]">
                  Freshly baked artisan pizzas with hand-stretched dough, house-made tomato sauce and premium toppings. Specialty Kenyan brews with signature latte art, served all day.
                </p>
                <div className="mt-8">
                  <Link
                    href="/dining"
                    className="rounded-full border border-[var(--color-border)] px-6 py-3 text-sm font-medium transition-colors hover:bg-[var(--color-bg)]"
                  >
                    See Our Menu
                  </Link>
                </div>
              </div>
            </div>
          </RevealSection>
        </section>

        {/* Journal */}
        <section>
          <RevealSection>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-text-subtle)]">
              Explore Machakos
            </p>
            <h2
              className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl"
              style={{ fontFamily: "var(--font-inter-display)" }}
            >
              Discover what&apos;s around us.
            </h2>
          </RevealSection>

          <RevealSection delay={0.1} className="mt-12 grid gap-2 sm:grid-cols-2 desktop:grid-cols-3">
            {blogPosts.map((post) => {
              const date = new Date(post.publishedDate).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              });

              return (
                <Link key={post.slug} href={`/blog-posts/${post.slug}`} className="group">
                  <div className="overflow-hidden rounded-lg">
                    <ImageWithFallback
                      src={post.coverImage.url}
                      alt={post.coverImage.alt || post.title}
                      width={400}
                      height={280}
                      className="h-[280px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-4 flex items-center gap-3 text-xs text-[var(--color-text-subtle)]">
                    <span className="rounded-full border border-[var(--color-border)] px-3 py-0.5 font-medium uppercase tracking-[0.1em]">
                      {post.tag}
                    </span>
                    <time dateTime={post.publishedDate}>{date}</time>
                  </div>
                  <h3 className="mt-3 text-lg font-medium group-hover:opacity-70">{post.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    {stripHtml(post.excerpt)}
                  </p>
                </Link>
              );
            })}
          </RevealSection>
        </section>
      </div>
    </main>
  );
}
