"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Handshake } from "lucide-react";
import { partners } from "@/lib/partners";
import { useUi } from "../providers/UiProvider";
import Reveal from "./Reveal";

export default function SchoolPartners() {
  const { language } = useUi();
  const ar = language === "ar";
  const section = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = section.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const playState = visible ? "running" : "paused";

  return <section ref={section} id="partners" aria-labelledby="partners-title" className="relative scroll-mt-20 overflow-hidden border-y border-border/70 bg-[#f7f6f1] py-20 dark:bg-card sm:py-24">
    <Reveal className="mx-auto max-w-3xl px-5 text-center">
      <p className="mb-5 inline-flex items-center gap-2.5 text-sm font-bold text-brand"><Handshake className="size-7 shrink-0" strokeWidth={1.5} aria-hidden="true" /><span className="leading-none">{ar ? "شراكاتنا المجتمعية" : "OUR COMMUNITY PARTNERS"}</span></p>
      <h2 id="partners-title" className="text-3xl leading-[1.6] font-black text-balance sm:text-5xl">{ar ? "معًا، " : "Together, "}<span className="text-brand">{ar ? "نصنع أثرًا أكبر." : "we make a greater impact."}</span></h2>
      <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">{ar ? "نمدّ جسور التعاون مع شركائنا، لنفتح لأبنائنا آفاقًا أوسع في التعليم والمجتمع." : "Connecting our school with partners who open wider horizons for our students and community."}</p>
      <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-border bg-background px-4 py-2 text-xs font-bold text-muted-foreground"><span className="text-base leading-none text-brand">{partners.length}</span><span>{ar ? "شريكًا في رحلة المعالي" : "partners on the Maali journey"}</span></div>
    </Reveal>

    {/* One accessible list; visual repetitions must not repeat announcements. */}
    <ul className="sr-only">{partners.map((partner) => <li key={partner.id}>{partner[language]}</li>)}</ul>

    <div className="group mt-10 space-y-7 sm:mt-12 sm:space-y-9" dir="ltr" aria-hidden="true">
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] motion-reduce:[mask-image:none]">
        <div data-partner-track="logos" className="flex w-max [direction:ltr] [animation:partners-loop_65s_linear_infinite] group-hover:[animation-play-state:paused]! motion-reduce:w-full motion-reduce:animate-none" style={{ animationPlayState: playState, animationDirection: ar ? "normal" : "reverse" }}>
          {[0, 1].map((copy) => <div key={copy} data-partner-copy={copy} className={`flex min-w-screen shrink-0 items-center justify-around motion-reduce:min-w-0 motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-4 ${copy === 1 ? "motion-reduce:hidden" : ""}`}>
            {partners.map((partner) => <div key={partner.id} className="mx-2 flex h-28 w-40 shrink-0 items-center justify-center rounded-2xl border border-black/5 bg-white px-4 shadow-[0_2px_0_rgb(0_0_0_/_0.025)] sm:mx-3 sm:h-32 sm:w-48">
              <Image src={`/partners/partner-${partner.id}.webp`} alt="" width={160} height={80} unoptimized loading="lazy" className="h-20 w-full object-contain" />
            </div>)}
          </div>)}
        </div>
      </div>
      <div className="overflow-hidden border-y border-border/60 py-5 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] motion-reduce:[mask-image:none] sm:py-6">
        <div data-partner-track="names" className="flex w-max [direction:ltr] [animation:partners-loop_100s_linear_infinite] group-hover:[animation-play-state:paused]! motion-reduce:w-full motion-reduce:animate-none" style={{ animationPlayState: playState, animationDirection: ar ? "reverse" : "normal" }}>
          {[0, 1].map((copy) => <div key={copy} data-partner-copy={copy} className={`flex min-w-screen shrink-0 items-center justify-around motion-reduce:min-w-0 motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-4 ${copy === 1 ? "motion-reduce:hidden" : ""}`}>
            {partners.map((partner) => <span key={partner.id} className="flex shrink-0 items-center text-xl leading-relaxed font-bold whitespace-nowrap text-brand/80 motion-reduce:max-w-full motion-reduce:text-center motion-reduce:whitespace-normal sm:text-2xl"><span className="px-6 sm:px-9" dir={ar ? "rtl" : "ltr"}>{partner[language]}</span><span className="text-2xl leading-none text-gold">✦</span></span>)}
          </div>)}
        </div>
      </div>
    </div>

  </section>;
}
