'use client';

import { useState } from 'react';

interface LocalImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  containerClassName?: string;
  fallbackClassName?: string;
  fallbackText?: string;
  loading?: 'eager' | 'lazy';
}

export default function LocalImage({
  src,
  alt,
  width,
  height,
  className,
  containerClassName,
  fallbackClassName,
  fallbackText,
  loading = 'lazy',
}: LocalImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={containerClassName}>
      {failed ? (
        <div
          className={`flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/35 to-bg-tertiary text-center text-xs font-semibold uppercase tracking-wide text-accent ${fallbackClassName ?? ''}`}
        >
          {fallbackText ?? 'Image unavailable'}
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          className={className}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
