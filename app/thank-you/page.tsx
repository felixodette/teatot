import type { Metadata } from "next";
import Link from "next/link";
import ImageWithFallback from "@/components/ImageWithFallback";
import RevealSection from "@/components/RevealSection";

export const metadata: Metadata = {
  title: "Thank You",
  description: "Thank you for getting in touch. We will respond shortly.",
};

export default function ThankYouPage() {
  return (
    <div className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <ImageWithFallback
          src="/images/hero/thank-you.jpg"
          alt="Tea Tot Hotels interior"
          width={1920}
          height={1080}
          className="h-full w-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 mx-auto max-w-xl px-6 text-center">
        <RevealSection>
          <h1
            className="text-5xl font-semibold tracking-tight text-white md:text-6xl"
            style={{ fontFamily: "var(--font-inter-display)" }}
          >
            Thank you.
          </h1>
          <p className="mx-auto mt-6 max-w-md text-base text-white/80">
            We&apos;ve received your message and will be in touch shortly. In
            the meantime, feel free to explore.
          </p>
          <Link
            href="/"
            className="mt-10 inline-block rounded-full bg-white px-8 py-3 text-sm font-medium text-black transition-opacity hover:opacity-90"
          >
            Back to Home
          </Link>
        </RevealSection>
      </div>
    </div>
  );
}
