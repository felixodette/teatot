"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, ctaLink } from "@/lib/navigation";
import BookNowButton from "@/components/BookNowButton";

const navAnimation = {
  initial: { opacity: 0, y: -20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, duration: 1.2, bounce: 0, delay: 0.1 },
  },
};

const menuOverlay = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const menuItems = {
  initial: { opacity: 0, y: 20 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, duration: 0.6, bounce: 0, delay: i * 0.05 },
  }),
  exit: { opacity: 0, y: -10, transition: { duration: 0.15 } },
};

const ctaClassName =
  "cursor-pointer rounded-none bg-white px-4 py-2 text-sm font-medium text-black transition-opacity duration-200 hover:opacity-80";

const mobileCtaClassName =
  "cursor-pointer mt-8 w-full rounded-none bg-white px-6 py-4 text-center text-base font-medium text-black transition-opacity duration-200 hover:opacity-80 tablet:w-auto tablet:px-8";

function HamburgerIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 7.5h16M4 12h16M4 16.5h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-[9] overflow-hidden bg-[var(--color-black-80)] text-white backdrop-blur-[10px]"
        variants={navAnimation}
        initial="initial"
        animate="animate"
      >
        <nav className="relative mx-auto flex h-[65.5px] max-w-[var(--container-max)] items-center justify-between px-6 desktop:h-[67px] desktop:px-6">
          <Link
            href="/"
            className="cursor-pointer text-lg font-semibold tracking-tight text-white"
            style={{ fontFamily: "var(--font-inter-display)" }}
          >
            Tea Tot Hotels
          </Link>

          <div className="hidden items-center gap-8 desktop:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="cursor-pointer text-sm text-white transition-opacity hover:opacity-60"
              >
                {link.label}
              </Link>
            ))}
            <BookNowButton className={ctaClassName}>{ctaLink.label}</BookNowButton>
          </div>

          <button
            type="button"
            className="flex h-10 w-10 cursor-pointer items-center justify-center text-white desktop:hidden"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
            aria-expanded={isOpen}
          >
            <HamburgerIcon />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[9] flex flex-col overflow-hidden bg-[var(--color-black-80)] text-white backdrop-blur-[10px] desktop:hidden"
            variants={menuOverlay}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="flex h-[65.5px] shrink-0 items-center justify-between px-6">
              <Link
                href="/"
                className="cursor-pointer text-lg font-semibold tracking-tight text-white"
                style={{ fontFamily: "var(--font-inter-display)" }}
                onClick={() => setIsOpen(false)}
              >
                Tea Tot Hotels
              </Link>
              <button
                type="button"
                className="flex h-10 w-10 cursor-pointer items-center justify-center text-white"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
              >
                <CloseIcon />
              </button>
            </div>

            <nav className="flex flex-col px-6 pt-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  variants={menuItems}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  custom={i}
                >
                  <Link
                    href={link.href}
                    className="block cursor-pointer py-3 text-2xl font-medium text-white transition-opacity hover:opacity-60"
                    style={{ fontFamily: "var(--font-inter-display)" }}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                variants={menuItems}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={navLinks.length}
              >
                <BookNowButton
                  className={mobileCtaClassName}
                  onClick={() => setIsOpen(false)}
                >
                  {ctaLink.label}
                </BookNowButton>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
