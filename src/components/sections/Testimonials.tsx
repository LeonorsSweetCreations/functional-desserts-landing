import Image from "next/image";
import { Quote } from "lucide-react";
import { cacheLife } from "next/cache";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/content/copy";
import { IMAGES } from "@/config/site";
import { getPublishedTestimonials } from "@/lib/testimonials";
import { localTestimonials } from "@/content/testimonials";
import type { Testimonial } from "@/lib/leads-types";

/** Supabase first; the testimonials already published by Leonor when the table is empty. */
async function loadTestimonials(): Promise<Testimonial[]> {
  "use cache";
  cacheLife("hours");
  const fromDb = await getPublishedTestimonials();
  return fromDb.length > 0 ? fromDb : localTestimonials;
}

export async function Testimonials() {
  const items = await loadTestimonials();

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-24">
      <div aria-hidden className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-brand-pink-soft blur-3xl" />
      <Container className="relative">
        <SectionHeading eyebrow={testimonials.eyebrow} title={testimonials.title} intro={testimonials.intro} />

        {items.length > 0 ? (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((t) => (
              <figure key={t.id} className="reveal flex flex-col rounded-3xl bg-brand-cream/70 p-7 ring-1 ring-brand-linen">
                <Quote aria-hidden className="h-7 w-7 text-brand-pink" />
                {t.highlight ? <p className="mt-4 font-display text-xl leading-snug text-brand-ink">{t.highlight}</p> : null}
                <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-brand-muted">{t.text}</blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  {t.photo_url ? (
                    <Image src={t.photo_url} alt="" width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
                  ) : (
                    <span aria-hidden className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-teal-pale font-display text-brand-teal-dark">
                      {t.name.charAt(0)}
                    </span>
                  )}
                  <span className="text-sm font-semibold text-brand-ink">{t.name}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="reveal mx-auto mt-12 max-w-4xl">
            <div className="photo-frame rounded-3xl">
              <div className="overflow-hidden rounded-3xl bg-brand-cream shadow-card-lg ring-1 ring-brand-linen">
                <Image
                  src={IMAGES.testimonialsFallback}
                  alt={testimonials.fallbackAlt}
                  width={1600}
                  height={1000}
                  sizes="(min-width: 1024px) 896px, 100vw"
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
