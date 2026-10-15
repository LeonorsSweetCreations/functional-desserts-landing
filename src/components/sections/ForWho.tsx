import { Check, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { forWho } from "@/content/copy";

export function ForWho() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <Container className="grid gap-8 lg:grid-cols-2">
        <div className="reveal rounded-[2rem] bg-brand-teal-pale/70 p-8 ring-1 ring-brand-teal-light/40 sm:p-10">
          <h2 className="text-2xl leading-snug text-brand-teal-dark sm:text-3xl">{forWho.title}</h2>
          <ul className="mt-6 space-y-4">
            {forWho.yes.map((t) => (
              <li key={t} className="flex gap-3 text-base leading-relaxed text-brand-ink">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-brand-teal-dark shadow-sm"><Check aria-hidden className="h-3.5 w-3.5" /></span>
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="reveal rounded-[2rem] bg-brand-pink-soft p-8 ring-1 ring-brand-pink/50 sm:p-10">
          <h2 className="text-2xl leading-snug text-brand-rose sm:text-3xl">{forWho.noTitle}</h2>
          <ul className="mt-6 space-y-4">
            {forWho.no.map((t) => (
              <li key={t} className="flex gap-3 text-base leading-relaxed text-brand-ink">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-brand-rose shadow-sm"><X aria-hidden className="h-3.5 w-3.5" /></span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
