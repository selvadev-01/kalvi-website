"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Check, ClipboardCheck, Sparkles } from "lucide-react";
import { useLang } from "@/lib/providers";
import { AutoVideo, Container, Counter, Overline, Section, Title, cx } from "@/components/ui";

gsap.registerPlugin(ScrollTrigger);

/* ================= WHY ================= */

export function Why() {
  const { t } = useLang();
  return (
    <Section id="why">
      <Container className="grid items-center gap-14 lg:grid-cols-2">
        <div>
          <Overline>{t.why.overline}</Overline>
          <Title text={t.why.title} className="text-[clamp(2.2rem,4.6vw,4rem)]" />
          <p data-reveal className="mt-6 max-w-xl text-lg leading-relaxed text-ink/75">
            {t.why.body}
          </p>
        </div>
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] sm:aspect-square lg:ml-16">
            <Image data-kb src="/images/offline.jpg" alt="A girl studying on her phone on the steps of a village house" fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
          </div>
          <div className="relative -mt-24 space-y-3 px-4 sm:absolute sm:-bottom-8 sm:left-0 sm:mt-0 sm:w-80 sm:px-0">
            {t.why.stats.map((s) => (
              <div data-reveal key={s.label} className="rounded-2xl bg-paper p-5 shadow-[0_24px_60px_-28px_rgba(14,27,61,0.55)]">
                <Counter stat={s} className="font-display text-4xl font-bold text-ink" />
                <p className="mt-1 text-sm font-medium text-ink/70">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ================= HOW IT WORKS ================= */

export function HowItWorks() {
  const { t, lang } = useLang();
  const [active, setActive] = useState(0);
  const list = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const items = list.current?.querySelectorAll("li");
    if (!items) return;
    const triggers = Array.from(items).map((li, i) =>
      ScrollTrigger.create({ trigger: li, start: "top 62%", end: "bottom 38%", onToggle: (self) => self.isActive && setActive(i) }),
    );
    return () => triggers.forEach((s) => s.kill());
  }, [lang]);

  return (
    <Section id="how" tone="mist">
      <Container>
        <div className="max-w-2xl">
          <Overline>{t.how.overline}</Overline>
          <Title text={t.how.title} className="text-[clamp(2.2rem,4.6vw,4rem)]" />
        </div>
        <div className="mt-14 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div data-reveal className="overflow-hidden rounded-[2rem] border border-ink/10 bg-paper shadow-[0_30px_80px_-40px_rgba(14,27,61,0.5)]">
              <AutoVideo src="/video/how-it-works.mp4" webm="/video/how-it-works.webm" poster="/video/how-it-works-poster.jpg" label="Three steps of using KALVI" className="aspect-video w-full object-cover" />
            </div>
          </div>
          <ol ref={list} className="space-y-6 lg:py-10">
            {t.how.steps.map((s, i) => (
              <li
                data-reveal
                key={s.title}
                className={cx(
                  "rounded-3xl border p-7 transition-colors duration-500",
                  active === i ? "border-saffron bg-paper shadow-[0_20px_60px_-30px_rgba(14,27,61,0.4)]" : "border-ink/10 bg-transparent",
                )}
              >
                <span className={cx("font-display text-5xl font-bold transition-colors duration-500", active === i ? "text-saffron-ink" : "text-ink/25")}>0{i + 1}</span>
                <h3 className="mt-3 text-2xl font-bold">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-ink/70">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}

/* ================= FEATURES (bento) ================= */

function Card({ title, body, children, className }: { title: string; body: string; children: React.ReactNode; className?: string }) {
  return (
    <article
      data-reveal
      className={cx(
        "group relative flex flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-[0_20px_60px_-36px_rgba(14,27,61,0.55)] transition-transform duration-500 hover:-translate-y-1.5",
        className,
      )}
    >
      <div className="relative min-h-[180px] flex-1 overflow-hidden bg-mist">{children}</div>
      <div className="flex items-start justify-between gap-4 p-6">
        <div>
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="mt-1.5 text-[15px] leading-relaxed text-ink/70">{body}</p>
        </div>
        <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-saffron/15 text-saffron-ink transition-all duration-300 group-hover:rotate-45 group-hover:bg-saffron group-hover:text-ink">
          <ArrowUpRight size={18} />
        </span>
      </div>
    </article>
  );
}

export function Features() {
  const { t } = useLang();
  const [ai, live, tests, offline] = t.features.items;
  return (
    <Section id="features">
      <Container>
        <div className="max-w-2xl">
          <Overline>{t.features.overline}</Overline>
          <Title text={t.features.title} className="text-[clamp(2.2rem,4.6vw,4rem)]" />
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
          <Card title={t.features.big.title} body={t.features.big.body} className="md:col-span-2 lg:col-span-1 lg:row-span-2">
            <Image data-kb src="/images/subjects/science.jpg" alt="Science lesson still life" fill sizes="(min-width:1024px) 33vw, 100vw" className="object-cover" />
          </Card>
          <Card title={ai.title} body={ai.body}>
            <AutoVideo src="/video/reel-ai-tutor.mp4" poster="/video/reel-ai-tutor-poster.jpg" label="AI Tutor answering a doubt" className="absolute inset-0 h-full w-full object-cover object-[50%_45%]" />
          </Card>
          <Card title={live.title} body={live.body}>
            <Image data-kb src="/images/live-class.jpg" alt="Teacher in a live class" fill sizes="(min-width:1024px) 33vw, 100vw" className="object-cover" />
          </Card>
          <Card title={tests.title} body={tests.body}>
            <div className="absolute inset-0 flex items-center justify-center gap-5">
              <ClipboardCheck size={64} strokeWidth={1.5} className="text-ink" />
              <div>
                <p className="font-display text-6xl font-bold text-ink">
                  8<span className="text-ink/40">/10</span>
                </p>
                <div className="mt-2 flex gap-1">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <span key={i} className={cx("h-2 w-4 rounded-full", i < 8 ? "bg-leaf" : "bg-ink/15")} />
                  ))}
                </div>
              </div>
            </div>
          </Card>
          <Card title={offline.title} body={offline.body}>
            <Image data-kb src="/images/offline.jpg" alt="Studying offline in a village" fill sizes="(min-width:1024px) 33vw, 100vw" className="object-cover" />
          </Card>
        </div>
      </Container>
    </Section>
  );
}

/* ================= AI TUTOR SPOTLIGHT ================= */

export function AiTutor() {
  const { t, lang } = useLang();
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = (s: string) => el.querySelectorAll(s);
    const mm = gsap.matchMedia();
    const build = (tl: gsap.core.Timeline) => {
      tl.fromTo(q(".ct-q"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 })
        .fromTo(q(".ct-dots"), { opacity: 0 }, { opacity: 1, duration: 0.2 })
        .to(q(".ct-dots"), { opacity: 0, duration: 0.2 }, "+=0.3")
        .fromTo(q(".ct-a"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.3 })
        .fromTo(q(".ct-ta"), { opacity: 0, x: -12 }, { opacity: 1, x: 0, stagger: 0.35, duration: 0.35 })
        .fromTo(q(".ct-chip"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3 })
        .to(q(".ct-chip"), { backgroundColor: "#F2A33A", borderColor: "#F2A33A", duration: 0.2 }, "+=0.3")
        .to(q(".ct-ta"), { opacity: 0, duration: 0.25 })
        .fromTo(q(".ct-en"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.3 });
      return tl;
    };
    mm.add("(prefers-reduced-motion: no-preference) and (min-width: 1024px)", () => {
      build(gsap.timeline({ scrollTrigger: { trigger: el, start: "top top", end: "+=140%", scrub: 0.6, pin: true, anticipatePin: 1 } }));
    });
    mm.add("(prefers-reduced-motion: no-preference) and (max-width: 1023px)", () => {
      build(gsap.timeline({ scrollTrigger: { trigger: el, start: "top 60%" } }));
    });
    return () => mm.revert();
  }, [lang]);

  return (
    <Section id="ai-tutor" tone="ink" className="!py-0">
      <div ref={root} className="flex min-h-screen items-center py-20 lg:py-0">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[520px] overflow-hidden rounded-[2rem]">
            <Image src="/images/ai-tutor.jpg" alt="A phone glowing over an algebra notebook" fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-ink/55" />
            <div className="absolute inset-x-5 top-1/2 mx-auto max-w-[360px] -translate-y-1/2 rounded-[1.75rem] bg-paper p-5 text-ink shadow-2xl sm:inset-x-8">
              <div className="flex items-center gap-3 border-b border-ink/10 pb-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink">
                  <Sparkles size={18} className="text-saffron" />
                </span>
                <div>
                  <p className="font-bold leading-tight">{t.tutor.app}</p>
                  <p className="text-xs font-semibold text-leaf-ink">{t.tutor.online}</p>
                </div>
              </div>
              <div className="relative mt-4 min-h-[300px] text-[15px]">
                <p lang="ta" className="ct-q ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-ink px-4 py-3 text-paper">
                  {t.tutor.question}
                </p>
                <div className="ct-dots mt-3 flex w-16 gap-1.5 rounded-2xl bg-white px-4 py-3 opacity-0">
                  <span className="h-2 w-2 rounded-full bg-ink/40" />
                  <span className="h-2 w-2 rounded-full bg-ink/40" />
                  <span className="h-2 w-2 rounded-full bg-ink/40" />
                </div>
                <div className="ct-a relative -mt-11 rounded-2xl rounded-tl-md bg-white p-4">
                  <div className="relative grid">
                    <ol className="col-start-1 row-start-1 space-y-2.5" lang="ta">
                      {t.tutor.steps.map((s, i) => (
                        <li key={s} className="ct-ta flex gap-2.5">
                          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-saffron text-xs font-bold">{i + 1}</span>
                          {s}
                        </li>
                      ))}
                    </ol>
                    <ol className="col-start-1 row-start-1 space-y-2.5" lang="en" aria-hidden>
                      {t.tutor.stepsEn.map((s, i) => (
                        <li key={s} className="ct-en flex gap-2.5 opacity-0">
                          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-saffron text-xs font-bold">{i + 1}</span>
                          {s}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
                <span className="ct-chip mt-3 inline-flex rounded-full border-2 border-ink px-4 py-2 text-sm font-bold">{t.tutor.chip}</span>
              </div>
            </div>
          </div>

          <div>
            <Overline dark>{t.tutor.overline}</Overline>
            <Title text={t.tutor.title} className="text-[clamp(2.2rem,4.6vw,4rem)]" />
            <ul className="mt-8 space-y-4">
              {t.tutor.bullets.map((b) => (
                <li data-reveal key={b} className="flex gap-3 text-lg text-paper/85">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-saffron text-ink">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <p data-reveal className="mt-8 border-l-2 border-saffron pl-4 text-sm text-paper/65">
              {t.tutor.note}
            </p>
          </div>
        </Container>
      </div>
    </Section>
  );
}
