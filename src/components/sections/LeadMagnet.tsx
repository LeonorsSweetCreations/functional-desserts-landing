import Image from "next/image";
import { Check, Download } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LeadForm } from "@/components/ui/LeadForm";
import { Button } from "@/components/ui/Button";
import { leadMagnet, forms } from "@/content/copy";
import { ANCHORS, IMAGES, LINKS, usesNativeForms } from "@/config/site";

export function LeadMagnet() {
  return (
    <section id={ANCHORS.leadMagnet} className="scroll-mt-20 bg-white py-16 sm:py-24">
      <Container>
        <div className="reveal grid gap-10 overflow-hidden rounded-[2rem] bg-brand-pink-soft p-7 sm:p-10 lg:grid-cols-[20rem_1fr_1fr] lg:items-center lg:gap-12">
          {/* Real mockup of the guide, supplied by Leonor on 2026-10-15. Transparent PNG with its own shadow. */}
          <div className="mx-auto w-full max-w-xs shrink-0 lg:w-80 lg:max-w-none">
            <Image src={IMAGES.guideCover} alt={leadMagnet.coverAlt} width={1024} height={822} sizes="(min-width: 1024px) 320px, 320px" className="h-auto w-full" />
          </div>

          <div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-brand-rose">
              <Download aria-hidden className="h-3.5 w-3.5" /> {leadMagnet.eyebrow}
            </p>
            <h2 className="text-3xl leading-tight text-brand-ink sm:text-4xl">{leadMagnet.title}</h2>
            <p className="mt-4 text-base leading-relaxed text-brand-muted">{leadMagnet.text}</p>
            <ul className="mt-6 space-y-2">
              {leadMagnet.bullets.map((b) => (
                <li key={b} className="flex items-center gap-2 text-sm font-medium text-brand-ink">
                  <Check aria-hidden className="h-4 w-4 text-brand-teal" /> {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-card sm:p-7">
            {usesNativeForms ? (
              <LeadForm source="free_guide" idPrefix="guide" buttonLabel={leadMagnet.cta} successTitle={forms.guideSuccessTitle} successText={forms.guideSuccessText} />
            ) : (
              <div className="flex h-full flex-col justify-center gap-4 text-center">
                <p className="text-sm leading-relaxed text-brand-muted">{leadMagnet.externalText}</p>
                <Button href={LINKS.freeGuidePage} size="lg" className="w-full">
                  {leadMagnet.cta}
                </Button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
