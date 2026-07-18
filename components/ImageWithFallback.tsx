"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type Props = ImageProps & { fallbackSrc?: string };

/** Height utilities that mean the caller sized the box — don't invent aspect-ratio whitespace. */
const HEIGHT_CLASS_RE = /\bh-(?:\[[^\]]+\]|full|screen|svh|dvh|lvh|\d+)/g;

function BrandedImageFallback({
  alt,
  fill,
  width,
  height,
  className,
}: {
  alt: string;
  fill?: boolean;
  width?: number | `${number}`;
  height?: number | `${number}`;
  className?: string;
}) {
  const heightClasses = className?.match(HEIGHT_CLASS_RE)?.join(" ") ?? "";
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 bg-[var(--color-bg-subtle)] text-[var(--color-text-subtle)] ${fill || heightClasses ? `absolute inset-0 ${heightClasses}`.trim() : "h-full w-full"}`}
      style={
        fill || heightClasses
          ? undefined
          : { width: width ?? "100%", aspectRatio: width && height ? `${width}/${height}` : "16/9" }
      }
      aria-label={alt}
      role="img"
    >
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M3 21V7l9-4 9 4v14H3z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M9 21v-6h6v6M9 10h.01M15 10h.01"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <span className="text-sm font-medium">Image unavailable</span>
    </div>
  );
}

export default function ImageWithFallback({ fallbackSrc, alt, fill, className, ...props }: Props) {
  const [src, setSrc] = useState(props.src);
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const classStr = typeof className === "string" ? className : "";
  const heightClasses = classStr.match(HEIGHT_CLASS_RE)?.join(" ") ?? "";
  const imageClasses = classStr.replace(HEIGHT_CLASS_RE, "").replace(/\s+/g, " ").trim();

  if (failed) {
    return (
      <BrandedImageFallback
        alt={alt}
        fill={fill}
        width={props.width}
        height={props.height}
        className={className}
      />
    );
  }

  if (fill) {
    return (
      <div className="relative h-full w-full overflow-hidden">
        {!loaded && <div className="absolute inset-0 animate-pulse bg-[var(--color-bg-subtle)]" />}
        <Image
          {...props}
          fill
          src={src}
          alt={alt}
          className={className ?? "object-cover"}
          onLoad={() => setLoaded(true)}
          onError={() => {
            if (fallbackSrc && src !== fallbackSrc) {
              setSrc(fallbackSrc);
            } else {
              setFailed(true);
            }
          }}
        />
      </div>
    );
  }

  // Caller set h-* — size the wrapper, paint with fill (avoids aspect-ratio gap under photo).
  if (heightClasses) {
    // ponytail: drop width/height when switching to fill — Next Image forbids both
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { width, height, ...rest } = props;
    return (
      <div className={`relative w-full overflow-hidden ${heightClasses}`}>
        {!loaded && <div className="absolute inset-0 animate-pulse bg-[var(--color-bg-subtle)]" />}
        <Image
          {...rest}
          fill
          src={src}
          alt={alt}
          sizes={props.sizes ?? "100vw"}
          className={imageClasses || "object-cover"}
          onLoad={() => setLoaded(true)}
          onError={() => {
            if (fallbackSrc && src !== fallbackSrc) {
              setSrc(fallbackSrc);
            } else {
              setFailed(true);
            }
          }}
        />
      </div>
    );
  }

  return (
    <div
      className="relative overflow-hidden"
      style={{ aspectRatio: props.width && props.height ? `${props.width}/${props.height}` : undefined }}
    >
      {!loaded && <div className="absolute inset-0 animate-pulse bg-[var(--color-bg-subtle)]" />}
      <Image
        {...props}
        src={src}
        alt={alt}
        className={className}
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (fallbackSrc && src !== fallbackSrc) {
            setSrc(fallbackSrc);
          } else {
            setFailed(true);
          }
        }}
      />
    </div>
  );
}
