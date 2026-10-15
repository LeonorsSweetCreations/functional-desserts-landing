import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { about } from "@/content/copy";
import { ANCHORS, IMAGES } from "@/config/site";

export function About() {
  const hasPortrait = fs.existsSync(path.join(process.cwd(), "public", IMAGES.leonorPortrait));

  return (
    <section id={ANCHORS.leonor} className="scroll-mt-20 bg-brand-sand/40 py-16 sm:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="reveal order-2 mx-auto w-full max-w-md lg:order-1 lg:max-w-none">
          <div className="photo-frame rounded-[2rem]">
            {hasPortrait ? (
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-card-lg">
                <Image src={IMAGES.leonorPortrait} alt={about.portraitAlt} fill sizes="(min-width: 1024px) 38vw, 100vw" className="object-cover" />
              </div>
            ) : (
              <div
                role="img"
                aria-label={about.portraitAlt}
                className="flex aspect-[4/5] w-full items-end rounded-[2rem] bg-gradient-to-br from-brand-sand via-brand-pink-soft to-brand-teal-pale p-8 shadow-card-lg"
              >
                <p className="font-display text-3xl italic text-brand-ink/70">{about.signature}</p>
              </div>
            )}
          </div>
          <div className="relative z-10 -mt-8 ml-6 mr-2 rounded-2xl bg-white p-4 shadow-card-lg ring-1 ring-brand-linen sm:ml-10">
            <p className="font-display text-2xl italic text-brand-ink">{about.signature}</p>
            <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.16em] text-brand-teal-dark">{about.eyebrow}</p>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <p className="eyebrow mb-3 text-brand-teal-dark">{about.eyebrow}</p>
          <h2 className="text-3xl leading-tight text-brand-ink sm:text-4xl lg:text-[2.75rem]">{about.title}</h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-brand-muted sm:text-lg">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {about.credentials.map((c) => (
              <li key={c} className="flex items-start gap-3 rounded-2xl bg-white px-4 py-3 text-sm text-brand-ink shadow-card ring-1 ring-brand-linen/70">
                <BadgeCheck aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
