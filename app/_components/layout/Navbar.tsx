"use client";

import Image from "next/image";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useUi } from "../providers/UiProvider";

function RollingLabel({ children }: { children: string }) {
      return (
            <span className="inline-grid overflow-hidden whitespace-nowrap leading-8 perspective-[180px]">
                  <span className="col-start-1 row-start-1 origin-top [backface-visibility:hidden] transition-[transform,opacity] duration-650 ease-[cubic-bezier(.45,0,.2,1)] motion-reduce:transition-none motion-safe:group-focus-visible:-translate-y-full motion-safe:group-focus-visible:rotate-x-[80deg] motion-safe:group-focus-visible:opacity-0 motion-safe:group-hover:-translate-y-full motion-safe:group-hover:rotate-x-[80deg] motion-safe:group-hover:opacity-0">
                        {children}
                  </span>
                  <span
                        aria-hidden="true"
                        className="col-start-1 row-start-1 translate-y-full -rotate-x-[80deg] origin-bottom text-brand opacity-0 [backface-visibility:hidden] transition-[transform,opacity] duration-650 ease-[cubic-bezier(.45,0,.2,1)] motion-reduce:transition-none motion-safe:group-focus-visible:translate-y-0 motion-safe:group-focus-visible:rotate-x-0 motion-safe:group-focus-visible:opacity-100 motion-safe:group-hover:translate-y-0 motion-safe:group-hover:rotate-x-0 motion-safe:group-hover:opacity-100"
                  >
                        {children}
                  </span>
            </span>
      );
}

export default function Navbar() {
      const [menuOpen, setMenuOpen] = useState(false);
      const { darkMode, language, t, toggleDarkMode, toggleLanguage } = useUi();

      useEffect(() => {
            const closeMenu = () => setMenuOpen(false);
            window.addEventListener("resize", closeMenu);
            return () => window.removeEventListener("resize", closeMenu);
      }, []);

      const links = [
            { name: t.nav.home, href: "#home" },
            { name: t.nav.about, href: "#about" },
            { name: t.nav.stages, href: "#stages" },
            { name: t.nav.programs, href: "#programs" },
            { name: t.nav.activities, href: "#activities" },
            { name: t.nav.contact, href: "#contact" },
      ];

      return (
            <nav className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/90 shadow-sm backdrop-blur-xl" dir={language === "ar" ? "rtl" : "ltr"}>
                  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-20 items-center justify-between gap-4">
                              {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- Native section anchors avoid route prefetch and work before hydration. */}
                              <a href="/#home" className="shrink-0" aria-label={t.schoolName}>
                                    <Image
                                          src="/logo.png"
                                          alt={t.schoolName}
                                          width={150}
                                          height={60}
                                          sizes="144px"
                                          fetchPriority="low"
                                          className="hidden h-auto w-36 dark:brightness-0 dark:invert md:block"
                                    />
                                    <Image
                                          src="/mini_logo_display.png"
                                          alt={t.schoolName}
                                          width={40}
                                          height={40}
                                          sizes="40px"
                                          fetchPriority="low"
                                          className="block md:hidden"
                                    />
                              </a>

                              <div className="hidden items-center gap-5 lg:flex xl:gap-7">
                                    {links.map((link) => (
                                          <a
                                                key={link.href}
                                                href={`/${link.href}`}
                                                className="group inline-flex items-center py-2 text-sm font-semibold text-foreground/75 transition-colors hover:text-brand focus-visible:text-brand"
                                          >
                                                <RollingLabel>{link.name}</RollingLabel>
                                          </a>
                                    ))}
                              </div>

                              <div className="flex items-center gap-2">
                                    {/* Language */}
                                    <button
                                          type="button"
                                          onClick={toggleLanguage}
                                          aria-label={`${language === "ar" ? "EN" : "ع"} — ${t.actions.changeLanguage}`}
                                          title={t.actions.changeLanguage}
                                          className="flex size-10 shrink-0 items-center justify-center rounded-xl text-foreground/75 transition-colors hover:bg-accent hover:text-brand"
                                    >
                                          <span className="text-sm font-semibold leading-none">
                                                {language === "ar" ? "EN" : "ع"}
                                          </span>
                                    </button>

                                    {/* Dark Mode */}
                                    <button
                                          type="button"
                                          onClick={toggleDarkMode}
                                          aria-label={
                                                darkMode
                                                      ? t.actions.lightMode
                                                      : t.actions.darkMode
                                          }
                                          title={
                                                darkMode
                                                      ? t.actions.lightMode
                                                      : t.actions.darkMode
                                          }
                                          className="flex size-10 shrink-0 items-center justify-center rounded-xl text-foreground/75 transition-colors hover:bg-accent hover:text-brand"
                                    >
                                          {darkMode ? (
                                                <Sun className="size-5" />
                                          ) : (
                                                <Moon className="size-5" />
                                          )}
                                    </button>

                                    {/* Mobile Menu */}
                                    <button
                                          type="button"
                                          onClick={() => setMenuOpen((open) => !open)}
                                          aria-label={
                                                menuOpen
                                                      ? t.actions.closeMenu
                                                      : t.actions.openMenu
                                          }
                                          aria-expanded={menuOpen}
                                          aria-controls="mobile-navigation"
                                          className="flex size-10 shrink-0 items-center justify-center rounded-xl text-foreground/75 transition-colors hover:bg-accent lg:hidden"
                                    >
                                          {menuOpen ? (
                                                <X className="size-5" />
                                          ) : (
                                                <Menu className="size-5" />
                                          )}
                                    </button>
                              </div>
                        </div>

                        {menuOpen && (
                              <div id="mobile-navigation" className="border-t border-border py-3 lg:hidden">
                                    <div className="grid gap-1 pb-2">
                                          {links.map((link) => (
                                                <a
                                                      key={link.href}
                                                      href={`/${link.href}`}
                                                      onClick={() => setMenuOpen(false)}
                                                      className="group inline-flex items-center rounded-xl px-4 py-3 text-sm font-semibold text-foreground/80 transition-colors hover:bg-accent hover:text-brand focus-visible:text-brand"
                                                >
                                                      <RollingLabel>{link.name}</RollingLabel>
                                                </a>
                                          ))}
                                    </div>
                              </div>
                        )}
                  </div>
            </nav>
      );
}
