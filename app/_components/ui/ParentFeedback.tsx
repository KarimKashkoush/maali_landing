"use client";

import { useEffect, useRef } from "react";
import { ArrowLeft, Quote } from "lucide-react";
import { previewFeedback, previewParents } from "@/lib/home-content";
import { onScrollIntent } from "@/lib/scroll-intent";
import { useUi } from "../providers/UiProvider";

export default function ParentFeedback() {
  const { language } = useUi();
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const navigationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let revert = () => {};
    const cancelIntent = onScrollIntent(() => {
      void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled || !sectionRef.current || !pinRef.current || !viewportRef.current || !trackRef.current) return;
        gsap.registerPlugin(ScrollTrigger);
        const section = sectionRef.current;
        const pin = pinRef.current;
        const viewport = viewportRef.current;
        const track = trackRef.current;
        const media = gsap.matchMedia();
        media.add("(prefers-reduced-motion: no-preference) and (min-width: 768px) and (min-height: 640px), (prefers-reduced-motion: no-preference) and (min-width: 360px) and (min-height: 740px)", () => {
          const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
          // Tall content stays natively scrollable on short or zoomed screens.
          if (!distance() || pin.scrollHeight > window.innerHeight - 80 + 2) return;
          viewport.scrollLeft = 0;
          gsap.set(viewport, { overflowX: "hidden" });
          if (navigationRef.current) gsap.set(navigationRef.current, { display: "flex" });
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: section, pin, start: "top top+=80",
              end: () => `+=${distance()}`,
              scrub: 0.65, anticipatePin: 1, invalidateOnRefresh: true,
              pinSpacing: true, refreshPriority: -10,
            },
          });
          timeline.fromTo(track, { x: 0 }, { x: () => -distance(), duration: 1, ease: "none" });
          if (progressRef.current) timeline.fromTo(progressRef.current, { scaleX: 0 }, { scaleX: 1, duration: timeline.duration(), ease: "none" }, 0);
          let refreshFrame = 0;
          let previousSize = "";
          const resize = new ResizeObserver(() => {
            const size = `${viewport.clientWidth}:${track.scrollWidth}:${track.offsetHeight}`;
            if (size === previousSize) return;
            previousSize = size;
            cancelAnimationFrame(refreshFrame);
            refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
          });
          resize.observe(viewport);
          resize.observe(track);
          return () => { resize.disconnect(); cancelAnimationFrame(refreshFrame); };
        }, section);
        void document.fonts.ready.then(() => { if (!cancelled) ScrollTrigger.refresh(); });
        revert = () => media.revert();
      }).catch((error: unknown) => {
        if (!cancelled) console.error("Feedback animation unavailable; horizontal browsing remains available.", error);
      });
    });
    return () => { cancelled = true; cancelIntent(); revert(); };
  }, [language]);

  return (
    <section id="testimonials" ref={sectionRef} aria-labelledby="feedback-title" className="scroll-mt-20 bg-[#eae9df] text-[#153f3b] dark:bg-[#183a36] dark:text-white">
      {/* Pin the content's natural height: viewport-height centering creates a
          large empty area above the heading on tall screens. */}
      <div ref={pinRef} className="flex flex-col py-8 sm:py-10 motion-reduce:py-20">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="mb-7 flex items-center justify-between gap-5">
            <div>
              <p className="mb-2 text-xs font-bold tracking-wide opacity-70">{language === "ar" ? "شركاؤنا في الرحلة" : "PARTNERS IN THE JOURNEY"}</p>
              <h2 id="feedback-title" className="text-3xl leading-[1.6] font-black sm:text-4xl">{language === "ar" ? "بعيون أولياء الأمور" : "Through parents' eyes"}</h2>
              <p className="mt-2 text-xs leading-6 opacity-70">{language === "ar" ? "آراء وأسماء تجريبية للعرض — وليست شهادات فعلية." : "Sample reviews and fictional names — not actual testimonials."}</p>
            </div>
            <a href="#admissions" className="shrink-0 text-xs font-bold underline decoration-current/30 underline-offset-4">{language === "ar" ? "تخطَّ الآراء" : "Skip reviews"}</a>
          </div>
          <div ref={viewportRef} className="overflow-x-auto overscroll-x-contain motion-reduce:overflow-visible [@media(max-height:599px)]:overflow-visible" dir="ltr" tabIndex={0} role="region" aria-label={language === "ar" ? "بطاقات آراء أولياء الأمور" : "Parent feedback cards"}>
            <div ref={trackRef} className="flex w-max gap-5 pb-2 motion-reduce:grid motion-reduce:w-full motion-reduce:grid-cols-1 md:motion-reduce:grid-cols-2 [@media(max-height:599px)]:grid [@media(max-height:599px)]:w-full [@media(max-height:599px)]:grid-cols-1 sm:[@media(max-height:599px)]:grid-cols-2">
              {previewFeedback.map((feedback, index) => (
                <figure key={previewParents[index].en} dir={language === "ar" ? "rtl" : "ltr"} className="flex min-h-72 w-[min(82vw,25rem)] shrink-0 flex-col rounded-2xl bg-white p-6 text-[#153f3b] motion-reduce:w-auto sm:p-8 [@media(max-height:599px)]:w-auto">
                  <div className="mb-5 flex items-center justify-between"><Quote className="size-7 text-[#a67620]" strokeWidth={1.3} aria-hidden="true" /><span className="text-xs text-[#153f3b]/50" aria-hidden="true">0{index + 1}</span></div>
                  <blockquote className="flex-1 text-base leading-[1.9] font-bold sm:text-lg">{feedback[language]}</blockquote>
                  <figcaption className="mt-7 border-t border-[#153f3b]/15 pt-5">
                    <p className="font-black">{previewParents[index][language]}</p>
                    <p className="mt-1 text-xs text-[#153f3b]/70">{language === "ar" ? "ولي أمر الطالب / " : "Parent of / "}{previewParents[index].student[language]}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
          <div ref={navigationRef} className="mt-6 hidden items-center gap-4">
            <span className="flex items-center gap-2 text-xs opacity-70"><ArrowLeft className="size-4 shrink-0" aria-hidden="true" /><span className="leading-none">{language === "ar" ? "تابع التمرير" : "Keep scrolling"}</span></span>
            <div className="h-px flex-1 overflow-hidden bg-current/20" dir="ltr" aria-hidden="true"><span ref={progressRef} className="block h-full w-full origin-left scale-x-0 bg-[#a67620]" /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
