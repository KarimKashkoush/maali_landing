"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, Check, Compass, Globe2, GraduationCap, School, Sprout } from "lucide-react";
import { schoolGroups, schools } from "@/lib/schools";
import { schoolHighlights } from "@/lib/school-highlights";
import { useUi } from "../providers/UiProvider";
import Reveal from "./Reveal";

const stageArtwork = {
  kindergarten: { Icon: Sprout, color: "bg-[#e5efeb] text-[#1c5954]" },
  primary: { Icon: BookOpen, color: "bg-[#f4ead8] text-[#8a601b]" },
  middle: { Icon: Compass, color: "bg-[#e8ecf0] text-[#405b70]" },
  secondary: { Icon: GraduationCap, color: "bg-[#f3e5dc] text-[#a04b21]" },
};

export default function EducationStages() {
  const { language } = useUi();
  const ar = language === "ar";
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const Arrow = ar ? ArrowLeft : ArrowRight;

  const onTabKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "Home") next = 0;
    else if (event.key === "End") next = schoolGroups.length - 1;
    else if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      const direction = event.key === "ArrowRight" ? (ar ? -1 : 1) : (ar ? 1 : -1);
      next = (index + direction + schoolGroups.length) % schoolGroups.length;
    } else return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return <section id="education" aria-labelledby="education-title" className="scroll-mt-20 bg-background py-20 sm:py-28">
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <Reveal className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end lg:gap-16">
        <div className="max-w-2xl">
          <p className="mb-5 inline-flex items-center gap-2.5 text-sm font-bold text-brand"><School className="size-6 shrink-0" strokeWidth={1.6} aria-hidden="true" /><span className="leading-none">{ar ? "مراحلنا التعليمية" : "OUR LEARNING PATHWAYS"}</span></p>
          <h2 id="education-title" className="text-3xl leading-[1.6] font-black text-balance sm:text-5xl">{ar ? "رحلة تعلّم " : "A learning journey "}<span className="text-brand">{ar ? "تنمو مع أبنائكم." : "that grows with your child."}</span></h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">{ar ? "مساران تعليميان، ومراحل متكاملة. اكتشفوا المدرسة التي تناسب رحلة أبنائكم، وتعرّفوا على عالمها وفعالياتها." : "Two learning pathways across every stage. Discover the school that suits your child's journey and explore its stories and activities."}</p>
        </div>
        <div className="flex w-fit shrink-0 items-center gap-5 border-s-2 border-gold ps-5 text-brand">
          <span className="text-5xl leading-none font-black tabular-nums" aria-hidden="true">{String(schools.length).padStart(2, "0")}</span>
          <p className="text-sm leading-7 font-bold"><span className="sr-only">{schools.length} </span>{ar ? "مدارس، لكل مرحلة حكايتها" : "schools, each with its own story"}<span className="block text-xs font-normal text-muted-foreground">{ar ? "الوطني بنين · العالمي" : "National — Boys · International"}</span></p>
        </div>
      </Reveal>

      <div role="tablist" aria-label={ar ? "اختر المسار التعليمي" : "Choose a learning pathway"} className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4">
        {schoolGroups.map((group, index) => {
          const selected = active === index;
          const Icon = group.id === "national" ? School : Globe2;
          const count = schools.filter((school) => school.group === group.id).length;
          return <button key={group.id} ref={(node) => { tabs.current[index] = node; }} type="button" role="tab" id={`education-tab-${group.id}`} aria-selected={selected} aria-controls={`education-panel-${group.id}`} tabIndex={selected ? 0 : -1} onClick={() => setActive(index)} onKeyDown={(event) => onTabKey(event, index)} className={`relative flex min-w-0 cursor-pointer flex-col items-start gap-3 rounded-2xl border p-4 text-start transition-colors duration-200 motion-reduce:transition-none sm:flex-row sm:items-center sm:gap-4 sm:p-6 ${selected ? "border-brand-solid bg-brand-solid text-white" : "border-border bg-muted/45 text-foreground hover:border-brand/40"}`}>
            <span className={`grid size-10 shrink-0 place-items-center rounded-xl sm:size-12 ${selected ? "bg-white/10 text-[#edc36c]" : "bg-background text-brand"}`}><Icon className="size-6" strokeWidth={1.5} aria-hidden="true" /></span>
            <span className="min-w-0 flex-1"><span className="block text-base leading-[1.6] font-black sm:text-xl">{ar ? (group.id === "national" ? "المنهج الوطني — بنين" : "المنهج العالمي") : (group.id === "national" ? "National — Boys" : "International")}</span><span className={`mt-1 block text-xs leading-relaxed sm:text-sm ${selected ? "text-white/75" : "text-muted-foreground"}`}>{ar ? `${count} مراحل تعليمية` : `${count} educational stages`}</span></span>
            <span className={`absolute top-4 end-4 grid size-5 shrink-0 place-items-center rounded-full border sm:static sm:size-6 ${selected ? "border-[#edc36c] bg-[#edc36c] text-[#153f3b]" : "border-border"}`} aria-hidden="true">{selected && <Check className="size-3.5" strokeWidth={2.5} />}</span>
          </button>;
        })}
      </div>

      {schoolGroups.map((group, groupIndex) => {
        const groupSchools = schools.filter((school) => school.group === group.id);
        return <div key={group.id} id={`education-panel-${group.id}`} role="tabpanel" aria-labelledby={`education-tab-${group.id}`} hidden={active !== groupIndex} tabIndex={0} className="pt-7 outline-offset-8 sm:pt-9">
          <p className="mb-6 text-sm leading-7 text-muted-foreground sm:mb-8 sm:text-base">{group.description[language]}</p>
          <div className={`grid gap-5 md:grid-cols-2 ${groupSchools.length === 3 ? "xl:grid-cols-3" : "xl:grid-cols-4"}`}>
            {groupSchools.map((school, index) => {
              const stage = school.slug.split("-").at(-1) as keyof typeof stageArtwork;
              const { Icon, color } = stageArtwork[stage];
              return <Reveal as="article" key={school.slug} delay={index * 60} data-education-school={school.slug} className="group relative flex min-w-0 flex-col border-t-2 border-brand/35 bg-muted/35 p-5 transition-colors duration-300 hover:bg-brand-soft motion-reduce:transition-none sm:p-7">
                <div className="mb-7 flex items-center justify-between gap-3">
                  <span className={`grid size-14 shrink-0 place-items-center rounded-2xl ${color}`}><Icon className="size-7" strokeWidth={1.5} aria-hidden="true" /></span>
                  <span className="text-4xl leading-none font-black tabular-nums text-brand/15" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <p className="mb-2 text-xs leading-relaxed font-bold text-brand">{school.level[language]}</p>
                <h3 className="text-xl leading-[1.6] font-black text-balance sm:text-2xl">{school.title[language]}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{school.description[language]}</p>
                <ul className="mt-6 mb-8 space-y-3 border-t border-border pt-5 text-xs font-bold sm:text-sm">
                  {schoolHighlights[school.slug].map((highlight) => <li key={highlight.en} className="flex items-center gap-2.5"><Check className="size-4 shrink-0 text-brand" strokeWidth={1.8} aria-hidden="true" /><span className="leading-snug">{highlight[language]}</span></li>)}
                </ul>
                <Link href={`/schools/${school.slug}`} prefetch={false} aria-label={ar ? `اكتشف ${school.title.ar}` : `Explore ${school.title.en}`} className="mt-auto inline-flex min-h-12 items-center justify-between gap-3 rounded-xl bg-muted px-4 py-3 text-sm font-bold text-brand transition-colors hover:bg-brand-solid hover:text-white motion-reduce:transition-none"><span className="leading-snug">{ar ? "اكتشف المدرسة" : "Explore the school"}</span><Arrow className="size-5 shrink-0" aria-hidden="true" /></Link>
              </Reveal>;
            })}
          </div>
        </div>;
      })}
    </div>
  </section>;
}
