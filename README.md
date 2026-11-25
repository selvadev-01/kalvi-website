# KALVI — marketing website

Bilingual (English / தமிழ்) landing page for the KALVI learning app.

**Live site:** https://kalvi-website.vercel.app
Next.js 14 (App Router) · TypeScript · Tailwind · GSAP ScrollTrigger · Lenis · Framer Motion · Lucide.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npx next start -p 3100
```

Set `NEXT_PUBLIC_SITE_URL` to the live domain before deploying (used for Open Graph URLs).

## Where things live

| What | File |
|---|---|
| All copy (English / Tamil) | `content/en.ts`, `content/ta.ts` (shape in `content/types.ts`) |
| Plans, FAQ, subjects, teachers, testimonials, stats | inside the same content files, as typed arrays |
| Lenis + GSAP sync, language context | `lib/providers.tsx` |
| Shared UI (page-turn reveal, titles with underline, buttons, counter, video, film modal, language toggle) | `components/ui.tsx` |
| Navbar · Hero · Ticker | `components/sections/top.tsx` |
| Why · How it works · Features · AI Tutor | `components/sections/story.tsx` |
| Subjects · Brand film · Teachers · Parents · Results | `components/sections/showcase.tsx` |
| Testimonials · Pricing · FAQ · Download · Footer | `components/sections/convert.tsx` |

In a title, wrap one word in `*asterisks*` to get the hand-drawn saffron underline.

## Assets (`public/`)

- `images/` hero.jpg, hero-mobile.jpg, ai-tutor.jpg, live-class.jpg, parent-report.jpg, offline.jpg, paper.jpg, phone-hand.png,
  `subjects/` maths, science, tamil, english, social, exams · `teachers/` t1–t3 · `avatars/` a1–a3
- `video/` hero-loop (mp4/webm/poster), how-it-works (mp4/webm/poster), brand-film (mp4/webm/poster),
  reel-ai-tutor, reel-live, reel-progress (mp4/poster)
- `og.jpg` 1200×630 social image

Images were generated locally with ComfyUI (Z-Image Turbo); videos were built with HyperFrames.
## Deployment

Live on Vercel (project `kalvi-website`): https://kalvi-website.vercel.app

## Before going live

- **Sample content:** teacher profiles, testimonials, student counts, ratings and the "Loved by 2,00,000+" line are placeholders. Replace them with real data.
- **People in photos are AI-generated.** Use real faculty photos once available.
- **Store links / QR code:** the Play Store and App Store buttons and the QR card point to `#download`. Add the real links and a real QR image.
- **Newsletter form** validates on the client only. Connect it to your email provider.
- **Brand film is silent:** add a music track and re-render if wanted.
