import { Container } from "@/components/ui/Container";
import { BrandLogo } from "@/components/BrandLogo";
import { Year } from "@/components/ui/Year";
import { footer } from "@/content/copy";
import { LINKS } from "@/config/site";

function Icon({ d, className }: { d: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}
const INSTAGRAM = "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm5.25-1.25h.01";
const FACEBOOK = "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z";
const YOUTUBE = "M22.5 7.2a2.8 2.8 0 0 0-2-2C18.8 4.8 12 4.8 12 4.8s-6.8 0-8.5.4a2.8 2.8 0 0 0-2 2A29 29 0 0 0 1 12a29 29 0 0 0 .5 4.8 2.8 2.8 0 0 0 2 2c1.7.4 8.5.4 8.5.4s6.8 0 8.5-.4a2.8 2.8 0 0 0 2-2A29 29 0 0 0 23 12a29 29 0 0 0-.5-4.8zM9.8 15.1V8.9l5.6 3.1-5.6 3.1z";

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M12.04 2C6.5 2 3.5 5.7 3.5 9.7c0 2 .9 4.5 2.8 5.3.3.1.5 0 .6-.3l.3-1.1c.1-.3.1-.4-.1-.6-.6-.7-1-1.7-1-3 0-3.1 2.4-6.1 6.4-6.1 3.5 0 5.9 2.4 5.9 5.8 0 3.8-1.9 6.5-4.4 6.5-1.4 0-2.4-1.1-2.1-2.5.4-1.7 1.2-3.5 1.2-4.7 0-1.1-.6-2-1.8-2-1.4 0-2.6 1.5-2.6 3.5 0 1.3.4 2.1.4 2.1l-1.7 7.3c-.3 1.3-.1 3.2 0 4.4l.2.1c.4-.5 1.6-2.2 2-3.6l.8-3c.4.8 1.6 1.5 2.8 1.5 3.7 0 6.4-3.4 6.4-7.6C20.5 5.4 17 2 12.04 2z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-brand-linen bg-brand-linen/40 py-12">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <BrandLogo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-brand-muted">{footer.tagline}</p>
            <div className="mt-5 flex gap-3">
              <a href={LINKS.social.instagram} aria-label="Instagram" rel="noopener" className="rounded-full bg-white p-2 text-brand-teal-dark shadow-card transition-colors hover:bg-brand-pink">
                <Icon d={INSTAGRAM} className="h-5 w-5" />
              </a>
              <a href={LINKS.social.facebook} aria-label="Facebook" rel="noopener" className="rounded-full bg-white p-2 text-brand-teal-dark shadow-card transition-colors hover:bg-brand-pink">
                <Icon d={FACEBOOK} className="h-5 w-5" />
              </a>
              <a href={LINKS.social.youtube} aria-label="YouTube" rel="noopener" className="rounded-full bg-white p-2 text-brand-teal-dark shadow-card transition-colors hover:bg-brand-pink">
                <Icon d={YOUTUBE} className="h-5 w-5" />
              </a>
              <a href={LINKS.social.pinterest} aria-label="Pinterest" rel="noopener" className="rounded-full bg-white p-2 text-brand-teal-dark shadow-card transition-colors hover:bg-brand-pink">
                <PinterestIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          <nav aria-label="Legal and site links">
            <ul className="space-y-2 text-sm">
              {footer.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} rel="noopener" className="text-brand-ink/80 hover:text-brand-teal-dark">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="text-sm text-brand-muted">
            <p>
              Questions? Write to{" "}
              <a href={`mailto:${LINKS.supportEmail}`} className="font-medium text-brand-teal-dark underline-offset-2 hover:underline">
                {LINKS.supportEmail}
              </a>
            </p>
            <p className="mt-4 text-xs leading-relaxed">{footer.disclaimer}</p>
          </div>
        </div>

        <p className="mt-10 border-t border-brand-linen pt-6 text-xs text-brand-muted">
          © <Year /> {footer.rights}
        </p>
      </Container>
    </footer>
  );
}
