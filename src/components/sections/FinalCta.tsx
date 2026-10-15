import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Cta } from "@/components/ui/Cta";
import { finalCta } from "@/content/copy";
import { IMAGES } from "@/config/site";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden py-24 text-white sm:py-32">
      <Image src={IMAGES.finalCta} alt={finalCta.imageAlt} fill sizes="100vw" className="object-cover" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-brand-teal-dark/85 via-brand-teal-dark/70 to-brand-ink/80" />
      <Container className="relative max-w-3xl text-center">
        <h2 className="text-3xl leading-tight sm:text-4xl lg:text-5xl">{finalCta.title}</h2>
        <p className="mt-5 text-lg leading-relaxed text-white/85">{finalCta.text}</p>
        <div className="mt-9">
          <Cta labelOpen={finalCta.ctaOpen} labelWaitlist={finalCta.ctaWaitlist} />
        </div>
      </Container>
    </section>
  );
}
