"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUp, Clock3, MapPin, Phone } from "lucide-react";
import { useUi } from "../providers/UiProvider";
import SocialLinks from "../ui/SocialLinks";
import { schoolLinks } from "@/lib/school-site-content";

export default function Footer() {
  const { language, t } = useUi();
  const ar = language === "ar";
  const links = [
    { href: "#overview", ar: "عن المدرسة", en: "About Maali" },
    { href: "#education", ar: "مدارسنا ومراحلنا", en: "Our schools" },
    { href: "#admissions", ar: "القبول والتسجيل", en: "Admissions" },
    { href: "#news", ar: "الأخبار والفعاليات", en: "News & events" },
    { href: "#gallery", ar: "معرض الصور والفيديو", en: "Gallery" },
    { href: "#e-services", ar: "الخدمات الإلكترونية", en: "Digital services" },
    { href: "#faq", ar: "الأسئلة الشائعة", en: "FAQs" },
    { href: "#contact", ar: "تواصل معنا", en: "Contact" },
  ];
  return <footer className="relative bg-[#102e2b] px-5 pt-16 pb-6 text-white sm:px-8 sm:pt-20">
    <div className="mx-auto max-w-7xl">
      <div className="grid gap-12 pb-14 md:grid-cols-2 lg:grid-cols-[1.15fr_.8fr_1fr] lg:gap-16">
        <div>
          <Link href="/#home" prefetch={false} aria-label={t.schoolName} className="inline-block rounded-xl p-4"><Image src="/logo.png" alt={t.schoolName} width={280} height={86} sizes="240px" className="h-auto w-60 max-w-full brightness-0 invert" /></Link>
          <p className="mt-6 max-w-xs text-base leading-8 text-white/75">{ar ? "هنا تبدأ الحكاية، ويكبر الطموح. أكثر من 30 سنة من الخبرة في تعليم الأجيال." : "Where stories begin and ambition grows. Over 30 years of experience educating generations."}</p>
          <div className="mt-6"><SocialLinks align="start" /></div>
        </div>
        <nav aria-label={ar ? "روابط أسفل الصفحة" : "Footer navigation"}><h2 className="mb-6 text-base font-black text-[#edc36c]">{ar ? "روابط تهمّك" : "Quick links"}</h2><div className="grid grid-cols-2 gap-x-5 gap-y-2 text-sm">{links.map((link) => <Link key={link.href} href={`/${link.href}`} prefetch={false} className="inline-flex min-h-10 items-center leading-6 text-white/80 transition-colors hover:text-[#edc36c]">{link[language]}</Link>)}</div></nav>
        <div><h2 className="mb-6 text-base font-black text-[#edc36c]">{ar ? "نسعد بتواصلكم" : "Get in touch"}</h2><div className="space-y-5 text-sm">
          <a href="tel:920014984" className="flex min-h-11 items-center gap-4 text-white/85"><Phone className="size-5 shrink-0 text-[#edc36c]" aria-hidden="true" /><span dir="ltr" className="text-2xl font-bold tracking-wide">920014984</span></a>
          <div className="flex items-center gap-4"><Clock3 className="size-5 shrink-0 text-[#edc36c]" aria-hidden="true" /><div><p className="text-white/60">{ar ? "مواعيد العمل" : "Working hours"}</p><p className="mt-1 leading-7">{ar ? "من 7 صباحًا إلى 11 مساءً" : "7:00 AM – 11:00 PM"}</p></div></div>
          <a href="https://www.google.com/maps/search/?api=1&query=21.2871513,40.4225568" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-white/85"><MapPin className="size-5 shrink-0 text-[#edc36c]" aria-hidden="true" /><div><p className="leading-7">{ar ? "الإدارة العامة — حي الريان، الطائف" : "General administration — Al Rayyan, Taif"}</p></div></a>
        </div></div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-white/15 pt-5 text-xs text-white/65">
        <p className="leading-7">© {new Date().getFullYear()} {t.schoolName}. {ar ? "جميع الحقوق محفوظة." : "All rights reserved."}</p>
        <div className="flex items-center gap-6"><Link href={schoolLinks.privacy} prefetch={false} className="inline-flex min-h-11 items-center hover:text-white">{ar ? "سياسة الخصوصية" : "Privacy policy"}</Link><Link href="/#home" prefetch={false} className="inline-flex min-h-11 items-center gap-2 hover:text-white"><span>{ar ? "للأعلى" : "Back to top"}</span><ArrowUp className="size-4 shrink-0" aria-hidden="true" /></Link></div>
      </div>
    </div>
  </footer>;
}
