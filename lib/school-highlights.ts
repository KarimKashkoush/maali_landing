import type { LocalizedText } from "./schools";

// Short learning themes drawn from the existing school descriptions.
export const schoolHighlights: Record<string, LocalizedText[]> = {
  "national-primary": [
    { ar: "تنمية المهارات الأساسية", en: "Essential learning skills" },
    { ar: "الفضول وحب الاستكشاف", en: "Curiosity and discovery" },
    { ar: "بناء الثقة بالنفس", en: "Building self-confidence" },
  ],
  "national-middle": [
    { ar: "توسيع المعرفة", en: "Expanding knowledge" },
    { ar: "اكتشاف المواهب", en: "Discovering talents" },
    { ar: "تنمية الاستقلالية", en: "Growing independence" },
  ],
  "national-secondary": [
    { ar: "الاستعداد للجامعة", en: "Preparing for university" },
    { ar: "بناء أكاديمي متكامل", en: "Academic preparation" },
    { ar: "تنمية شخصية الطالب", en: "Personal development" },
  ],
  "international-kindergarten": [
    { ar: "التعلّم من خلال اللعب", en: "Learning through play" },
    { ar: "الاكتشاف والتجربة", en: "Exploring and discovering" },
    { ar: "بيئة آمنة ومحفزة", en: "A safe, inspiring environment" },
  ],
  "international-primary": [
    { ar: "تطوير المهارات اللغوية", en: "Developing language skills" },
    { ar: "بناء المعرفة", en: "Building knowledge" },
    { ar: "تنمية التفكير الإبداعي", en: "Creative thinking" },
  ],
  "international-middle": [
    { ar: "مهارات البحث", en: "Inquiry and research" },
    { ar: "التواصل والتعبير", en: "Communication skills" },
    { ar: "حل المشكلات", en: "Problem-solving" },
  ],
  "international-secondary": [
    { ar: "الاستعداد للدراسة الجامعية", en: "University readiness" },
    { ar: "مسار تعلّم عالمي", en: "An international pathway" },
    { ar: "التطلّع إلى المستقبل", en: "Looking to the future" },
  ],
};
