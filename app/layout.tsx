import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, Noto_Sans_Tamil } from "next/font/google";
import { Providers } from "@/lib/providers";
import { en } from "@/content/en";
import "./globals.css";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", axes: ["opsz"], display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const tamil = Noto_Sans_Tamil({ subsets: ["tamil"], weight: ["400", "600", "700"], variable: "--font-tamil", display: "swap" });

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: en.meta.title,
  description: en.meta.description,
  openGraph: {
    title: en.meta.title,
    description: en.meta.description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "KALVI learning app" }],
    type: "website",
    locale: "en_IN",
    alternateLocale: ["ta_IN"],
  },
  twitter: { card: "summary_large_image", title: en.meta.title, description: en.meta.description, images: ["/og.jpg"] },
};

export const viewport: Viewport = { themeColor: "#0E1B3D" };

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "KALVI",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Android, iOS, Web",
    inLanguage: ["en", "ta"],
    description: en.meta.description,
    offers: en.pricing.plans.map((p) => ({ "@type": "Offer", name: p.name, price: p.month, priceCurrency: "INR" })),
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: en.faq.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  },
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${tamil.variable}`}>
      <body className="bg-paper font-sans text-ink antialiased">
        <a href="#main" className="sr-only z-[200] rounded-full bg-saffron px-5 py-3 font-bold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          {en.a11y.skip}
        </a>
        <Providers>{children}</Providers>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
