"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";

// Native lazy loading may fetch images thousands of pixels before the fold.
// Reserve their full layout but don't compete with the hero's network requests.
export default function DeferredImage({ frameClassName, ...props }: ImageProps & { frameClassName: string }) {
  const frame = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const node = frame.current;
    if (!node) return;
    if (!("IntersectionObserver" in window)) {
      const id = requestAnimationFrame(() => setReady(true));
      return () => cancelAnimationFrame(id);
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setReady(true);
      observer.disconnect();
    }, { rootMargin: "300px 0px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return <div ref={frame} className={frameClassName}>
    {/* eslint-disable-next-line jsx-a11y/alt-text -- alt is required by ImageProps and forwarded unchanged. */}
    {ready ? <Image {...props} loading="eager" fetchPriority="low" /> : <noscript><Image {...props} loading="lazy" /></noscript>}
  </div>;
}
