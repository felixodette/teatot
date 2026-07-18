import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getRooms, getRoomBySlug } from "@/lib/data";
import { formatMoney, stripHtml } from "@/lib/format";
import BookNowButton from "@/components/BookNowButton";
import ImageWithFallback from "@/components/ImageWithFallback";

export function generateStaticParams() {
  return getRooms().map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const room = getRoomBySlug(slug);
  if (!room) return { title: "Room" };
  return {
    title: room.name,
    description: stripHtml(room.shortDescription),
  };
}

const bookClassName =
  "cursor-pointer rounded-none bg-[var(--color-text-primary)] px-6 py-3.5 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90";

export default async function RoomDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = getRoomBySlug(slug);
  if (!room) notFound();

  const blurb = stripHtml(room.shortDescription);

  return (
    <div className="mx-auto max-w-[var(--container-max)] px-6 py-[var(--spacing-section)]">
      <ImageWithFallback
        src={room.thumbnail.url}
        alt={room.thumbnail.alt || room.name}
        width={1200}
        height={600}
        className="w-full object-cover"
        priority
      />

      <div className="mt-10 flex flex-col gap-6 tablet:flex-row tablet:items-end tablet:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--color-text-secondary)]">
            {room.category}
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">{room.name}</h1>
          {blurb ? (
            <p className="mt-3 max-w-xl text-base text-[var(--color-text-secondary)]">{blurb}</p>
          ) : null}
          <p className="mt-4 text-xl font-semibold">
            {formatMoney(room.pricePerNight, room.currency)}{" "}
            <span className="text-base font-normal text-[var(--color-text-secondary)]">/ night</span>
          </p>
        </div>
        <BookNowButton roomType={room.name} className={`shrink-0 ${bookClassName}`}>
          Book Now
        </BookNowButton>
      </div>

      <div className="mt-10 grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: room.fullDescription }}
          />
          <div className="mt-8">
            <h2 className="text-lg font-medium">Amenities</h2>
            <div
              className="mt-3 prose max-w-none"
              dangerouslySetInnerHTML={{ __html: room.amenities }}
            />
          </div>
        </div>
        <aside className="space-y-4 self-start text-sm lg:sticky lg:top-28">
          <div className="flex justify-between border-b border-[var(--color-border)] pb-3">
            <span className="text-[var(--color-text-secondary)]">Max Guests</span>
            <span>{room.maxGuests}</span>
          </div>
          <div className="flex justify-between border-b border-[var(--color-border)] pb-3">
            <span className="text-[var(--color-text-secondary)]">Room Size</span>
            <span>{room.roomSize} m²</span>
          </div>
          <div className="flex justify-between border-b border-[var(--color-border)] pb-3">
            <span className="text-[var(--color-text-secondary)]">Bed Type</span>
            <span>{room.bedType}</span>
          </div>
          <BookNowButton roomType={room.name} className={`mt-2 w-full ${bookClassName}`}>
            Book Now
          </BookNowButton>
          <Link
            href="/rooms"
            className="block text-center text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-text-secondary)] transition-opacity duration-200 hover:opacity-70"
          >
            All rooms
          </Link>
        </aside>
      </div>
    </div>
  );
}
