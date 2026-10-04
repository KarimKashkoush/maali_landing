"use client";

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
  return <section id="achievements" aria-labelledby="achievements-title" className="scroll-mt-20 bg-[#f5f2e9] py-20 text-[#153f3b] sm:py-28 dark:bg-[#102c29] dark:text-white">
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <Reveal>
          <p className="mb-4 flex items-center gap-3 text-sm font-bold"><span className="h-px w-9 bg-[#a87925]" />{ar ? "حصاد العام الماضي" : "LAST YEAR'S HIGHLIGHTS"}</p>
          <h2 id="achievements-title" className="max-w-[18ch] text-4xl leading-[1.6] font-black text-balance sm:text-5xl">{ar ? "إنجازات تُلهم، وطموح لا يتوقف." : "Achievements that inspire. Ambition without limits."}</h2>
          <p className="mt-5 max-w-lg text-base leading-8 opacity-75">{ar ? "من منصات التتويج إلى ساحات المنافسة، نحتفي بإنجازات طلابنا التي صنعت عامًا نفخر به." : "From competition halls to award podiums, we celebrate the students who made it a year to remember."}</p>
        </Reveal>
        <Reveal delay={100} className="relative overflow-hidden rounded-[1.75rem] bg-[#163f3a] p-7 text-white sm:p-10">
          <Trophy className="pointer-events-none absolute -end-6 top-3 size-40 rotate-12 text-white/[.035]" strokeWidth={1} aria-hidden="true" />
          <p className="relative text-sm text-white/75">{ar ? "إجمالي ميداليات العام الماضي" : "TOTAL MEDALS LAST YEAR"}</p>
          <div className="relative mt-4 flex items-baseline gap-4"><strong data-medal-total className="text-[clamp(5rem,12vw,8rem)] leading-none font-black tabular-nums text-[#edc36c]">{totalMedals}</strong><span className="text-xl font-bold">{ar ? "ميدالية" : "medals"}</span></div>
          <ul className="mt-7 grid grid-cols-4 gap-2 border-t border-white/15 pt-6">
            {medalTypes.map((type) => <li key={type} className="flex flex-col items-center gap-2 text-center"><Medal type={type} className="h-12 w-9" /><span className="text-sm font-bold">{medalsByType[type]} {medalLabels[type][language]}</span></li>)}
          </ul>
          <p className="mt-5 text-xs leading-6 text-white/65">{ar ? "المجموع للميداليات فقط؛ الجوائز والمراكز مذكورة بشكل مستقل أدناه." : "Medals only. Awards and rankings are listed separately below."}</p>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {schoolAchievements.map((achievement, index) => {
          const medalCount = countMedals(achievement.medals);
          const Icon = achievement.distinction === "students" ? ShieldCheck : achievement.distinction === "ranking" ? Trophy : Award;
          return <Reveal as="article" key={achievement.id} delay={(index % 2) * 90} data-achievement={achievement.id} className="relative flex flex-col rounded-2xl border border-[#153f3b]/10 bg-white p-6 sm:p-8 dark:border-white/10 dark:bg-[#193c36]">
            <div className="mb-4 flex items-center justify-between gap-3"><span className="text-xs tabular-nums opacity-45" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><span className="rounded-full bg-[#f5f2e9] px-3 py-1.5 text-xs font-bold text-[#745015] dark:bg-white/10 dark:text-[#edc36c]">{medalCount ? `${medalCount} ${ar ? (medalCount === 1 ? "ميدالية" : "ميداليات") : (medalCount === 1 ? "medal" : "medals")}` : achievement.distinction === "ranking" ? (ar ? "مركز على مستوى المملكة" : "NATIONAL RANKING") : (ar ? "جائزة وتميّز" : "AWARD & RECOGNITION")}</span></div>
            <h3 className="text-xl leading-[1.7] font-black sm:text-2xl">{achievement.title[language]}</h3>
            <p className="mt-2 text-sm leading-7 opacity-70">{achievement.detail[language]}</p>
            {medalCount ? <div className="mt-6 border-t border-current/10 pt-5">
              <div className="flex flex-wrap gap-2" role="img" aria-label={achievement.detail[language]} data-medal-row>
                {medalTypes.flatMap((type) => Array.from({ length: achievement.medals?.[type] ?? 0 }, (_, medalIndex) => <Medal key={`${type}-${medalIndex}`} type={type} />))}
              </div>
            </div> : <div className="mt-auto flex items-center gap-4 pt-7 text-[#a87925] dark:text-[#edc36c]"><Icon className="size-11" strokeWidth={1.3} aria-hidden="true" />{achievement.distinction === "ranking" && <span className="text-3xl font-black">{ar ? "المركز 6" : "6th place"}</span>}{achievement.distinction === "students" && <span className="text-xl font-black">{ar ? "2 طلاب" : "2 students"}</span>}</div>}
          </Reveal>;
        })}
      </div>
    </div>
  </section>;
}
