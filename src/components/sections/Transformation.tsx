import Image from "next/image";
import { Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { transformation } from "@/content/copy";
import { IMAGES } from "@/config/site";

export function Transformation() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeading title={transformation.title} />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {transformation.items.map((item) => (
            <article key={item.heading} className="reveal rounded-3xl bg-white p-7 shadow-card ring-1 ring-brand-linen/70 transition-transform duration-300 hover:-translate-y-1">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-teal-pale text-brand-teal-dark">
                <Sparkles aria-hidden className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-xl leading-snug text-brand-ink">{item.heading}</h3>
              <p className="mt-3 text-sm leading-relaxed text-brand-muted">{item.text}</p>
            </article>
          ))}
        </div>

        {/* Gallery of Leonor's own desserts. */}
        <div className="mt-20">
          <SectionHeading eyebrow={transformation.galleryEyebrow} title={transformation.galleryTitle} intro={transformation.galleryIntro} as="h3" />
          <ul className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {transformation.gallery.map((d, i) => (
              <li key={d.title} className="reveal group">
                <div className="relative aspect-square overflow-hidden rounded-3xl bg-brand-sand/40 shadow-card">
                  <Image
                    src={IMAGES.gallery[i % IMAGES.gallery.length]}
                    alt={d.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-brand-teal-dark shadow-sm">
                    {d.tag}
                  </span>
                </div>
                <p className="mt-3 font-display text-base leading-snug text-brand-ink sm:text-lg">{d.title}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
