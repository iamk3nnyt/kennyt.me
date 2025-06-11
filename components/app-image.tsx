"use client";

import { cn } from "@/lib/utils";
import Image, { type ImageProps } from "next/image";
import { useState } from "react";

/**
 * @see https://nextjs.org/docs/app/api-reference/components/image
 * @see https://github.com/vercel/next.js/discussions/26168#discussioncomment-1863742
 */
export function AppImage({ alt, className, src, ...props }: ImageProps) {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      alt={alt}
      className={cn(
        "h-full w-full object-cover transition-all duration-700 ease-in-out",
        isLoading
          ? "scale-105 opacity-0 blur-md"
          : "blur-0 scale-100 opacity-100",
        className,
      )}
      fill
      onLoad={() => setLoading(false)}
      sizes="100%"
      src={src}
      {...props}
    />
  );
}
