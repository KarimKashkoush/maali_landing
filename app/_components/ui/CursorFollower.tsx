"use client";

import { useEffect } from "react";

export default function CursorFollower() {
  useEffect(() => {
    const media = window.matchMedia(
      "(pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    let dispose = () => {};

    const setup = () => {
      dispose();
      if (!media.matches) return;

      let cancelled = false;
      let destroy = () => {};
      dispose = () => {
        cancelled = true;
        destroy();
      };

      void Promise.all([import("mouse-follower"), import("gsap")])
        .then(([{ default: MouseFollower }, { gsap }]) => {
          if (cancelled) return;

          MouseFollower.registerGSAP(gsap);
          const cursor = new MouseFollower({
            className: "mf-cursor maali-cursor",
            speed: 0.25,
            ease: "power3.out",
            skewing: 0,
            initialPos: [-100, -100],
            hideOnLeave: true,
            stateDetection: {
              "-pointer": "a, button, summary, [role='button']",
              "-hidden": "iframe, input, textarea, select",
            },
          });

          cursor.el.setAttribute("aria-hidden", "true");
          // Both follow smoothly; the dot catches up sooner than the outer ring.
          const dot = document.createElement("div");
          dot.className = "maali-cursor-dot -hidden";
          dot.setAttribute("aria-hidden", "true");
          document.body.appendChild(dot);
          const setDotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
          const setDotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });
          let hasPosition = false;
          const moveDot = (event: MouseEvent) => {
            setDotX(event.clientX, hasPosition ? undefined : event.clientX);
            setDotY(event.clientY, hasPosition ? undefined : event.clientY);
            hasPosition = true;
            dot.classList.toggle("-hidden", cursor.el.classList.contains("-hidden"));
          };
          cursor.on("show", () => {
            if (hasPosition) dot.classList.remove("-hidden");
          });
          cursor.on("hide", () => dot.classList.add("-hidden"));
          document.documentElement.addEventListener("mousemove", moveDot, { passive: true });
          const hide = () => cursor.hide();
          const show = () => cursor.show();
          const onVisibilityChange = () => {
            if (document.hidden) hide();
          };
          window.addEventListener("blur", hide);
          window.addEventListener("focus", show);
          document.addEventListener("visibilitychange", onVisibilityChange);

          destroy = () => {
            document.documentElement.removeEventListener("mousemove", moveDot);
            setDotX.tween.kill();
            setDotY.tween.kill();
            dot.remove();
            window.removeEventListener("blur", hide);
            window.removeEventListener("focus", show);
            document.removeEventListener("visibilitychange", onVisibilityChange);
            window.clearTimeout(cursor.visibleInt);
            gsap.killTweensOf(cursor.pos);
            cursor.destroy();
          };
        })
        .catch((error: unknown) => {
          if (!cancelled) console.error("Mouse Follower could not load.", error);
        });
    };

    setup();
    media.addEventListener("change", setup);
    return () => {
      dispose();
      media.removeEventListener("change", setup);
    };
  }, []);

  return null;
}
