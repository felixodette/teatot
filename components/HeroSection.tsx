"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ImageWithFallback from "./ImageWithFallback";

interface Props {
  label: string;
  headline: string;
  paragraph: string;
  imageSrc: string;
  imageAlt: string;
  height?: string;
  primaryButton?: { text: string; href: string };
  secondaryButton?: { text: string; href: string };
  rating?: string;
}

export default function HeroSection({
  label,
  headline,
  paragraph,
  imageSrc,
  imageAlt,
  height = "640px",
  primaryButton,
  secondaryButton,
  rating,
}: Props) {
  return (
    <section className="relative flex items-end overflow-hidden" style={{ height }}>
      <div className="absolute inset-0">
        <ImageWithFallback
          src={imageSrc}
          alt={imageAlt}
          width={1920}
          height={1080}
          className="h-full w-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[var(--container-max)] px-6 pb-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", duration: 1, bounce: 0, delay: 0.1 }}
          className="text-xs font-medium uppercase tracking-[0.2em] text-white/70"
        >
          {label}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", duration: 1, bounce: 0, delay: 0.2 }}
          className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl lg:text-6xl"
          style={{ fontFamily: "var(--font-inter-display)" }}
        >
          {headline}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", duration: 1, bounce: 0, delay: 0.3 }}
          className="mt-4 max-w-lg text-base text-white/80"
        >
          {paragraph}
        </motion.p>

        {(primaryButton || secondaryButton) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", duration: 1, bounce: 0, delay: 0.4 }}
            className="mt-8 flex gap-4"
          >
            {primaryButton && (
              <Link
                href={primaryButton.href}
                className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-opacity hover:opacity-90"
              >
                {primaryButton.text}
              </Link>
            )}
            {secondaryButton && (
              <Link
                href={secondaryButton.href}
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-80"
              >
                {secondaryButton.text}
              </Link>
            )}
          </motion.div>
        )}

        {rating && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", duration: 1, bounce: 0, delay: 0.6 }}
            className="mt-8 flex items-center gap-3"
          >
            <div className="flex gap-0.5" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
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
