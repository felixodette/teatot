import type { Metadata } from "next";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import RevealSection from "@/components/RevealSection";
import ImageWithFallback from "@/components/ImageWithFallback";
import ParallaxImage from "@/components/ParallaxImage";
import EmptySection from "@/components/EmptySection";
import StarRating from "@/components/StarRating";
import { getBlogPosts, getFeaturedRooms, getServices, getTestimonials } from "@/lib/data";
import { formatMoney, stripHtml } from "@/lib/format";
import { ctaLink } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "Tea Tot Hotel — Hospitality & Service at its Best",
  description:
    "Tea Tot Hotel, Machakos — 56 rooms, conference up to 200, ANAM Restaurant, TeaTot Pizzeria and gardens for events. Book direct or WhatsApp.",
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

export default function Home() {
  const featuredRooms = getFeaturedRooms().slice(0, 3);
  const services = getServices();
  const testimonials = getTestimonials().slice(0, 3);
  const blogPosts = getBlogPosts().slice(0, 3);

  return (
    <>
      <HeroSection
        label="Machakos, Kenya"
        headline="56 rooms. Gardens for thousands. Opposite Level 5."
        paragraph="Tea Tot Hotel sits on Konza Road for business travellers, hospital visitors, conferences up to 200, and outdoor events in gardens that hold large gatherings. Book a room, reserve a hall, or ask about catering — one team handles it."
        imageSrc="/images/home/hotel-front.jpeg"
        imageAlt="Tea Tot Hotel facade on Konza Road, Machakos"
        fullViewport
        primaryButton={{ text: ctaLink.label, href: ctaLink.href, openBooking: true }}
        secondaryButton={{ text: "View Rooms", href: "/rooms" }}
      />

      <div className="container-page section-stack">
        {/* Rooms & Suites */}
        <section>
          <RevealSection>
            <p className="section-label">Rooms &amp; Suites</p>
            <h2 className="section-heading">Rooms in Machakos.</h2>
            <p className="section-body">
              Four comfortable room types — each with satellite TV, AC, hot showers and complimentary Wi-Fi.
            </p>
            <div className="mt-6">
              <Link href="/rooms" className="btn-secondary">
                View All Rooms
              </Link>
            </div>
          </RevealSection>

          <RevealSection delay={0.1} className="mt-12">
            {featuredRooms.length > 0 ? (
              <div className="flex flex-col gap-8 tablet:flex-row tablet:gap-6">
                {featuredRooms.map((room) => (
                  <Link
                    key={room.slug}
                    href={`/rooms/${room.slug}`}
                    className="group cursor-pointer tablet:flex-1"
                  >
                    <div className="overflow-hidden rounded-lg">
                      <ImageWithFallback
                        src={room.thumbnail.url}
                        alt={room.thumbnail.alt || room.name}
                        width={400}
                        height={450}
                        sizes="(max-width: 809px) 100vw, 33vw"
                        className="h-[280px] w-full object-cover transition-transform duration-200 group-hover:scale-105 tablet:h-[450px]"
                      />
                    </div>
                    <h3 className="mt-4 text-lg font-medium">{room.name}</h3>
                    <p className="mt-1 text-xs font-medium uppercase tracking-[0.15em] text-[var(--color-text-secondary)]">
                      {room.category}
                    </p>
                    <p className="mt-2 text-sm font-medium">
                      From {formatMoney(room.priceSingle, room.currency)}{" "}
                      <span className="font-normal text-[var(--color-text-secondary)]">B&B / night</span>
                    </p>
                  </Link>
                ))}
              </div>
            ) : (
              <EmptySection
                title="Rooms coming soon"
                message="We're refreshing our room listings. Browse all room types or contact us to check availability in Machakos."
                action={{ label: "View All Rooms", href: "/rooms" }}
              />
            )}
          </RevealSection>
        </section>
      </div>

      {/* Hotel Services — Framer HW6O_EXTF */}
      <section className="services-section">
        <div className="services-inset">
          <div className="services-parallax">
            <ParallaxImage
              src="/images/rooms/bedroom-2.jpeg"
              alt="Guest room at Tea Tot Hotel, Machakos"
              priority
            />
          </div>
          <div className="services-panel">
            <div className="services-panel-inner">
              <RevealSection className="services-intro">
                <p className="section-label">Hotel Services</p>
                <h2 className="section-heading">Everything you need in Machakos.</h2>
                <div className="mt-6">
                  <Link href="/services" className="btn-secondary">
                    Explore services
                  </Link>
                </div>
              </RevealSection>

              <RevealSection delay={0.1} className="services-grid">
                {services.slice(0, 4).map((service) => {
                  const isAnam = service.slug === "restaurant";
                  const href = isAnam
                    ? "https://anam.teatot.co.ke/"
                    : `/services#${service.slug}`;
                  const ctaLabels: Record<string, string> = {
                    restaurant: "Explore ANAM Restaurant",
                    "conference-events": "See conference halls",
                    "outside-catering": "Get a catering quote",
                    "garden-venue": "View garden venue",
                    "guest-services": "See guest services",
                  };
                  const ctaLabel = ctaLabels[service.slug] ?? "View details";
                  return (
                    <Link
                      key={service.slug}
                      href={href}
                      {...(isAnam
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="services-card group cursor-pointer transition-opacity duration-200 hover:opacity-90"
                    >
                      <p className="service-number">{service.number}</p>
                      <h3 className="services-card-title">{service.name}</h3>
                      <p className="services-card-desc">{service.shortDescription}</p>
                      <span className="mt-4 inline-block text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-text-primary)]">
                        {ctaLabel}
                      </span>
                    </Link>
                  );
                })}
              </RevealSection>
            </div>
          </div>
        </div>
      </section>

      <div className="container-page section-stack">
        {/* Our Story */}
        <section className="grid items-center gap-12 lg:grid-cols-2 lg:gap-0">
          <RevealSection className="lg:pr-16">
            <p className="section-label">OUR PHILOSOPHY</p>
            <h2 className="section-heading">Comfort meets Machakos warmth.</h2>
            <p className="section-body">
              At Tea Tot Hotel we are driven by the desire to provide wellbeing and comfort. Your satisfaction is our daily purpose — met with warmth, enthusiasm and respect. Perfectly located on Konza Road, opposite Machakos Level 5 Hospital.
            </p>
            <div className="mt-8">
              <Link href="/about" className="btn-secondary">
                About Tea Tot
              </Link>
            </div>
          </RevealSection>

          <RevealSection delay={0.1}>
            <div className="h-[640px] overflow-hidden rounded-lg">
              <ImageWithFallback
                src="/images/dining/coffee-4.jpg"
                alt="Coffee and lounge at Tea Tot Hotel"
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
            <p className="section-label">GUEST REVIEWS</p>
            <h2 className="section-heading">What Machakos guests say.</h2>
          </RevealSection>

          <RevealSection delay={0.1} className="mt-12">
            {testimonials.length > 0 ? (
              <div className="grid gap-2 sm:grid-cols-2 desktop:grid-cols-3">
                {testimonials.map((t) => (
                  <article key={t.slug} className="bg-[var(--color-bg-subtle)] p-8">
                    <StarRating rating={t.rating} />
                    <p className="mt-4 text-base leading-relaxed text-[var(--color-text-secondary)]">
                      {stripHtml(t.quote)}
                    </p>
                    <div className="mt-6">
                      <p className="text-sm font-medium">{t.guestName}</p>
                      <p className="text-sm text-[var(--color-text-secondary)]">{t.location}</p>
                      <p className="mt-3 text-xs text-[var(--color-text-secondary)]">Stayed at</p>
                      <p className="text-sm font-medium">{t.roomStayed}</p>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <EmptySection
                title="Guest stories on the way"
                message="We're gathering reviews from recent stays. Book a room and share your experience — we'd love to hear from you."
                action={{ label: "Book Now", openBooking: true }}
              />
            )}
          </RevealSection>
        </section>

        {/* The Restaurant */}
        <section>
          <RevealSection>
            <div className="h-[528px] overflow-hidden">
              <ParallaxImage
                src="/images/dining/dining-1.jpg"
                alt="Dining room at ANAM Restaurant, Tea Tot Hotel"
              />
            </div>
          </RevealSection>
          <RevealSection delay={0.1}>
            <div className="tablet:flex tablet:justify-end">
              <div className="w-full bg-[var(--color-bg-subtle)] p-8 tablet:max-w-[50%] tablet:p-16">
                <p className="section-label">Food &amp; Beverage</p>
                <h2 className="section-heading">Flavours of Machakos.</h2>
                <p className="mt-6 text-base leading-relaxed text-[var(--color-text-secondary)]">
                  Kenyan classics, continental plates, hand-stretched pizza and specialty Kenyan coffee at ANAM Restaurant, TeaTot Pizzeria and our Coffee Shop.
                </p>
                <p className="mt-4 text-base leading-relaxed text-[var(--color-text-secondary)]">
                  Freshly baked pizzas with house-made tomato sauce, and brews with latte art — served for business lunches, family meals and late coffee.
                </p>
                <div className="mt-8">
                  <Link href="/dining" className="btn-secondary">
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
            <p className="section-label">Explore Machakos</p>
            <h2 className="section-heading">Around Machakos with us.</h2>
          </RevealSection>

          <RevealSection delay={0.1} className="mt-12">
            {blogPosts.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 desktop:grid-cols-3">
                {blogPosts.map((post) => {
                  const date = new Date(post.publishedDate).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  });

                  return (
                    <Link
                      key={post.slug}
                      href={`/blog-posts/${post.slug}`}
                      className="group cursor-pointer"
                    >
                      <div className="overflow-hidden rounded-lg">
                        <ImageWithFallback
                          src={post.coverImage.url}
                          alt={post.coverImage.alt || post.title}
                          width={400}
                          height={280}
                          sizes="(max-width: 809px) 100vw, 33vw"
                          className="h-[280px] w-full object-cover transition-transform duration-200 group-hover:scale-105"
                        />
                      </div>
                      <div className="mt-4 flex items-center gap-3 text-xs text-[var(--color-text-secondary)]">
                        <span className="rounded-none border border-[var(--color-border)] px-3 py-0.5 font-medium uppercase tracking-[0.1em]">
                          {post.tag}
                        </span>
                        <time dateTime={post.publishedDate}>{date}</time>
                      </div>
                      <h3 className="mt-3 text-lg font-medium transition-opacity duration-200 group-hover:opacity-70">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                        {stripHtml(post.excerpt)}
                      </p>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <EmptySection
                title="Local guides coming soon"
                message="We're writing about Machakos — places to visit, food to try, and what to do near Tea Tot Hotel."
                action={{ label: "Contact Us", href: "/contact" }}
              />
            )}
          </RevealSection>
        </section>
      </div>
    </>
  );
}
