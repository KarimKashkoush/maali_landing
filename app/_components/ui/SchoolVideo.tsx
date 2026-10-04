"use client";

import { useEffect, useRef, useState } from "react";
import { schoolVideo } from "@/lib/school-video";
import { useUi } from "../providers/UiProvider";

type YouTubePlayer = {
  mute: () => void;
  playVideo: () => void;
  destroy: () => void;
};

type YouTubeApi = {
  Player: new (
    element: HTMLElement,
    options: {
      videoId: string;
      playerVars: Record<string, string | number>;
      events: { onReady: (event: { target: YouTubePlayer }) => void };
    },
  ) => YouTubePlayer;
};

type YouTubeWindow = Window & {
  YT?: YouTubeApi;
  onYouTubeIframeAPIReady?: () => void;
};

let youtubeApiPromise: Promise<YouTubeApi> | undefined;

function loadYouTubeApi() {
  const youtubeWindow = window as YouTubeWindow;
  if (youtubeWindow.YT?.Player) return Promise.resolve(youtubeWindow.YT);
  if (!youtubeApiPromise) {
    youtubeApiPromise = new Promise<YouTubeApi>((resolve, reject) => {
      const previousReady = youtubeWindow.onYouTubeIframeAPIReady;
      youtubeWindow.onYouTubeIframeAPIReady = () => {
        previousReady?.();
        if (youtubeWindow.YT) resolve(youtubeWindow.YT);
      };
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      script.onerror = () => {
        youtubeApiPromise = undefined;
        reject(new Error("YouTube player could not load."));
      };
      document.head.appendChild(script);
    });
  }
  return youtubeApiPromise;
}

function getYouTubeId(source: string) {
  try {
    const url = new URL(source);
    const host = url.hostname.replace(/^www\./, "");
    const id = host === "youtu.be"
      ? url.pathname.split("/")[1]
      : ["youtube.com", "m.youtube.com", "youtube-nocookie.com"].includes(host)
        ? url.searchParams.get("v") || url.pathname.match(/^\/(?:embed|shorts)\/([^/]+)/)?.[1]
        : null;
    return id && /^[\w-]{11}$/.test(id) ? id : null;
  } catch {
    return null;
  }
}

export default function SchoolVideo() {
  const { language } = useUi();
  const sectionRef = useRef<HTMLElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const [loadVideo, setLoadVideo] = useState(false);
  const videoId = getYouTubeId(schoolVideo.source);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !schoolVideo.source) return;
    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && motion.matches) {
        setLoadVideo(true);
        observer.disconnect();
      }
    }, { rootMargin: "200px" });
    observer.observe(section);
    const onMotionChange = () => {
      if (!motion.matches) setLoadVideo(false);
      else observer.observe(section);
    };
    motion.addEventListener("change", onMotionChange);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", onMotionChange);
    };
  }, []);

  useEffect(() => {
    const host = playerRef.current;
    if (!loadVideo || !videoId || !host) return;
    let cancelled = false;
    let player: YouTubePlayer | undefined;
    // The API replaces its mount node; keep React's host node intact.
    const mount = document.createElement("div");
    mount.className = "size-full";
    host.appendChild(mount);
    void loadYouTubeApi().then((api) => {
      if (cancelled) return;
      player = new api.Player(mount, {
        videoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          loop: 1,
          playlist: videoId,
          playsinline: 1,
          disablekb: 1,
          fs: 0,
          rel: 0,
          origin: window.location.origin,
        },
        events: {
          onReady: ({ target }) => {
            if (cancelled) return;
            target.mute();
            target.playVideo();
          },
        },
      });
    }).catch((error: unknown) => {
      if (!cancelled) console.warn("School video unavailable; keeping the static background.", error);
    });
    return () => {
      cancelled = true;
      player?.destroy();
      host.replaceChildren();
    };
  }, [loadVideo, videoId]);

  return (
    <section
      id="school-film"
      ref={sectionRef}
      aria-labelledby="school-film-caption"
      className="relative isolate grid h-screen w-full scroll-mt-20 place-items-center overflow-hidden bg-brand-solid text-white [container-type:size]"
    >
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_25%_30%,var(--gold-soft),transparent_65%),linear-gradient(135deg,#1c5954,#102f2d)]" aria-hidden="true" />
      {loadVideo && schoolVideo.source && (
        videoId ? (
          <div
            ref={playerRef}
            aria-hidden="true"
            inert
            className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[max(100cqh,56.25cqw)] w-[max(100cqw,177.78cqh)] -translate-x-1/2 -translate-y-1/2 [&_iframe]:size-full"
          />
        ) : (
          <video
            src={schoolVideo.source}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            tabIndex={-1}
            className="pointer-events-none absolute inset-0 -z-10 size-full object-cover"
          />
        )
      )}
      <div className="pointer-events-none absolute inset-0 bg-black/65 shadow-[inset_0_0_8rem_rgb(0_0_0_/_0.55)]" aria-hidden="true" />
      <h2 id="school-film-caption" className="relative mx-auto max-w-5xl px-6 text-center text-[clamp(2rem,4.5vw,4.5rem)] leading-[1.6] font-black text-balance drop-shadow-lg sm:px-10">
        {schoolVideo.caption[language]}
      </h2>
    </section>
  );
}
