import { contact } from "@/config/contact";

interface Props {
  className?: string;
}

export default function MapEmbed({ className }: Props) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY;

  if (!apiKey) {
    return (
      <div className={`rounded-lg bg-[var(--color-bg-subtle)] p-8 text-center ${className ?? ""}`}>
        <p className="text-sm text-[var(--color-text-secondary)]">{contact.address}</p>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-sm underline underline-offset-4"
        >
          Open in Google Maps
        </a>
      </div>
    );
  }

  const src = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${contact.mapLocation}&zoom=${contact.mapZoom}`;

  return (
    <div className={className}>
      <iframe
        src={src}
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`Map showing the location of ${contact.hotelName}`}
        className="rounded-lg"
      />
      <div className="mt-3 flex items-center justify-between text-sm text-[var(--color-text-subtle)]">
        <span>{contact.address}</span>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4"
        >
          Open in Google Maps
        </a>
      </div>
    </div>
  );
}
