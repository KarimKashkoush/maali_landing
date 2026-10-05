// Editorial summaries of the school's public pages, reviewed 2026-10-05.
// Experience and stage availability follow the school owner's supplied data.
// Do not add unapproved staff profiles, a principal's statement, or calendar dates.
export const schoolLinks = {
  privacy: "/privacy",
  madrasati: "https://schools.madrasati.sa/",
  noor: "https://noor.moe.gov.sa/",
} as const;

export const schoolValues = [
  { ar: "التميز", en: "Excellence" }, { ar: "الأخلاق", en: "Integrity" },
  { ar: "الإبداع", en: "Creativity" }, { ar: "الانفتاح", en: "Openness" },
  { ar: "الأمان", en: "Safety" }, { ar: "الشراكة", en: "Partnership" },
] as const;

export const campusPhotos = [
  { id: 22, ar: "مبنى القسم الابتدائي", en: "Primary school building" },
  { id: 15, ar: "الساحة الداخلية للمدرسة", en: "The school courtyard" },
  { id: 17, ar: "الملعب المدرسي", en: "The school sports pitch" },
  { id: 20, ar: "أحد الفصول الدراسية", en: "One of our classrooms" },
  { id: 21, ar: "مساحة اللعب", en: "The play area" },
  { id: 6, ar: "مبنى المتوسط والثانوي", en: "Middle and secondary school campus" },
] as const;

export const schoolNews = [
  { id: 5, date: "2026-06-20", slug: "excellence-we-excel", title: { ar: "المعالي في المركز السادس على مستوى المملكة", en: "Maali places sixth in the Kingdom" }, summary: { ar: "إنجاز طلابي في الأولمبياد الوطني للغة الإنجليزية، وتأهل للمنافسة الدولية.", en: "Success in the national English Olympiad and qualification for the international competition." } },
  { id: 4, date: "2026-04-19", slug: "generalnews-1", title: { ar: "تكريم الفائزين في مسابقة يوم التأسيس", en: "Celebrating Founding Day competition winners" }, summary: { ar: "احتفاء بطلاب المعالي الفائزين في المنافسة على مستوى محافظة الطائف.", en: "Recognising Maali students for their achievements in the Taif-wide competition." } },
  { id: 3, date: "2026-04-19", slug: "generalnews", title: { ar: "إنجاز جديد في جائزة منافس 2025", en: "A new achievement in the Munafis 2025 Award" }, summary: { ar: "فوز أحد طلاب المرحلة الثانوية بمسار التحصيل المعرفي على مستوى الطائف.", en: "A secondary student's success in the academic achievement category across Taif." } },
] as const;

// Branch locations published at https://maalischool.org/contact.
export const schoolBranches = [
  { id: "administration", name: { ar: "الإدارة العامة — حي الريان", en: "General administration — Al Rayyan" }, latitude: 21.2871513, longitude: 40.4225568 },
  { id: "primary", name: { ar: "الابتدائي — حي الريان", en: "Primary — Al Rayyan" }, latitude: 21.2871513, longitude: 40.4225568 },
  { id: "middle", name: { ar: "المتوسط — حي الفيصلية", en: "Middle — Al Faisaliyah" }, latitude: 21.295118, longitude: 40.423172 },
  { id: "secondary", name: { ar: "الثانوي — حي الفيصلية", en: "Secondary — Al Faisaliyah" }, latitude: 21.295118, longitude: 40.423172 },
] as const;

export const admissionDocuments = [
  { ar: "شهادة الميلاد وهوية ولي الأمر", en: "Birth certificate and guardian identification" },
  { ar: "صور شخصية حديثة للطالب", en: "Recent student photographs" },
  { ar: "شهادة التطعيم والتقرير الطبي", en: "Vaccination record and medical report" },
  { ar: "الشهادة الدراسية والسجل الأكاديمي للطلاب المنقولين", en: "School certificate and academic records for transferring students" },
] as const;

export const schoolFaqs = [
  { q: { ar: "ما المراحل والمسارات المتاحة؟", en: "Which stages and pathways are available?" }, a: { ar: "المسار الوطني للبنين يشمل الابتدائي والمتوسط والثانوي. والمسار العالمي يشمل الروضة والابتدائي والمتوسط والثانوي. تفاصيل كل مدرسة متاحة في قسم المراحل التعليمية.", en: "The national boys' pathway includes primary, middle and secondary. The international pathway includes kindergarten, primary, middle and secondary. Explore each school in our pathways section." } },
  { q: { ar: "كيف أبدأ التسجيل؟", en: "How do I begin registration?" }, a: { ar: "املأ طلب الاهتمام في قسم القبول، ثم راجع البيانات وافتح واتساب لإرسالها إلى فريق المدرسة. الطلب استفسار أولي، ولا يُعد تأكيدًا للقبول أو حجزًا للمقعد.", en: "Complete the admissions enquiry form, review your details, then open WhatsApp to send them to the school. This is an initial enquiry, not confirmation of admission or a reserved place." } },
  { q: { ar: "ما شروط القبول والمستندات المطلوبة؟", en: "What are the admission requirements?" }, a: { ar: "يحدد فريق القبول المتطلبات حسب عمر الطالب ومرحلته والمسار المطلوب. تشمل قائمة المستندات المنشورة شهادة الميلاد وهوية ولي الأمر والصور والتطعيمات والمستندات الأكاديمية عند النقل. تُستكمل المستندات عبر القنوات الرسمية، وليس في نموذج الاستفسار.", en: "The admissions team confirms requirements for the student's age, stage and pathway. Published documents include birth and guardian identification, photos, vaccination and academic records for transfers. Submit documents through official channels, not the enquiry form." } },
  { q: { ar: "كيف أعرف الرسوم وتوفر النقل المدرسي؟", en: "How can I check fees and school transport?" }, a: { ar: "تواصل مع فريق القبول على 920014984 للحصول على الرسوم المعتمدة وتفاصيل النقل والتغطية المتاحة للفرع المطلوب.", en: "Contact admissions on 920014984 for current fees and transport availability for your chosen campus." } },
  { q: { ar: "هل يمكن زيارة المدرسة قبل التسجيل؟", en: "Can we visit before applying?" }, a: { ar: "يسعدنا تنسيق زيارة. أرسل المرحلة التي تهتم بها والوقت المناسب عبر نموذج التواصل أو واتساب ليؤكد الفريق الموعد.", en: "We would be happy to arrange a visit. Send your preferred stage and time using the contact form or WhatsApp, and the team will confirm your appointment." } },
] as const;
