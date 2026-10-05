// Replace preview content with approved school data before publishing.
export const schoolStats = [
  { value: 30, unit: { ar: "سنة", en: "years" }, description: { ar: "من الخبرة في التعليم", en: "of experience in education" } },
  { value: 1200, unit: { ar: "طالب", en: "students" }, description: { ar: "في مختلف المراحل التعليمية", en: "across our educational stages" } },
  { value: 50, unit: { ar: "فصل دراسي", en: "classrooms" }, description: { ar: "مجهز ببيئة تعليمية متطورة", en: "equipped for a modern learning experience" } },
  { value: 100, unit: { ar: "معلم ومعلمة", en: "educators" }, description: { ar: "نخبة من الكوادر التعليمية", en: "a dedicated team of teaching professionals" } },
  { value: 50, unit: { ar: "برنامج ونشاط", en: "programs & activities" }, description: { ar: "لتنمية مهارات الطلاب", en: "helping students discover and develop their skills" } },
  { value: 95, percent: true, unit: { ar: "رضا أولياء الأمور", en: "parent satisfaction" }, description: { ar: "ثقة نعتز بها، وشراكة ننمو معها", en: "trust we value, partnerships we grow with" } },
  { value: 99, percent: true, unit: { ar: "التحصيل ومعدل النجاح", en: "achievement & success" }, description: { ar: "خطوات واثقة نحو مستقبل أفضل", en: "confident steps towards a brighter future" } },
] as const;

export const studentStages = [
  { id: "primary", name: { ar: "ابتدائي", en: "Primary" } },
  { id: "middle", name: { ar: "متوسطة", en: "Middle" } },
  { id: "secondary", name: { ar: "ثانوي", en: "Secondary" } },
  { id: "kindergarten", name: { ar: "روضة", en: "Kindergarten" } },
] as const;

export type StudentStage = (typeof studentStages)[number]["id"];
export type FeaturedStudent = {
  rank: number;
  name: { ar: string; en: string } | null;
  achievement: { ar: string; en: string } | null;
  photo: string | null;
};
const sampleNames = [
  ["عمر خالد", "Omar Khalid"], ["يوسف أحمد", "Yousef Ahmed"], ["عبدالله فهد", "Abdullah Fahad"],
  ["محمد سالم", "Mohammed Salem"], ["راشد علي", "Rashid Ali"], ["زياد ناصر", "Ziad Nasser"],
  ["خالد إبراهيم", "Khalid Ibrahim"], ["فهد ماجد", "Fahad Majed"], ["سلمان عادل", "Salman Adel"],
  ["آدم عمر", "Adam Omar"], ["ليان أحمد", "Layan Ahmed"], ["نورة خالد", "Noura Khalid"],
];
export const featuredStudents: Record<StudentStage, FeaturedStudent[]> = Object.fromEntries(
  studentStages.map(({ id }, stageIndex) => [id, [1, 2, 3].map((rank) => {
    const [ar, en] = sampleNames[stageIndex * 3 + rank - 1];
    return { rank, name: { ar, en }, achievement: null, photo: null };
  })]),
) as Record<StudentStage, FeaturedStudent[]>;

export const previewFeedback = [
  { ar: "نقدّر الاهتمام بمتابعة الطالب، والتواصل الواضح مع الأسرة حول تقدمه وما يحتاج إليه من دعم.", en: "We value the attention given to each student and the clear communication with families about their progress and support needs." },
  { ar: "بيئة مشجعة تمنح أبناءنا فرصة السؤال والتجربة، وتساعدهم على اكتشاف ما يحبون والتعبير عن أنفسهم.", en: "An encouraging environment gives our children room to ask questions, try new things and express themselves." },
  { ar: "الأنشطة المتنوعة تجعل رحلة التعلم أكثر حيوية، وتفتح أمام الطلاب مساحة لاكتشاف مواهبهم وتنمية مهاراتهم.", en: "Varied activities bring learning to life and give students opportunities to discover their talents and develop their skills." },
  { ar: "نثمّن دور المعلم الذي يستمع ويشجع، ويجعل الطالب أكثر ثقة بقدراته وأكثر حماسًا للتعلم.", en: "We appreciate teachers who listen and encourage, helping students feel more confident and excited to learn." },
  { ar: "الشراكة بين المدرسة والأسرة مهمة لنا، والحوار المستمر يساعدنا على دعم أبنائنا في كل مرحلة.", en: "The partnership between school and home matters to us. Ongoing dialogue helps us support our children at every stage." },
] as const;

// School-supplied Saudi WhatsApp number, including the country code.
export const contactWhatsApp = "966920014984";

// Empty links are intentionally not replaced by guessed accounts.
export const socialUrls: Record<string, string> = {
  Facebook: "https://www.facebook.com/profile.php?id=61582712177808", Instagram: "https://instagram.com/maali_schools", YouTube: "", WhatsApp: `https://wa.me/${contactWhatsApp}`, Snapchat: "https://snapchat.com/@maali_schools", TikTok: "https://tiktok.com/@maali_schools1", "X (Twitter)": "https://x.com/maali_schools",
};

export const previewParents = [
  { ar: "أحمد عبدالله", en: "Ahmed Abdullah", student: { ar: "عمر", en: "Omar" } },
  { ar: "خالد العلي", en: "Khalid Al Ali", student: { ar: "يوسف", en: "Yousef" } },
  { ar: "سارة محمد", en: "Sara Mohammed", student: { ar: "ليان", en: "Layan" } },
  { ar: "فهد سالم", en: "Fahad Salem", student: { ar: "زياد", en: "Ziad" } },
  { ar: "نورة أحمد", en: "Noura Ahmed", student: { ar: "آدم", en: "Adam" } },
];
