"use client";

import { useEffect, useRef } from "react";
import { ArrowLeft, Quote } from "lucide-react";
import { previewFeedback, previewParents } from "@/lib/home-content";
import { onScrollIntent } from "@/lib/scroll-intent";
import { useUi } from "../providers/UiProvider";
import Reveal from "./Reveal";

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
        media.add("(prefers-reduced-motion: no-preference) and (min-width: 768px) and (min-height: 600px), (prefers-reduced-motion: no-preference) and (min-width: 360px) and (min-height: 800px)", () => {
          const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
          if (!distance()) return;
          gsap.set(viewport, { overflowX: "hidden" });
          if (navigationRef.current) gsap.set(navigationRef.current, { display: "flex" });
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: section, pin, start: "top top+=80",
              end: () => `+=${distance() + window.innerHeight * 0.25}`,
              scrub: 0.25, anticipatePin: 1, invalidateOnRefresh: true,
            },
          });
          timeline.fromTo(track, { x: 0 }, { x: () => -distance(), duration: 1, ease: "none" })
            .to({}, { duration: 0.12 });
          if (progressRef.current) timeline.fromTo(progressRef.current, { scaleX: 0 }, { scaleX: 1, duration: timeline.duration(), ease: "none" }, 0);
          const resize = new ResizeObserver(() => ScrollTrigger.refresh());
          resize.observe(viewport);
          return () => resize.disconnect();
        }, section);
        void document.fonts.ready.then(() => { if (!cancelled) ScrollTrigger.refresh(); });
        revert = () => media.revert();
      }).catch((error: unknown) => {
        if (!cancelled) console.error("Feedback animation unavailable; horizontal browsing remains available.", error);
      });
    });
    return () => { cancelled = true; cancelIntent(); revert(); };
  }, []);

  return (
    <section id="testimonials" ref={sectionRef} aria-labelledby="feedback-title" className="scroll-mt-20 bg-[#eae9df] text-[#153f3b] dark:bg-[#183a36] dark:text-white">
      <div ref={pinRef} className="flex min-h-[calc(100svh-5rem)] flex-col justify-center py-10 motion-reduce:min-h-0 motion-reduce:py-20 [@media(max-height:599px)]:min-h-0">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <Reveal className="mb-7 flex items-end justify-between gap-5">
            <div>
              <p className="mb-2 text-xs font-bold tracking-wide opacity-70">{language === "ar" ? "شركاؤنا في الرحلة" : "PARTNERS IN THE JOURNEY"}</p>
              <h2 id="feedback-title" className="text-3xl leading-[1.6] font-black sm:text-4xl">{language === "ar" ? "بعيون أولياء الأمور" : "Through parents' eyes"}</h2>
              <p className="mt-2 text-xs leading-6 opacity-70">{language === "ar" ? "آراء وأسماء تجريبية للعرض — وليست شهادات فعلية." : "Sample reviews and fictional names — not actual testimonials."}</p>
            </div>
            <a href="#contact" className="shrink-0 text-xs font-bold underline decoration-current/30 underline-offset-4">{language === "ar" ? "تخطَّ الآراء" : "Skip reviews"}</a>
          </Reveal>
          <div ref={viewportRef} className="overflow-x-auto overscroll-x-contain motion-reduce:overflow-visible [@media(max-height:599px)]:overflow-visible" dir="ltr" tabIndex={0} role="region" aria-label={language === "ar" ? "بطاقات آراء أولياء الأمور" : "Parent feedback cards"}>
            <div ref={trackRef} className="flex w-max gap-5 pb-2 motion-reduce:grid motion-reduce:w-full motion-reduce:grid-cols-1 md:motion-reduce:grid-cols-2 [@media(max-height:599px)]:grid [@media(max-height:599px)]:w-full [@media(max-height:599px)]:grid-cols-1 sm:[@media(max-height:599px)]:grid-cols-2">
              {previewFeedback.map((feedback, index) => (
                <Reveal as="figure" key={previewParents[index].en} delay={(index % 3) * 60} dir={language === "ar" ? "rtl" : "ltr"} className="flex min-h-72 w-[min(82vw,25rem)] shrink-0 flex-col rounded-2xl bg-white p-6 text-[#153f3b] motion-reduce:w-auto sm:p-8 [@media(max-height:599px)]:w-auto">
                  <div className="mb-5 flex items-center justify-between"><Quote className="size-7 text-[#a67620]" strokeWidth={1.3} aria-hidden="true" /><span className="text-xs text-[#153f3b]/50" aria-hidden="true">0{index + 1}</span></div>
                  <blockquote className="flex-1 text-base leading-[1.9] font-bold sm:text-lg">{feedback[language]}</blockquote>
                  <figcaption className="mt-7 border-t border-[#153f3b]/15 pt-5">
                    <p className="font-black">{previewParents[index][language]}</p>
                    <p className="mt-1 text-xs text-[#153f3b]/70">{language === "ar" ? "ولي أمر الطالب / " : "Parent of / "}{previewParents[index].student[language]}</p>
                  </figcaption>
                </Reveal>
              ))}
            </div>
          </div>
          <div ref={navigationRef} className="mt-6 hidden items-center gap-4">
            <span className="flex items-center gap-2 text-xs opacity-70"><ArrowLeft className="size-4" aria-hidden="true" />{language === "ar" ? "تابع التمرير" : "Keep scrolling"}</span>
            <div className="h-px flex-1 overflow-hidden bg-current/20" dir="ltr" aria-hidden="true"><span ref={progressRef} className="block h-full w-full origin-left scale-x-0 bg-[#a67620]" /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
