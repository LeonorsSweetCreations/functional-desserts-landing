import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Accordion } from "@/components/ui/Accordion";
import { modules } from "@/content/copy";
import { ANCHORS, IMAGES } from "@/config/site";

export function Modules() {
  return (
    <section id={ANCHORS.course} className="scroll-mt-20 bg-brand-sand/40 py-16 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <h2 className="text-3xl leading-tight text-brand-ink sm:text-4xl lg:text-[2.75rem]">{modules.title}</h2>
          <p className="mt-4 text-base leading-relaxed text-brand-muted sm:text-lg">{modules.intro}</p>

          <div className="reveal mt-8 overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-brand-linen">
            <div className="relative aspect-[16/10]">
              <Image src={IMAGES.modules} alt={modules.imageAlt} fill sizes="(min-width: 1024px) 35vw, 100vw" className="object-cover" />
            </div>
            <dl className="grid grid-cols-3 divide-x divide-brand-linen">
              {modules.sideStats.map((s) => (
                <div key={s.label} className="px-3 py-4 text-center sm:px-4">
                  <dd className="font-display text-2xl text-brand-teal-dark sm:text-3xl">{s.value}</dd>
                  <dt className="mt-1 text-[0.7rem] leading-snug text-brand-muted">{s.label}</dt>
                </div>
              ))}
            </dl>
            <p className="border-t border-brand-linen bg-brand-cream/60 px-5 py-3 text-center text-xs font-semibold text-brand-teal-dark">{modules.keepNote}</p>
          </div>
        </div>

        <div className="reveal">
          <Accordion
            defaultOpenId="module-01"
            items={modules.items.map((m) => ({
              id: `module-${m.number}`,
              summary: (
                <span className="flex items-start gap-4">
                  <span aria-hidden className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-pink-soft font-display text-lg text-brand-rose">
                    {m.number}
                  </span>
                  <span>
                    <span className="block font-display text-xl leading-snug text-brand-ink sm:text-2xl">{m.name}</span>
                    <span className="mt-1.5 block font-body text-sm leading-relaxed text-brand-muted sm:text-base">{m.outcome}</span>
                  </span>
                </span>
              ),
              details: (
                <ul className="ml-0 flex flex-wrap gap-2 pl-0 sm:ml-14">
                  {m.topics.map((t) => (
                    <li key={t} className="rounded-full bg-brand-cream px-3 py-1.5 text-sm text-brand-ink/85 ring-1 ring-brand-linen">
                      {t}
                    </li>
                  ))}
                </ul>
              ),
            }))}
          />
        </div>
      </Container>
    </section>
  );
}
