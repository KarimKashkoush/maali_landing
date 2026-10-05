import type { Metadata } from "next";
import PrivacyContent from "./PrivacyContent";

export const metadata: Metadata = {
  title: "الخصوصية | مدارس المعالي الإبداعية الأهلية",
  description: "كيفية التعامل مع بيانات نماذج التواصل والتسجيل وتفضيلات الموقع.",
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
