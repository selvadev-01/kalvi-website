"use client";

import { useId, useState, type FormEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Apple, Check, Instagram, Mail, Minus, Play, Plus, QrCode, Youtube } from "lucide-react";
import { useLang } from "@/lib/providers";
import { AutoVideo, Button, Container, Overline, Section, Title, cx } from "@/components/ui";

/* ================= TESTIMONIALS ================= */

export function Testimonials() {
  const { t } = useLang();
  return (
    <Section id="testimonials" tone="mist">
      <Container>
        <div className="max-w-2xl">
          <Overline>{t.testimonials.overline}</Overline>
          <Title text={t.testimonials.title} className="text-[clamp(2.2rem,4.6vw,4rem)]" />
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {t.testimonials.items.map((r, i) => (
            <figure
              data-reveal
              key={r.name}
              className={cx("relative flex flex-col rounded-[1.75rem] bg-white p-8 shadow-[0_24px_60px_-36px_rgba(14,27,61,0.5)]", i === 1 && "md:translate-y-10")}
            >
              <span aria-hidden className="font-display text-8xl leading-[0.6] text-saffron">
                “
              </span>
              <blockquote className="mt-4 flex-1 text-lg leading-relaxed text-ink/85">{r.quote}</blockquote>
              <figcaption className="mt-8 flex items-center gap-3">
                <Image src={`/images/avatars/a${i + 1}.jpg`} alt="" width={48} height={48} className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <p className="font-bold">{r.name}</p>
                  <p className="text-sm text-ink/65">{r.meta}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-16 text-sm text-ink/60">{t.testimonials.note}</p>
      </Container>
    </Section>
  );
}

/* ================= PRICING ================= */

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export function Pricing() {
  const { t } = useLang();
  const [yearly, setYearly] = useState(false);
  const reduce = useReducedMotion();
  const p = t.pricing;
  return (
    <Section id="pricing">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Overline>{p.overline}</Overline>
            <Title text={p.title} className="text-[clamp(2.2rem,4.6vw,4rem)]" />
          </div>
          <div data-reveal role="group" aria-label={`${p.monthly} / ${p.yearly}`} className="flex items-center gap-1 rounded-full bg-ink/[0.06] p-1">
            {[false, true].map((y) => (
              <button
                key={String(y)}
                type="button"
                aria-pressed={yearly === y}
                onClick={() => setYearly(y)}
                className={cx(
                  "flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron",
                  yearly === y ? "bg-ink text-paper" : "text-ink/70 hover:text-ink",
                )}
              >
                {y ? p.yearly : p.monthly}
                {y && <span className="rounded-full bg-saffron px-2 py-0.5 text-[11px] text-ink">{p.save}</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {p.plans.map((plan, i) => {
            const featured = i === 1;
            const price = yearly ? plan.year : plan.month;
            return (
              <article
                data-reveal
                key={plan.name}
                className={cx(
                  "relative flex flex-col rounded-[1.75rem] p-8",
                  featured ? "bg-ink text-paper ring-2 ring-saffron lg:-my-4 lg:py-12" : "bg-white shadow-[0_24px_60px_-36px_rgba(14,27,61,0.45)]",
                )}
              >
                {featured && <span className="absolute -top-3.5 left-8 rounded-full bg-saffron px-4 py-1 text-xs font-bold text-ink">{p.popular}</span>}
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className={cx("mt-1 text-sm", featured ? "text-paper/70" : "text-ink/65")}>{plan.tagline}</p>
                <div className="mt-6 flex h-16 items-end gap-1 overflow-hidden">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={`${plan.name}-${price}`}
                      initial={reduce ? false : { y: "100%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={reduce ? undefined : { y: "-100%", opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="font-display text-6xl font-bold tabular-nums leading-none"
                    >
                      {inr(price)}
                    </motion.span>
                  </AnimatePresence>
                  {price > 0 && <span className={cx("pb-1 text-sm font-semibold", featured ? "text-paper/70" : "text-ink/60")}>{yearly ? p.perYear : p.perMonth}</span>}
                </div>
                <ul className="mt-8 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-3 text-[15px]">
                      <Check size={18} className={cx("mt-0.5 shrink-0", featured ? "text-saffron" : "text-leaf-ink")} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button href="#download" variant={featured ? "primary" : "ghost"} className="mt-10 w-full">
                  {plan.cta}
                </Button>
              </article>
            );
          })}
        </div>
        <p className="mt-10 text-center text-sm text-ink/65">{p.note}</p>
      </Container>
    </Section>
  );
}

/* ================= FAQ ================= */

export function Faq() {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  const reduce = useReducedMotion();
  return (
    <Section id="faq" tone="mist">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <Overline>{t.faq.overline}</Overline>
          <Title text={t.faq.title} className="text-[clamp(2.2rem,4.6vw,4rem)]" />
        </div>
        <div className="divide-y divide-ink/10 border-y border-ink/10">
          {t.faq.items.map((item, i) => {
            const isOpen = open === i;
            const id = `${base}-${i}`;
            return (
              <div data-reveal key={item.q}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={id}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
                  >
                    {item.q}
                    <span className={cx("flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors", isOpen ? "bg-saffron" : "bg-ink/[0.07]")}>
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={id}
                      role="region"
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 leading-relaxed text-ink/75">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

/* ================= DOWNLOAD ================= */

export function Download() {
  const { t } = useLang();
  const d = t.download;
  return (
    <Section id="download" tone="ink" className="overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -right-40 top-1/2 h-[700px] w-[700px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(242,163,58,0.35)_0%,rgba(242,163,58,0)_65%)]" />
      <Container className="relative grid items-center gap-14 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <Overline dark>{d.overline}</Overline>
          <Title text={d.title} className="text-[clamp(2.4rem,5vw,4.4rem)]" />
          <p data-reveal className="mt-6 max-w-lg text-lg text-paper/80">
            {d.sub}
          </p>
          <div data-reveal className="mt-10 flex flex-wrap items-center gap-4">
            <a href="#download" className="flex min-h-14 items-center gap-3 rounded-2xl bg-paper px-5 text-ink transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron">
              <Play size={22} className="fill-ink" />
              <span className="text-sm font-bold">{d.play}</span>
            </a>
            <a href="#download" className="flex min-h-14 items-center gap-3 rounded-2xl bg-paper px-5 text-ink transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron">
              <Apple size={22} />
              <span className="text-sm font-bold">{d.apple}</span>
            </a>
            <div className="flex items-center gap-3 rounded-2xl border border-paper/20 p-3 pr-5">
              <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-paper text-ink">
                <QrCode size={32} />
              </span>
              <div>
                <p className="text-sm font-bold">{d.scan}</p>
                <p className="text-xs text-paper/60">{d.scanNote}</p>
              </div>
            </div>
          </div>
          <p data-reveal className="mt-8 text-sm text-paper/65">
            {d.meta}
          </p>
        </div>
        <div className="flex justify-center">
          <div className="float relative aspect-[9/19] w-[270px] rounded-[3rem] border-[10px] border-[#050d22] bg-[#050d22] shadow-[0_60px_120px_-40px_rgba(0,0,0,0.8)] sm:w-[300px]">
            <div className="h-full w-full overflow-hidden rounded-[2.4rem] bg-paper">
              <AutoVideo src="/video/reel-progress.mp4" poster="/video/reel-progress-poster.jpg" label="KALVI progress screen" className="h-full w-full scale-[1.62] object-cover object-[50%_52%]" />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ================= FOOTER ================= */

export function Footer() {
  const { t } = useLang();
  const f = t.footer;
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "ok" | "bad">("idle");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setState(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ? "ok" : "bad");
  };
  return (
    <footer className="relative overflow-hidden bg-ink px-4 pb-10 pt-24 text-ink sm:px-6">
      <p aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 select-none text-center font-display text-[28vw] font-bold leading-[0.75] text-paper/[0.05]">
        KALVI
      </p>
      <div className="relative z-10 mx-auto max-w-6xl rounded-[2rem] bg-paper p-8 sm:p-12">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <p className="flex items-end gap-1 font-display text-3xl font-bold">
              KALVI<span className="mb-2 h-2 w-2 rounded-full bg-saffron" />
            </p>
            <form onSubmit={submit} noValidate className="mt-6">
              <label htmlFor="nl-email" className="text-sm font-bold">
                {f.newsletter}
              </label>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <input
                  id="nl-email"
                  type="email"
                  value={email}
                  onChange={(e) => (setEmail(e.target.value), setState("idle"))}
                  placeholder={f.placeholder}
                  aria-invalid={state === "bad"}
                  aria-describedby="nl-msg"
                  className="min-h-12 flex-1 rounded-full border border-ink/15 bg-white px-5 text-[15px] outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/40"
                />
                <Button type="submit">{f.subscribe}</Button>
              </div>
              <p id="nl-msg" role="status" className={cx("mt-2 min-h-5 text-sm font-semibold", state === "ok" ? "text-leaf-ink" : "text-[#b42318]")}>
                {state === "ok" ? f.success : state === "bad" ? f.invalid : ""}
              </p>
            </form>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {f.cols.map((c) => (
              <div key={c.title}>
                <p className="text-sm font-bold">{c.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a href="#top" className="text-sm text-ink/70 transition-colors hover:text-ink">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-ink/10 pt-6 text-sm text-ink/65 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2">
            <Mail size={16} /> {f.contact}
          </p>
          <div className="flex items-center gap-2">
            <a href="#top" aria-label="Instagram" className="flex h-10 w-10 items-center justify-center rounded-full bg-ink/[0.06] hover:bg-saffron">
              <Instagram size={18} />
            </a>
            <a href="#top" aria-label="YouTube" className="flex h-10 w-10 items-center justify-center rounded-full bg-ink/[0.06] hover:bg-saffron">
              <Youtube size={18} />
            </a>
          </div>
          <p>{f.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
