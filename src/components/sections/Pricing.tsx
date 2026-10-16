import { Check, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Countdown } from "@/components/ui/Countdown";
import { LeadForm } from "@/components/ui/LeadForm";
import { pricing, forms } from "@/content/copy";
import { ANCHORS, LAUNCH_DATE, LINKS, isOpen, usesNativeForms } from "@/config/site";

function formatLaunchDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(d);
}

export function Pricing() {
  const launchDateText = LAUNCH_DATE ? formatLaunchDate(LAUNCH_DATE) : null;

  return (
    <section id={ANCHORS.pricing} className="scroll-mt-20 bg-white py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow={pricing.eyebrow} title={pricing.title} />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* What you get */}
          <div className="reveal rounded-3xl border border-brand-linen bg-brand-cream/60 p-7 sm:p-9">
            <ul className="divide-y divide-brand-linen">
              {pricing.includes.map((item) => (
                <li key={item.heading} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
                  <span className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${"highlight" in item && item.highlight ? "bg-brand-pink text-brand-ink" : "bg-brand-teal-pale text-brand-teal-dark"}`}>
                    <Check aria-hidden className="h-4 w-4" />
                  </span>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                      <h3 className={`font-body text-base font-semibold ${"highlight" in item && item.highlight ? "text-brand-teal-dark" : "text-brand-ink"}`}>{item.heading}</h3>
                      <span className="text-sm font-semibold text-brand-muted">{item.value}</span>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-brand-muted">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap items-baseline justify-between gap-2 border-t border-brand-linen pt-5">
              <p className="text-sm text-brand-muted">{pricing.totalValueLabel}</p>
              <p className="text-right">
                <span className="font-display text-2xl text-brand-ink line-through decoration-brand-rose/70">{pricing.totalValue}</span>
                <span className="block text-xs text-brand-muted">{pricing.totalValueNote}</span>
              </p>
            </div>
          </div>

          {/* Price card */}
          <div id={ANCHORS.waitlist} className="reveal scroll-mt-24 rounded-3xl bg-brand-teal-dark p-7 text-white shadow-card-lg sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-teal-light">{pricing.yourPriceLabel}</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/10 p-5 ring-1 ring-white/15">
                <p className="text-xs font-semibold uppercase tracking-wider text-white/70">{pricing.oneTime.label}</p>
                <p className="mt-2 font-display text-4xl">{pricing.oneTime.price}</p>
                <p className="mt-1 text-xs text-white/75">{pricing.oneTime.note}</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-5 ring-1 ring-white/15">
                <p className="text-xs font-semibold uppercase tracking-wider text-white/70">{pricing.plan.label}</p>
                <p className="mt-2 font-display text-3xl leading-tight">{pricing.plan.price}</p>
                <p className="mt-1 text-xs text-white/75">{pricing.plan.note}</p>
              </div>
            </div>

            {isOpen ? (
              <div className="mt-7">
                <Button href={LINKS.checkout} size="lg" className="w-full">
                  {pricing.ctaOpen}
                </Button>
                <p className="mt-3 text-center text-xs text-white/70">{pricing.secure}</p>
              </div>
            ) : (
              <div className="mt-7 rounded-2xl bg-white p-5 text-brand-ink sm:p-6">
                <h3 className="text-2xl">{pricing.closedTitle}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-muted">
                  {launchDateText ? pricing.closedTextWithDate.replace("{date}", launchDateText) : pricing.closedText}
                </p>
                {LAUNCH_DATE ? <Countdown iso={LAUNCH_DATE} label="Doors open in" /> : null}
                <div className="mt-5">
                  {usesNativeForms ? (
                    <LeadForm source="waitlist" idPrefix="pricing" compact buttonLabel={forms.waitlistButton} successTitle={forms.waitlistSuccessTitle} successText={forms.waitlistSuccessText} />
                  ) : (
                    <Button href={LINKS.waitingListPage} size="lg" className="w-full">
                      {pricing.ctaWaitlist}
                    </Button>
                  )}
                </div>
              </div>
            )}

            <div className="mt-7 flex items-start gap-3 rounded-2xl bg-white/10 p-4 ring-1 ring-white/15">
              <ShieldCheck aria-hidden className="mt-0.5 h-6 w-6 shrink-0 text-brand-pink" />
              <div>
                <p className="font-semibold">{pricing.guaranteeTitle}</p>
                <p className="mt-1 text-sm leading-relaxed text-white/80">{pricing.guaranteeText}</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
