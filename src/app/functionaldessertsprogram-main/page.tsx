import { Suspense } from "react";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Pains } from "@/components/sections/Pains";
import { Transformation } from "@/components/sections/Transformation";
import { ForWho } from "@/components/sections/ForWho";
import { Modules } from "@/components/sections/Modules";
import { Mentorship } from "@/components/sections/Mentorship";
import { Bonuses } from "@/components/sections/Bonuses";
import { Testimonials } from "@/components/sections/Testimonials";
import { About } from "@/components/sections/About";
import { Pricing } from "@/components/sections/Pricing";
import { Faq } from "@/components/sections/Faq";
import { LeadMagnet } from "@/components/sections/LeadMagnet";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { StickyCta } from "@/components/sections/StickyCta";
import { CookieBanner } from "@/components/CookieBanner";
import { Analytics } from "@/components/Analytics";
import { JsonLd } from "@/components/JsonLd";
import { RevealObserver } from "@/components/ui/Reveal";

export default function ProgramPage() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-brand-teal-dark">
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1">
        <Hero />
        <Pains />
        <Transformation />
        <ForWho />
        <Modules />
        <Mentorship />
        <Bonuses />
        <Suspense fallback={null}>
          <Testimonials />
        </Suspense>
        <About />
        <Pricing />
        <Faq />
        <LeadMagnet />
        <FinalCta />
      </main>
      <Footer />
      <StickyCta />
      <CookieBanner />
      <Analytics />
      <JsonLd />
      <RevealObserver />
    </>
  );
}
