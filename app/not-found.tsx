import Link from "next/link";
import ImageWithFallback from "@/components/ImageWithFallback";
import RevealSection from "@/components/RevealSection";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden">
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
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-block cursor-pointer rounded-none bg-white px-8 py-3 text-sm font-medium text-black transition-opacity duration-200 hover:opacity-90"
            >
              Return Home
            </Link>
            <Link
              href="/rooms"
              className="inline-block cursor-pointer rounded-none border border-white/40 px-8 py-3 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-80"
            >
              Browse rooms
            </Link>
          </div>
        </RevealSection>
      </div>
    </div>
  );
}
