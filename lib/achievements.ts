export const medalTypes = ["diamond", "gold", "silver", "bronze"] as const;
export type MedalType = (typeof medalTypes)[number];
type LocalizedText = { ar: string; en: string };
export type SchoolAchievement = {
  id: string;
  title: LocalizedText;
  detail: LocalizedText;
  medals?: Partial<Record<MedalType, number>>;
  distinction?: "ranking" | "award" | "students";
};

export const medalLabels: Record<MedalType, LocalizedText> = {
  diamond: { ar: "ماسية", en: "Diamond" },
  gold: { ar: "ذهبية", en: "Gold" },
  silver: { ar: "فضية", en: "Silver" },
  bronze: { ar: "برونزية", en: "Bronze" },
};

// Founding Day confirmed by the school: 2 diamond + 3 gold + 3 silver = 8.
export const schoolAchievements: SchoolAchievement[] = [
  { id: "english-olympiad", title: { ar: "الأولمبياد الدولي للغة الإنجليزية", en: "International English Language Olympiad" }, detail: { ar: "المركز السادس على مستوى المملكة", en: "6th place in the Kingdom" }, distinction: "ranking" },
  { id: "literary-skills", title: { ar: "المهارات الأدبية", en: "Literary Skills" }, detail: { ar: "ميدالية ذهبية وميداليتان برونزيتان", en: "One gold and two bronze medals" }, medals: { gold: 1, bronze: 2 } },
  { id: "qutoof", title: { ar: "قطوف وردية", en: "Qutoof Wardiya" }, detail: { ar: "٣ ماسية، ٣ ذهبية، ٣ فضية", en: "3 diamond, 3 gold and 3 silver" }, medals: { diamond: 3, gold: 3, silver: 3 } },
  { id: "bebras", title: { ar: "ببراس موهبة", en: "Bebras Mawhiba" }, detail: { ar: "ميدالية ذهبية", en: "One gold medal" }, medals: { gold: 1 } },
  { id: "founding-day", title: { ar: "يوم التأسيس", en: "Founding Day" }, detail: { ar: "على مستوى الطائف · ٢ ماسية، ٣ ذهبية، ٣ فضية", en: "Across Taif · 2 diamond, 3 gold and 3 silver" }, medals: { diamond: 2, gold: 3, silver: 3 } },
  { id: "munafis", title: { ar: "جائزة منافس", en: "Munafis Award" }, detail: { ar: "على مستوى الطائف", en: "Across Taif" }, distinction: "award" },
  { id: "safe-school", title: { ar: "جائزة البيئة المدرسية الآمنة", en: "Safe School Environment Award" }, detail: { ar: "طالبان من مدارس المعالي", en: "Two Maali students" }, distinction: "students" },
  { id: "cultural-skills", title: { ar: "جائزة مهارات ثقافية", en: "Cultural Skills Award" }, detail: { ar: "ميداليتان فضيتان وميداليتان برونزيتان", en: "Two silver and two bronze medals" }, medals: { silver: 2, bronze: 2 } },
];

export function countMedals(medals: SchoolAchievement["medals"]) {
  return medalTypes.reduce((total, type) => total + (medals?.[type] ?? 0), 0);
}

export const medalsByType = Object.fromEntries(medalTypes.map((type) => [type,
  schoolAchievements.reduce((total, achievement) => total + (achievement.medals?.[type] ?? 0), 0),
])) as Record<MedalType, number>;
export const totalMedals = schoolAchievements.reduce((total, achievement) => total + countMedals(achievement.medals), 0);
