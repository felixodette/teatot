import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRooms, getRoomBySlug } from "@/lib/data";
import ImageWithFallback from "@/components/ImageWithFallback";

export function generateStaticParams() {
  return getRooms().map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const room = getRoomBySlug(slug);
  if (!room) return { title: "Room — Tea Tot Hotels" };
  return {
    title: `${room.name} — Tea Tot Hotels`,
    description: room.shortDescription.replace(/<[^>]*>/g, ""),
  };
}

export default async function RoomDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = getRoomBySlug(slug);
  if (!room) notFound();

  return (
    <main className="mx-auto max-w-[var(--container-max)] px-6 py-[var(--spacing-section)]">
      <ImageWithFallback
        src={room.thumbnail.url}
        alt={room.thumbnail.alt || room.name}
        width={1200}
        height={600}
        className="w-full rounded-lg object-cover"
        priority
      />
      <div className="mt-10">
        <p className="text-sm text-[var(--color-text-subtle)]">{room.category}</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">{room.name}</h1>
        <p className="mt-4 text-xl">
          {room.currency}{room.pricePerNight} <span className="text-base text-[var(--color-text-subtle)]">/ night</span>
        </p>
      </div>
      <div className="mt-8 grid gap-12 lg:grid-cols-3">
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
        <div className="space-y-4 text-sm">
          <div className="flex justify-between border-b border-[var(--color-border)] pb-3">
            <span className="text-[var(--color-text-subtle)]">Max Guests</span>
            <span>{room.maxGuests}</span>
          </div>
          <div className="flex justify-between border-b border-[var(--color-border)] pb-3">
            <span className="text-[var(--color-text-subtle)]">Room Size</span>
            <span>{room.roomSize} m²</span>
          </div>
          <div className="flex justify-between border-b border-[var(--color-border)] pb-3">
            <span className="text-[var(--color-text-subtle)]">Bed Type</span>
            <span>{room.bedType}</span>
          </div>
        </div>
      </div>
    </main>
  );
}
