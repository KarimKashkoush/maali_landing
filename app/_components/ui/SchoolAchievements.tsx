"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { Award, ShieldCheck, Trophy } from "lucide-react";
import { countMedals, medalLabels, medalsByType, medalTypes, schoolAchievements, totalMedals, type MedalType } from "@/lib/achievements";
import { useUi } from "../providers/UiProvider";
import Reveal from "./Reveal";

const medalPalette: Record<MedalType, { base: string; light: string; edge: string }> = {
  diamond: { base: "#95c6cb", light: "#e7f7f5", edge: "#4c8c94" },
  gold: { base: "#d8a735", light: "#fff0b8", edge: "#986618" },
  silver: { base: "#bac4cc", light: "#f6f7fa", edge: "#778491" },
  bronze: { base: "#b77748", light: "#edbb92", edge: "#824422" },
};

const podium: { type: MedalType; height: string }[] = [
  { type: "silver", height: "h-28 sm:h-36" },
  { type: "diamond", height: "h-44 sm:h-60" },
  { type: "gold", height: "h-36 sm:h-48" },
  { type: "bronze", height: "h-24 sm:h-28" },
];

function medalStyle(type: MedalType): CSSProperties {
  const color = medalPalette[type];
  return { "--medal-base": color.base, "--medal-light": color.light } as CSSProperties;
}

function Medal({ type, className = "h-14 w-10" }: { type: MedalType; className?: string }) {
  const color = medalPalette[type];
  return <svg viewBox="0 0 48 64" fill="none" className={className} aria-hidden="true" focusable="false" data-medal={type}>
    <path d="M8 2h11l13 27-10 5L8 2Z" fill="#205e58" />
    <path d="M29 2h11L26 34l-10-5L29 2Z" fill="#398278" />
    <path d="m32 2-13 29 4 2L36 2h-4Z" fill="#b4d5cd" opacity=".6" />
    <circle cx="24" cy="41" r="20" fill={color.base} stroke={color.edge} strokeWidth="1.5" />
    <circle cx="24" cy="41" r="15.5" stroke={color.light} strokeWidth="1.5" />
    <path d="M10 35a15 15 0 0 1 24-7" stroke="white" strokeWidth="2" strokeLinecap="round" opacity=".65" />
    {type === "diamond" ? <><path d="m16 39 5-6h6l5 6-8 11-8-11Z" fill={color.light} /><path d="M16 39h16m-11-6 3 17 3-17" stroke={color.edge} strokeWidth=".8" /></> : <path d="m24 31 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6Z" fill={color.light} stroke={color.edge} strokeWidth=".7" />}
  </svg>;
}

export default function SchoolAchievements() {
  const { language } = useUi();
  const ar = language === "ar";
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const travelerRef = useRef<HTMLDivElement>(null);
  const medalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const rail = railRef.current;
    const traveler = travelerRef.current;
    const medal = medalRef.current;
    if (!section || !rail || !traveler || !medal) return;

    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    let dispose = () => {};
    const setup = () => {
      dispose();
      if (!motion.matches) return;
      let cancelled = false;
      let cleanup = () => {};
      // Prepare only near this section, without adding work to the hero's load.
      const observer = new IntersectionObserver((entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
          if (cancelled) return;
          gsap.registerPlugin(ScrollTrigger);
          const media = gsap.matchMedia();
          cleanup = () => media.revert();
          media.add({ desktop: "(min-width: 1024px)", mobile: "(max-width: 1023px)" }, (context) => {
            const desktop = context.conditions?.desktop;
            // Separate wrappers keep the entrance and scroll transforms independent.
            gsap.fromTo(medal,
              { y: desktop ? -90 : -40, rotation: -12, autoAlpha: 0 },
              {
                y: 0, rotation: 0, autoAlpha: 1, duration: 1.4, ease: "power3.out",
                scrollTrigger: { trigger: section, start: "top 85%", once: true },
              },
            );
            if (!desktop) return;
            gsap.to(traveler, {
              y: () => Math.max(0, rail.clientHeight - traveler.offsetHeight),
              ease: "none",
              scrollTrigger: {
                id: "achievements-travel-medal", trigger: section,
                start: "top top+=144", end: "bottom bottom-=64",
                scrub: 0.5, invalidateOnRefresh: true,
              },
            });
            // Language/font changes can change the card heights and travel distance.
            let refreshFrame = 0;
            const resize = new ResizeObserver(() => {
              cancelAnimationFrame(refreshFrame);
              refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
            });
            resize.observe(rail);
            return () => { resize.disconnect(); cancelAnimationFrame(refreshFrame); };
          }, section);
        }).catch(() => {
          // The decorative medal remains static if the enhancement cannot load.
          cleanup();
        });
      }, { rootMargin: "400px 0px" });
      observer.observe(section);
      dispose = () => { cancelled = true; observer.disconnect(); cleanup(); };
    };
    setup();
    motion.addEventListener("change", setup);
    return () => { dispose(); motion.removeEventListener("change", setup); };
  }, []);

  return <section id="achievements" ref={sectionRef} aria-labelledby="achievements-title" className="scroll-mt-20 overflow-hidden bg-background py-20 text-foreground sm:py-28">
    <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:pe-28">
      <div ref={railRef} aria-hidden="true" data-achievement-medal-rail className="pointer-events-none mb-6 flex justify-center lg:absolute lg:inset-y-0 lg:end-4 lg:mb-0 lg:block lg:w-16 xl:w-20">
        <div ref={travelerRef} data-achievement-medal-traveler className="w-12 self-start lg:w-full">
          <div ref={medalRef} data-achievement-floating-medal className="drop-shadow-[0_8px_8px_rgb(0_0_0_/_0.1)]">
            <Medal type="gold" className="h-auto w-full" />
          </div>
        </div>
      </div>
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="mb-4 text-xs font-bold tracking-wide text-brand sm:text-sm">{ar ? "حصاد العام الماضي" : "LAST YEAR'S HIGHLIGHTS"}</p>
        <h2 id="achievements-title" className="text-3xl leading-[1.6] font-black text-balance sm:text-5xl">{ar ? "من الاجتهاد… " : "From dedication… "}<span className="text-brand">{ar ? "إلى التتويج." : "to the podium."}</span></h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">{ar ? "نحتفي بمواهب طلابنا، وبكل خطوة أوصلتهم إلى منصات التتويج." : "Celebrating our students' talents and every step that brought them to the podium."}</p>
      </Reveal>

      <div className="relative mt-10 rounded-[2rem] border border-border bg-[#f7f6f1] px-4 pt-9 pb-6 sm:mt-14 sm:rounded-[2.5rem] sm:px-10 sm:pt-12 sm:pb-8 dark:bg-card">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(ellipse_at_60%_25%,#d6aa4814,transparent_65%)]" />
        <div className="relative grid items-center gap-10 lg:grid-cols-[.7fr_1.3fr] lg:gap-12">
          <Reveal className="text-center">
            <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full border border-[#a87925]/25 text-[#93651c] dark:text-gold"><Trophy className="size-6" strokeWidth={1.4} aria-hidden="true" /></div>
            <p className="text-xs font-bold text-muted-foreground sm:text-sm">{ar ? "إجمالي ميداليات العام الماضي" : "TOTAL MEDALS LAST YEAR"}</p>
            <strong data-medal-total className="mt-2 block text-[clamp(6rem,14vw,10rem)] leading-[1.1] font-black tabular-nums tracking-tighter text-brand">{totalMedals}</strong>
            <p className="text-xl font-bold sm:text-2xl">{ar ? "ميدالية نفخر بها" : "medals to celebrate"}</p>
          </Reveal>

          <div>
            <ul aria-label={ar ? "توزيع الميداليات حسب النوع" : "Medals by type"} dir="ltr" className="relative isolate mx-auto grid max-w-2xl grid-cols-4 items-end gap-1.5 border-b border-[#153f3b]/15 px-1 pt-3 sm:gap-3 sm:px-3 dark:border-white/20">
              {podium.map(({ type, height }, index) => <li key={type} data-podium={type} className="min-w-0" style={medalStyle(type)}>
                <Reveal delay={index * 70}>
                  <Medal type={type} className="mx-auto mb-4 h-16 w-12 sm:mb-6 sm:h-24 sm:w-18" />
                  <div className={`relative flex flex-col items-center rounded-t-xl border border-white/50 bg-[linear-gradient(155deg,var(--medal-light),var(--medal-base))] px-1 pt-5 text-[#11201c] shadow-[inset_-8px_0_0_#00000006] sm:rounded-t-2xl sm:pt-7 ${height}`}>
                    <span aria-hidden="true" className="absolute inset-x-0 top-0 h-2 rounded-t-[inherit] bg-white/35" />
                    <strong className="text-3xl leading-none font-black tabular-nums sm:text-5xl">{medalsByType[type]}</strong>
                    <span className="mt-3 text-[.6875rem] leading-relaxed font-bold sm:text-sm" dir={ar ? "rtl" : "ltr"}>{medalLabels[type][language]}</span>
                  </div>
                </Reveal>
              </li>)}
            </ul>
            <div aria-hidden="true" className="mx-auto h-3 w-full max-w-2xl rounded-b-lg bg-[#e4e1d5] dark:bg-white/15" />
          </div>
        </div>
      </div>

      <Reveal className="mt-16 mb-7 flex items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <p className="mb-2 text-xs font-bold text-muted-foreground">{ar ? "وراء كل تتويج، حكاية" : "BEHIND EVERY HONOUR, A STORY"}</p>
          <h3 className="text-2xl leading-relaxed font-black sm:text-3xl">{ar ? "إنجازات تستحق الاحتفاء" : "Achievements worth celebrating"}</h3>
        </div>
        <Award className="size-8 shrink-0 text-brand sm:size-10" strokeWidth={1.3} aria-hidden="true" />
      </Reveal>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {schoolAchievements.map((achievement, index) => {
          const medalCount = countMedals(achievement.medals);
          const Icon = achievement.distinction === "students" ? ShieldCheck : achievement.distinction === "ranking" ? Trophy : Award;
          const ranking = achievement.distinction === "ranking";
          return <Reveal as="article" key={achievement.id} delay={(index % 3) * 70} data-achievement={achievement.id} className={`relative flex min-w-0 flex-col overflow-hidden rounded-2xl border p-6 sm:p-7 ${ranking ? "border-brand-solid bg-brand-solid text-white lg:col-span-2" : "border-border bg-card"}`}>
            {ranking && <Trophy className="pointer-events-none absolute -end-6 -bottom-5 size-52 -rotate-12 text-white/[.07]" strokeWidth={1} aria-hidden="true" />}
            <div className="relative mb-5 flex items-center justify-between gap-3">
              <span className={`inline-flex items-center gap-2 text-xs font-bold ${ranking ? "text-[#edc36c]" : "text-brand"}`}><Icon className="size-4 shrink-0" strokeWidth={1.5} aria-hidden="true" /><span className="leading-snug">{medalCount ? `${medalCount} ${ar ? (medalCount === 1 ? "ميدالية" : "ميداليات") : (medalCount === 1 ? "medal" : "medals")}` : ranking ? (ar ? "على مستوى المملكة" : "NATIONAL RECOGNITION") : (ar ? "جائزة وتميّز" : "AWARD & RECOGNITION")}</span></span>
              <span className={`text-xs tabular-nums ${ranking ? "text-white/60" : "text-muted-foreground"}`} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            </div>
            <h4 className={`relative max-w-[28ch] text-xl leading-[1.7] font-black ${ranking ? "sm:text-3xl" : "sm:text-[1.375rem]"}`}>{achievement.title[language]}</h4>
            {(medalCount > 0 || ranking) && <p className={`relative mt-2 text-sm leading-7 ${ranking ? "text-white/80" : "text-muted-foreground"}`}>{achievement.detail[language]}</p>}
            {medalCount ? <div className="mt-auto pt-7">
              <div className="flex items-start gap-1 border-t border-border pt-5 sm:gap-1.5" role="img" aria-label={achievement.detail[language]} data-medal-row>
                {medalTypes.flatMap((type) => Array.from({ length: achievement.medals?.[type] ?? 0 }, (_, medalIndex) => <Medal key={`${type}-${medalIndex}`} type={type} className="h-auto w-9 min-w-0 shrink" />))}
              </div>
            </div> : <div className={`relative mt-auto flex items-center gap-3 pt-7 ${ranking ? "text-[#edc36c]" : "text-brand"}`}>
              {ranking ? <><strong className="text-6xl leading-none font-black tabular-nums">6</strong><span className="text-sm font-bold">{ar ? "المركز السادس" : "6th place"}</span></> : <><Icon className="size-10 shrink-0" strokeWidth={1.2} aria-hidden="true" /><span className="text-sm leading-snug font-bold">{achievement.distinction === "students" ? (ar ? "طالبان من مدارس المعالي" : "Two Maali students") : (ar ? "على مستوى الطائف" : "Across Taif")}</span></>}
            </div>}
          </Reveal>;
        })}
      </div>
    </div>
  </section>;
}
