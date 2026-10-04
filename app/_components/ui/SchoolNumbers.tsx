"use client";

import { useEffect, useRef } from "react";
import { schoolStats } from "@/lib/home-content";
import { useUi } from "../providers/UiProvider";
import Reveal from "./Reveal";

const formatter = new Intl.NumberFormat("en-US");

export default function SchoolNumbers() {
  const { language } = useUi();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const nodes = Array.from(section.querySelectorAll<HTMLElement>("[data-count]"));
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const running = new Map<HTMLElement, number>();
    let frame = 0;
    const finish = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      running.clear();
      nodes.forEach((node) => { node.textContent = formatter.format(Number(node.dataset.count)); });
    };
    const tick = (time: number) => {
      running.forEach((start, node) => {
        const progress = Math.min((time - start) / 1600, 1);
        const value = Number(node.dataset.count);
        node.textContent = formatter.format(Math.round(value * (1 - (1 - progress) ** 3)));
        if (progress === 1) running.delete(node);
      });
      frame = running.size ? requestAnimationFrame(tick) : 0;
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const node = entry.target as HTMLElement;
        observer.unobserve(node);
        if (motion.matches) node.textContent = formatter.format(Number(node.dataset.count));
        else {
          running.set(node, performance.now());
          if (!frame) frame = requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.6 });
    nodes.forEach((node) => {
      if (!motion.matches) node.textContent = "0";
      observer.observe(node);
    });
    const onMotion = () => { if (motion.matches) finish(); };
    motion.addEventListener("change", onMotion);
    return () => { observer.disconnect(); motion.removeEventListener("change", onMotion); finish(); };
  }, []);

  const number = (index: number, featured = false) => {
    const stat = schoolStats[index];
    return <>
      <span className="sr-only">+{formatter.format(stat.value)}{"percent" in stat ? "%" : ""}</span>
      <div aria-hidden="true" dir="ltr" className={`flex items-baseline gap-1.5 font-black text-brand tabular-nums ${language === "ar" ? "justify-end" : "justify-start"} ${featured ? "text-[clamp(5rem,12vw,10rem)] leading-none" : "text-[clamp(2rem,6vw,5.2rem)] leading-[1.15]"}`}>
        <span className="text-[.5em] text-[#93651c] dark:text-[#d6aa48]">+</span>
        <span data-count={stat.value} className="inline-block" style={{ minWidth: `${formatter.format(stat.value).length * 0.58}ch` }}>{formatter.format(stat.value)}</span>
        {"percent" in stat && <span className="text-[.5em] text-[#93651c] dark:text-[#d6aa48]">%</span>}
      </div>
      <p className={`${featured ? "mt-3 text-xl" : "mt-4 text-base sm:text-lg"} font-bold text-foreground`}>{stat.unit[language]}</p>
      <p className="mt-2 text-sm leading-7 text-muted-foreground">{stat.description[language]}</p>
    </>;
  };

  return (
    <section id="about" ref={sectionRef} aria-labelledby="numbers-title" className="relative scroll-mt-20 overflow-hidden bg-[#f6f5f0] py-20 text-foreground sm:py-28 dark:bg-card">
      <div aria-hidden="true" className="pointer-events-none absolute -top-32 -start-40 size-[34rem] rounded-full bg-[#d6aa48]/6 blur-[80px]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-12 border-b border-border pb-14 md:grid-cols-[1.3fr_1fr] md:gap-20">
          <Reveal>
            <p className="mb-5 flex items-center gap-3 text-sm font-bold text-brand"><span className="size-1.5 rounded-full bg-current" />{language === "ar" ? "المعالي بالأرقام" : "MAALI IN NUMBERS"}</p>
            <h2 id="numbers-title" className="max-w-[20ch] text-3xl leading-[1.6] font-black text-balance sm:text-5xl">{language === "ar" ? "خبرة ممتدة، وأثر يكبر كل يوم." : "Years of experience. An impact that keeps growing."}</h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground">{language === "ar" ? "وراء كل رقم طالب نؤمن به، ومعلم يلهمه، وأسرة تشاركنا طموحه." : "Behind every number is a student we believe in, an inspiring teacher and a family sharing their ambition."}</p>
          </Reveal>
          <Reveal delay={100} className="border-s border-border ps-7 sm:ps-12">{number(0, true)}</Reveal>
        </div>
        <div className="grid grid-cols-2 gap-x-5 gap-y-12 pt-14 md:grid-cols-3 md:gap-x-12 md:gap-y-16">
          {schoolStats.slice(1).map((stat, index) => <Reveal key={stat.value + stat.unit.en} delay={(index % 3) * 70} className="min-w-0 border-s border-border ps-4 sm:ps-6">{number(index + 1)}</Reveal>)}
        </div>
      </div>
    </section>
  );
}
