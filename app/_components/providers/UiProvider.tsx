"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { translations, type Language, type Translations } from "@/lib/i18n";

type UiContextValue = {
  language: Language;
  darkMode: boolean;
  t: Translations;
  toggleLanguage: () => void;
  toggleDarkMode: () => void;
};

const UiContext = createContext<UiContextValue | null>(null);
const preferenceEvent = "maali-preference-change";

function subscribe(callback: () => void) {
  window.addEventListener(preferenceEvent, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(preferenceEvent, callback);
    window.removeEventListener("storage", callback);
  };
}

function emitPreferenceChange() {
  window.dispatchEvent(new Event(preferenceEvent));
}

function getLanguageSnapshot(): Language {
  return localStorage.getItem("maali-language") === "en" ? "en" : "ar";
}

function getServerLanguageSnapshot(): Language {
  return "ar";
}

function getThemeSnapshot() {
  const savedTheme = localStorage.getItem("maali-theme");
  return (
    savedTheme === "dark" ||
    (savedTheme === null && window.matchMedia("(prefers-color-scheme: dark)").matches)
  );
}

function updateLanguage(language: Language) {
  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  localStorage.setItem("maali-language", language);
}

function updateTheme(darkMode: boolean) {
  document.documentElement.classList.toggle("dark", darkMode);
  document.documentElement.style.colorScheme = darkMode ? "dark" : "light";
  localStorage.setItem("maali-theme", darkMode ? "dark" : "light");
}

export function UiProvider({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore(subscribe, getLanguageSnapshot, getServerLanguageSnapshot);
  const darkMode = useSyncExternalStore(subscribe, getThemeSnapshot, () => false);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const value = useMemo<UiContextValue>(
    () => ({
      language,
      darkMode,
      t: translations[language],
      toggleLanguage: () => {
        const nextLanguage = language === "ar" ? "en" : "ar";
        updateLanguage(nextLanguage);
        emitPreferenceChange();
      },
      toggleDarkMode: () => {
        const nextDarkMode = !darkMode;
        updateTheme(nextDarkMode);
        emitPreferenceChange();
      },
    }),
    [darkMode, language],
  );

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
}

export function useUi() {
  const context = useContext(UiContext);

  if (!context) {
    throw new Error("useUi must be used within UiProvider");
  }

  return context;
}
