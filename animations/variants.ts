import type { Variants, Transition } from "framer-motion";

// ponytail: all values derived from Framer page JSON exports, not invented.
// spring-duration format: spring-duration {duration} {bounce} {delay}

export const springDefault: Transition = {
  type: "spring" as const,
  duration: 1,
  bounce: 0,
};

export const springDelayed: Transition = {
  type: "spring" as const,
  duration: 1,
  bounce: 0,
  delay: 0.1,
};

export const springFast: Transition = {
  type: "spring" as const,
  duration: 0.6,
  bounce: 0,
};

export const springSnappy: Transition = {
  type: "spring" as const,
  duration: 0.4,
  bounce: 0.2,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: springDefault },
};

export const fadeUpDelayed: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: springDelayed },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: springDefault },
};

export const scaleOnHover = {
  whileHover: { scale: 1.03 },
  transition: springFast,
};

export const heroFadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { type: "spring" as const, duration: 1.2, bounce: 0 },
  },
};

export const heroTextSlide: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, duration: 1, bounce: 0, delay: 0.3 },
  },
};
