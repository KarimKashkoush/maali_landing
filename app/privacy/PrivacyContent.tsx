"use client";

import Link from "next/link";
import { useUi } from "../_components/providers/UiProvider";
import Footer from "../_components/layout/Footer";

export default function PrivacyContent() {
  const { language } = useUi();
  const ar = language === "ar";
  const items = [
    { title: ar ? "نماذج التواصل والتسجيل" : "Contact and admissions forms", text: ar ? "تعرض النماذج معاينة محلية لبياناتك. لا تُرسل المعاينة إلى المدرسة ولا تُحفظ كطلب في قاعدة بيانات الموقع. عند فتح رابط واتساب تنتقل بيانات الرسالة إلى خدمة واتساب؛ وأنت من يكمل الإرسال إلى المدرسة." : "Forms create a local preview. This preview is not sent to the school or stored as an application in a website database. Opening the WhatsApp link passes the message details to WhatsApp; you complete the send to the school." },
    { title: ar ? "المعلومات المطلوبة" : "Information requested", text: ar ? "استخدم بيانات التواصل الضرورية فقط. لا ترفق أو تكتب أرقام الهوية أو المستندات الطبية في الرسائل الأولية. طلب الاهتمام لا يُعد تسجيلًا نهائيًا أو حجزًا لمقعد." : "Provide only the contact information needed. Do not include identification numbers or medical documents in initial enquiries. An enquiry is not a final enrolment or seat reservation." },
    { title: ar ? "تفضيلات العرض" : "Display preferences", text: ar ? "يستخدم الموقع التخزين المحلي في متصفحك لتذكّر اللغة والوضع الفاتح أو الداكن. يمكنك إزالة هذه التفضيلات من إعدادات بيانات المواقع في المتصفح." : "The site uses browser local storage to remember language and light or dark mode. You can remove these preferences through your browser's site-data settings." },
    { title: ar ? "الخدمات الخارجية" : "External services", text: ar ? "لا تُحمّل خريطة Google إلا عند طلب عرضها. روابط واتساب والسوشيال ومنصات التعليم تنقلك إلى خدمات خارجية لها سياساتها الخاصة." : "Google Maps loads only when requested. WhatsApp, social and educational platform links open external services with their own policies." },
    { title: ar ? "الاستفسارات" : "Questions", text: ar ? "للاستفسار عن بيانات أرسلتها إلى المدرسة، تواصل مع الإدارة على 920014984. يصف هذا البيان طريقة عمل النسخة الحالية من الموقع، ويُراجع قبل إطلاق خدمات جديدة لجمع البيانات." : "For questions about information sent to the school, contact administration on 920014984. This notice describes the current site and should be reviewed before new data-collection services are launched." },
  ];
  return <><main className="mx-auto w-full max-w-4xl px-5 pt-36 pb-24 sm:px-8" dir={ar ? "rtl" : "ltr"}><Link href="/" prefetch={false} className="inline-flex min-h-11 items-center text-sm font-bold text-brand">{ar ? "العودة للرئيسية" : "Back to home"}</Link><h1 className="mt-5 text-4xl leading-[1.6] font-black">{ar ? "سياسة الخصوصية" : "Privacy notice"}</h1><div className="mt-10 space-y-8">{items.map(({ title, text }) => <section key={title} className="border-t border-border pt-6"><h2 className="text-xl font-bold text-brand">{title}</h2><p className="mt-3 leading-8 text-muted-foreground">{text}</p></section>)}</div></main><Footer /></>;
}
