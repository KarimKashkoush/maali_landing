"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Images, Newspaper, Play } from "lucide-react";
import { campusPhotos, schoolNews } from "@/lib/school-site-content";
import { schoolVideo } from "@/lib/school-video";
import { useUi } from "../providers/UiProvider";
import SectionIntro from "./SectionIntro";
import Reveal from "./Reveal";

export default function SchoolMedia() {
  const { language } = useUi();
  const ar = language === "ar";
  const [playVideo, setPlayVideo] = useState(false);
  return <>
    <section id="gallery" aria-labelledby="gallery-title" className="scroll-mt-20 bg-muted/40 py-20 sm:py-28"><div className="mx-auto max-w-7xl px-5 sm:px-8">
      <div className="flex flex-wrap items-start justify-between gap-4"><SectionIntro id="gallery-title" Icon={Images} eyebrow={ar ? "من داخل المعالي" : "INSIDE MAALI"} title={ar ? "صور تحكي المكان." : "A window into our school."} /></div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-7 lg:grid-cols-3 lg:pb-10">{campusPhotos.map((photo, index) => <div key={photo.id} className={index % 3 === 1 ? "lg:pt-12" : ""}><Reveal delay={(index % 3) * 70}>
        <a href={`/campus/campus-${photo.id}.webp`} target="_blank" rel="noopener noreferrer" aria-label={`${ar ? "افتح الصورة:" : "Open image:"} ${photo[language]}`} className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"><div className="overflow-hidden rounded-t-[3rem] rounded-b-lg sm:rounded-t-[5rem]"><Image src={`/campus/campus-${photo.id}.webp`} alt={photo[language]} width={576} height={720} sizes="(min-width:1024px) 380px, 45vw" className="aspect-[4/5] w-full object-cover transition-transform duration-700 motion-safe:group-hover:scale-[1.035]" /></div><span className="flex items-center justify-between gap-3 border-b border-border py-4 text-xs leading-6 font-bold sm:text-sm"><span>{photo[language]}</span><ArrowUpRight className="size-4 shrink-0 text-brand" aria-hidden="true" /></span></a>
      </Reveal></div>)}</div>
      <div className="mt-6 overflow-hidden rounded-2xl bg-[#102e2b] p-5 text-white sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-5"><div><h3 className="text-xl font-black">{ar ? "جولة في مدارس المعالي" : "A tour of Maali Schools"}</h3><p className="mt-2 text-sm leading-7 text-white/75">{ar ? "شاهد الفيديو مع أدوات التحكم، في الوقت المناسب لك." : "Watch the school film with playback controls, at your own pace."}</p></div><button type="button" aria-expanded={playVideo} aria-controls="gallery-video" onClick={() => setPlayVideo((value) => !value)} className="inline-flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-white/25 px-5 text-sm font-bold"><Play className="size-4 shrink-0" aria-hidden="true" /><span>{ar ? (playVideo ? "إغلاق الفيديو" : "شاهد الفيديو") : (playVideo ? "Close video" : "Watch the film")}</span></button></div>
        <div id="gallery-video">{playVideo && <video src={schoolVideo.source} poster={schoolVideo.poster} controls playsInline preload="none" aria-label={ar ? "جولة مدارس المعالي بدون صوت" : "Silent Maali Schools tour"} className="mx-auto mt-6 aspect-video w-full max-w-4xl rounded-xl" />}</div>
      </div>
    </div></section>
    <section id="news" aria-labelledby="news-title" className="scroll-mt-20 bg-background py-20 sm:py-28"><div className="mx-auto max-w-7xl px-5 sm:px-8">
      <div className="flex flex-wrap items-start justify-between gap-4"><SectionIntro id="news-title" Icon={Newspaper} eyebrow={ar ? "أخبار المعالي" : "MAALI NEWS"} title={ar ? "من يومياتنا وإنجازاتنا." : "Stories worth sharing."} /></div>
      <div className="grid gap-x-10 gap-y-8 lg:grid-cols-[1.15fr_1fr]">{schoolNews.map((item, index) => <Reveal key={item.id} className={index === 0 ? "lg:row-span-2" : "grid items-start gap-5 border-t border-border pt-6 sm:grid-cols-[.7fr_1fr]"}><Image src={`/news/news-${item.id}.webp`} alt="" width={640} height={420} sizes={index === 0 ? "(min-width:1024px) 640px, 90vw" : "(min-width:640px) 240px, 90vw"} className={`w-full rounded-xl bg-muted object-contain ${index === 0 ? "aspect-video" : "aspect-[4/3]"}`} /><div className={index === 0 ? "pt-6" : ""}><time dateTime={item.date} className="text-xs font-bold text-muted-foreground">{new Intl.DateTimeFormat(ar ? "ar-SA" : "en-GB", { calendar: "gregory", timeZone: "UTC", year: "numeric", month: "long", day: "numeric" }).format(new Date(`${item.date}T00:00:00Z`))}</time><h3 className={`mt-3 leading-[1.7] font-black ${index === 0 ? "text-2xl sm:text-3xl" : "text-lg"}`}>{item.title[language]}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{item.summary[language]}</p></div></Reveal>)}</div>
    </div></section>
  </>;
}
