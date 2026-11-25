// Every string on the site lives in en.ts / ta.ts with this shape.
// In titles, wrap one word in *asterisks* to give it the hand-drawn saffron underline.

export type Lang = "en" | "ta";

export type Stat = { value: number; decimals?: number; prefix?: string; suffix?: string; label: string };

export type Copy = {
  meta: { title: string; description: string };
  a11y: { skip: string; close: string; menu: string; playFilm: string; prev: string; next: string };
  nav: { links: { href: string; label: string }[]; login: string; cta: string };
  hero: { overline: string; title: string; sub: string; cta1: string; cta2: string; trust: string; rating: string };
  ticker: string[];
  why: { overline: string; title: string; body: string; stats: Stat[] };
  how: { overline: string; title: string; steps: { title: string; body: string }[] };
  features: {
    overline: string;
    title: string;
    big: { title: string; body: string };
    items: { title: string; body: string }[];
  };
  tutor: {
    overline: string;
    title: string;
    app: string;
    online: string;
    question: string;
    steps: string[];
    stepsEn: string[];
    chip: string;
    bullets: string[];
    note: string;
  };
  subjects: { overline: string; title: string; lessons: string; items: { name: string; line: string; count: string }[] };
  film: { overline: string; title: string; soundOn: string; soundOff: string; cta: string };
  teachers: { overline: string; title: string; items: { name: string; role: string; quote: string }[]; note: string };
  parents: {
    overline: string;
    title: string;
    bullets: string[];
    cta: string;
    card: { title: string; streak: string; days: string[]; subjects: { name: string; value: number }[]; overall: string };
  };
  results: { stats: Stat[]; note: string };
  testimonials: { overline: string; title: string; items: { name: string; meta: string; quote: string }[]; note: string };
  pricing: {
    overline: string;
    title: string;
    monthly: string;
    yearly: string;
    save: string;
    popular: string;
    perMonth: string;
    perYear: string;
    plans: { name: string; tagline: string; month: number; year: number; features: string[]; cta: string }[];
    note: string;
  };
  faq: { overline: string; title: string; items: { q: string; a: string }[] };
  download: { overline: string; title: string; sub: string; play: string; apple: string; scan: string; scanNote: string; meta: string };
  footer: {
    newsletter: string;
    placeholder: string;
    subscribe: string;
    success: string;
    invalid: string;
    cols: { title: string; links: string[] }[];
    contact: string;
    copyright: string;
  };
};
