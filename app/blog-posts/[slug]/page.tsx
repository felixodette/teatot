import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPosts, getBlogPostBySlug } from "@/lib/data";
import ImageWithFallback from "@/components/ImageWithFallback";
import RevealSection from "@/components/RevealSection";

export function generateStaticParams() {
  return getBlogPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Blog — Tea Tot Hotels" };
  return {
    title: `${post.title} — Tea Tot Hotels`,
    description: post.excerpt.replace(/<[^>]*>/g, ""),
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const date = new Date(post.publishedDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article className="pb-24">
      <RevealSection className="mx-auto max-w-[var(--container-max)] px-6 pt-24">
        <ImageWithFallback
          src={post.coverImage.url}
          alt={post.coverImage.alt || post.title}
          width={1200}
          height={600}
          className="w-full rounded-lg object-cover"
          priority
        />
      </RevealSection>

      <RevealSection className="mx-auto mt-12 max-w-2xl px-6" delay={0.1}>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[var(--color-text-subtle)]">
          <span className="rounded-full border border-[var(--color-border)] px-3 py-0.5 text-xs font-medium uppercase tracking-[0.1em]">
            {post.tag}
          </span>
          <time dateTime={post.publishedDate}>{date}</time>
          <span>·</span>
          <span>{post.author}</span>
        </div>

        <h1
          className="mt-6 text-4xl font-semibold tracking-tight md:text-5xl"
          style={{ fontFamily: "var(--font-inter-display)" }}
        >
          {post.title}
        </h1>
      </RevealSection>

      <RevealSection className="mx-auto mt-10 max-w-2xl px-6" delay={0.15}>
        <div
          className="prose prose-neutral max-w-none dark:prose-invert prose-headings:tracking-tight prose-a:underline-offset-4"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />
      </RevealSection>

      <RevealSection className="mx-auto mt-16 max-w-2xl px-6" delay={0.1}>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[var(--color-text-subtle)] transition-colors hover:text-[var(--color-text-primary)]"
        >
          ← Back to Home
        </Link>
      </RevealSection>
    </article>
  );
}
