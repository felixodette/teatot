import type { Metadata } from "next";
import { getGallery } from "@/lib/data";
import type { GalleryItem } from "@/types/cms";
import HeroSection from "@/components/HeroSection";
import RevealSection from "@/components/RevealSection";
import ImageWithFallback from "@/components/ImageWithFallback";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Rooms, conference halls, gardens and dining at Tea Tot Hotel, Machakos.",
};

/** Story order for conversion — Arrival/rooms first, events last. */
const STORY_ORDER = ["Rooms", "Conference", "Dining", "Gardens"] as const;

function groupByStory(items: GalleryItem[]) {
  const groups = new Map<string, GalleryItem[]>();
  for (const item of items) {
    const key = item.category || "More";
    const list = groups.get(key) ?? [];
    list.push(item);
    groups.set(key, list);
  }
  for (const list of groups.values()) {
    list.sort((a, b) => a.sortOrder - b.sortOrder);
  }
  const ordered: { title: string; items: GalleryItem[] }[] = [];
  for (const title of STORY_ORDER) {
    const itemsInGroup = groups.get(title);
    if (itemsInGroup?.length) ordered.push({ title, items: itemsInGroup });
    groups.delete(title);
  }
  for (const [title, itemsInGroup] of groups) {
    if (itemsInGroup.length) ordered.push({ title, items: itemsInGroup });
  }
  return ordered;
}

export default function GalleryPage() {
  const stories = groupByStory(getGallery());

  return (
    <div>
      <HeroSection
        label="VISUAL TOUR"
        headline="See the property."
        paragraph="Rooms, conference halls, gardens and dining — a look inside our Machakos hotel on Konza Road."
        imageSrc="/images/dining/dining-2.jpg"
        imageAlt="Tea Tot Hotel gallery"
        height="640px"
        parallax
      />

      <div className="mx-auto w-full max-w-[var(--container-max)] px-6 py-12">
        <div className="flex flex-col gap-16">
          {stories.map((story) => (
            <RevealSection key={story.title} as="section">
              <h2 className="section-heading text-2xl tablet:text-3xl">{story.title}</h2>
              <div className="mt-8 grid grid-cols-1 gap-6 desktop:grid-cols-2">
                {story.items.map((item) => (
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
          ))}
        </div>
      </div>
    </div>
  );
}
