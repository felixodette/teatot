import type { Metadata } from "next";
import { getDiningMenu } from "@/lib/data";
import { formatMoney } from "@/lib/format";
import { whatsappUrl } from "@/config/contact";
import HeroSection from "@/components/HeroSection";
import RevealSection from "@/components/RevealSection";
import ParallaxImage from "@/components/ParallaxImage";
import ImageWithFallback from "@/components/ImageWithFallback";

const HERO_PARAGRAPH =
  "Message us for a table at ANAM / TeaTot Pizzeria, or a catering quote for your event. Kenyan classics, continental plates, hand-stretched pizza and specialty Kenyan coffee.";

const primaryCtaClass =
  "mt-6 inline-block cursor-pointer rounded-none bg-[var(--color-text-primary)] px-4 py-2 text-base font-semibold text-white transition-opacity duration-200 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-text-primary)]";

const secondaryCtaClass =
  "mt-6 inline-block cursor-pointer rounded-none border border-[var(--color-border)] bg-transparent px-4 py-2 text-base font-semibold transition-opacity duration-200 hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-text-primary)]";

/** Full coffee & pizza list lives on Anam — teaser prices on this page. */
const ANAM_FULL_MENU = "https://anam.teatot.co.ke/menu#full-menu";

// Typical service windows — confirm current hours when you book.
const MEAL_HOURS = [
  { type: "Breakfast", from: "7:00", fromMer: "am", to: "11:00", toMer: "am" },
  { type: "Lunch", from: "12:00", fromMer: "pm", to: "3:00", toMer: "pm" },
  { type: "Dinner", from: "6:00", fromMer: "pm", to: "10:30", toMer: "pm" },
  {
    type: "Coffee & Pizza",
    from: "7:00",
    fromMer: "am",
    to: "10:00",
    toMer: "pm",
  },
] as const;

export const metadata: Metadata = {
  title: "Dining",
  description: HERO_PARAGRAPH,
  alternates: { canonical: "/dining" },
  openGraph: { url: "/dining" },
};

function MealTimeBlock({
  type,
  from,
  fromMer,
  to,
  toMer,
  note,
}: {
  type: string;
  from: string;
  fromMer: string;
  to: string;
  toMer: string;
  note?: string;
}) {
  return (
    <div className="flex w-full flex-col gap-3 tablet:gap-4 desktop:gap-8">
      <div className="flex w-full flex-wrap items-center gap-2 border-b border-[var(--color-text-primary)] pb-3">
        <p className="text-base font-semibold text-[var(--color-text-primary)]">{type}</p>
        {note && (
          <p className="text-[13px] font-normal text-[var(--color-text-subtle)]">{note}</p>
        )}
      </div>
      <div className="flex w-full items-end justify-start gap-2">
        <div className="flex items-end">
          <span
            className="text-xl font-semibold tracking-tight tablet:text-[22px] desktop:text-[32px]"
            style={{ fontFamily: "var(--font-inter-display)" }}
          >
            {from}
          </span>
          <span className="text-base font-normal leading-none">{fromMer}</span>
        </div>
        <span
          className="pb-0.5 text-2xl font-semibold leading-none tablet:text-[22px] desktop:pb-1 desktop:text-[32px]"
          style={{ fontFamily: "var(--font-inter-display)" }}
        >
          -
        </span>
        <div className="flex items-end">
          <span
            className="text-xl font-semibold tracking-tight tablet:text-[22px] desktop:text-[32px]"
            style={{ fontFamily: "var(--font-inter-display)" }}
          >
            {to}
          </span>
          <span className="text-base font-normal leading-none">{toMer}</span>
        </div>
      </div>
    </div>
  );
}

export default function DiningPage() {
  const items = getDiningMenu();

  return (
    <div className="pb-24">
      <HeroSection
        label="FOOD & BEVERAGE"
        headline="Table tonight, or catering for Saturday?"
        paragraph={HERO_PARAGRAPH}
        imageSrc="/images/hero/dining-hero.jpg"
        imageAlt="Dining at Tea Tot Hotel"
        height="640px"
        parallax
        primaryButton={{
          text: "Reserve on WhatsApp",
          href: whatsappUrl("dining"),
          external: true,
        }}
        secondaryButton={{
          text: "Catering enquiry",
          href: whatsappUrl("events"),
          external: true,
        }}
      />

      <RevealSection>
        <section className="bg-[var(--color-bg-subtle)] px-6 py-16">
          <div className="mx-auto grid max-w-[1284px] grid-cols-1 gap-8 tablet:grid-cols-2 tablet:gap-x-12 tablet:gap-y-8 desktop:grid-cols-4 desktop:gap-12">
            {MEAL_HOURS.map((meal) => (
              <MealTimeBlock key={meal.type} {...meal} />
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-[1284px] text-center text-sm text-[var(--color-text-secondary)]">
            Hours are typical — please confirm when you book or call{" "}
            <a href="tel:+254718009684" className="underline underline-offset-2">
              +254 718 009684
            </a>
            .
          </p>
        </section>
      </RevealSection>

      <section className="px-6 py-20 desktop:py-24">
        <div className="mx-auto max-w-[1284px]">
          <RevealSection>
            <p className="text-xs font-medium uppercase tracking-[0.15em]">
              THE MENU
            </p>
            <h2
              className="mt-3 text-4xl font-semibold tracking-tight desktop:text-5xl"
              style={{ fontFamily: "var(--font-inter-display)" }}
            >
              Coffee &amp; pizza favourites.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--color-text-secondary)]">
              A taste of TeaTot Pizzeria and the coffee bar — prices from the current
              list. More flavours, sizes and weekly offers on the full menu.
            </p>
          </RevealSection>

          <RevealSection delay={0.1} className="mt-12 desktop:mt-16">
            <div className="flex flex-col gap-12">
              {items.map((item) => (
                <div
                  key={item.slug}
                  className="grid grid-cols-[minmax(0,25%)_minmax(0,1fr)_auto] items-start gap-6 border-b border-[var(--color-border)] pb-12 tablet:grid-cols-[minmax(0,15%)_minmax(0,1fr)_auto] tablet:gap-8 desktop:grid-cols-[minmax(0,20%)_minmax(0,1fr)_auto] desktop:gap-16"
                >
                  <p className="text-base font-semibold">{item.category}</p>
                  <div className="min-w-0">
                    <h3
                      className="text-xl font-semibold tracking-tight desktop:text-[32px]"
                      style={{ fontFamily: "var(--font-inter-display)" }}
                    >
                      {item.itemName}
                    </h3>
                    <div
                      className="mt-2 text-base leading-relaxed text-[var(--color-text-secondary)]"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  </div>
                  <div className="flex shrink-0 flex-col items-end justify-self-end text-right">
                    <span className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-text-secondary)]">
                      From
                    </span>
                    <span
                      className="text-xl font-semibold desktop:text-[32px]"
                      style={{ fontFamily: "var(--font-inter-display)" }}
                    >
                      {formatMoney(item.price, item.currency)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-10 text-base text-[var(--color-text-secondary)]">
              Looking for every pizza size, coffee shot and Tuesday/Thursday offer?{" "}
              <a
                href={ANAM_FULL_MENU}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer font-semibold text-[var(--color-text-primary)] underline decoration-[var(--color-border)] underline-offset-4 transition-opacity duration-200 hover:opacity-70"
              >
                Open the full Anam menu
              </a>
              .
            </p>
          </RevealSection>
        </div>
      </section>

      <RevealSection>
        <figure className="h-[320px] w-full overflow-hidden tablet:h-[480px] desktop:h-[640px]">
          <ParallaxImage
            src="/images/dining/restaurant-3.jpg"
            alt="ANAM Restaurant at Tea Tot Hotel"
            sizes="100vw"
            speed={0.25}
            layerHeight="140%"
          />
        </figure>
      </RevealSection>

      <RevealSection as="section" className="px-6 pt-24 desktop:pt-24">
        <div className="mx-auto flex max-w-[1284px] flex-col bg-[var(--color-bg-subtle)] desktop:flex-row">
          <div className="flex flex-1 flex-col justify-center p-12 desktop:max-w-[50%] desktop:p-16">
            <p className="text-xs font-medium uppercase tracking-[0.15em]">
              ANAM RESTAURANT
            </p>
            <h2
              className="mt-3 text-4xl font-semibold tracking-tight desktop:text-5xl"
              style={{ fontFamily: "var(--font-inter-display)" }}
            >
              Food downstairs when you need it.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-[var(--color-text-secondary)]">
              ANAM Restaurant, our Coffee Shop and TeaTot Pizzeria serve Kenyan classics, continental dishes, pizza made to order and specialty coffee — for business lunches, family meals and late coffee on Konza Road.
            </p>
            <div className="mt-2 flex flex-wrap gap-3">
              <a href={whatsappUrl("dining")} target="_blank" rel="noopener noreferrer" className={primaryCtaClass}>
                Reserve on WhatsApp
              </a>
              <a href={ANAM_FULL_MENU} target="_blank" rel="noopener noreferrer" className={secondaryCtaClass}>
                Full Anam menu
              </a>
            </div>
          </div>
          <div className="relative h-[320px] w-full flex-1 overflow-hidden desktop:h-[640px]">
            <ImageWithFallback
              src="/images/dining/restaurant-12.jpg"
              alt="Tea Tot Hotel dining team"
              width={4254}
              height={3612}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </RevealSection>

      <section className="relative mt-24 desktop:mt-24">
        <div className="sticky top-0 z-0 h-[400px] overflow-hidden desktop:h-[528px]">
          <ParallaxImage
            src="/images/dining/dining-2.jpg"
            alt="Private dining room"
          />
        </div>
        <RevealSection className="relative z-10 mx-auto max-w-[1412px] px-6 -mt-24 desktop:-mt-[174px]">
          <div className="flex justify-end">
            <div className="w-full bg-[var(--color-bg-subtle)] p-12 desktop:max-w-[50%] desktop:p-16">
              <p className="text-xs font-medium uppercase tracking-[0.15em]">
              OUTSIDE CATERING
            </p>
            <h2
              className="mt-3 text-4xl font-semibold tracking-tight desktop:text-5xl"
              style={{ fontFamily: "var(--font-inter-display)" }}
            >
              We bring the feast to your occasion.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-[var(--color-text-secondary)]">
              Professional catering for weddings, corporate events, funerals, birthdays and community celebrations. Our experienced team delivers restaurant-quality meals anywhere — from setup through to service.
            </p>
              <a
                href={whatsappUrl("events")}
                target="_blank"
                rel="noopener noreferrer"
                className={primaryCtaClass}
              >
                Catering enquiry
              </a>
            </div>
          </div>
        </RevealSection>
      </section>
    </div>
  );
}
