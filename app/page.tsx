"use client";

import Image, { getImageProps } from "next/image";
import schoolMark from "@/public/mini_logo_display.png";
import { useUi } from "./_components/providers/UiProvider";
import BrandStory from "./_components/ui/BrandStory";
import HeroParticles from "./_components/ui/HeroParticles";
import SchoolsDialog from "./_components/ui/SchoolsDialog";
import SchoolVideo from "./_components/ui/SchoolVideo";
import SchoolNumbers from "./_components/ui/SchoolNumbers";
import EducationStages from "./_components/ui/EducationStages";
import FeaturedStudents from "./_components/ui/FeaturedStudents";
import SchoolAchievements from "./_components/ui/SchoolAchievements";
import SchoolPartners from "./_components/ui/SchoolPartners";
import ParentFeedback from "./_components/ui/ParentFeedback";
import ContactSection from "./_components/ui/ContactSection";
import SocialLinks from "./_components/ui/SocialLinks";
import Footer from "./_components/layout/Footer";
import SchoolOverview from "./_components/ui/SchoolOverview";
import CampusLife from "./_components/ui/CampusLife";
import SchoolMedia from "./_components/ui/SchoolMedia";
import AdmissionsSection from "./_components/ui/AdmissionsSection";
import SchoolHelp from "./_components/ui/SchoolHelp";

const heroImageSizes = "(min-width: 1024px) and (max-height: 760px) min(27vw, 304px), (min-width: 1024px) min(31vw, 400px), min(34vw, 192px)";
const { props: heroImage } = getImageProps({ src: schoolMark, alt: "", sizes: heroImageSizes });


export default function Home() {
  const { language, t } = useUi();

  return (
    <>
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

            <div className="mt-[clamp(1.5rem,3vh,2.25rem)] flex flex-wrap justify-center gap-3 lg:justify-start">
              <a href="#admissions" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-brand-solid px-6 py-3 text-sm font-black text-white">{language === "ar" ? "سجّل الآن" : "Register now"}</a>
              <a href="#contact" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-brand/30 bg-background px-6 py-3 text-sm font-black text-brand">{language === "ar" ? "تواصل معنا" : "Contact us"}</a>
            </div>
            <div className="mt-2"><SchoolsDialog compact /></div>

            <div className="mt-5"><SocialLinks /></div>
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

      <SchoolOverview />
      <BrandStory />
      <SchoolNumbers />
      <EducationStages />
      <CampusLife />
      <SchoolAchievements />
      <FeaturedStudents />
      <SchoolMedia />
      <SchoolPartners />
      <ParentFeedback />
      <AdmissionsSection />
      <SchoolHelp />
      <ContactSection />
    </main>
    <Footer />
    </>
  );
}
