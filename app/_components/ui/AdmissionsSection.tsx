"use client";

import { useState, type FormEvent } from "react";
import { Check, ClipboardList, Send } from "lucide-react";
import { schools } from "@/lib/schools";
import { contactWhatsApp } from "@/lib/home-content";
import { whatsappLink } from "@/lib/contact";
import { admissionDocuments } from "@/lib/school-site-content";
import { useUi } from "../providers/UiProvider";
import SectionIntro from "./SectionIntro";

const fieldStyle = "mt-2 min-h-12 w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none focus:border-brand focus:ring-2 focus:ring-brand/20";

export default function AdmissionsSection() {
  const { language } = useUi();
  const ar = language === "ar";
  const [draft, setDraft] = useState<{ message: string; url: string } | null>(null);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const school = schools.find(({ slug }) => slug === fields.get("school"));
    if (!school) return;
    const message = [ar ? "طلب اهتمام بالتسجيل — مدارس المعالي" : "Admissions enquiry — Maali Schools", `${ar ? "ولي الأمر" : "Guardian"}: ${String(fields.get("guardian")).trim()}`, `${ar ? "الجوال" : "Phone"}: ${String(fields.get("phone")).trim()}`, `${ar ? "المدرسة" : "School"}: ${school.title[language]}`, ar ? "أرغب في معرفة شروط القبول وتوفر المقاعد." : "I would like to ask about admission requirements and available places."].join("\n");
    const url = whatsappLink(contactWhatsApp, message);
    if (url) setDraft({ message, url });
  }
  return <section id="admissions" aria-labelledby="admissions-title" className="scroll-mt-20 bg-muted/40 py-20 sm:py-28"><div className="mx-auto max-w-7xl px-5 sm:px-8">
    <SectionIntro id="admissions-title" Icon={ClipboardList} eyebrow={ar ? "القبول والتسجيل" : "ADMISSIONS"} title={ar ? "خطوتكم الأولى نحو المعالي." : "Your first step towards Maali."} description={ar ? "ابدأ بطلب اهتمام، ويؤكد فريق القبول المتطلبات والمقاعد المتاحة حسب المرحلة والمسار." : "Start with an enquiry. Our admissions team will confirm requirements and available places for your chosen school."} />
    <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
      <div><h3 className="text-xl font-black">{ar ? "رحلة التسجيل" : "The admissions journey"}</h3><ol className="mt-6 space-y-5">{(ar ? ["اختر المدرسة وأرسل طلب الاهتمام", "استكمل المستندات مع فريق القبول", "المراجعة والمقابلة وفق متطلبات المرحلة", "استلام قرار القبول واستكمال الإجراءات"] : ["Choose a school and send an enquiry", "Complete documents with the admissions team", "Review and interview as required for the stage", "Receive the decision and complete enrolment"]).map((step, i) => <li key={step} className="flex items-center gap-4 text-sm leading-7"><span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-solid text-white" aria-hidden="true">{i + 1}</span><span>{step}</span></li>)}</ol>
        <details className="mt-8 rounded-2xl border border-border bg-background p-5"><summary className="cursor-pointer text-sm font-bold text-brand">{ar ? "المستندات المطلوبة وشروط الاستكمال" : "Documents and next steps"}</summary><ul className="mt-5 space-y-3">{admissionDocuments.map((item) => <li key={item.en} className="flex items-center gap-3 text-sm leading-7"><Check className="size-4 shrink-0 text-brand" aria-hidden="true" /><span>{item[language]}</span></li>)}</ul><p className="mt-5 text-xs leading-6 text-muted-foreground">{ar ? "تختلف المتطلبات حسب عمر الطالب ومرحلته وحالة النقل. يراجع فريق القبول القائمة النهائية معكم. لا ترسل هويات أو مستندات طبية في هذا النموذج." : "Requirements vary by age, stage and transfer status. Admissions will confirm the final list. Do not send identification or medical documents in this form."}</p><a href="#contact" className="mt-4 inline-block text-sm font-bold text-brand underline underline-offset-4">{ar ? "اسأل فريق القبول" : "Ask our admissions team"}</a></details>
      </div>
      <form onSubmit={submit} onChange={() => setDraft(null)} aria-label={ar ? "طلب اهتمام بالتسجيل" : "Admissions enquiry"} className="border-t-4 border-brand bg-card p-5 shadow-[0_16px_60px_rgb(28_89_84_/_0.06)] sm:p-9">
        <h3 className="text-xl font-black">{ar ? "سجّل اهتمامك" : "Register your interest"}</h3><p className="mt-2 text-xs leading-6 text-muted-foreground">{ar ? "طلب مبدئي، وليس تسجيلًا نهائيًا أو تأكيدًا للمقعد." : "An initial enquiry, not a final enrolment or confirmation of a place."}</p>
        <div className="mt-6 grid gap-5"><label className="text-sm font-bold">{ar ? "اسم ولي الأمر *" : "Guardian's name *"}<input name="guardian" required minLength={2} maxLength={100} autoComplete="name" className={fieldStyle} /></label><label className="text-sm font-bold">{ar ? "رقم الجوال *" : "Phone number *"}<input name="phone" type="tel" autoComplete="tel" required minLength={8} maxLength={20} pattern={String.raw`[+0-9٠-٩۰-۹\(\)\s\-]{8,20}`} dir="ltr" className={fieldStyle} /></label><label className="text-sm font-bold">{ar ? "المدرسة المطلوبة *" : "Preferred school *"}<select name="school" required defaultValue="" className={fieldStyle}><option value="" disabled>{ar ? "اختر المدرسة والمسار" : "Choose a school and pathway"}</option>{schools.map((school) => <option key={school.slug} value={school.slug}>{school.title[language]}</option>)}</select></label>
        <label className="flex items-start gap-3 text-xs leading-6 text-muted-foreground"><input type="checkbox" required name="consent" className="mt-1 size-4 shrink-0 accent-[#1c5954]" /><span>{ar ? "أوافق على مشاركة هذه البيانات مع المدرسة عبر واتساب عند فتح الرابط وإكمال الإرسال بنفسي." : "I agree to share these details with the school via WhatsApp when I open the link and send the message myself."}</span></label></div>
        <button type="submit" className="mt-6 inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-brand-solid px-5 py-3 text-sm font-bold text-white"><span>{ar ? "راجع طلبك" : "Review your enquiry"}</span><Send className="size-4 shrink-0" aria-hidden="true" /></button>
        {draft && <div role="status" className="mt-6 rounded-xl border border-border p-4"><p className="mb-3 font-bold">{ar ? "معاينة — لم يُرسل الطلب بعد" : "Preview — not sent yet"}</p><p className="whitespace-pre-wrap text-sm leading-7">{draft.message}</p><a href={draft.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center rounded-lg bg-brand-solid px-4 py-2 text-sm font-bold text-white">{ar ? "افتح واتساب وأكمل الإرسال" : "Open WhatsApp to send"}</a></div>}
      </form>
    </div>
  </div></section>;
}
