"use client";

import { useEffect, useRef, type CSSProperties } from "react";

// Stable positions keep the server and client markup identical.
const motifs = Array.from({ length: 16 }, (_, index) => ({
  left: 8 + (index % 4) * 28 + (Math.floor(index / 4) % 2) * 3,
  top: 10 + Math.floor(index / 4) * 26,
  size: 34 + (index % 3) * 9,
}));

export default function HeroParticles() {
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const field = fieldRef.current;
    const hero = field?.closest("section");
    if (!field || !hero) return;
    const media = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let dispose = () => {};

    const setup = () => {
      dispose();
      if (!media.matches) return;
      let cancelled = false;
      let cleanup = () => {};
      dispose = () => { cancelled = true; cleanup(); };

      void import("gsap").then(({ gsap }) => {
        if (cancelled) return;
        const tiles = Array.from(field.querySelectorAll<HTMLElement>("[data-hero-tile]"));
        let points: { x: number; y: number }[] = [];
        const active = new Set<number>();
        let frame = 0;
        let pointerX = 0;
        let pointerY = 0;
        let visible = true;

        const measure = () => {
          points = tiles.map((tile) => {
            const group = tile.parentElement!;
            return {
              x: group.offsetLeft - group.offsetWidth / 2 + tile.offsetLeft + tile.offsetWidth / 2,
              y: group.offsetTop - group.offsetHeight / 2 + tile.offsetTop + tile.offsetHeight / 2,
            };
          });
        };
        const restore = (index: number, immediate = false) => {
          gsap.to(tiles[index], {
            x: 0, y: 0, rotation: 0, scale: 1, opacity: 0.24,
            duration: immediate ? 0 : 1.15,
            ease: "back.out(1.35)", overwrite: true,
          });
          active.delete(index);
        };
        const reset = (immediate = false) => {
          cancelAnimationFrame(frame);
          frame = 0;
          active.forEach((index) => restore(index, immediate));
          if (immediate) {
            gsap.killTweensOf(tiles);
            gsap.set(tiles, { clearProps: "transform,opacity" });
          }
        };
        const update = () => {
          frame = 0;
          if (!visible || document.hidden) return;
          // One rect read accounts for ScrollSmoother's transformed container.
          const bounds = field.getBoundingClientRect();
          const x = pointerX - bounds.left;
          const y = pointerY - bounds.top;
          const radius = 210;
          points.forEach((point, index) => {
            const dx = point.x - x;
            const dy = point.y - y;
            const distance = Math.hypot(dx, dy);
            if (distance >= radius) {
              if (active.has(index)) restore(index);
              return;
            }
            const strength = (1 - distance / radius) ** 2;
            const quadrant = index % 4;
            const spreadX = quadrant % 2 === 0 ? -1 : 1;
            const spreadY = quadrant < 2 ? -1 : 1;
            // A gentle twist and extra separation break each four-piece motif apart.
            gsap.to(tiles[index], {
              x: ((distance ? dx / distance : spreadX) * 110 + spreadX * 34) * strength,
              y: ((distance ? dy / distance : spreadY) * 110 + spreadY * 34) * strength,
              rotation: spreadX * (18 + quadrant * 9) * strength,
              scale: 1 + strength * 0.2,
              opacity: 0.24 + strength * 0.32,
              duration: 0.65, ease: "power3.out", overwrite: true,
            });
            active.add(index);
          });
        };
        const move = (event: PointerEvent) => {
          if (event.pointerType === "touch" || !visible || document.hidden) return;
          pointerX = event.clientX;
          pointerY = event.clientY;
          // Coalesce pointer events; no perpetual animation/ticker loop.
          if (!frame) frame = requestAnimationFrame(update);
        };
        const leave = () => reset();
        const hide = () => { if (document.hidden) reset(true); };
        const observer = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;
          if (!visible) reset(true);
        });
        const resize = new ResizeObserver(() => { reset(true); measure(); });
        measure();
        observer.observe(hero);
        resize.observe(field);
        hero.addEventListener("pointermove", move, { passive: true });
        hero.addEventListener("pointerleave", leave);
        window.addEventListener("blur", leave);
        document.addEventListener("visibilitychange", hide);

        cleanup = () => {
          reset(true);
          observer.disconnect();
          resize.disconnect();
          hero.removeEventListener("pointermove", move);
          hero.removeEventListener("pointerleave", leave);
          window.removeEventListener("blur", leave);
          document.removeEventListener("visibilitychange", hide);
        };
      }).catch((error: unknown) => {
        if (!cancelled) console.error("Hero animation unavailable; keeping the static pattern.", error);
      });
    };
    setup();
    media.addEventListener("change", setup);
    return () => { dispose(); media.removeEventListener("change", setup); };
  }, []);

  return (
    <div
      ref={fieldRef}
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none contain-[layout_paint] [mask-composite:intersect] [mask-image:linear-gradient(to_bottom,transparent,black_7%,black_87%,transparent),radial-gradient(ellipse_at_center,#0003_15%,#0008_48%,black_78%)]"
      aria-hidden="true"
    >
      {motifs.map((motif, index) => (
        <div
          key={index}
          className={`absolute -translate-x-1/2 -translate-y-1/2 grid-cols-2 grid-rows-2 gap-[3px] [direction:ltr] ${index % 2 ? "hidden md:grid" : "grid"}`}
          style={{
            left: `${motif.left}%`,
            top: `${motif.top}%`,
            width: `${motif.size}px`,
            height: `${motif.size}px`,
          } as CSSProperties}
        >
          {[0, 1, 2, 3].map((part) => (
            <span
              key={part}
              data-hero-tile
              className={`block origin-center opacity-[.16] md:opacity-[.24] ${[
                "rounded-t-full bg-[#c2c1b1]",
                "rounded-full bg-[#b14e00]",
                "rounded-tr-full bg-[#d6aa48]",
                "bg-[#1c5954]",
              ][part]}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
