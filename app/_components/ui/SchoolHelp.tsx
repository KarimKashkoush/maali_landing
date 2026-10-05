"use client";

import { ArrowUpRight, BookOpen, CircleHelp, Laptop, Users } from "lucide-react";
import { schoolFaqs, schoolLinks } from "@/lib/school-site-content";
import { useUi } from "../providers/UiProvider";
import SectionIntro from "./SectionIntro";

export default function SchoolHelp() {
  const { language } = useUi();
  const ar = language === "ar";
  const services = [
    { Icon: Laptop, href: schoolLinks.madrasati, name: ar ? "منصة مدرستي" : "Madrasati", detail: ar ? "الوصول إلى التعلم والواجبات والخدمات التعليمية." : "Access learning, assignments and educational services." },
    { Icon: BookOpen, href: schoolLinks.noor, name: ar ? "نظام نور" : "Noor", detail: ar ? "الخدمات والبيانات الدراسية عبر وزارة التعليم." : "Academic services and records through the Ministry of Education." },
    
  ];
  return <>
    <section id="e-services" aria-labelledby="services-title" className="scroll-mt-20 bg-background py-20 sm:py-24"><div className="mx-auto max-w-7xl px-5 sm:px-8"><SectionIntro id="services-title" Icon={Laptop} eyebrow={ar ? "الخدمات الإلكترونية" : "DIGITAL SERVICES"} title={ar ? "روابطك المهمة، في مكان واحد." : "Your essentials, in one place."} /><div className="grid gap-4 md:grid-cols-3">{services.map(({ Icon, href, name, detail }) => <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="group border-t border-brand/25 px-1 py-7 transition-colors hover:border-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"><div className="flex items-center justify-between text-brand"><Icon className="size-8" strokeWidth={1.5} aria-hidden="true" /><ArrowUpRight className="size-5" aria-hidden="true" /></div><h3 className="mt-6 text-xl font-black">{name}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{detail}</p></a>)}<div className="border-t border-border px-1 py-7"><Users className="size-8 text-muted-foreground" strokeWidth={1.5} aria-hidden="true" /><h3 className="mt-6 text-xl font-black">{ar ? "بوابة أولياء الأمور" : "Parent portal"}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{ar ? "سيُعلن عن البوابة الجديدة عند إتاحتها." : "The new portal will be announced when available."}</p></div></div></div></section>
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-20 bg-muted/40 py-20 sm:py-24"><div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-16"><div><SectionIntro id="faq-title" Icon={CircleHelp} eyebrow={ar ? "الأسئلة الشائعة" : "FREQUENTLY ASKED QUESTIONS"} title={ar ? "إجابات تقرّب الصورة." : "A clearer picture, before you begin."} /><a href="#contact" className="inline-flex min-h-11 items-center font-bold text-brand underline underline-offset-8">{ar ? "عندك سؤال آخر؟ تواصل معنا" : "Another question? Contact us"}</a></div><div className="space-y-3">{schoolFaqs.map((faq) => <details key={faq.q.en} className="group border-b border-brand/20 py-6"><summary className="cursor-pointer text-base leading-8 font-bold text-brand">{faq.q[language]}</summary><p className="mt-4 border-t border-border pt-4 text-sm leading-8 text-muted-foreground">{faq.a[language]}</p></details>)}</div></div></section>
  </>;
}
