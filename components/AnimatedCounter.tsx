"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

interface Props {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 1.5,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: duration * 1000, bounce: 0 });
  // SSR and initial client render: show real value so crawlers see it.
  const [display, setDisplay] = useState(value.toLocaleString());
  const started = useRef(false);

  useEffect(() => {
    if (inView && !started.current) {
      started.current = true;
      // Attach listener only when animation begins — avoids the "56 → 0 → 56" flash.
      const unsub = spring.on("change", (v) => {
        setDisplay(Math.round(v).toLocaleString());
      });
      motionValue.set(value);
      return unsub;
    }
  }, [inView, motionValue, spring, value]);

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  );
}
