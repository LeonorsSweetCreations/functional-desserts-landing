import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { faq } from "@/content/copy";
import { ANCHORS, type LaunchState } from "@/config/site";

export function Faq({ launch }: { launch: LaunchState }) {
  return (
    <section id={ANCHORS.faq} className="scroll-mt-20 py-16 sm:py-24">
      <Container className="max-w-4xl">
        <SectionHeading title={faq.title} />
        <div className="reveal mt-12">
          <Accordion
            items={faq.items(launch).map((item, i) => ({
              id: `faq-${i + 1}`,
              summary: <span className="font-body text-base font-semibold text-brand-ink sm:text-lg">{item.q}</span>,
              details: <p className="text-base leading-relaxed text-brand-muted">{item.a}</p>,
            }))}
          />
        </div>
      </Container>
    </section>
  );
}
