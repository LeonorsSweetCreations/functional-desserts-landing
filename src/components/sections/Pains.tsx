import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { pains } from "@/content/copy";
import { IMAGES } from "@/config/site";

export function Pains() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="text-3xl leading-tight text-brand-ink sm:text-4xl lg:text-[2.75rem]">{pains.title}</h2>
          <p className="mt-4 text-base leading-relaxed text-brand-muted sm:text-lg">{pains.intro}</p>
          <figure className="reveal mt-8 hidden lg:block">
            <div className="photo-frame rounded-3xl">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
                <Image src={IMAGES.pains} alt={pains.imageAlt} fill sizes="(min-width: 1024px) 35vw, 100vw" className="object-cover" />
              </div>
            </div>
            <figcaption className="mt-6 text-sm leading-relaxed text-brand-muted">{pains.imageCaption}</figcaption>
          </figure>
        </div>

        <div>
          <ol className="divide-y divide-brand-linen">
            {pains.items.map((item, i) => (
              <li key={item.heading} className="reveal flex gap-5 py-6 first:pt-0 sm:gap-7">
                <span aria-hidden className="font-display text-4xl leading-none text-brand-pink sm:text-5xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xl leading-snug text-brand-ink sm:text-2xl">{item.heading}</h3>
                  <p className="mt-2 text-base leading-relaxed text-brand-muted">{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="reveal mt-8 rounded-3xl bg-brand-teal-dark p-7 text-white sm:p-9">
            <p className="font-display text-2xl leading-snug sm:text-[1.7rem]">{pains.closing}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
