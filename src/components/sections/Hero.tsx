import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Cta } from "@/components/ui/Cta";
import { Button } from "@/components/ui/Button";
import { HeroMedia } from "./HeroMedia";
import { hero } from "@/content/copy";
import { ANCHORS, isOpen } from "@/config/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Decorative shapes */}
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-56 h-[34rem] w-[34rem] rounded-full bg-brand-pink/35 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-48 -left-32 h-[28rem] w-[28rem] rounded-full bg-brand-teal-pale/80 blur-3xl" />

      <Container className="relative grid items-center gap-12 pb-16 pt-10 sm:pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-24 lg:pt-16">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-brand-teal-dark shadow-card ring-1 ring-brand-linen">
            <span aria-hidden className="h-2 w-2 rounded-full bg-brand-rose" />
            {hero.eyebrow}
          </p>
          <h1 className="text-[2.6rem] leading-[1.05] text-brand-ink sm:text-5xl lg:text-[3.6rem]">
            {hero.headline[0]}
            <br />
            <span className="text-brand-teal-dark">{hero.headline[1]}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-muted">{hero.subheadline}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Cta labelOpen={hero.ctaOpen} labelWaitlist={hero.ctaWaitlist} />
            <Button href={`#${ANCHORS.course}`} variant="ghost" size="lg">
              {hero.secondaryCta}
            </Button>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-brand-ink/85">
            {hero.proofs.map((p) => (
              <li key={p} className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-teal-pale text-brand-teal-dark">
                  <Check aria-hidden className="h-3 w-3" />
                </span>
                {p}
              </li>
            ))}
          </ul>

          {!isOpen ? <p className="mt-6 max-w-lg text-sm leading-relaxed text-brand-muted">{hero.waitlistNote}</p> : null}
        </div>

        <HeroMedia />
      </Container>

      {/* Numbers strip */}
      <Container className="relative pb-6">
        <dl className="grid grid-cols-2 divide-brand-linen rounded-3xl bg-white shadow-card ring-1 ring-brand-linen sm:grid-cols-4 sm:divide-x">
          {hero.stats.map((s) => (
            <div key={s.label} className="flex flex-col px-5 py-5 text-center sm:py-6">
              <dt className="order-2 text-xs font-medium leading-snug text-brand-muted">{s.label}</dt>
              <dd className="font-display text-3xl text-brand-teal-dark sm:text-4xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
