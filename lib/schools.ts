import type { Language } from "./i18n";

export type LocalizedText = Record<Language, string>;

export type School = {
  slug: string;
  group: "national" | "international";
  title: LocalizedText;
  level: LocalizedText;
  description: LocalizedText;
};

export const schoolGroups: Array<{
  id: School["group"];
  title: LocalizedText;
  description: LocalizedText;
}> = [
  {
    id: "national",
    title: { ar: "القسم الوطني — بنين", en: "National Section — Boys" },
    description: {
      ar: "مسار تعليمي وطني متكامل من المرحلة الابتدائية حتى الثانوية.",
      en: "A complete national learning pathway from primary through secondary school.",
    },
  },
  {
    id: "international",
    title: { ar: "القسم العالمي", en: "International Section" },
    description: {
      ar: "تجربة عالمية تبدأ من الروضة وتستمر حتى المرحلة الثانوية.",
      en: "An international learning journey from kindergarten through secondary school.",
    },
  },
];

export const schools: School[] = [
  {
    slug: "national-primary",
    group: "national",
    title: { ar: "ابتدائية المعالي", en: "Maali Primary School" },
    level: { ar: "المرحلة الابتدائية", en: "Primary stage" },
    description: {
      ar: "بداية تعليمية راسخة تنمّي الفضول والمهارات الأساسية والثقة بالنفس.",
      en: "A strong start that nurtures curiosity, essential skills, and confidence.",
    },
  },
  {
    slug: "national-middle",
    group: "national",
    title: { ar: "متوسطة المعالي", en: "Maali Middle School" },
    level: { ar: "المرحلة المتوسطة", en: "Middle stage" },
    description: {
      ar: "مرحلة تبني الاستقلالية وتوسّع المعرفة وتكتشف مواهب الطالب.",
      en: "A stage that builds independence, expands knowledge, and discovers talents.",
    },
  },
  {
    slug: "national-secondary",
    group: "national",
    title: { ar: "ثانوية المعالي", en: "Maali Secondary School" },
    level: { ar: "المرحلة الثانوية", en: "Secondary stage" },
    description: {
      ar: "إعداد أكاديمي وشخصي يهيّئ الطلاب للجامعة وما بعدها.",
      en: "Academic and personal preparation for university and beyond.",
    },
  },
  {
    slug: "international-kindergarten",
    group: "international",
    title: { ar: "روضة المعالي العالمية", en: "Maali International Kindergarten" },
    level: { ar: "مرحلة الروضة", en: "Kindergarten" },
    description: {
      ar: "تعلم قائم على اللعب والاكتشاف في بيئة آمنة ومحفزة.",
      en: "Playful, discovery-led learning in a safe and inspiring environment.",
    },
  },
  {
    slug: "international-primary",
    group: "international",
    title: { ar: "ابتدائية المعالي العالمية", en: "Maali International Primary" },
    level: { ar: "المرحلة الابتدائية", en: "Primary stage" },
    description: {
      ar: "أساس عالمي متوازن يجمع اللغة والمعرفة والتفكير الإبداعي.",
      en: "A balanced international foundation in language, knowledge, and creative thinking.",
    },
  },
  {
    slug: "international-middle",
    group: "international",
    title: { ar: "متوسطة المعالي العالمية", en: "Maali International Middle School" },
    level: { ar: "المرحلة المتوسطة", en: "Middle stage" },
    description: {
      ar: "تعلم عالمي يطوّر البحث والتواصل وحل المشكلات.",
      en: "International learning that develops inquiry, communication, and problem-solving.",
    },
  },
  {
    slug: "international-secondary",
    group: "international",
    title: { ar: "ثانوية المعالي العالمية", en: "Maali International Secondary" },
    level: { ar: "المرحلة الثانوية", en: "Secondary stage" },
    description: {
      ar: "مسار عالمي طموح يستعد به الطلاب للدراسة الجامعية والمستقبل.",
      en: "An ambitious international pathway toward university and the future.",
    },
  },
];

export function getSchool(slug: string) {
  return schools.find((school) => school.slug === slug);
}
