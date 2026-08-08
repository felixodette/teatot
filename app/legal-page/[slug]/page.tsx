import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLegalPages, getLegalPageBySlug } from "@/lib/data";
import RevealSection from "@/components/RevealSection";

export function generateStaticParams() {
  return getLegalPages().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getLegalPageBySlug(slug);
  if (!page) return { title: "Legal" };
  return {
    title: page.title,
    alternates: { canonical: `/legal-page/${slug}` },
    openGraph: { url: `/legal-page/${slug}` },
  };
}

export default async function LegalDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getLegalPageBySlug(slug);
  if (!page) notFound();

  const lastUpdated = new Date(page.lastUpdate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <RevealSection>
        <h1
          className="text-4xl font-semibold tracking-tight md:text-5xl"
          style={{ fontFamily: "var(--font-inter-display)" }}
        >
          {page.title}
        </h1>
        <p className="mt-3 text-sm text-[var(--color-text-subtle)]">
          Last updated: {lastUpdated}
        </p>
      </RevealSection>

      <RevealSection delay={0.1}>
        <div
          className="prose prose-neutral mt-12 max-w-none dark:prose-invert prose-headings:tracking-tight prose-a:underline-offset-4"
          dangerouslySetInnerHTML={{ __html: page.body }}
        />
      </RevealSection>
    </div>
  );
}
