"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useUi } from "../providers/UiProvider";

const letters = ["M", "C", "S"] as const;
// Layout translation stays on the wrapper; GSAP owns only the inner panel's transform.
const panelLayout = "absolute inset-x-[.15rem] top-1/2 -translate-y-1/2 motion-reduce:static motion-reduce:translate-y-0 md:inset-x-[clamp(1rem,4vw,4rem)]";
const staticPanel = "motion-reduce:visible motion-reduce:border-b motion-reduce:border-white/12 motion-reduce:py-4 motion-reduce:opacity-100";

export default function BrandStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const { language, t } = useUi();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    let dispose = () => {};

    const setup = () => {
      dispose();
      if (!motion.matches) return;

      let cancelled = false;
      let cleanup = () => {};
      dispose = () => {
        cancelled = true;
        cleanup();
      };

      void Promise.all([import("gsap"), import("gsap/ScrollTrigger")])
        .then(([{ gsap }, { ScrollTrigger }]) => {
          if (cancelled) return;

          gsap.registerPlugin(ScrollTrigger);
          const pin = section.querySelector<HTMLElement>("[data-story-pin]");
          const pieces = Array.from(section.querySelectorAll<HTMLElement>("[data-logo-piece]"));
          const panels = Array.from(section.querySelectorAll<HTMLElement>("[data-story-panel]"));
          const outro = section.querySelector<HTMLElement>("[data-story-outro]");
          const progress = section.querySelector<HTMLElement>("[data-story-progress]");
          if (!pin || pieces.length !== 4 || panels.length !== 3 || !outro) return;

          const context = gsap.context(() => {
            gsap.set(panels, { autoAlpha: 0, y: 36 });
            gsap.set(panels[0], { autoAlpha: 1, y: 0 });
            gsap.set(outro, { autoAlpha: 0, y: 28 });
            gsap.set(progress, { scaleY: 0, transformOrigin: "top" });

            const timeline = gsap.timeline({
              defaults: { ease: "power3.inOut" },
              scrollTrigger: {
                trigger: section,
                pin,
                start: "top top+=80",
                end: () => `+=${Math.max(window.innerHeight * 3.1, 1800)}`,
                scrub: 0.15,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            });

            timeline
              .to(pieces, {
                xPercent: (index) => [-36, 36, -36, 36][index],
                yPercent: (index) => [-26, -26, 26, 26][index],
                scale: 0.86,
                opacity: 0.24,
                duration: 0.55,
              })
              .to(pieces[0], { opacity: 1, scale: 1.12, duration: 0.55 }, "<")
              .to({}, { duration: 0.7 });

            panels.slice(1).forEach((panel, panelIndex) => {
              const index = panelIndex + 1;
              const label = `story-step-${index}`;
              timeline.addLabel(label);
              timeline
                .set(panels[index - 1], { autoAlpha: 0, y: -26 }, label)
                .set(panel, { autoAlpha: 1, y: 0 }, label)
                .to(pieces[index - 1], { opacity: 0.24, scale: 0.86, duration: 0.25 }, label)
                .to(pieces[index], { opacity: 1, scale: 1.12, duration: 0.25 }, label)
                .to({}, { duration: 0.7 });
            });

            timeline
              .to(panels[panels.length - 1], { autoAlpha: 0, y: -30, duration: 0.4 })
              .to(
                pieces,
                { xPercent: 0, yPercent: 0, scale: 1, opacity: 1, duration: 0.65 },
                "<0.05",
              )
              .to(outro, { autoAlpha: 1, y: 0, duration: 0.4 }, "<0.2")
              .to({}, { duration: 0.45 });

            if (progress) {
              timeline.to(progress, { scaleY: 1, duration: timeline.duration(), ease: "none" }, 0);
            }
          }, section);

          void document.fonts.ready.then(() => {
            if (!cancelled) ScrollTrigger.refresh();
          });

          cleanup = () => context.revert();
        })
        .catch((error: unknown) => {
          if (!cancelled) console.error("Brand story animation unavailable; showing the static story.", error);
        });
    };

    setup();
    motion.addEventListener("change", setup);
    return () => {
      dispose();
      motion.removeEventListener("change", setup);
    };
  }, []);

  return (
    <section id="brand-story" ref={sectionRef} className="relative bg-[#1c5954] text-white" aria-labelledby="brand-story-title">
      <div className="relative isolate flex min-h-[calc(100svh-5rem)] overflow-hidden motion-reduce:min-h-0" data-story-pin>
        <div
          className="absolute inset-0 -z-20 bg-[#143f3c] [background-image:linear-gradient(115deg,rgb(255_255_255_/_0.045)_1px,transparent_1px),radial-gradient(circle_at_16%_22%,rgb(214_170_72_/_0.23),transparent_27%),radial-gradient(circle_at_88%_76%,rgb(177_78_0_/_0.22),transparent_30%)] [background-size:72px_72px,auto,auto]"
          aria-hidden="true"
        />
        <div className="absolute top-1/2 left-1/2 -z-10 aspect-square w-[min(52vw,44rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/6 blur-[2px]" aria-hidden="true" />
        <div className="mx-auto grid min-h-[calc(100svh-5rem)] w-full max-w-7xl grid-cols-1 grid-rows-[42%_58%] items-center px-5 pt-4 pb-6 [direction:ltr] motion-reduce:block motion-reduce:min-h-0 motion-reduce:py-16 md:grid-cols-[minmax(0,.92fr)_minmax(0,1.08fr)] md:grid-rows-1 md:p-[clamp(2rem,5vw,5rem)] md:motion-reduce:grid md:motion-reduce:grid-cols-[minmax(12rem,.65fr)_minmax(0,1.35fr)] md:motion-reduce:py-20">
          <div className="relative grid min-w-0 place-items-center self-end [direction:rtl] motion-reduce:mb-16 motion-reduce:self-auto md:self-auto md:motion-reduce:sticky md:motion-reduce:top-28 md:motion-reduce:mb-0 md:motion-reduce:self-start" aria-hidden="true">
            <div className="absolute aspect-square w-[min(64vw,17rem)] rounded-full border border-white/13 before:absolute before:inset-[10%] before:rounded-[inherit] before:border before:border-[#d6aa48]/17 before:content-[''] after:absolute after:inset-[23%] after:rounded-[inherit] after:border after:border-white/10 after:content-[''] md:w-[min(38vw,30rem)]" />
            <div className="relative grid aspect-square w-[min(42vw,11.5rem)] grid-cols-2 grid-rows-2 gap-0 [direction:ltr] drop-shadow-[0_1.5rem_2rem_rgb(0_0_0_/_0.17)] motion-reduce:w-[min(48vw,12rem)] md:w-[min(26vw,21rem)] md:motion-reduce:w-[min(26vw,17rem)] [@media(min-width:768px)_and_(max-height:650px)]:w-[min(23vw,15rem)]">
              {(["m", "c", "s", "base"] as const).map((piece) => (
                <div key={piece} className="block will-change-[transform,opacity]" data-logo-piece>
                  <Image
                    className="block size-full object-contain"
                    src={`/brand-mark/${piece}.png`}
                    alt=""
                    width={512}
                    height={512}
                    sizes="(max-width: 767px) 22vw, 13vw"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>

          <div dir={language === "ar" ? "rtl" : "ltr"} className="relative min-h-full px-0 text-start motion-reduce:grid motion-reduce:min-h-0 motion-reduce:gap-8 md:min-h-[29rem] md:px-[clamp(1rem,4vw,4rem)] [@media(min-width:768px)_and_(max-height:650px)]:min-h-[23rem]">
            {t.brandStory.steps.map((step, index) => (
              <div key={letters[index]} className={panelLayout} data-story-layout>
                <article
                  className={`${staticPanel} ${index > 0 ? "invisible opacity-0" : ""}`}
                  data-story-panel
                >
                <div className="mb-4 flex items-baseline gap-1.5 text-xs leading-none font-bold tracking-[.08em] text-white/38 [direction:ltr]">
                  <span className="text-[1.1rem] text-[#d6aa48]">{String(index + 1).padStart(2, "0")}</span>
                  <span>/ 03</span>
                </div>
                <p className="mb-1.5 text-6xl leading-[.75] font-extrabold text-white/20 [direction:ltr] motion-reduce:text-6xl md:text-[clamp(4.5rem,10vw,8rem)]">{letters[index]}</p>
                {index === 0 ? (
                  <h2 id="brand-story-title" className="max-w-[14ch] text-[clamp(2rem,9vw,3rem)] leading-[1.14] font-black tracking-[-.035em] md:max-w-[11ch] md:text-[clamp(2.35rem,4.7vw,4.85rem)] [@media(min-width:768px)_and_(max-height:650px)]:text-[clamp(2rem,5vh,3.4rem)]">{step.title}</h2>
                ) : (
                  <h3 className="max-w-[14ch] text-[clamp(2rem,9vw,3rem)] leading-[1.14] font-black tracking-[-.035em] md:max-w-[11ch] md:text-[clamp(2.2rem,4vw,4rem)] [@media(min-width:768px)_and_(max-height:650px)]:text-[clamp(2rem,5vh,3.4rem)]">{step.title}</h3>
                )}
                <p className="mt-3 max-w-xl text-[.95rem] leading-[1.75] text-white/73 md:mt-5 md:text-[clamp(1rem,1.6vw,1.2rem)] md:leading-8">{step.description}</p>
                </article>
              </div>
            ))}

            <div className={panelLayout} data-story-layout>
              <div className={`invisible opacity-0 ${staticPanel}`} data-story-outro>
                <h3 className="max-w-[14ch] text-[clamp(2rem,9vw,3rem)] leading-[1.14] font-black tracking-[-.035em] md:max-w-[11ch] md:text-[clamp(2.2rem,4vw,4rem)]">{t.brandStory.finalTitle}</h3>
              </div>
            </div>
          </div>

          <div className="absolute top-[17%] end-2 h-[66%] w-0.5 overflow-hidden rounded-full bg-white/12 motion-reduce:hidden md:end-[clamp(1rem,2vw,2rem)]" aria-hidden="true">
            <span className="block size-full rounded-[inherit] bg-[#d6aa48]" data-story-progress />
          </div>
        </div>
      </div>
    </section>
  );
}
