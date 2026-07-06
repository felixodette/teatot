import Link from "next/link";
import ImageWithFallback from "@/components/ImageWithFallback";
import RevealSection from "@/components/RevealSection";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <ImageWithFallback
          src="/images/hero/404.jpg"
          alt="Hotel view"
          width={1920}
          height={1080}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 mx-auto max-w-xl px-6 text-center">
        <RevealSection>
          <p
            className="text-8xl font-bold tracking-tighter text-white/30 md:text-9xl"
            style={{ fontFamily: "var(--font-inter-display)" }}
          >
            404
          </p>
          <h1
            className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl"
            style={{ fontFamily: "var(--font-inter-display)" }}
          >
            Page not found
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base text-white/80">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
          <Link
            href="/"
            className="mt-10 inline-block rounded-full bg-white px-8 py-3 text-sm font-medium text-black transition-opacity hover:opacity-90"
          >
            Return Home
          </Link>
        </RevealSection>
      </div>
    </main>
  );
}
