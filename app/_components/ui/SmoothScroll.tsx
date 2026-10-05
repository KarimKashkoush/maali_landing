"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { onScrollIntent } from "@/lib/scroll-intent";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: no-preference)");
    let cancelSetup = () => {};

    const setup = () => {
      cancelSetup();
      if (!media.matches) return;
      let cancelled = false;
      let cleanup = () => {};
      let cancelIntent = () => {};
      cancelSetup = () => {
        cancelled = true;
        cancelIntent();
        cleanup();
        document.documentElement.classList.remove("gsap-smooth-scroll");
      };

      // Reduced-motion users keep native scrolling and never download the animation library.
      cancelIntent = onScrollIntent(() => {
      // Stop native CSS smooth anchors before their default action. Otherwise a
      // pending browser animation can fight the newly initialized smoother.
      document.documentElement.classList.add("gsap-smooth-scroll");
      void Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("gsap/ScrollSmoother"),
      ]).then(([{ gsap }, { ScrollTrigger }, { ScrollSmoother }]) => {
      if (cancelled) return;
      if (!wrapperRef.current || !contentRef.current) return;

      gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

      document.documentElement.classList.add("gsap-smooth-scroll");
      const smoother = ScrollSmoother.create({
        wrapper: wrapperRef.current,
        content: contentRef.current,
        smooth: 1.15,
        smoothTouch: 0.12,
        ease: "power3.out",
      });

      const findTarget = (hash: string) => {
        try {
          return document.getElementById(decodeURIComponent(hash.slice(1)));
        } catch {
          return null;
        }
      };

      const scrollToTarget = (target: HTMLElement, animate: boolean) => {
        const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
        const feedback = ScrollTrigger.getById("feedback-horizontal");
        const reviews = document.getElementById("testimonials");
        // The following sections share the feedback pin so no blank spacer is
        // visible below its cards. Their anchors must include the entire pinned
        // travel, even when clicked halfway through horizontal scrolling.
        if (feedback?.pin?.contains(target) && !reviews?.contains(target)) {
          const localTop = target.getBoundingClientRect().top - feedback.pin.getBoundingClientRect().top;
          smoother.scrollTo(feedback.end + localTop + 80 - margin, animate);
          return;
        }
        smoother.scrollTo(target, animate, `top ${margin}px`);
      };

      // Handle hash links before Next's Link scrolls the transformed content.
      const onAnchorClick = (event: MouseEvent) => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
        if (!(link instanceof HTMLAnchorElement) || link.hasAttribute("download") || (link.target && link.target !== "_self")) return;
        const url = new URL(link.href);
        if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search || !url.hash) return;
        const target = findTarget(url.hash);
        if (!target) return;

        event.preventDefault();
        if (location.hash !== url.hash) history.pushState(null, "", url.hash);
        scrollToTarget(target, true);
      };

      const onHashChange = () => {
        if (contentRef.current?.querySelector("[data-logo-loading]")) {
          restorePendingHash();
          return;
        }
        const target = findTarget(location.hash);
        if (target) scrollToTarget(target, true);
        else restorePendingHash();
      };

      let disposed = false;
      let hashFrame = 0;
      let pendingHash: MutationObserver | null = null;
      function restorePendingHash() {
        const content = contentRef.current;
        if (pendingHash || !content || !location.hash || !content.querySelector("[data-logo-loading]")) return;
        // A streamed route can still be showing loading.tsx when fonts/GSAP
        // are ready. Wait for its actual target, not an arbitrary timeout.
        pendingHash = new MutationObserver(() => {
          if (content.querySelector("[data-logo-loading]")) return;
          pendingHash?.disconnect();
          pendingHash = null;
          hashFrame = requestAnimationFrame(() => {
            hashFrame = requestAnimationFrame(() => {
              if (disposed) return;
              ScrollTrigger.refresh();
              const target = findTarget(location.hash);
              if (target) scrollToTarget(target, false);
            });
          });
        });
        pendingHash.observe(content, { childList: true, subtree: true });
      }
      // Font metrics can change the section positions after the first paint.
      void document.fonts.ready.then(() => {
        if (disposed) return;
        // Let other scroll-intent consumers finish creating their pin spacers.
        hashFrame = requestAnimationFrame(() => {
          if (disposed) return;
          if (contentRef.current?.querySelector("[data-logo-loading]")) {
            restorePendingHash();
            return;
          }
          ScrollTrigger.refresh();
          const target = findTarget(location.hash);
          if (target) scrollToTarget(target, false);
          else restorePendingHash();
        });
      });

      document.addEventListener("click", onAnchorClick, true);
      window.addEventListener("hashchange", onHashChange);

      cleanup = () => {
        disposed = true;
        pendingHash?.disconnect();
        cancelAnimationFrame(hashFrame);
        document.removeEventListener("click", onAnchorClick, true);
        window.removeEventListener("hashchange", onHashChange);
        smoother.kill();
        document.documentElement.classList.remove("gsap-smooth-scroll");
      };
      }).catch((error: unknown) => {
        document.documentElement.classList.remove("gsap-smooth-scroll");
        if (!cancelled) console.error("Smooth scrolling could not load; native scrolling remains available.", error);
      }); });
    };

    setup();
    media.addEventListener("change", setup);
    return () => {
      cancelSetup();
      media.removeEventListener("change", setup);
    };
  }, [pathname]);

  return (
    <div ref={wrapperRef} id="smooth-wrapper">
      <div ref={contentRef} id="smooth-content">{children}</div>
    </div>
  );
}
