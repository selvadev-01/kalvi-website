"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, Play, Star, X } from "lucide-react";
import { useLang, useSmoothScroll } from "@/lib/providers";
import { AutoVideo, Button, Container, FilmModal, LangToggle, Title, cx } from "@/components/ui";

gsap.registerPlugin(ScrollTrigger);

/* ================= NAVBAR ================= */

export function Navbar() {
  const { t } = useLang();
  const { scrollTo } = useSmoothScroll();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > last && y > 160);
      last = y;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (barRef.current) barRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    scrollTo(href);
  };

  return (
    <>
      <div aria-hidden className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-saffron" ref={barRef} style={{ transform: "scaleX(0)" }} />
      <header
        className={cx(
          "fixed inset-x-0 top-3 z-50 px-3 transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] sm:top-4",
          hidden && !open ? "-translate-y-[140%]" : "translate-y-0",
        )}
      >
        <nav
          aria-label="Main"
          className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 rounded-full border border-ink/10 bg-paper/75 pl-5 pr-2 shadow-[0_12px_40px_-24px_rgba(14,27,61,0.5)] backdrop-blur-xl"
        >
          <a href="#top" onClick={(e) => (e.preventDefault(), go("#top"))} className="flex items-end gap-1 font-display text-2xl font-bold text-ink">
            KALVI<span className="mb-1.5 h-2 w-2 rounded-full bg-saffron" />
          </a>
          <ul className="hidden items-center gap-1 lg:flex">
            {t.nav.links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => (e.preventDefault(), go(l.href))}
                  className="rounded-full px-3 py-2 text-sm font-semibold text-ink/75 transition-colors hover:bg-ink/5 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <LangToggle />
            </div>
            <a href="#download" onClick={(e) => (e.preventDefault(), go("#download"))} className="hidden px-2 text-sm font-semibold text-ink/75 hover:text-ink md:block">
              {t.nav.login}
            </a>
            <Button href="#download" className="hidden min-h-11 px-5 text-sm sm:inline-flex">
              {t.nav.cta}
            </Button>
            <button
              type="button"
              aria-label={t.a11y.menu}
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-paper lg:hidden"
            >
              <Menu size={20} />
            </button>
          </div>
        </nav>
      </header>

      {open && (
        <div className="fixed inset-0 z-[70] flex flex-col bg-ink px-6 pb-10 pt-6 text-paper" role="dialog" aria-modal="true">
          <div className="flex items-center justify-between">
            <span className="font-display text-2xl font-bold">KALVI</span>
            <button type="button" aria-label={t.a11y.close} onClick={() => setOpen(false)} className="flex h-11 w-11 items-center justify-center rounded-full bg-paper/10">
              <X size={20} />
            </button>
          </div>
          <ul className="mt-12 space-y-2">
            {t.nav.links.map((l, i) => (
              <li key={l.href} className="menu-in" style={{ animationDelay: `${i * 60}ms` }}>
                <a href={l.href} onClick={(e) => (e.preventDefault(), go(l.href))} className="block py-2 font-display text-4xl font-semibold">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-wrap items-center gap-3">
            <LangToggle dark />
            <Button href="#download" onClick={() => setOpen(false)}>
              {t.nav.cta}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

/* ================= HERO ================= */

export function Hero() {
  const { t, lang } = useLang();
  const [film, setFilm] = useState(false);
  const root = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const words = root.current!.querySelectorAll("[data-word]");
      gsap.fromTo(words, { yPercent: 110 }, { yPercent: 0, duration: 1.1, ease: "power4.out", stagger: 0.05, delay: 0.2 });
      gsap.fromTo(root.current!.querySelectorAll(".u-path"), { strokeDashoffset: 260 }, { strokeDashoffset: 0, duration: 1, ease: "power2.out", delay: 1 });
      gsap.fromTo(root.current!.querySelectorAll("[data-hero-in]"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.1, delay: 0.5 });
    });
    mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top top", end: "+=60%", scrub: true, pin: true, anticipatePin: 1 },
      });
      tl.fromTo(frame.current, { clipPath: "inset(0px 0px 0px 0px round 0px)" }, { clipPath: "inset(24px 24px 24px 24px round 28px)", ease: "none" }, 0);
      tl.fromTo(copy.current, { yPercent: 0 }, { yPercent: -18, ease: "none" }, 0);
    });
    return () => mm.revert();
  }, [lang]);

  return (
    <section ref={root} id="top" className="relative min-h-[100svh] overflow-hidden bg-paper md:h-[100svh] md:min-h-[640px]">
      <div ref={frame} className="absolute inset-0 overflow-hidden bg-ink">
        <Image src="/images/hero-mobile.jpg" alt="" fill priority sizes="100vw" className="object-cover md:hidden" />
        <div className="absolute inset-0 hidden md:block">
          <AutoVideo
            src="/video/hero-loop.mp4"
            webm="/video/hero-loop.webm"
            poster="/video/hero-loop-poster.jpg"
            label="A student studying at her desk at dusk"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(14,27,61,0.92)_0%,rgba(14,27,61,0.72)_38%,rgba(14,27,61,0.05)_70%)] max-md:bg-[linear-gradient(180deg,rgba(14,27,61,0.2)_0%,rgba(14,27,61,0.55)_45%,rgba(14,27,61,0.95)_100%)]" />
      </div>

      <Container className="relative flex min-h-[100svh] items-end pb-14 pt-32 md:h-full md:min-h-0 md:items-center md:pb-0 md:pt-0">
        <div ref={copy} className="max-w-2xl text-paper md:pt-24">
          <p data-hero-in className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-saffron">
            {t.hero.overline}
          </p>
          <Title as="h1" text={t.hero.title} className="text-[clamp(2.5rem,5vw,4.5rem)]" />
          <p data-hero-in className="mt-6 max-w-xl text-base leading-relaxed text-paper/85 sm:text-lg">
            {t.hero.sub}
          </p>
          <div data-hero-in className="mt-8 flex flex-wrap gap-3">
            <Button href="#download">{t.hero.cta1}</Button>
            <Button variant="ghost-dark" onClick={() => setFilm(true)}>
              <Play size={16} className="fill-current" /> {t.hero.cta2}
            </Button>
          </div>
          <div data-hero-in className="mt-10 flex flex-wrap items-center gap-4">
            <div className="flex -space-x-3">
              {["a1", "a2", "a3"].map((a) => (
                <Image key={a} src={`/images/avatars/${a}.jpg`} alt="" width={44} height={44} className="h-11 w-11 rounded-full border-2 border-ink object-cover" />
              ))}
            </div>
            <div className="text-sm">
              <p className="font-semibold">{t.hero.trust}</p>
              <p className="flex items-center gap-1 text-paper/75">
                <Star size={14} className="fill-saffron text-saffron" /> {t.hero.rating}
              </p>
            </div>
          </div>
        </div>
      </Container>
      <FilmModal open={film} onClose={() => setFilm(false)} />
    </section>
  );
}

/* ================= TICKER ================= */

export function Ticker() {
  const { t } = useLang();
  const { lenis } = useSmoothScroll();
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !track.current) return;
    const tween = gsap.to(track.current, { xPercent: -50, duration: 38, ease: "none", repeat: -1 });
    const onScroll = (e: { velocity: number }) => {
      gsap.to(tween, { timeScale: 1 + Math.min(Math.abs(e.velocity) / 6, 4), duration: 0.3, overwrite: true });
      gsap.to(tween, { timeScale: 1, duration: 1.2, delay: 0.3, ease: "power2.out" });
    };
    lenis?.on("scroll", onScroll);
    return () => {
      lenis?.off("scroll", onScroll);
      tween.kill();
    };
  }, [lenis, t.ticker]);

  const row = (key: string, hide?: boolean) => (
    <div key={key} className="flex shrink-0 items-center" aria-hidden={hide}>
      {t.ticker.map((w, i) => (
        <span key={i} className="flex items-center whitespace-nowrap px-6 font-display text-2xl font-semibold text-saffron sm:text-3xl">
          {w}
          <span className="ml-12 text-base text-paper/40">✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="overflow-hidden bg-ink py-6" aria-label={t.ticker.join(", ")}>
      <div ref={track} className="flex w-max">
        {row("a")}
        {row("b", true)}
      </div>
    </div>
  );
}
