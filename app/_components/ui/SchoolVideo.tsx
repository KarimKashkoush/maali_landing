"use client";

import { useEffect, useRef } from "react";
import { schoolVideo } from "@/lib/school-video";
import { useUi } from "../providers/UiProvider";
import Reveal from "./Reveal";

type NetworkConnection = EventTarget & {
  saveData?: boolean;
};

export default function SchoolVideo() {
  const { language } = useUi();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;
    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const connection = (navigator as Navigator & { connection?: NetworkConnection }).connection;
    let visible = false;

    const updatePlayback = () => {
      // The poster is below the fold too: assigning it in the initial HTML
      // would compete with the hero even when video preload is "none".
      if (visible && !video.hasAttribute("poster")) video.poster = schoolVideo.poster;
      if (!visible || document.hidden || !motion.matches || connection?.saveData) {
        video.pause();
        return;
      }

      // Assign one source only, when visible. Autoplay alone would bypass preload="none".
      if (!video.hasAttribute("src")) {
        video.src = schoolVideo.source;
      }
      video.muted = true;
      // Some browsers still restrict autoplay. The poster remains as the fallback.
      void video.play().catch(() => {});
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= 0.01;
      updatePlayback();
    }, { threshold: [0, 0.01] });

    observer.observe(section);
    document.addEventListener("visibilitychange", updatePlayback);
    motion.addEventListener("change", updatePlayback);
    connection?.addEventListener("change", updatePlayback);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", updatePlayback);
      motion.removeEventListener("change", updatePlayback);
      connection?.removeEventListener("change", updatePlayback);
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, []);

  return (
    <section
      id="school-film"
      ref={sectionRef}
      aria-labelledby="school-film-caption"
      className="relative isolate grid h-[clamp(22rem,58svh,42rem)] w-full scroll-mt-20 place-items-center overflow-hidden bg-brand-solid text-white"
    >
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_25%_30%,var(--gold-soft),transparent_65%),linear-gradient(135deg,#1c5954,#102f2d)]" aria-hidden="true" />
      <video
        ref={videoRef}
        width={640}
        height={360}
        muted
        loop
        playsInline
        preload="none"
        disablePictureInPicture
        aria-hidden="true"
        tabIndex={-1}
        className="pointer-events-none absolute inset-0 -z-10 size-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-black/65 shadow-[inset_0_0_8rem_rgb(0_0_0_/_0.55)]" aria-hidden="true" />
      <Reveal as="h2" id="school-film-caption" className="relative mx-auto max-w-5xl px-6 text-center text-[clamp(2rem,4.5vw,4.5rem)] leading-[1.6] font-black text-balance drop-shadow-lg sm:px-10">
        {schoolVideo.caption[language]}
      </Reveal>
    </section>
  );
}
