"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type Props = ImageProps & { fallbackSrc?: string };

export default function ImageWithFallback({ fallbackSrc, alt, ...props }: Props) {
  const [src, setSrc] = useState(props.src);
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (failed) {
    return (
      <div
        className="bg-[var(--color-bg-subtle)] flex items-center justify-center text-[var(--color-text-subtle)] text-sm"
        style={{ width: props.width ?? "100%", aspectRatio: props.width && props.height ? `${props.width}/${props.height}` : "16/9" }}
        aria-label={alt}
        role="img"
      />
    );
  }

  return (
    <div className="relative overflow-hidden" style={{ aspectRatio: props.width && props.height ? `${props.width}/${props.height}` : undefined }}>
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-[var(--color-bg-subtle)]" />
      )}
      <Image
        {...props}
        src={src}
        alt={alt}
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
