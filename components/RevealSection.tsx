"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "section" | "div" | "article";
}

export default function RevealSection({
  children,
  className,
  delay = 0,
  as = "div",
}: Props) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const Component = motion.create(as);

  return (
    <Component
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{
        type: "spring",
        duration: 1,
        bounce: 0,
        delay,
      }}
      className={className}
    >
      {children}
    </Component>
  );
}
