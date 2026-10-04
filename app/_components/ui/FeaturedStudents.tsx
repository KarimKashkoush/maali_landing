"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { GraduationCap, Medal, Sparkles } from "lucide-react";
import { featuredStudents, studentStages } from "@/lib/home-content";
import { useUi } from "../providers/UiProvider";
import Reveal from "./Reveal";

export default function FeaturedStudents() {
  const { language } = useUi();
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const stage = studentStages[active];
  const onKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "Home") next = 0;
    else if (event.key === "End") next = studentStages.length - 1;
    else if (event.key === "ArrowRight") next = (index + (language === "ar" ? 3 : 1)) % 4;
    else if (event.key === "ArrowLeft") next = (index + (language === "ar" ? 1 : 3)) % 4;
    else return;
    event.preventDefault(); setActive(next); tabs.current[next]?.focus();
  };

  return (
    <section id="students" aria-labelledby="students-title" className="scroll-mt-20 bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-4 flex items-center gap-2 text-sm font-bold text-brand"><Sparkles className="size-4" />{language === "ar" ? "نفخر بهم" : "OUR PRIDE"}</p>
            <h2 id="students-title" className="text-3xl leading-[1.6] font-black sm:text-5xl">{language === "ar" ? "طلاب يصنعون التميّز" : "Students who shine"}</h2>
            <p className="mt-4 max-w-xl leading-8 text-muted-foreground">{language === "ar" ? "نحتفي بالاجتهاد والطموح في كل مرحلة من رحلة التعلم." : "Celebrating dedication and ambition at every stage of learning."}</p>
          </div>
          <p className="max-w-xs text-xs leading-6 text-muted-foreground">{language === "ar" ? "الأسماء والترتيب بيانات تجريبية للعرض فقط." : "Names and rankings are fictional preview data."}</p>
        </Reveal>
        <div role="tablist" aria-label={language === "ar" ? "المراحل التعليمية" : "School stages"} className="mt-10 flex flex-wrap gap-2 border-b border-border pb-5">
          {studentStages.map((item, index) => <button key={item.id} ref={(node) => { tabs.current[index] = node; }} id={`stage-tab-${item.id}`} role="tab" aria-selected={active === index} aria-controls="students-panel" tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={(event) => onKey(event, index)} className={`cursor-pointer rounded-full px-5 py-2.5 text-sm font-bold transition-colors ${active === index ? "bg-brand-solid text-white" : "bg-muted text-foreground hover:bg-brand/10"}`}>{item.name[language]}</button>)}
        </div>
        <div id="students-panel" role="tabpanel" aria-labelledby={`stage-tab-${stage.id}`} tabIndex={0} className="mt-9 grid gap-5 focus-visible:outline-brand sm:grid-cols-3">
          {featuredStudents[stage.id].map((student) => (
            <Reveal as="article" key={`${stage.id}-${student.rank}`} delay={(student.rank - 1) * 80} className="group overflow-hidden rounded-[1.5rem] border border-border bg-card">
              <div className={`relative flex h-40 items-end justify-between overflow-hidden px-6 pb-5 ${student.rank === 1 ? "bg-[#ece8d9]" : student.rank === 2 ? "bg-[#e4eeeb]" : "bg-[#f2e5db]"}`}>
                <span className="font-black text-7xl leading-none text-[#1c5954]/20" aria-hidden="true">0{student.rank}</span>
                <GraduationCap className="size-12 text-[#1c5954]/60" strokeWidth={1.2} aria-hidden="true" />
                <span className="absolute top-4 start-4 flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm font-black text-[#1c5954]"><Medal className="size-4 text-[#a67620]" />{language === "ar" ? `المركز ${student.rank}` : `Rank ${student.rank}`}</span>
              </div>
              <div className="p-6">
                <p className="text-xs font-bold text-brand">{stage.name[language]}</p>
                <h3 className="mt-2 text-xl font-black">{student.name?.[language] ?? (language === "ar" ? "اسم الطالب" : "Student name")}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{student.achievement?.[language] ?? (language === "ar" ? "طموح اليوم، وإلهام الغد." : "Today's ambition. Tomorrow's inspiration.")}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
