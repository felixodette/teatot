import type { Metadata } from "next";
import { getGallery } from "@/lib/data";
import HeroSection from "@/components/HeroSection";
import RevealSection from "@/components/RevealSection";
import ImageWithFallback from "@/components/ImageWithFallback";

export const metadata: Metadata = {
  title: "Gallery — Tea Tot Hotels",
  description: "Rooms, conference halls, gardens and dining at Tea Tot Hotels, Machakos.",
};

export default function GalleryPage() {
  const gallery = getGallery();

  return (
    <main>
      <HeroSection
        label="VISUAL TOUR"
        headline="Tea Tot Hotels gallery."
        paragraph="Rooms, conference halls, gardens and dining — a look inside our Machakos property."
        imageSrc="/images/hero/gallery-hero.jpg"
        imageAlt="Tea Tot Hotels gallery"
        height="640px"
        rating="Machakos Premier"
        starCount={3}
      />

      <div className="mx-auto w-full max-w-[1284px] px-6 py-6">
        <RevealSection>
          <div className="grid grid-cols-1 gap-2 desktop:grid-cols-2">
            {gallery.map((item) => (
              <div key={item.slug} className="overflow-hidden">
                <ImageWithFallback
                  src={item.image.url}
                  alt={item.image.alt || item.caption}
                  width={1400}
                  height={933}
                  className="h-[360px] w-full object-cover desktop:h-[480px]"
                />
              </div>
            ))}
          </div>
        </RevealSection>
      </div>
    </main>
  );
}
