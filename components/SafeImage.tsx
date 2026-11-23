"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";

const FALLBACK_IMAGE =
  "https://vel8aqzfqfybmsb2.public.blob.vercel-storage.com/uploads/amsterdam-canal-boat-hero-M7TeLyUpOHh3doGlrxzdwr4smtU1SL.jpg";

export default function SafeImage({
  src,
  alt,
  fallbackSrc = FALLBACK_IMAGE,
  ...props
}: ImageProps & { fallbackSrc?: string }) {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc);
  const [hasError, setHasError] = useState(false);

  return (
    <Image
      {...props}
      src={hasError ? fallbackSrc : imgSrc || fallbackSrc}
      alt={alt}
      onError={() => {
        if (!hasError) {
          setHasError(true);
          setImgSrc(fallbackSrc);
        }
      }}
    />
  );
}
