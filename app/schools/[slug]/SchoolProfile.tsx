"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarDays, MessageSquareText } from "lucide-react";
import schoolMark from "@/public/mini_logo_display.png";
import type { School } from "@/lib/schools";
import { useUi } from "@/app/_components/providers/UiProvider";

const labels = {
  ar: {
    back: "العودة للرئيسية",
    national: "القسم الوطني — بنين",
    international: "القسم العالمي",
    activities: "فعاليات المدرسة",
    activitiesDescription: "هنا ستجد أحدث الفعاليات والأنشطة الخاصة بهذه المدرسة.",
    stories: "حكايات من المدرسة",
    storiesDescription: "مساحة لحكايات الطلاب والمعلمين ولحظات التعلّم الملهمة.",
    comingSoon: "سيتم نشر المحتوى قريبًا",
  },
  en: {
    back: "Back to home",
    national: "National Section — Boys",
    international: "International Section",
    activities: "School activities",
    activitiesDescription: "The latest events and activities from this school will appear here.",
    stories: "Stories from school",
    storiesDescription: "A space for student, teacher, and inspiring learning stories.",
    comingSoon: "Content will be published soon",
  },
} as const;

export default function SchoolProfile({ school }: { school: School }) {
  const { language } = useUi();
  const text = labels[language];
  const Arrow = language === "ar" ? ArrowRight : ArrowLeft;

  return (
    <main className="min-h-dvh bg-background pt-20" dir={language === "ar" ? "rtl" : "ltr"}>
      <section className="relative overflow-hidden bg-[#1c5954] bg-[radial-gradient(circle_at_15%_20%,rgb(214_170_72_/_0.22),transparent_30%),radial-gradient(circle_at_88%_80%,rgb(177_78_0_/_0.18),transparent_28%)] px-5 py-[clamp(3rem,8vw,7rem)] text-white">
        <div className="mx-auto grid w-full max-w-[76rem] grid-cols-1 items-center gap-12 text-center md:grid-cols-[minmax(0,1.15fr)_minmax(14rem,.85fr)] md:text-start">
          <div>
            <Link href="/#home" className="mb-6 inline-flex items-center gap-2 text-[.85rem] font-extrabold text-white/68 md:mb-10 [&_svg]:size-4">
              <Arrow aria-hidden="true" />
              {text.back}
            </Link>
            <p className="text-[.82rem] font-black text-[#d6aa48]">
              {school.group === "national" ? text.national : text.international}
            </p>
            <h1 className="mx-auto mt-2.5 max-w-[13ch] text-[clamp(2.8rem,7vw,6rem)] leading-[1.08] font-black tracking-[-.045em] md:mx-0">
              {school.title[language]}
            </h1>
            <p className="mt-4 font-black text-[#c2c1b1]">{school.level[language]}</p>
            <p className="mx-auto mt-5 max-w-[38rem] text-[1.05rem] leading-[1.9] text-white/72 md:mx-0">{school.description[language]}</p>
          </div>
          <div className="order-first grid place-items-center md:order-none">
            <Image src={schoolMark} alt="" className="h-auto w-[min(45vw,11rem)] drop-shadow-[0_1.5rem_2.5rem_rgb(0_0_0_/_0.18)] md:w-[min(27vw,20rem)]" priority unoptimized />
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[76rem] grid-cols-1 gap-4 px-5 py-[clamp(3rem,7vw,6rem)] md:grid-cols-2">
        <article className="min-h-[19rem] rounded-[2rem] border border-border bg-card p-[clamp(1.5rem,3vw,2.5rem)] shadow-[0_1rem_3rem_rgb(0_0_0_/_0.06)]">
          <span className="grid size-13 place-items-center rounded-2xl bg-brand-soft text-brand [&_svg]:size-6"><CalendarDays aria-hidden="true" /></span>
          <h2 className="mt-6 text-2xl font-black">{text.activities}</h2>
          <p className="mt-3 leading-[1.8] text-muted-foreground">{text.activitiesDescription}</p>
          <small className="mt-8 inline-flex rounded-full bg-muted px-3 py-2 text-[.74rem] font-extrabold text-muted-foreground">{text.comingSoon}</small>
        </article>
        <article className="min-h-[19rem] rounded-[2rem] border border-border bg-card p-[clamp(1.5rem,3vw,2.5rem)] shadow-[0_1rem_3rem_rgb(0_0_0_/_0.06)]">
          <span className="grid size-13 place-items-center rounded-2xl bg-brand-soft text-brand [&_svg]:size-6"><MessageSquareText aria-hidden="true" /></span>
          <h2 className="mt-6 text-2xl font-black">{text.stories}</h2>
          <p className="mt-3 leading-[1.8] text-muted-foreground">{text.storiesDescription}</p>
          <small className="mt-8 inline-flex rounded-full bg-muted px-3 py-2 text-[.74rem] font-extrabold text-muted-foreground">{text.comingSoon}</small>
        </article>
      </section>
    </main>
  );
}
