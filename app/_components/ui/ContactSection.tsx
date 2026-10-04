"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpLeft, MessageCircle } from "lucide-react";
import { contactWhatsApp, studentStages } from "@/lib/home-content";
import { whatsappLink } from "@/lib/contact";
import { useUi } from "../providers/UiProvider";
import SocialLinks from "./SocialLinks";

const inputStyle = "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3.5 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-brand focus:ring-2 focus:ring-brand/20";

export default function ContactSection() {
  const { language } = useUi();
  const ar = language === "ar";
  const [preview, setPreview] = useState<string | null>(null);
  const [link, setLink] = useState<string | null>(null);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const message = [
      ar ? "استفسار من موقع مدارس المعالي" : "An enquiry from the Maali Schools website",
      `${ar ? "الاسم" : "Name"}: ${String(fields.get("name")).trim()}`,
      `${ar ? "الجوال" : "Phone"}: ${String(fields.get("phone")).trim()}`,
      ...(fields.get("email") ? [`${ar ? "البريد الإلكتروني" : "Email"}: ${String(fields.get("email")).trim()}`] : []),
      `${ar ? "المرحلة" : "Stage"}: ${studentStages.find((stage) => stage.id === fields.get("stage"))?.name[language]}`,
      `${ar ? "الرسالة" : "Message"}: ${String(fields.get("message")).trim()}`,
    ].join("\n");
    setPreview(message);
    setLink(whatsappLink(contactWhatsApp, message));
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-20 bg-background py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
        <div className="lg:sticky lg:top-32">
          <p className="mb-4 text-sm font-bold text-brand">{ar ? "بابنا مفتوح لأسئلتكم" : "WE ARE HERE TO HELP"}</p>
          <h2 id="contact-title" className="text-4xl leading-[1.6] font-black sm:text-5xl">{ar ? "لنتحدث عن مستقبل أبنائكم." : "Let's talk about your child's future."}</h2>
          <p className="mt-5 max-w-md leading-8 text-muted-foreground">{ar ? "يسعدنا التعرف عليكم والإجابة عن استفساراتكم حول المراحل التعليمية والقبول والحياة في المعالي." : "We would love to answer your questions about our school stages, admissions and life at Maali."}</p>
          <div className="my-8 flex items-start gap-3 border-y border-border py-6">
            <MessageCircle className="mt-1 size-6 shrink-0 text-brand" aria-hidden="true" />
            <div><h3 className="font-bold">{ar ? "نتواصل عبر واتساب" : "Connect on WhatsApp"}</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">{contactWhatsApp || (ar ? "سيُضاف رقم المدرسة الرسمي قريبًا." : "The school's official number will be added soon.")}</p></div>
          </div>
          <p className="mb-4 text-sm font-bold">{ar ? "تابع يوميات المعالي" : "Follow life at Maali"}</p>
          <SocialLinks align="start" />
        </div>
        <form onSubmit={submit} onChange={() => { setPreview(null); setLink(null); }} className="rounded-[1.75rem] border border-border bg-card p-5 sm:p-9" aria-label={ar ? "نموذج التواصل" : "Contact form"}>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-bold">{ar ? "الاسم الكامل *" : "Full name *"}<input name="name" autoComplete="name" required minLength={2} maxLength={100} className={inputStyle} placeholder={ar ? "كيف نناديك؟" : "Your name"} /></label>
            <label className="text-sm font-bold">{ar ? "رقم الجوال *" : "Phone number *"}<input name="phone" type="tel" autoComplete="tel" required minLength={8} maxLength={20} pattern={String.raw`[+0-9٠-٩۰-۹\(\)\s\-]{8,20}`} dir="ltr" className={`${inputStyle} text-start`} placeholder="+966 …" /></label>
            <label className="text-sm font-bold">{ar ? "البريد الإلكتروني (اختياري)" : "Email (optional)"}<input name="email" type="email" autoComplete="email" maxLength={160} dir="ltr" className={inputStyle} placeholder="name@example.com" /></label>
            <label className="text-sm font-bold">{ar ? "المرحلة التعليمية *" : "School stage *"}<select name="stage" required defaultValue="" className={inputStyle}><option value="" disabled>{ar ? "اختر المرحلة" : "Choose a stage"}</option>{studentStages.map((stage) => <option key={stage.id} value={stage.id}>{stage.name[language]}</option>)}</select></label>
            <label className="text-sm font-bold sm:col-span-2">{ar ? "رسالتك *" : "Your message *"}<textarea name="message" required minLength={10} maxLength={2000} rows={4} className={`${inputStyle} resize-y`} placeholder={ar ? "كيف يمكننا مساعدتك؟" : "How can we help?"} /></label>
          </div>
          <p className="mt-5 text-xs leading-6 text-muted-foreground">{ar ? "الحقول المعلّمة بـ * مطلوبة. راجع رسالتك قبل فتح واتساب. لا تُرسل البيانات أو تُحفظ في الموقع عند المعاينة." : "Fields marked * are required. Review your message before opening WhatsApp. Previewing does not send or save your data on this website."}</p>
          {!contactWhatsApp && <p className="mt-2 text-xs leading-6 text-muted-foreground">{ar ? "المعاينة متاحة الآن، والإرسال ينتظر إضافة رقم المدرسة." : "Preview is available; sending awaits the school's number."}</p>}
          <button type="submit" className="mt-6 flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-brand-solid px-6 py-4 font-bold text-white transition-colors hover:bg-[#143f3c]">{ar ? "جهّز رسالتك على واتساب" : "Prepare your WhatsApp message"}<ArrowUpLeft className="size-5 ltr:-rotate-90" aria-hidden="true" /></button>
          {preview && <div role="status" className="mt-6 rounded-xl border border-border bg-background p-5">
            <p className="mb-3 font-bold">{ar ? "معاينة الرسالة — لم تُرسل بعد" : "Message preview — not sent yet"}</p>
            <p className="whitespace-pre-wrap text-sm leading-7">{preview}</p>
            {link ? <a href={link} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex rounded-lg bg-brand-solid px-5 py-3 text-sm font-bold text-white">{ar ? "افتح واتساب وأكمل الإرسال" : "Open WhatsApp to send"}</a> : <p className="mt-4 text-sm text-muted-foreground">{ar ? "سيُفعّل رابط واتساب بعد إضافة رقم المدرسة الرسمي." : "The WhatsApp link will be enabled once the official number is added."}</p>}
          </div>}
        </form>
      </div>
    </section>
  );
}
