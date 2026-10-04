"use client";

import Image from "next/image";
import schoolMark from "@/public/mini_logo_display.png";
import { useUi } from "../providers/UiProvider";

export default function LogoLoading() {
  const { language } = useUi();
  return <main className="grid min-h-svh place-items-center bg-background px-6 pt-20" data-logo-loading>
    <div className="flex flex-col items-center gap-9 py-12 text-center">
      <div aria-hidden="true" dir="ltr" className="animated pulse infinite relative isolate size-40 [--animate-duration:3s] motion-reduce:animate-none sm:size-44">
        {/* The real artwork is clipped into two halves. The right half masks
            the left one as it emerges from underneath, regardless of locale. */}
        <div data-loading-half="left" className="animated fadeInRight infinite absolute top-0 left-0 h-full w-1/2 overflow-hidden [--animate-duration:2.8s] [animation-timing-function:cubic-bezier(.22,1,.36,1)] motion-reduce:animate-none">
          <Image src={schoolMark} alt="" width={176} height={176} sizes="176px" loading="eager" className="block h-full w-[200%] max-w-none" />
        </div>
        <div data-loading-half="right" className="absolute top-0 right-0 z-10 h-full w-1/2 overflow-hidden bg-background">
          <Image src={schoolMark} alt="" width={176} height={176} sizes="176px" loading="eager" className="absolute top-0 right-0 block h-full w-[200%] max-w-none" />
        </div>
      </div>
      <p role="status" aria-live="polite" aria-atomic="true" className="text-sm font-bold text-brand">{language === "ar" ? "جارٍ تحميل الصفحة…" : "Loading the page…"}</p>
    </div>
  </main>;
}
