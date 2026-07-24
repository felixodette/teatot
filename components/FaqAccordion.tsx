import type { Faq } from "@/types/cms";

type Props = {
  items: Faq[];
  title?: string;
};

/** Native details/summary — no JS accordion deps. */
export default function FaqAccordion({ items, title = "Frequently asked questions" }: Props) {
  if (items.length === 0) return null;

  return (
    <section className="space-y-6">
      <h2
        className="text-3xl font-semibold tracking-tight"
        style={{ fontFamily: "var(--font-inter-display)" }}
      >
        {title}
      </h2>
      <div className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
        {items.map((faq) => (
          <details key={faq.slug} className="group py-4">
            <summary className="cursor-pointer list-none text-base font-medium outline-none transition-opacity duration-200 hover:opacity-80 focus-visible:ring-2 focus-visible:ring-[var(--color-text-primary)] focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden">
              <span className="flex items-start justify-between gap-4">
                <span>{faq.question}</span>
                <span
                  aria-hidden
                  className="shrink-0 text-[var(--color-text-secondary)] transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </span>
            </summary>
            <div
              className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]"
              dangerouslySetInnerHTML={{ __html: faq.answer }}
            />
          </details>
        ))}
      </div>
    </section>
  );
}
