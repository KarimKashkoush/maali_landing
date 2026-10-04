import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SchoolProfile from "./SchoolProfile";
import { getSchool, schools } from "@/lib/schools";

export const dynamicParams = false;

export function generateStaticParams() {
  return schools.map((school) => ({ slug: school.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const school = getSchool(slug);
  if (!school) return {};

  return {
    title: `${school.title.ar} | مدارس المعالي الإبداعية`,
    description: school.description.ar,
  };
}

export default async function SchoolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const school = getSchool(slug);
  if (!school) notFound();

  return <SchoolProfile school={school} />;
}
