"use client";

import { Dialog } from "@base-ui/react/dialog";
import { ArrowLeft, ArrowRight, School, X } from "lucide-react";
import Link from "next/link";
import type { RefObject } from "react";
import { schoolGroups, schools } from "@/lib/schools";
import { useUi } from "../providers/UiProvider";

export default function SchoolsDialogContent({ open, onOpenChange, triggerRef }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
}) {
  const { language, t } = useUi();
  const Arrow = language === "ar" ? ArrowLeft : ArrowRight;

  return (
    <Dialog.Root open={open} onOpenChange={(nextOpen, details) => {
      // The opener lives outside the lazy-loaded dialog. Its opening click
      // must not also be treated as a click outside the newly mounted popup.
      if (details.reason === "outside-press"
        && details.event.target instanceof Node
        && triggerRef.current?.contains(details.event.target)) return;
      onOpenChange(nextOpen);
    }}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-80 min-h-dvh bg-[rgb(9_30_29_/_0.64)] backdrop-blur-lg transition-opacity duration-180 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 motion-reduce:transition-none" />
        <Dialog.Viewport className="fixed inset-0 z-81 grid place-items-center overflow-y-auto p-3 sm:p-5">
          <Dialog.Popup
            finalFocus={triggerRef}
            className="max-h-[calc(100dvh-1.5rem)] w-[calc(100vw-1.5rem)] overflow-y-auto rounded-3xl border border-border bg-card p-[clamp(1.25rem,3vw,2.25rem)] text-card-foreground shadow-[0_2rem_6rem_rgb(0_0_0_/_0.3)] outline-none transition-[opacity,transform] duration-180 data-[ending-style]:translate-y-4 data-[ending-style]:scale-[.98] data-[ending-style]:opacity-0 data-[starting-style]:translate-y-4 data-[starting-style]:scale-[.98] data-[starting-style]:opacity-0 motion-reduce:transition-none sm:max-h-[min(48rem,calc(100dvh-2.5rem))] sm:w-[min(62rem,calc(100vw-2.5rem))] sm:rounded-[2rem]"
            dir={language === "ar" ? "rtl" : "ltr"}
          >
            <div className="flex items-start justify-between gap-4 border-b border-border pb-6">
              <div>
                <Dialog.Title className="text-[clamp(1.65rem,3vw,2.5rem)] font-black tracking-[-.03em]">
                  {t.hero.schoolsDialogTitle}
                </Dialog.Title>
                <Dialog.Description className="mt-2 max-w-[43rem] leading-[1.8] text-muted-foreground">
                  {t.hero.schoolsDialogDescription}
                </Dialog.Description>
              </div>
              <Dialog.Close
                className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full border border-border bg-muted text-foreground [&_svg]:size-[1.1rem]"
                aria-label={t.actions.closeMenu}
              >
                <X aria-hidden="true" />
              </Dialog.Close>
            </div>

            <div className="mt-5 grid gap-4">
              {schoolGroups.map((group) => (
                <section key={group.id} className="rounded-3xl border border-border bg-muted/55 p-[clamp(1rem,2vw,1.4rem)]">
                  <div className="flex items-center gap-3.5">
                    <span className="grid size-11 shrink-0 place-items-center rounded-[.9rem] bg-brand-soft text-brand [&_svg]:size-[1.35rem]">
                      <School aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-[1.08rem] font-black">{group.title[language]}</h3>
                      <p className="mt-1 text-[.85rem] leading-[1.65] text-muted-foreground">{group.description[language]}</p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {schools.filter((school) => school.group === group.id).map((school) => (
                      <Link
                        key={school.slug}
                        href={`/schools/${school.slug}`}
                        className="flex min-h-[4.4rem] items-center justify-between gap-3 rounded-2xl border border-border bg-card px-4 py-3 transition-[border-color,transform,box-shadow] duration-160 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-[0_.6rem_1.5rem_rgb(0_0_0_/_0.06)] motion-reduce:transition-none"
                      >
                        <span className="grid gap-1">
                          <strong className="text-sm">{school.title[language]}</strong>
                          <small className="text-[.72rem] text-muted-foreground">{school.level[language]}</small>
                        </span>
                        <Arrow className="size-4 shrink-0 text-brand" aria-hidden="true" />
                      </Link>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
