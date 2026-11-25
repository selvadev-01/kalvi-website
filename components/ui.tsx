"use client";

import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X } from "lucide-react";
import { useLang, useSmoothScroll } from "@/lib/providers";
import type { Stat } from "@/content/types";

gsap.registerPlugin(ScrollTrigger);

export const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");

/* ------------------------------------------------------------------ */
/* Signature "page-turn" entrance + masked words + underline + Ken Burns */
/* ------------------------------------------------------------------ */

export function useReveal(ref: RefObject<HTMLElement | null>, deps: unknown[] = []) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const st = { trigger: root, start: "top 78%" };
      const words = root.querySelectorAll("[data-word]");
      if (words.length) gsap.fromTo(words, { yPercent: 110 }, { yPercent: 0, duration: 0.9, ease: "power4.out", stagger: 0.035, scrollTrigger: st });
      const items = root.querySelectorAll("[data-reveal]");
      if (items.length)
        gsap.fromTo(
          items,
          { opacity: 0, y: 48, rotateX: 12, transformPerspective: 1000, transformOrigin: "50% 0%" },
          { opacity: 1, y: 0, rotateX: 0, duration: 1, ease: "power4.out", stagger: 0.08, scrollTrigger: st },
        );
      root.querySelectorAll<SVGPathElement>(".u-path").forEach((p) => {
        gsap.fromTo(p, { strokeDashoffset: 260 }, { strokeDashoffset: 0, duration: 0.9, ease: "power2.out", delay: 0.45, scrollTrigger: st });
      });
      root.querySelectorAll("[data-kb]").forEach((img) => {
        gsap.fromTo(img, { scale: 1.12 }, { scale: 1, ease: "none", scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: true } });
      });
    });
    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/** A page section that runs the reveal for everything inside it. */
export function Section({
  id,
  tone = "paper",
  className,
  children,
  label,
}: {
  id?: string;
  tone?: "paper" | "mist" | "ink";
  className?: string;
  children: ReactNode;
  label?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { lang } = useLang();
  useReveal(ref, [lang]);
  return (
    <section
      ref={ref}
      id={id}
      aria-label={label}
      className={cx(
        "relative py-20 lg:py-28",
        tone === "paper" && "bg-paper paper-tex text-ink",
        tone === "mist" && "bg-mist text-ink",
        tone === "ink" && "bg-ink text-paper",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}

export function Overline({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return (
    <p data-reveal className={cx("mb-4 text-xs font-bold uppercase tracking-[0.28em]", dark ? "text-saffron" : "text-saffron-ink")}>
      {children}
    </p>
  );
}

/** Title with per-word masks; *word* gets the hand-drawn saffron underline. */
export function Title({ text, as: Tag = "h2", className }: { text: string; as?: "h1" | "h2" | "h3"; className?: string }) {
  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean);
  return (
    <Tag className={cx("font-display font-semibold leading-[1.06] tracking-tight text-balance", className)}>
      {parts.map((part, i) => {
        const marked = part.startsWith("*") && part.endsWith("*");
        const words = (marked ? part.slice(1, -1) : part).split(/(\s+)/);
        return words.map((w, j) => {
          if (!w.trim()) return w;
          return (
            <span key={`${i}-${j}`} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
              <span data-word className={cx("relative inline-block", marked && "pr-1")}>
                {w}
                {marked && j === words.length - 1 && (
                  <svg aria-hidden className="absolute -bottom-[0.08em] left-0 h-[0.32em] w-full overflow-visible" viewBox="0 0 200 20" preserveAspectRatio="none">
                    <path className="u-path" d="M3 13 C50 5 110 18 197 8" fill="none" stroke="#F2A33A" strokeWidth="5" strokeLinecap="round" strokeDasharray="260" strokeDashoffset="0" vectorEffect="non-scaling-stroke" />
                  </svg>
                )}
              </span>
            </span>
          );
        });
      })}
    </Tag>
  );
}

/* ---------------- buttons ---------------- */

type BtnProps = { children: ReactNode; href?: string; onClick?: () => void; variant?: "primary" | "ghost" | "ghost-dark"; className?: string; type?: "button" | "submit" };

export function Button({ children, href, onClick, variant = "primary", className, type = "button" }: BtnProps) {
  const { scrollTo } = useSmoothScroll();
  const cls = cx(
    "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-bold transition-[transform,background-color,color,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron focus-visible:ring-offset-2 active:scale-[0.97]",
    variant === "primary" && "bg-saffron text-ink shadow-[0_10px_30px_-12px_rgba(242,163,58,0.9)] hover:-translate-y-0.5 hover:bg-[#f7b155]",
    variant === "ghost" && "border border-ink/25 text-ink hover:bg-ink hover:text-paper",
    variant === "ghost-dark" && "border border-paper/30 text-paper hover:bg-paper hover:text-ink",
    className,
  );
  if (href && href.startsWith("#")) {
    return (
      <a
        href={href}
        className={cls}
        onClick={(e) => {
          e.preventDefault();
          onClick?.();
          scrollTo(href);
        }}
      >
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

/* ---------------- counter ---------------- */

export function Counter({ stat, className }: { stat: Stat; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const fmt = (n: number) =>
    `${stat.prefix ?? ""}${n.toLocaleString("en-IN", { minimumFractionDigits: stat.decimals ?? 0, maximumFractionDigits: stat.decimals ?? 0 })}${stat.suffix ?? ""}`;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.textContent = fmt(stat.value);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const obj = { v: 0 };
    el.textContent = fmt(0);
    const tween = gsap.to(obj, {
      v: stat.value,
      duration: 1.8,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = fmt(stat.decimals ? obj.v : Math.round(obj.v));
      },
      scrollTrigger: { trigger: el, start: "top 88%" },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stat.value, stat.prefix, stat.suffix]);
  return (
    <span ref={ref} className={cx("tabular-nums", className)}>
      {fmt(stat.value)}
    </span>
  );
}

/* ---------------- video that only loads/plays near the viewport ---------------- */

export function AutoVideo({
  src,
  webm,
  poster,
  className,
  label,
  videoRef,
}: {
  src: string;
  webm?: string;
  poster: string;
  className?: string;
  label: string;
  videoRef?: RefObject<HTMLVideoElement>;
}) {
  const local = useRef<HTMLVideoElement>(null);
  const ref = videoRef ?? local;
  const [load, setLoad] = useState(false);
  const [still, setStill] = useState(false);
  useEffect(() => {
    setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setLoad(true);
          if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) el.play().catch(() => {});
        } else el.pause();
      },
      { rootMargin: "100% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return (
    <video ref={ref} className={className} poster={poster} muted loop playsInline preload="none" aria-label={label} autoPlay={!still}>
      {load && webm && <source src={webm} type="video/webm" />}
      {load && <source src={src} type="video/mp4" />}
    </video>
  );
}

/* ---------------- language toggle ---------------- */

export function LangToggle({ dark }: { dark?: boolean }) {
  const { lang, setLang } = useLang();
  return (
    <div role="group" aria-label="Language" className={cx("flex rounded-full p-1 text-xs font-bold", dark ? "bg-paper/10" : "bg-ink/[0.06]")}>
      {(["en", "ta"] as const).map((l) => (
        <button
          key={l}
          type="button"
          aria-pressed={lang === l}
          onClick={() => setLang(l)}
          className={cx(
            "min-h-9 rounded-full px-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron",
            lang === l ? "bg-saffron text-ink" : dark ? "text-paper/80 hover:text-paper" : "text-ink/70 hover:text-ink",
          )}
        >
          {l === "en" ? "EN" : <span lang="ta">தமிழ்</span>}
        </button>
      ))}
    </div>
  );
}

/* ---------------- brand-film modal ---------------- */

export function FilmModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useLang();
  const closeRef = useRef<HTMLButtonElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && boxRef.current) {
        const f = boxRef.current.querySelectorAll<HTMLElement>("button, video");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      prev?.focus();
    };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-4" onClick={onClose} role="dialog" aria-modal="true" aria-label={t.a11y.playFilm}>
      <div ref={boxRef} className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="absolute -top-14 right-0 flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-bold text-paper hover:bg-paper/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
        >
          {t.a11y.close} <X size={18} />
        </button>
        <video className="aspect-video w-full rounded-2xl bg-black" src="/video/brand-film.mp4" poster="/video/brand-film-poster.jpg" controls autoPlay playsInline />
      </div>
    </div>
  );
}
