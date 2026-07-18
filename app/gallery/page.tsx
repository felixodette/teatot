import type { Metadata } from "next";
import { getGallery } from "@/lib/data";
import HeroSection from "@/components/HeroSection";
import RevealSection from "@/components/RevealSection";
import ImageWithFallback from "@/components/ImageWithFallback";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Rooms, conference halls, gardens and dining at Tea Tot Hotel, Machakos.",
};

export default function GalleryPage() {
  const gallery = getGallery();

  return (
    <div>
      <HeroSection
        label="VISUAL TOUR"
        headline="Tea Tot Hotel gallery."
        paragraph="Rooms, conference halls, gardens and dining — a look inside our Machakos property."
        imageSrc="/images/dining/dining-2.jpg"
        imageAlt="Tea Tot Hotel gallery"
        height="640px"
        rating="Machakos Premier"
        starCount={3}
        parallax
      />

      <div className="mx-auto w-full max-w-[var(--container-max)] px-6 py-12">
        <RevealSection>
          <div className="grid grid-cols-1 gap-6 desktop:grid-cols-2">
            {gallery.map((item) => (
              <figure key={item.slug} className="overflow-hidden">
                <ImageWithFallback
                  src={item.image.url}
                  alt={item.image.alt || item.caption || "Gallery image"}
                  width={1400}
                  height={933}
                  className="h-[360px] w-full object-cover desktop:h-[480px]"
                />
                {item.caption ? (
                  <figcaption className="mt-3 text-sm text-[var(--color-text-secondary)]">
                    {item.caption}
                  </figcaption>
                ) : null}
              </figure>
            ))}
          </div>
        </RevealSection>
      </div>
    </div>
  );
}
