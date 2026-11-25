"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { en } from "@/content/en";
import { ta } from "@/content/ta";
import type { Copy, Lang } from "@/content/types";

gsap.registerPlugin(ScrollTrigger);

/* ---------------- language ---------------- */

type LangCtx = { lang: Lang; t: Copy; setLang: (l: Lang) => void };
const LangContext = createContext<LangCtx>({ lang: "en", t: en, setLang: () => {} });
const STORE_KEY = "kalvi-lang";

export function useLang() {
  return useContext(LangContext);
}

/* ---------------- smooth scroll ---------------- */

type ScrollCtx = { lenis: Lenis | null; scrollTo: (target: string) => void };
const ScrollContext = createContext<ScrollCtx>({ lenis: null, scrollTo: () => {} });

export function useSmoothScroll() {
  return useContext(ScrollContext);
}

export function Providers({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // restore the remembered language (storage can be blocked: never let it break the page)
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORE_KEY);
      if (saved === "en" || saved === "ta") setLangState(saved);
    } catch {
      /* ignore */
    }
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = (lang === "ta" ? ta : en).meta.title;
    // copy length changes between languages: re-measure every trigger
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 60);
    return () => window.clearTimeout(id);
  }, [lang]);

  // Lenis <-> GSAP ScrollTrigger sync
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const instance = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenisRef.current = instance;
    setLenis(instance);
    instance.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();
    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback((target: string) => {
    const el = document.querySelector(target);
    if (!el) return;
    if (lenisRef.current) lenisRef.current.scrollTo(el as HTMLElement, { offset: -20, duration: 1.4 });
    else el.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <LangContext.Provider value={{ lang, t: lang === "ta" ? ta : en, setLang }}>
      <ScrollContext.Provider value={{ lenis, scrollTo }}>{children}</ScrollContext.Provider>
    </LangContext.Provider>
  );
}
