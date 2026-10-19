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
import { getLaunchState } from "@/lib/launch";

export default async function ProgramPage() {
  const launch = await getLaunchState();
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-brand-teal-dark">
        Skip to content
      </a>
      <Header launch={launch} />
      <main id="main" className="flex-1">
        <Hero launch={launch} />
        <Pains />
        <Transformation />
        <ForWho />
        <Modules />
        <Mentorship launch={launch} />
        <Bonuses launch={launch} />
        <Suspense fallback={null}>
          <Testimonials />
        </Suspense>
        <About />
        <Pricing launch={launch} />
        <Faq launch={launch} />
        <LeadMagnet />
        <FinalCta launch={launch} />
      </main>
      <Footer />
      <StickyCta launch={launch} />
      <CookieBanner />
      <Analytics />
      <JsonLd launch={launch} />
      <RevealObserver />
    </>
  );
}
