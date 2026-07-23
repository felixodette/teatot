import type { Metadata } from "next";
import Link from "next/link";
import { getRooms } from "@/lib/data";
import { formatMoney, stripHtml } from "@/lib/format";
import { whatsappUrl } from "@/config/contact";
import HeroSection from "@/components/HeroSection";
import RevealSection from "@/components/RevealSection";
import ImageWithFallback from "@/components/ImageWithFallback";
import EmptySection from "@/components/EmptySection";
import { ctaLink } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "Rooms",
  description:
    "Four comfortable room types at Tea Tot Hotel — Standard Double, Twin Bedroom, Deluxe Room and Junior Suite.",
};

export default function RoomsPage() {
  const rooms = getRooms();

  return (
    <div>
      <HeroSection
        label="ROOMS & SUITES"
        headline="Find your room."
        paragraph="Four comfortable room types — each with satellite TV, AC, hot showers and complimentary Wi-Fi."
        imageSrc="/images/rooms/bedroom-2.jpeg"
        imageAlt="Rooms at Tea Tot Hotel"
        height="640px"
        parallax
        primaryButton={{ text: ctaLink.label, href: ctaLink.href, openBooking: true }}
        secondaryButton={{
          text: "Ask on WhatsApp",
          href: whatsappUrl("rooms"),
          external: true,
        }}
      />

      <div className="mx-auto max-w-[var(--container-max)] px-6 pt-12 pb-16">
        {rooms.length === 0 ? (
          <EmptySection
            title="Rooms coming soon"
            message="Our room list is being updated. Reach out and we will help you find the right stay in Machakos."
            action={{ label: "Book Now", openBooking: true }}
          />
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 tablet:grid-cols-2 desktop:grid-cols-3">
            {rooms.map((room, i) => {
              const blurb = stripHtml(room.shortDescription);
              return (
                <RevealSection key={room.slug} delay={i * 0.1} as="article" className="h-full">
                  <Link
                    href={`/rooms/${room.slug}`}
                    className="group flex h-full cursor-pointer flex-col bg-[var(--color-bg-subtle)] transition-opacity duration-200 hover:opacity-95"
                  >
                    <div className="relative h-[320px] shrink-0 overflow-hidden">
                      <ImageWithFallback
                        src={room.thumbnail.url}
                        alt={room.thumbnail.alt || room.name}
                        fill
                        sizes="(max-width: 809px) 100vw, (max-width: 1199px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-3 p-6">
                      <p className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--color-text-secondary)]">
                        {room.category}
                      </p>
                      <h2 className="text-lg font-semibold">{room.name}</h2>
                      {blurb ? (
                        <p className="line-clamp-2 text-sm text-[var(--color-text-secondary)]">
                          {blurb}
                        </p>
                      ) : null}
                      {/* no wrap: price + CTA stay one row (Deluxe was wrapping under flex-wrap) */}
                      <div className="mt-auto grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                        <p className="min-w-0 text-base leading-snug">
                          <span className="text-[var(--color-text-secondary)]">From </span>
                          <span className="font-semibold">
                            {formatMoney(room.priceSingle, room.currency)}
                          </span>
                          <span className="ml-1 text-sm text-[var(--color-text-secondary)]">
                            B&B / night
                          </span>
                        </p>
                        <span className="shrink-0 cursor-pointer rounded-none bg-[var(--color-text-primary)] px-3 py-2 text-xs font-medium uppercase tracking-[0.12em] text-white transition-opacity duration-200 group-hover:opacity-90">
                          View room
                        </span>
                      </div>
                    </div>
                  </Link>
                </RevealSection>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
