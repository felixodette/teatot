"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import ImageWithFallback from "./ImageWithFallback";
import BookNowButton from "./BookNowButton";

interface HeroButton {
  text: string;
  href: string;
  external?: boolean;
  /** Opens BookingModal instead of navigating */
  openBooking?: boolean;
}

interface Props {
  label: string;
  headline: string;
  paragraph: string;
  imageSrc: string;
  imageAlt: string;
  height?: string;
  fullViewport?: boolean;
  primaryButton?: HeroButton;
  secondaryButton?: HeroButton;
  /** Label beside stars — text only, no ★ characters */
  rating?: string;
  /** Star icons beside rating label (default 3) */
  starCount?: number;
}

function HeroButtonLink({
  button,
  variant,
}: {
  button: HeroButton;
  variant: "primary" | "secondary";
}) {
  const className =
    variant === "primary"
      ? "rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-opacity hover:opacity-90"
      : "rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-80";

  if (button.openBooking) {
    return <BookNowButton className={className}>{button.text}</BookNowButton>;
  }

  if (button.external) {
    return (
      <a href={button.href} target="_blank" rel="noopener noreferrer" className={className}>
        {button.text}
      </a>
    );
  }

  return (
    <Link href={button.href} className={className}>
      {button.text}
    </Link>
  );
}

export default function HeroSection({
  label,
  headline,
  paragraph,
  imageSrc,
  imageAlt,
  height = "640px",
  fullViewport = false,
  primaryButton,
  secondaryButton,
  rating,
  starCount = 3,
}: Props) {
  const reduceMotion = useReducedMotion();
  const sectionClass = fullViewport
    ? "hero-section relative flex h-dvh min-h-[32rem] items-end overflow-hidden"
    : "hero-section relative flex items-end overflow-hidden";

  return (
    <section className={sectionClass} style={fullViewport ? undefined : { height }}>
      <div className="absolute inset-0">
        <ImageWithFallback
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[var(--container-max)] px-6 pb-16">
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", duration: 1, bounce: 0, delay: reduceMotion ? 0 : 0.1 }}
          className="text-xs font-medium uppercase tracking-[0.2em] text-white/70"
        >
          {label}
        </motion.p>
        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", duration: 1, bounce: 0, delay: reduceMotion ? 0 : 0.2 }}
          className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl lg:text-6xl"
          style={{ fontFamily: "var(--font-inter-display)" }}
        >
          {headline}
        </motion.h1>
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", duration: 1, bounce: 0, delay: reduceMotion ? 0 : 0.3 }}
          className="mt-4 max-w-lg text-base text-white/80"
        >
          {paragraph}
        </motion.p>

        {(primaryButton || secondaryButton) && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", duration: 1, bounce: 0, delay: reduceMotion ? 0 : 0.4 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            {primaryButton && <HeroButtonLink button={primaryButton} variant="primary" />}
            {secondaryButton && <HeroButtonLink button={secondaryButton} variant="secondary" />}
          </motion.div>
        )}

        {rating && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", duration: 1, bounce: 0, delay: reduceMotion ? 0 : 0.6 }}
            className="mt-8 flex items-center gap-3"
            aria-label={`${starCount} out of 5 stars — ${rating}`}
          >
            <div className="flex gap-0.5" aria-hidden>
              {Array.from({ length: starCount }).map((_, i) => (
                <svg
                  key={i}
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-white"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <p className="text-base font-medium text-white">{rating}</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
