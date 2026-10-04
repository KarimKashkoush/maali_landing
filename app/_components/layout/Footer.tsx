"use client";

import { ArrowUpRight } from "lucide-react";
import { useUi } from "../providers/UiProvider";
import Reveal from "../ui/Reveal";

export default function Footer() {
  const { language, t } = useUi();
  const ar = language === "ar";
  const links = [
    { href: "#about", ar: "المعالي بالأرقام", en: "Maali in numbers" },
    { href: "#students", ar: "طلابنا المتميزون", en: "Our outstanding students" },
    { href: "#achievements", ar: "إنجازات المدرسة", en: "School achievements" },
    { href: "#testimonials", ar: "آراء أولياء الأمور", en: "Parent feedback" },
    { href: "#contact", ar: "تواصل معنا", en: "Contact us" },
  ];
  return <footer className="bg-[#102e2b] px-5 pt-16 pb-7 text-white sm:px-8">
    <div className="mx-auto max-w-7xl">
      <Reveal className="flex flex-col justify-between gap-10 pb-12 md:flex-row">
        <div className="max-w-lg"><p className="text-2xl leading-[1.8] font-black sm:text-3xl">{t.schoolName}</p><p className="mt-4 leading-8 text-white/65">{ar ? "هنا تبدأ الحكاية، ويكبر الطموح." : "Where stories begin and ambition grows."}</p></div>
        <nav aria-label={ar ? "روابط أسفل الصفحة" : "Footer navigation"} className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">{links.map((link) => <a key={link.href} href={link.href} className="text-white/75 transition-colors hover:text-[#d6aa48]">{link[language]}</a>)}</nav>
      </Reveal>
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-6 text-xs text-white/60">
        <p>© {new Date().getFullYear()} {t.schoolName}. {ar ? "جميع الحقوق محفوظة." : "All rights reserved."}</p>
        <a href="#home" className="flex items-center gap-2 text-white/80 hover:text-[#d6aa48]">{ar ? "العودة للأعلى" : "Back to top"}<ArrowUpRight className="size-4" aria-hidden="true" /></a>
      </div>
    </div>
  </footer>;
}
