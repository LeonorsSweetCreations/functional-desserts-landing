import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { bonuses } from "@/content/copy";
import { ANCHORS, IMAGES, PRICING, type LaunchState } from "@/config/site";

export function Bonuses({ launch }: { launch: LaunchState }) {
  /** Euro values only while doors are open; the waiting list hears the prices first. */
  const isOpen = launch.open;
  return (
    <section id={ANCHORS.ebooks} className="scroll-mt-20 py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow={bonuses.eyebrow} title={bonuses.title} intro={bonuses.intro} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {bonuses.items.map((b, i) => (
            <article key={b.number} className="reveal flex flex-col overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-brand-linen/70">
              <div className="relative aspect-[2/3]">
                <Image src={IMAGES.bonuses[i % IMAGES.bonuses.length]} alt="" fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover object-center" />
                <span className="absolute left-3 top-3 rounded-full bg-brand-teal-dark px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-white">
                  Bonus {b.number}
                </span>
                {isOpen ? (
                  <span className="absolute right-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-brand-rose shadow-sm">
                    €{b.value} {bonuses.valueLabel}
                  </span>
                ) : null}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg leading-snug text-brand-ink">{b.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-muted">{b.outcome}</p>
              </div>
            </article>
          ))}
        </div>
        {isOpen ? (
          <p className="reveal mx-auto mt-8 inline-flex w-full max-w-md items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm text-brand-muted shadow-card ring-1 ring-brand-linen">
            {bonuses.totalLabel}: <span className="font-display text-xl text-brand-teal-dark">€{PRICING.bonusesValue}</span>
          </p>
        ) : null}
      </Container>
    </section>
  );
}
