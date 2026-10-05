"use client";

import DeferredImage from "./DeferredImage";
import { Compass, Eye, Target } from "lucide-react";
import { schoolValues } from "@/lib/school-site-content";
import { useUi } from "../providers/UiProvider";
import SectionIntro from "./SectionIntro";
import Reveal from "./Reveal";

export default function SchoolOverview() {
  const { language } = useUi();
  const ar = language === "ar";
  return <section id="overview" aria-labelledby="overview-title" className="scroll-mt-20 bg-background py-20 sm:py-28">
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_.9fr] lg:gap-20">
        <div>
          <SectionIntro id="overview-title" Icon={Compass} eyebrow={ar ? "عن المعالي" : "ABOUT MAALI"} title={ar ? "تعليم يبني المعرفة، ويصنع الشخصية." : "Learning that builds knowledge and character."} description={ar ? "أكثر من 30 سنة من الخبرة في التعليم. في مدارس المعالي الإبداعية الأهلية، نرافق أبناءنا في مسارات وطنية وعالمية، ونربط المعرفة بالتجربة، والنجاح بالقيم." : "Over 30 years of educational experience. At Maali Creative Schools, our national and international pathways connect knowledge with experience and achievement with values."} />
          <div className="grid gap-5 sm:grid-cols-2">
            {[{ Icon: Eye, title: ar ? "رؤيتنا" : "Our vision", text: ar ? "جيل يفكر بوعي، يفهم عالمه، ويشارك بثقة في بناء مستقبله." : "A thoughtful generation that understands its world and confidently shapes its future." }, { Icon: Target, title: ar ? "رسالتنا" : "Our mission", text: ar ? "تعلم نشط ينمّي التفكير واللغة والمهارات، ويجمع إلهام المعلم مع أدوات المعرفة والتقنية." : "Active learning that develops thinking, language and skills through inspiring teachers and purposeful technology." }].map(({ Icon, title, text }) => <Reveal key={title} className="border-s-2 border-gold ps-5"><h3 className="flex items-center gap-2 text-lg font-black text-brand"><Icon className="size-5 shrink-0" aria-hidden="true" /><span>{title}</span></h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{text}</p></Reveal>)}
          </div>
        </div>
        <Reveal className="relative mx-auto w-full max-w-md overflow-hidden rounded-t-[12rem] rounded-b-2xl bg-muted ring-1 ring-brand/10 ring-offset-8 ring-offset-background">
          <DeferredImage frameClassName="aspect-[4/5] w-full" src="/campus/campus-15.webp" alt={ar ? "الساحة الداخلية لمدارس المعالي" : "Maali Schools' indoor courtyard"} width={576} height={720} sizes="(min-width: 498px) 448px, calc(100vw - 40px)" quality={60} className="aspect-[4/5] w-full object-cover" />
        </Reveal>
      </div>
      <div className="mt-16 border-t border-border pt-8"><h3 className="mb-7 text-sm font-bold text-muted-foreground">{ar ? "قيم نحيا بها كل يوم" : "VALUES WE LIVE EVERY DAY"}</h3><ul className="grid grid-cols-2 gap-y-7 sm:grid-cols-3 lg:grid-cols-6">{schoolValues.map((value, index) => <li key={value.en} className="border-s border-brand/20 ps-4"><span className="mb-2 block text-xs text-[#8a641f] dark:text-[#edc36c]" aria-hidden="true">0{index + 1}</span><span className="text-lg font-black text-brand">{value[language]}</span></li>)}</ul></div>
    </div>
  </section>;
}
