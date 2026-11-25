"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Quote, Volume2, VolumeX } from "lucide-react";
import { useLang } from "@/lib/providers";
import { AutoVideo, Button, Container, Counter, Overline, Section, Title, cx } from "@/components/ui";

gsap.registerPlugin(ScrollTrigger);

const SUBJECT_IMG = ["maths", "science", "tamil", "english", "social", "exams"];

/* ================= SUBJECTS (pinned horizontal scroll) ================= */

export function Subjects() {
  const { t, lang } = useLang();
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference) and (min-width: 1024px)", () => {
      const tr = track.current!;
      const dist = () => tr.scrollWidth - window.innerWidth + 64;
      const tl = gsap.timeline({
        scrollTrigger: { trigger: pin.current, start: "top top", end: () => `+=${dist()}`, scrub: 0.8, pin: true, invalidateOnRefresh: true, anticipatePin: 1 },
      });
      tl.to(tr, { x: () => -dist(), ease: "none" }, 0).fromTo(bar.current, { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0);
      tr.querySelectorAll("img").forEach((img, i) => {
        tl.fromTo(img, { xPercent: -6 - i }, { xPercent: 6 + i, ease: "none" }, 0);
      });
    });
    return () => mm.revert();
  }, [lang]);

  return (
    <Section id="subjects" className="!py-0">
      <div ref={pin} className="flex min-h-screen flex-col justify-center overflow-hidden py-20">
        <Container>
          <Overline>{t.subjects.overline}</Overline>
          <Title text={t.subjects.title} className="text-[clamp(2.2rem,4.6vw,4rem)]" />
        </Container>
        <div
          ref={track}
          className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:px-6 lg:w-max lg:snap-none lg:overflow-visible lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))] [&::-webkit-scrollbar]:hidden"
        >
          {t.subjects.items.map((s, i) => (
            <article data-reveal key={s.name} className="relative aspect-[3/4] w-[78vw] max-w-[340px] shrink-0 snap-start overflow-hidden rounded-[1.75rem] bg-ink lg:w-[340px]">
              <Image src={`/images/subjects/${SUBJECT_IMG[i]}.jpg`} alt="" fill sizes="340px" className="scale-[1.15] object-cover" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,27,61,0)_40%,rgba(14,27,61,0.92)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-paper">
                <span className="rounded-full bg-saffron px-3 py-1 text-xs font-bold text-ink">{s.count}</span>
                <h3 className="mt-3 font-display text-3xl font-semibold">{s.name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-paper/80">{s.line}</p>
              </div>
            </article>
          ))}
        </div>
        <Container className="hidden lg:block">
          <div className="mt-10 h-[2px] w-full bg-ink/10">
            <div ref={bar} className="h-full origin-left bg-saffron" style={{ transform: "scaleX(0)" }} />
          </div>
        </Container>
      </div>
    </Section>
  );
}

/* ================= BRAND FILM ================= */

const COL_A = ["/images/hero.jpg", "/images/subjects/maths.jpg", "/images/offline.jpg", "/images/subjects/tamil.jpg"];
const COL_B = ["/images/subjects/science.jpg", "/images/parent-report.jpg", "/images/subjects/english.jpg", "/images/live-class.jpg"];

function Column({ imgs, dir }: { imgs: string[]; dir: "up" | "down" }) {
  return (
    <div className="hidden h-[620px] w-48 shrink-0 overflow-hidden [mask-image:linear-gradient(180deg,transparent,#000_18%,#000_82%,transparent)] xl:block">
      <div className={cx("flex flex-col gap-4", dir === "up" ? "col-up" : "col-down")}>
        {[...imgs, ...imgs].map((src, i) => (
          <div key={i} className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl">
            <Image src={src} alt="" fill sizes="192px" className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function BrandFilm() {
  const { t } = useLang();
  const video = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const toggle = () => {
    const v = video.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (v.paused) v.play().catch(() => {});
  };
  return (
    <Section id="film" tone="mist">
      <Container className="text-center">
        <Overline>{t.film.overline}</Overline>
        <Title text={t.film.title} className="mx-auto text-[clamp(2.2rem,4.6vw,4rem)]" />
      </Container>
      <div className="mx-auto mt-14 flex max-w-[1400px] items-center justify-center gap-6 px-4">
        <Column imgs={COL_A} dir="up" />
        <div data-reveal className="relative w-full max-w-4xl rounded-[1.75rem] border border-saffron/70 p-3">
          {["left-0 top-0 border-l-4 border-t-4 rounded-tl-[1.75rem]", "right-0 top-0 border-r-4 border-t-4 rounded-tr-[1.75rem]", "left-0 bottom-0 border-b-4 border-l-4 rounded-bl-[1.75rem]", "right-0 bottom-0 border-b-4 border-r-4 rounded-br-[1.75rem]"].map((c) => (
            <span key={c} aria-hidden className={cx("absolute h-10 w-10 border-saffron", c)} />
          ))}
          <div className="relative overflow-hidden rounded-[1.25rem] bg-ink">
            <AutoVideo videoRef={video} src="/video/brand-film.mp4" webm="/video/brand-film.webm" poster="/video/brand-film-poster.jpg" label={t.a11y.playFilm} className="aspect-video w-full object-cover" />
            <button
              type="button"
              onClick={toggle}
              aria-pressed={!muted}
              className="absolute bottom-4 right-4 flex min-h-11 items-center gap-2 rounded-full bg-ink/75 px-4 text-sm font-bold text-paper backdrop-blur hover:bg-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
            >
              {muted ? <VolumeX size={16} /> : <Volume2 size={16} />} {muted ? t.film.soundOff : t.film.soundOn}
            </button>
          </div>
        </div>
        <Column imgs={COL_B} dir="down" />
      </div>
      <div className="mt-12 text-center">
        <Button href="#download">{t.film.cta}</Button>
      </div>
    </Section>
  );
}

/* ================= TEACHERS ================= */

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: MouseEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(el, { rotateY: x * 10, rotateX: -y * 10, transformPerspective: 900, duration: 0.4, ease: "power2.out" });
  };
  const leave = () => ref.current && gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power3.out" });
  return (
    <div data-reveal>
      <div ref={ref} onMouseMove={move} onMouseLeave={leave} className="h-full will-change-transform">
        {children}
      </div>
    </div>
  );
}

export function Teachers() {
  const { t } = useLang();
  return (
    <Section id="teachers">
      <Container>
        <div className="max-w-2xl">
          <Overline>{t.teachers.overline}</Overline>
          <Title text={t.teachers.title} className="text-[clamp(2.2rem,4.6vw,4rem)]" />
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {t.teachers.items.map((p, i) => (
            <TiltCard key={p.name}>
              <article className="h-full overflow-hidden rounded-[1.75rem] bg-white shadow-[0_24px_60px_-36px_rgba(14,27,61,0.55)]">
                <div className="relative aspect-square overflow-hidden bg-mist">
                  <Image src={`/images/teachers/t${i + 1}.jpg`} alt={p.name} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">{p.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-saffron-ink">{p.role}</p>
                  <p className="mt-4 flex gap-2 font-display text-lg italic leading-snug text-ink/80">
                    <Quote size={18} className="mt-1 shrink-0 text-saffron" /> {p.quote}
                  </p>
                </div>
              </article>
            </TiltCard>
          ))}
        </div>
        <p className="mt-8 text-sm text-ink/60">{t.teachers.note}</p>
      </Container>
    </Section>
  );
}

/* ================= PARENTS ================= */

export function Parents() {
  const { t, lang } = useLang();
  const card = useRef<HTMLDivElement>(null);
  const c = t.parents.card;
  const overall = Math.round(c.subjects.reduce((a, s) => a + s.value, 0) / c.subjects.length);
  const CIRC = 2 * Math.PI * 52;

  useEffect(() => {
    const el = card.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 75%" } });
      tl.fromTo(el.querySelectorAll(".rp-day"), { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.07, duration: 0.3, ease: "back.out(2)" })
        .fromTo(el.querySelectorAll(".rp-bar"), { scaleX: 0 }, { scaleX: 1, stagger: 0.1, duration: 0.8, ease: "power3.out" }, 0.3)
        .fromTo(el.querySelector(".rp-ring"), { strokeDashoffset: CIRC }, { strokeDashoffset: CIRC * (1 - overall / 100), duration: 1.4, ease: "power2.inOut" }, 0.3);
    });
    return () => mm.revert();
  }, [lang, overall, CIRC]);

  return (
    <Section id="parents" tone="ink">
      <Container className="grid items-center gap-14 lg:grid-cols-2">
        <div className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
            <Image data-kb src="/images/parent-report.jpg" alt="A mother and son reading a progress report on a phone" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
          </div>
          <div ref={card} className="relative mx-4 -mt-20 rounded-[1.5rem] bg-paper p-6 text-ink shadow-2xl sm:absolute sm:-bottom-10 sm:-right-4 sm:mx-0 sm:mt-0 sm:w-[330px] lg:-right-10">
            <p className="text-sm font-bold">{c.title}</p>
            <div className="mt-4 flex items-center gap-5">
              <svg width="120" height="120" viewBox="0 0 120 120" className="shrink-0" role="img" aria-label={`${c.overall} ${overall}%`}>
                <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(14,27,61,0.1)" strokeWidth="12" />
                <circle className="rp-ring" cx="60" cy="60" r="52" fill="none" stroke="#2F9E6E" strokeWidth="12" strokeLinecap="round" strokeDasharray={CIRC} strokeDashoffset={CIRC * (1 - overall / 100)} transform="rotate(-90 60 60)" />
                <text x="60" y="60" textAnchor="middle" fill="#0E1B3D" fontSize="26" fontWeight="700">
                  {overall}%
                </text>
                <text x="60" y="80" textAnchor="middle" fill="#0E1B3D" fillOpacity="0.65" fontSize="12" fontWeight="600">
                  {c.overall}
                </text>
              </svg>
              <div className="flex-1 space-y-2.5">
                {c.subjects.map((s) => (
                  <div key={s.name}>
                    <div className="flex justify-between text-xs font-semibold">
                      <span>{s.name}</span>
                      <span>{s.value}</span>
                    </div>
                    <div className="mt-1 h-1.5 rounded-full bg-ink/10">
                      <div className="rp-bar h-full origin-left rounded-full bg-saffron" style={{ width: `${s.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-5 text-xs font-bold uppercase tracking-wider text-leaf-ink">{c.streak}</p>
            <div className="mt-2 flex gap-1.5">
              {c.days.map((d, i) => (
                <span key={i} className="rp-day flex h-8 flex-1 items-center justify-center rounded-lg bg-leaf-ink text-xs font-bold text-white">
                  {d}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="pt-6 sm:pt-12 lg:pt-0">
          <Overline dark>{t.parents.overline}</Overline>
          <Title text={t.parents.title} className="text-[clamp(2.2rem,4.6vw,4rem)]" />
          <ul className="mt-8 space-y-4">
            {t.parents.bullets.map((b) => (
              <li data-reveal key={b} className="flex gap-3 text-lg text-paper/85">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-saffron text-ink">
                  <Check size={14} strokeWidth={3} />
                </span>
                {b}
              </li>
            ))}
          </ul>
          <div data-reveal className="mt-10">
            <Button variant="ghost-dark" href="#download">
              {t.parents.cta}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ================= RESULTS ================= */

export function Results() {
  const { t } = useLang();
  return (
    <Section id="results" className="!py-16 lg:!py-20">
      <Container>
        <div className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
          {t.results.stats.map((s) => (
            <div data-reveal key={s.label} className="border-l-2 border-saffron pl-5">
              <Counter stat={s} className="block font-display text-[clamp(2.2rem,4.4vw,3.8rem)] font-bold leading-none" />
              <p className="mt-2 text-sm font-semibold text-ink/70">{s.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-sm text-ink/60">{t.results.note}</p>
      </Container>
    </Section>
  );
}
