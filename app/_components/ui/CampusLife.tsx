"use client";

import Image from "next/image";
import { BookOpen, Bus, FlaskConical, Drama, Utensils, Trophy, Building2, Palette, HeartHandshake, Map, Sparkles } from "lucide-react";
import { useUi } from "../providers/UiProvider";
import SectionIntro from "./SectionIntro";
import Reveal from "./Reveal";

const facilities = [
  { Icon: FlaskConical, ar: "المعامل", en: "Laboratories", detail: { ar: "للتجربة والاستكشاف وربط المعرفة بالتطبيق.", en: "Spaces to experiment, explore and put knowledge into practice." } },
  { Icon: BookOpen, ar: "المكتبة", en: "Library", detail: { ar: "مساحة للقراءة والبحث وتوسيع الآفاق.", en: "A space for reading, research and new perspectives." } },
  { Icon: Trophy, ar: "الملاعب", en: "Sports pitches", detail: { ar: "حركة وتعاون وروح رياضية داخل اليوم الدراسي.", en: "Movement, teamwork and sportsmanship throughout school life." } },
  { Icon: Drama, ar: "المسرح", en: "Theatre", detail: { ar: "منصة للتعبير عن المواهب وبناء الثقة.", en: "A stage for self-expression, talent and confidence." } },
  { Icon: Bus, ar: "النقل المدرسي", en: "School transport", detail: { ar: "استفسر عن المسارات المتاحة لفرعك ومنطقتك.", en: "Ask our team about routes serving your campus and area." } },
  { Icon: Utensils, ar: "المقصف", en: "Canteen", detail: { ar: "خدمة يومية ضمن مرافق الحياة المدرسية.", en: "An everyday service within our school community." } },
];
const activities = [
  { Icon: Palette, ar: "الموهبة والإبداع", en: "Talent & creativity", detail: { ar: "أنشطة لاصفية تفسح المجال للتعبير والفنون وتنمية المهارات.", en: "Co-curricular activities for expression, arts and developing skills." } },
  { Icon: Trophy, ar: "المسابقات والتحديات", en: "Competitions & challenges", detail: { ar: "فرص للتعلم والمنافسة، من المهارات الأدبية إلى الأولمبياد.", en: "Opportunities to learn and compete, from literary skills to Olympiads." } },
  { Icon: Map, ar: "الرحلات التعليمية", en: "Learning journeys", detail: { ar: "تعلم يتجاوز الفصل، ويصل المعرفة بالعالم من حولنا.", en: "Learning beyond the classroom that connects knowledge with the world." } },
  { Icon: HeartHandshake, ar: "المبادرات المجتمعية", en: "Community initiatives", detail: { ar: "مشاركة تنمّي المسؤولية وروح التعاون والانتماء.", en: "Participation that develops responsibility, collaboration and belonging." } },
];

export default function CampusLife() {
  const { language } = useUi();
  const ar = language === "ar";
  return <>
    <section id="facilities" aria-labelledby="facilities-title" className="scroll-mt-20 bg-[#f7f6f1] py-20 dark:bg-card sm:py-28"><div className="mx-auto max-w-7xl px-5 sm:px-8">
      <SectionIntro id="facilities-title" Icon={Building2} eyebrow={ar ? "مرافق المدرسة" : "OUR CAMPUS"} title={ar ? "مساحة لكل تجربة." : "Room for every experience."} description={ar ? "تعرّف على مرافق الحياة المدرسية، ونسّق زيارة للتعرف على تجهيزات الفرع الذي يناسب أبناءك." : "Explore school life and arrange a visit to see the facilities at your preferred campus."} />
      <div className="grid items-start gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
        <Reveal className="relative overflow-hidden rounded-t-[8rem] lg:sticky lg:top-28"><Image src="/campus/campus-17.webp" alt={ar ? "ملعب مدارس المعالي" : "Maali Schools sports pitch"} width={576} height={720} sizes="(min-width:1024px) 480px, 90vw" className="aspect-[4/5] max-h-[36rem] w-full object-cover" /></Reveal>
        <div className="grid gap-x-8 sm:grid-cols-2">{facilities.map(({ Icon, ar: nameAr, en, detail }, index) => <Reveal key={en} delay={(index % 2) * 80} className="border-t border-brand/20 py-7"><div className="mb-5 flex items-center justify-between"><Icon className="size-8 text-brand" strokeWidth={1.4} aria-hidden="true" /><span className="text-xs text-muted-foreground" aria-hidden="true">0{index + 1}</span></div><h3 className="text-xl font-black">{ar ? nameAr : en}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{detail[language]}</p></Reveal>)}</div>
      </div>
    </div></section>
    <section id="activities" aria-labelledby="activities-title" className="scroll-mt-20 bg-[#173f3a] py-20 text-white sm:py-28"><div className="mx-auto max-w-7xl px-5 sm:px-8">
      <Reveal className="mb-12 max-w-3xl"><p className="mb-5 flex items-center gap-3 text-sm font-bold text-[#edc36c]"><Sparkles className="size-7 shrink-0" aria-hidden="true" /><span>{ar ? "الأنشطة والبرامج" : "BEYOND THE CLASSROOM"}</span></p><h2 id="activities-title" className="text-3xl leading-[1.6] font-black sm:text-5xl">{ar ? "هنا يكتشف كل طالب شغفه." : "Where every student discovers a passion."}</h2></Reveal>
      <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">{activities.map(({ Icon, ar: nameAr, en, detail }, index) => <Reveal key={en} delay={index * 50} className="border-t border-white/20 pt-6"><div className="mb-8 flex items-center justify-between"><Icon className="size-9 text-[#edc36c]" strokeWidth={1.3} aria-hidden="true" /><span className="text-xs text-white/50" aria-hidden="true">0{index + 1}</span></div><h3 className="text-xl leading-relaxed font-black">{ar ? nameAr : en}</h3><p className="mt-4 text-sm leading-8 text-white/70">{detail[language]}</p></Reveal>)}</div>
      <a href="#achievements" className="mt-10 inline-flex min-h-11 items-center text-sm font-bold text-[#edc36c] underline underline-offset-8">{ar ? "شاهد ثمار المشاركة في إنجازات طلابنا" : "See the achievements our students have earned"}</a>
    </div></section>
  </>;
}
