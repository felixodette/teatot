"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ImageWithFallback from "./ImageWithFallback";

interface Props {
  src: string;
  alt: string;
  speed?: number;
  className?: string;
  layerHeight?: number | string;
  priority?: boolean;
  sizes?: string;
}

export default function ParallaxImage({
  src,
  alt,
  speed = 0.3,
  className,
  layerHeight,
  priority,
  sizes = "(max-width: 810px) calc(100vw - 50px), min(1635px, calc(100vw - 50px))",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}%`, `${speed * 100}%`]);

  return (
    <div ref={ref} className={`relative h-full w-full overflow-hidden ${className ?? ""}`}>
      <motion.div
        className="absolute inset-x-0 top-0 w-full"
        style={{
          y,
          height: layerHeight ?? "130%",
        }}
      >
        <ImageWithFallback
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover"
          priority={priority}
        />
      </motion.div>
    </div>
  );
}
