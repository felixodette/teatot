"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type Props = ImageProps & { fallbackSrc?: string };

function BrandedImageFallback({
  alt,
  fill,
  width,
  height,
}: {
  alt: string;
  fill?: boolean;
  width?: number | `${number}`;
  height?: number | `${number}`;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 bg-[var(--color-bg-subtle)] text-[var(--color-text-subtle)] ${fill ? "absolute inset-0" : "h-full w-full"}`}
      style={
        fill
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

  if (failed) {
    return (
      <BrandedImageFallback
        alt={alt}
        fill={fill}
        width={props.width}
        height={props.height}
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
