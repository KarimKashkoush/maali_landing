"use client";

import { useCallback, type CSSProperties, type HTMLAttributes } from "react";
import { observeReveal } from "@/lib/scroll-reveal";

type RevealProps = HTMLAttributes<HTMLElement> & {
  as?: "div" | "article" | "figure" | "h2" | "nav";
  delay?: number;
};

export default function Reveal({ as: Tag = "div", delay = 0, style, ...props }: RevealProps) {
  const ref = useCallback((node: HTMLElement | null) => {
    if (node) return observeReveal(node);
  }, []);
  return <Tag {...props} ref={ref} data-reveal="" style={{
    ...style,
    "--animate-duration": "1000ms",
    animationDelay: `${Math.min(Math.max(delay, 0), 240)}ms`,
    animationTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
  } as CSSProperties} />;
}
