import type { Metadata } from "next";
import Link from "next/link";
import { getRooms } from "@/lib/data";
import HeroSection from "@/components/HeroSection";
import RevealSection from "@/components/RevealSection";
import ImageWithFallback from "@/components/ImageWithFallback";

export const metadata: Metadata = {
  title: "Rooms — Tea Tot Hotels",
  description:
    "Four comfortable room types at Tea Tot Hotels — Standard Double, Twin Bedroom, Deluxe Room and Junior Suite.",
};

export default function RoomsPage() {
  const rooms = getRooms();

  return (
    <main>
      <HeroSection
        label="ROOMS & SUITES"
        headline="Find your room."
        paragraph="Four comfortable room types — each with satellite TV, AC, hot showers and complimentary Wi-Fi."
        imageSrc="/images/rooms/bedroom-2.jpeg"
        imageAlt="Rooms at Tea Tot Hotels"
        height="640px"
      />

      <div className="mx-auto max-w-[var(--container-max)] px-6 pt-6 pb-16">
        <div className="grid grid-cols-1 gap-x-2 gap-y-12 tablet:grid-cols-2 tablet:gap-y-2 desktop:grid-cols-3">
          {rooms.map((room, i) => (
            <RevealSection key={room.slug} delay={i * 0.1} as="article">
              <Link
                href={`/rooms/${room.slug}`}
                className="group block bg-[var(--color-bg-subtle)]"
              >
                <div className="h-[320px] overflow-hidden">
                  <ImageWithFallback
                    src={room.thumbnail.url}
                    alt={room.thumbnail.alt || room.name}
                    width={600}
                    height={320}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col gap-2 p-6">
                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-medium uppercase tracking-[0.15em]">
                      {room.category}
                    </p>
                    <h2 className="text-lg font-semibold">{room.name}</h2>
                  </div>
                  <div className="flex items-center gap-1 text-base">
                    <span>From</span>
                    <div className="flex items-center gap-[5px]">
                      <span>
                        {room.currency}
                        {room.pricePerNight}
                      </span>
                      <span className="text-sm text-[var(--color-text-subtle)]">
                        / night
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </RevealSection>
          ))}
        </div>
      </div>
    </main>
  );
}
