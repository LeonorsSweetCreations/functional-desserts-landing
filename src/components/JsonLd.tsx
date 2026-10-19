import { about, faq, meta } from "@/content/copy";
import { LINKS, PAGE_SLUG, PRICING, SITE_URL, pricingFor, type LaunchState } from "@/config/site";

/** Course + FAQPage structured data. Native script tag, as the Next.js JSON-LD guide recommends. */
export function JsonLd({ launch }: { launch: LaunchState }) {
  const pageUrl = `${SITE_URL}${PAGE_SLUG}`;
  /** No offer (and no price) in the structured data while doors are closed. */
  const isOpen = launch.open;

  const course = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "The Functional Desserts Program",
    description: meta.description,
    url: pageUrl,
    inLanguage: "en",
    provider: {
      "@type": "Organization",
      name: "Leonor's Sweet Creations",
      url: LINKS.home,
      sameAs: Object.values(LINKS.social),
    },
    instructor: {
      "@type": "Person",
      name: "Leonor Capristano",
      description: about.credentials.join(". "),
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: "PT12M",
    },
    ...(isOpen
      ? {
          offers: {
            "@type": "Offer",
            price: pricingFor(launch.launchPrice).oneTime,
            priceCurrency: PRICING.currency,
            availability: "https://schema.org/InStock",
            url: pageUrl,
          },
        }
      : {}),
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.items(launch).map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const safe = (obj: unknown) => JSON.stringify(obj).replace(/</g, "\\u003c");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safe(course) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safe(faqPage) }} />
    </>
  );
}
