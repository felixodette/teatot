import type { Metadata } from "next";
import { getGallery } from "@/lib/data";
import type { GalleryItem } from "@/types/cms";
import { whatsappUrl } from "@/config/contact";
import { ctaLink } from "@/lib/navigation";
import HeroSection from "@/components/HeroSection";
import RevealSection from "@/components/RevealSection";
import ImageWithFallback from "@/components/ImageWithFallback";
import BookNowButton from "@/components/BookNowButton";

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
        primaryButton={{ text: ctaLink.label, href: ctaLink.href, openBooking: true }}
        secondaryButton={{
          text: "Plan an event",
          href: whatsappUrl("events"),
          external: true,
        }}
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

          <RevealSection as="section" className="border-t border-[var(--color-border)] pt-12">
            <h2 className="section-heading text-2xl tablet:text-3xl">Like what you see?</h2>
            <p className="mt-4 max-w-xl text-base text-[var(--color-text-secondary)]">
              Book a quiet room opposite Level 5, or message us about a conference, wedding or garden event.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <BookNowButton className="cursor-pointer rounded-none bg-[var(--color-text-primary)] px-4 py-2 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90">
                Book Now
              </BookNowButton>
              <a
                href={whatsappUrl("events")}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer rounded-none border border-[var(--color-border)] px-4 py-2 text-sm font-medium transition-opacity duration-200 hover:opacity-80"
              >
                Plan an event
              </a>
            </div>
          </RevealSection>
        </div>
      </div>
    </div>
  );
}
