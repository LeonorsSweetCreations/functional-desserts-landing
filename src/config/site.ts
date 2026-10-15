/**
 * Single place for every editable setting that is not copy.
 * Copy lives in src/content/copy.ts.
 *
 * LAUNCH_MODE
 *   "waitlist": doors closed, every primary CTA opens the waiting list form.
 *   "open":     doors open, every primary CTA links to CHECKOUT_URL.
 * Both can be overridden without a code change through environment variables.
 */

export type LaunchMode = "waitlist" | "open";

const envMode = process.env.NEXT_PUBLIC_LAUNCH_MODE;
export const LAUNCH_MODE: LaunchMode =
  envMode === "open" || envMode === "waitlist" ? envMode : "waitlist";

/** ISO date (e.g. "2026-12-01T09:00:00Z"). Leave empty until Leonor confirms. */
export const LAUNCH_DATE: string | null =
  process.env.NEXT_PUBLIC_LAUNCH_DATE?.trim() || null;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";

/** Same slug as the current Systeme.io page. Never change this. */
export const PAGE_SLUG = "/functionaldessertsprogram-main";

export const PRICING = {
  currency: "EUR",
  oneTime: 299,
  plan: { installments: 4, amount: 87.5, total: 350 },
  courseValue: 540,
  bonusesValue: 236,
  totalValueBeforeMentorship: 776,
  guaranteeDays: 14,
  mentorshipMonths: 12,
} as const;

/** Every outbound URL, kept identical to the links already published. */
export const LINKS = {
  checkout: "https://healthy.leonors.com/functionaldessertsprogram-cart",
  waitingListPage: "https://healthy.leonors.com/waiting-list",
  freeGuidePage: "https://healthy.leonors.com/optinindulgeinwellness",
  freeEbookPage: "https://healthy.leonors.com/optin7quickandhealthyrecipes",
  snacksCourse: "https://healthy.leonors.com/healthysnackscourse",
  paidEbook: "https://healthy.leonors.com/dessertisnottheenemy",
  home: "https://leonors.com",
  blog: "https://leonors.com/blog/",
  privacy: "https://leonors.com/privacy-policy/",
  disclaimer: "https://leonors.com/disclaimer/",
  terms: "https://leonors.com/terms-and-conditions/",
  supportEmail: "support@leonors.com",
  social: {
    facebook: "https://www.facebook.com/LeonorsSweetCreations",
    instagram: "https://www.instagram.com/leonorssweetcreations/",
    youtube: "https://www.youtube.com/c/LeonorsSweetCreations/featured",
    pinterest: "https://www.pinterest.pt/leonorssweetcreations/",
  },
} as const;

/** Anchors that already exist on the current site and must keep working. */
export const ANCHORS = {
  course: "functional-course",
  mentorship: "mentorship",
  pricing: "pricing",
  faq: "faq",
  ebooks: "ebooks",
  leonor: "leonor",
  leadMagnet: "leadmagnet",
  waitlist: "waitlist",
} as const;

/**
 * Images. Until Leonor places her own files in public/images/ (see the README
 * there), these fall back to the assets already published on leonors.com.
 */
export const IMAGES = {
  /** Horizontal wordmark. White supplied by Leonor on 2026-10-15; colour version derived from it. */
  logo: "/images/logo-leonors.png",
  logoWhite: "/images/logo-leonors-white.png",
  /** Square emblem (pink badge with the "L"), for favicons or small marks. */
  logoEmblem: "/images/logo-emblem.png",
  testimonialsFallback:
    "https://d1yei2z3i6k35z.cloudfront.net/4808866/665740a95cabe_Testimonials.png",
  /** Leonor's own photos, picked from her Drive on 2026-10-12. See public/images/README.md. */
  heroPoster: "/images/hero-poster.jpg",
  leonorPortrait: "/images/leonor-portrait.jpg",
  leonorAvatar: "/images/leonor-avatar.jpg",
  leonorKitchen: "/images/leonor-kitchen.jpg",
  pains: "/images/dessert-cheesecake-slice.jpg",
  // Modules section uses an Unsplash photo chosen by Leonor's brief (see public/images/README.md).
  modules: "/images/stock-chocolate-cake.jpg",
  gallery: ["/images/dessert-lava-cake.jpg", "/images/dessert-cookies.jpg", "/images/dessert-muffins.jpg", "/images/dessert-cupcake.jpg"],
  // Bonuses 01 and 02 use Unsplash photos chosen by Leonor's brief (see public/images/README.md).
  bonuses: ["/images/stock-plant-milk.jpg", "/images/stock-melted-chocolate.jpg", "/images/leonor-cake-balls.jpg", "/images/leonor-white-cake.jpg"],
  guideCover: "/images/guide-mockup.png",
  finalCta: "/images/final-cta-cake.jpg",
} as const;

/** Hero video. Set one of these; leave all empty to show the brand placeholder. */
export const HERO_VIDEO = {
  youtubeId: (process.env.NEXT_PUBLIC_HERO_YOUTUBE_ID?.trim() || "").replace(/[^A-Za-z0-9_-]/g, "").slice(0, 20),
  vimeoId: (process.env.NEXT_PUBLIC_HERO_VIMEO_ID?.trim() || "").replace(/[^0-9]/g, "").slice(0, 20),
  file: "", // e.g. "/videos/hero.mp4" once Leonor supplies it
} as const;

/**
 * Tracking ids are interpolated into inline scripts, so they are validated
 * against a strict format. A malformed value is ignored instead of injected.
 */
function safeId(value: string | undefined, pattern: RegExp): string {
  const v = value?.trim() || "";
  return pattern.test(v) ? v : "";
}
export const ANALYTICS = {
  gtmId: safeId(process.env.NEXT_PUBLIC_GTM_ID, /^GTM-[A-Z0-9]{4,12}$/),
  metaPixelId: safeId(process.env.NEXT_PUBLIC_META_PIXEL_ID, /^[0-9]{6,20}$/),
} as const;

export const isOpen = LAUNCH_MODE === "open";

/**
 * LEAD_CAPTURE (Leonor's decision on 2026-10-15)
 *   "native":  the forms on this page post to /api/leads, which creates the contact in
 *              Systeme.io with the right tag (and stores it in Supabase when configured). Default.
 *   "systeme": no form on this page; every waiting list and free guide button links to the
 *              pages that already exist on Systeme.io (LINKS.waitingListPage, LINKS.freeGuidePage).
 */
export const LEAD_CAPTURE: "systeme" | "native" =
  process.env.NEXT_PUBLIC_LEAD_CAPTURE === "systeme" ? "systeme" : "native";
export const usesNativeForms = LEAD_CAPTURE === "native";

/** Where the primary call to action goes while doors are closed. */
export const WAITLIST_HREF = usesNativeForms ? `#${ANCHORS.waitlist}` : LINKS.waitingListPage;
