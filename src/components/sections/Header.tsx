import { Container } from "@/components/ui/Container";
import { Cta } from "@/components/ui/Cta";
import { BrandLogo } from "@/components/BrandLogo";
import { nav } from "@/content/copy";
import { ANCHORS } from "@/config/site";

const links = [
  { label: nav.program, href: `#${ANCHORS.course}` },
  { label: nav.mentorship, href: `#${ANCHORS.mentorship}` },
  { label: nav.pricing, href: `#${ANCHORS.pricing}` },
  { label: nav.faq, href: `#${ANCHORS.faq}` },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-brand-linen/70 bg-brand-cream/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <BrandLogo />
        <nav aria-label="Page sections" className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-brand-ink/80 transition-colors hover:text-brand-teal-dark">
              {l.label}
            </a>
          ))}
        </nav>
        <Cta labelOpen={nav.ctaOpen} labelWaitlist={nav.ctaWaitlist} size="md" withArrow={false} />
      </Container>
    </header>
  );
}
