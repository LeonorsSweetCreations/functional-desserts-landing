import Image from "next/image";
import { ChefHat, MessageSquareText, PlayCircle, Send, Users, Video, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Cta } from "@/components/ui/Cta";
import { mentorship, hero } from "@/content/copy";
import { ANCHORS, IMAGES } from "@/config/site";

const icons: Record<string, LucideIcon> = {
  video: Video,
  "chef-hat": ChefHat,
  "play-circle": PlayCircle,
  "message-square-text": MessageSquareText,
  users: Users,
  send: Send,
};

export function Mentorship() {
  return (
    <section id={ANCHORS.mentorship} className="relative scroll-mt-20 overflow-hidden bg-brand-teal-dark py-16 text-white sm:py-24">
      <div aria-hidden className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-brand-teal/40 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-brand-pink/20 blur-3xl" />

      <Container className="relative">
        <SectionHeading eyebrow={mentorship.eyebrow} title={mentorship.title} intro={mentorship.intro} tone="dark" />

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Photo card */}
          <figure className="reveal relative overflow-hidden rounded-3xl shadow-card-lg ring-1 ring-white/15">
            <div className="relative aspect-[4/5] lg:h-full lg:min-h-[32rem]">
              <Image src={IMAGES.leonorKitchen} alt={mentorship.photoAlt} fill sizes="(min-width: 1024px) 35vw, 100vw" className="object-cover" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-brand-ink/75 via-brand-ink/10 to-transparent" />
            </div>
            <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-brand-rose shadow-card">
              <span aria-hidden className="h-2 w-2 animate-pulse rounded-full bg-brand-rose" />
              {mentorship.photoBadge}
            </span>
            <figcaption className="absolute inset-x-0 bottom-0 p-6 font-display text-xl leading-snug text-white sm:text-2xl">{mentorship.photoCaption}</figcaption>
          </figure>

          <div className="grid gap-4 sm:grid-cols-2">
            {mentorship.cards.map((c) => {
              const Icon = icons[c.icon] ?? Video;
              return (
                <article key={c.heading} className="reveal rounded-3xl bg-white/[0.08] p-6 ring-1 ring-white/10 backdrop-blur-sm">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-pink text-brand-ink">
                    <Icon aria-hidden className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-body text-base font-semibold sm:text-lg">{c.heading}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/80">{c.text}</p>
                </article>
              );
            })}
          </div>
        </div>

        <div className="reveal mt-8 rounded-3xl bg-white p-7 text-brand-ink shadow-card-lg sm:p-10">
          <h3 className="text-2xl">{mentorship.rhythmTitle}</h3>
          <ol className="mt-6 grid gap-6 sm:grid-cols-3">
            {mentorship.rhythm.map((r) => (
              <li key={r.label} className="border-l-4 border-brand-pink pl-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-teal-dark">{r.label}</p>
                <p className="mt-1 text-sm leading-relaxed text-brand-muted">{r.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-col gap-4 border-t border-brand-linen pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-brand-muted">{mentorship.footnote}</p>
            <Cta labelOpen={hero.ctaOpen} labelWaitlist={hero.ctaWaitlist} size="md" />
          </div>
        </div>
      </Container>
    </section>
  );
}
