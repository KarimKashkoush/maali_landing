import type { LucideIcon } from "lucide-react";
import Reveal from "./Reveal";

export default function SectionIntro({ id, eyebrow, title, description, Icon }: { id: string; eyebrow: string; title: string; description?: string; Icon: LucideIcon }) {
  return <Reveal className="mb-10 max-w-2xl sm:mb-12">
    <p className="mb-4 inline-flex items-center gap-2.5 text-sm font-bold text-brand"><Icon className="size-7 shrink-0" strokeWidth={1.5} aria-hidden="true" /><span className="leading-none">{eyebrow}</span></p>
    <h2 id={id} className="text-3xl leading-[1.6] font-black text-balance sm:text-4xl lg:text-5xl">{title}</h2>
    {description && <p className="mt-4 text-sm leading-8 text-muted-foreground sm:text-base">{description}</p>}
  </Reveal>;
}
