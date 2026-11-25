import { Hero, Navbar, Ticker } from "@/components/sections/top";
import { AiTutor, Features, HowItWorks, Why } from "@/components/sections/story";
import { BrandFilm, Parents, Results, Subjects, Teachers } from "@/components/sections/showcase";
import { Download, Faq, Footer, Pricing, Testimonials } from "@/components/sections/convert";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Ticker />
        <Why />
        <HowItWorks />
        <Features />
        <AiTutor />
        <Subjects />
        <BrandFilm />
        <Teachers />
        <Parents />
        <Results />
        <Testimonials />
        <Pricing />
        <Faq />
        <Download />
      </main>
      <Footer />
    </>
  );
}
