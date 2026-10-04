"use client";

import Image, { getImageProps } from "next/image";
import { HeartHandshake, Lightbulb, Sparkles } from "lucide-react";
import schoolMark from "@/public/mini_logo_display.png";
import { useUi } from "./_components/providers/UiProvider";
import BrandStory from "./_components/ui/BrandStory";
import HeroParticles from "./_components/ui/HeroParticles";
import SchoolsDialog from "./_components/ui/SchoolsDialog";
import SchoolVideo from "./_components/ui/SchoolVideo";

const featureIcons = [Lightbulb, Sparkles, HeartHandshake];
const heroImageSizes = "(min-width: 1024px) and (max-height: 760px) min(27vw, 304px), (min-width: 1024px) min(31vw, 400px), min(34vw, 192px)";
const { props: heroImage } = getImageProps({ src: schoolMark, alt: "", sizes: heroImageSizes });

function InstagramLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14.2 8.2h3V4.3c-.52-.07-2.3-.23-4.4-.23-4.34 0-7.31 2.65-7.31 7.52v4.2H.58v4.36h4.91V31h6.02V20.15h4.71l.75-4.36h-5.46v-3.77c0-1.26.34-2.12 2.69-2.12Z" transform="scale(.72) translate(3 -1)" />
    </svg>
  );
}

function YoutubeLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22.5 7.2a3 3 0 0 0-2.1-2.12C18.55 4.58 12 4.58 12 4.58s-6.55 0-8.4.5A3 3 0 0 0 1.5 7.2 31 31 0 0 0 1 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.12c1.85.5 8.4.5 8.4.5s6.55 0 8.4-.5a3 3 0 0 0 2.1-2.12A31 31 0 0 0 23 12a31 31 0 0 0-.5-4.8ZM9.75 15.3V8.7L15.5 12l-5.75 3.3Z" />
    </svg>
  );
}

function WhatsappLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.4L3.5 20.5l1.4-4.2A8.5 8.5 0 1 1 20.5 11.7Z" />
      <path d="M8.2 7.7c.3-.4.7-.4 1-.1l1.1 1.5c.2.3.2.6 0 .9l-.6.8c.8 1.7 2 2.9 3.7 3.7l.8-.6c.3-.2.6-.2.9 0l1.5 1.1c.3.3.3.7-.1 1-1 .8-2.2 1-3.4.5a10.2 10.2 0 0 1-5.4-5.4c-.5-1.2-.3-2.4.5-3.4Z" />
    </svg>
  );
}

function SnapchatLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3.2c-3 0-5 2.1-5 5v2.1c0 .8-.4 1.3-1.2 1.6l-1.4.6c-.5.2-.5.9 0 1.1l1.9.8c.4.2.7.5.8.9.3 1.3 1.1 2 2.4 2.2.7.1 1.1.4 1.3 1 .2.4.6.6 1 .5.7-.2 1.3-.2 2 0 .4.1.8-.1 1-.5.2-.6.6-.9 1.3-1 1.3-.2 2.1-.9 2.4-2.2.1-.4.4-.7.8-.9l1.9-.8c.5-.2.5-.9 0-1.1l-1.4-.6c-.8-.3-1.2-.8-1.2-1.6V8.2c0-2.9-2-5-5-5Z" />
    </svg>
  );
}

function TiktokLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14.6 3h3.1a5.2 5.2 0 0 0 3.2 3.2v3.1a8.3 8.3 0 0 1-3.2-1.1v6.2a6.1 6.1 0 1 1-6.1-6.1h.9v3.2a3 3 0 1 0 2.1 2.9V3Z" />
    </svg>
  );
}

function XLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.24 2h3.31l-7.23 8.26L22.82 22h-6.66l-5.21-6.82L4.98 22H1.67l7.73-8.84L1.25 2H8.1l4.71 6.23L18.24 2Zm-1.16 17.93h1.83L7.1 3.96H5.13l11.95 15.97Z" />
    </svg>
  );
}

const socialChannels = [
  { label: "Facebook", Icon: FacebookLogo },
  { label: "Instagram", Icon: InstagramLogo },
  { label: "YouTube", Icon: YoutubeLogo },
  { label: "WhatsApp", Icon: WhatsappLogo },
  { label: "Snapchat", Icon: SnapchatLogo },
  { label: "TikTok", Icon: TiktokLogo },
  { label: "X (Twitter)", Icon: XLogo },
];

export default function Home() {
  const { language, t } = useUi();

  return (
    <main className="overflow-hidden pt-20" dir={language === "ar" ? "rtl" : "ltr"}>
      {/* Preload only where CSS displays the logo, using the exact image candidates. */}
      <link
        rel="preload"
        as="image"
        href={heroImage.src}
        imageSrcSet={heroImage.srcSet}
        imageSizes={heroImageSizes}
        media="(min-height: 740px), (min-width: 1024px) and (min-height: 501px)"
        fetchPriority="high"
      />
      <section
        id="home"
        className="relative isolate h-[calc(100vh-5rem)] scroll-mt-20 [@media(max-height:500px)]:h-auto [@media(max-height:500px)]:min-h-[calc(100dvh-5rem)]"
      >
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_right,var(--color-brand-soft),transparent_42%),radial-gradient(circle_at_bottom_left,var(--color-gold-soft),transparent_35%)]" />
        <HeroParticles />

        <div className="mx-auto grid h-full min-h-0 max-w-7xl content-center items-center gap-[clamp(1rem,4vh,3.5rem)] px-4 py-[clamp(1rem,4vh,3rem)] pb-[calc(clamp(1rem,4vh,3rem)+3.75rem)] text-center sm:px-6 lg:grid-cols-[.9fr_1.1fr] lg:px-8 lg:text-start">
          <div className="relative z-2 mx-auto w-full max-w-2xl lg:mx-0">
            <h1 className="mx-auto max-w-[18ch] text-center text-5xl leading-22 font-black tracking-tight text-balance text-brand rtl:tracking-normal lg:text-start lg:text-6xl ">
              {t.hero.schoolLabel}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-center text-[clamp(.95rem,1.35vw,1.15rem)] leading-[1.6] font-bold text-pretty text-muted-foreground lg:mx-0 lg:text-start">
              {t.hero.aboutTitle}
            </p>

            <div className="mt-[clamp(1.5rem,3vh,2.25rem)]">
              <SchoolsDialog />
            </div>

            <div className="mt-5 flex items-center justify-center gap-1.5 min-[481px]:gap-2.5 lg:justify-start" role="group" aria-label={t.hero.followUs}>
              {socialChannels.map(({ label, Icon }) => (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
                  title={label}
                  className="grid size-[2.45rem] cursor-pointer appearance-none place-items-center rounded-full border border-border bg-card/90 p-0 text-brand shadow-[0_.4rem_1.2rem_rgb(0_0_0_/_0.05)] backdrop-blur-lg transition-[color,background-color,border-color,transform] duration-180 hover:-translate-y-[.18rem] hover:border-brand hover:bg-brand hover:text-white focus-visible:-translate-y-[.18rem] focus-visible:border-brand focus-visible:bg-brand focus-visible:text-white focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-brand/30 min-[481px]:size-[2.8rem] [&_svg]:size-[1.05rem] min-[481px]:[&_svg]:size-[1.15rem]"
                >
                  <Icon />
                </button>
              ))}
            </div>
          </div>

          <div className="relative order-first grid min-w-0 place-items-center [@media(max-height:739px)]:max-lg:hidden lg:order-none [@media(max-height:500px)]:hidden">
            <div className="absolute aspect-square w-[min(48vw,16rem)] rounded-full bg-[radial-gradient(circle,var(--gold-soft),transparent_68%)] blur-[4px] lg:w-[min(38vw,31rem)]" aria-hidden="true" />
            {/* Keep hidden viewports on an inline source; the matching preload above
                is media-qualified so it never downloads an invisible logo. */}
            <picture className="relative block">
              <source
                media="(max-height: 500px), (max-width: 1023px) and (max-height: 739px)"
                srcSet="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='1'%20height='1'/%3E"
              />
              <Image
                src={schoolMark}
                alt={t.schoolName}
                className="relative h-auto w-[min(34vw,12rem)] drop-shadow-[0_1.75rem_2.5rem_rgb(28_89_84_/_0.14)] lg:w-[min(31vw,25rem)] [@media(min-width:1024px)_and_(max-height:760px)]:w-[min(27vw,19rem)]"
                loading="eager"
                fetchPriority="high"
                sizes={heroImageSizes}
              />
            </picture>
          </div>
        </div>

        <div
          className="absolute inset-x-0 bottom-0 z-20 h-[3.75rem] overflow-hidden border-y border-white/12 bg-[#1c5954] text-white shadow-[0_-.75rem_2rem_rgb(28_89_84_/_0.1)]"
          role="group"
          aria-label={t.hero.marquee.join("، ")}
        >
          <div
            className={`absolute top-0 left-0 flex h-full w-max [direction:ltr] will-change-transform motion-reduce:[animation-play-state:paused] hover:[animation-play-state:paused] ${language === "en" ? "[animation:marquee-scroll-english_28s_linear_infinite]" : "[animation:marquee-scroll_28s_linear_infinite]"}`}
            aria-hidden="true"
          >
            {[0, 1, 2, 3, 4, 5].map((copy) => (
              <div key={copy} className="flex h-full w-max shrink-0 items-center">
                {t.hero.marquee.map((item) => (
                  <span
                    key={`${copy}-${item}`}
                    className="relative inline-flex shrink-0 items-center justify-center px-[clamp(2.25rem,3.5vw,3.75rem)] text-[clamp(.82rem,1vw,.95rem)] font-extrabold whitespace-nowrap after:absolute after:top-1/2 after:right-0 after:size-[.48rem] after:translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:bg-[#d6aa48] after:content-['']"
                    dir={language === "ar" ? "rtl" : "ltr"}
                  >
                    {item}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <SchoolVideo />

      <BrandStory />

      <section id="about" className="scroll-mt-24 bg-muted/40 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black tracking-wide text-brand">{t.about.eyebrow}</p>
            <h2 className="mt-4 text-3xl font-black trackinظg-tight sm:text-5xl">{t.about.title}</h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">{t.about.description}</p>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {t.about.cards.map((card, index) => {
              const Icon = featureIcons[index];
              return (
                <article
                  key={card.title}
                  className="rounded-[2rem] border border-border/70 bg-card p-7 shadow-sm transition-transform hover:-translate-y-1"
                >
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-black">{card.title}</h3>
                  <p className="mt-3 leading-7 text-muted-foreground">{card.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="stages" className="h-px scroll-mt-24" aria-hidden="true" />
      <section id="programs" className="h-px scroll-mt-24" aria-hidden="true" />
      <section id="activities" className="h-px scroll-mt-24" aria-hidden="true" />

      <section id="contact" className="scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-7 rounded-[2.5rem] bg-brand-solid px-7 py-12 text-center text-white shadow-xl shadow-brand/15 sm:px-12 lg:flex-row lg:text-start">
          <div>
            <h2 className="text-3xl font-black sm:text-4xl">{t.cta.title}</h2>
            <p className="mt-3 text-white/90">{t.cta.description}</p>
          </div>
          <a
            href="mailto:info@maali-schools.com"
            className="shrink-0 rounded-2xl bg-white px-7 py-4 text-sm font-black text-brand-solid transition-transform hover:-translate-y-0.5"
          >
            {t.actions.contact}
          </a>
        </div>
      </section>
    </main>
  );
}
