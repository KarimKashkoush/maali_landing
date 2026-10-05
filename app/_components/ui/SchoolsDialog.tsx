"use client";

import dynamic from "next/dynamic";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import { useUi } from "../providers/UiProvider";

const SchoolsDialogContent = dynamic(() => import("./SchoolsDialogContent"), { ssr: false });

export default function SchoolsDialog({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { language, t } = useUi();
  const Arrow = language === "ar" ? ArrowLeft : ArrowRight;
  const prepare = () => { void import("./SchoolsDialogContent"); };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={compact ? "inline-flex min-h-11 cursor-pointer items-center justify-center gap-2.5 px-1 text-sm font-bold text-brand underline-offset-4 hover:underline [&_svg]:size-4" : "inline-flex min-h-[3.4rem] cursor-pointer items-center justify-center gap-2.5 rounded-2xl bg-brand-solid px-6 text-sm font-black text-white shadow-[0_.75rem_1.75rem_rgb(28_89_84_/_0.18)] transition-[transform,box-shadow] duration-180 hover:-translate-y-0.5 hover:shadow-[0_1rem_2rem_rgb(28_89_84_/_0.24)] motion-reduce:transition-none [&_svg]:size-4"}
        aria-haspopup="dialog"
        aria-expanded={open}
        onPointerEnter={prepare}
        onFocus={prepare}
        onClick={() => { setLoaded(true); setOpen(true); }}
      >
        <span className="leading-none">{t.hero.exploreSchools}</span>
        <Arrow className="shrink-0" aria-hidden="true" />
      </button>
      {loaded && <SchoolsDialogContent open={open} onOpenChange={setOpen} triggerRef={triggerRef} />}
    </>
  );
}
