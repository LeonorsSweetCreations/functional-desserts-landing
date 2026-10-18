/**
 * Single place for every editable setting that is not copy.
 * Copy lives in src/content/copy.ts.
 *
 * NEXT_PUBLIC_LAUNCH_MODE (Leonor, 2026-10-18: the page switches by itself)
 *   "auto" (default): doors closed until NEXT_PUBLIC_LAUNCH_DATE, open from that moment on.
 *   "waitlist":       doors closed, whatever the date. Every primary CTA opens the waiting list form.
 *   "open":           doors open, whatever the date. Every primary CTA links to the cart.
 * The time-based decision is made in src/lib/launch.ts (cached, refreshed every 5 minutes), so
 * the page flips a few minutes after the date without a redeploy. Components receive the result
 * as a `launch` prop; nothing reads the clock at module level (Cache Components rule).
 */

export type LaunchMode = "waitlist" | "open";
export type LaunchModeSetting = LaunchMode | "auto";

const envMode = process.env.NEXT_PUBLIC_LAUNCH_MODE?.trim();
export const LAUNCH_MODE_SETTING: LaunchModeSetting =
  envMode === "open" || envMode === "waitlist" ? envMode : "auto";

/** ISO date with time zone (e.g. "2026-12-01T09:00:00Z"). Malformed values are ignored. */
function parseIsoDate(raw: string | undefined): { iso: string; ms: number } | null {
  const iso = raw?.trim() || "";
  if (!iso) return null;
  const ms = Date.parse(iso);
  return Number.isNaN(ms) ? null : { iso, ms };
}
const launchDate = parseIsoDate(process.env.NEXT_PUBLIC_LAUNCH_DATE);
/** Doors open at this moment in "auto" mode; also drives the countdown while closed. */
export const LAUNCH_DATE: string | null = launchDate?.iso ?? null;
export const LAUNCH_DATE_MS: number | null = launchDate?.ms ?? null;
/** Optional end of the launch offer. From this moment the regular prices show again. */
export const LAUNCH_PRICE_UNTIL_MS: number | null = parseIsoDate(process.env.NEXT_PUBLIC_LAUNCH_PRICE_UNTIL)?.ms ?? null;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";

/** Same slug as the current Systeme.io page. Never change this. */
export const PAGE_SLUG = "/functionaldessertsprogram-main";

/** Regular prices (Leonor, 2026-10-15). The plan total is always shown explicitly. */
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

/**
 * Launch price (optional). Set NEXT_PUBLIC_LAUNCH_PRICE (e.g. 199) and the price card, the sticky
 * bar, the FAQ and the JSON-LD offer show the regular price struck through and the launch price
 * highlighted. The payment plan keeps the regular markup (plan total / one-time price, 350 / 299)
 * and its total is rounded to whole euros so that 4 installments divide it exactly.
 * A missing, malformed, zero, negative or not-lower value is ignored and the regular price shows.
 */
function parseLaunchPrice(raw: string | undefined, regular: number): number | null {
  const v = raw?.trim() || "";
  if (!/^[0-9]{1,5}(\.[0-9]{1,2})?$/.test(v)) return null;
  const n = Number(v);
  return Number.isFinite(n) && n > 0 && n < regular ? n : null;
}
export const LAUNCH_PRICE: number | null = parseLaunchPrice(process.env.NEXT_PUBLIC_LAUNCH_PRICE, PRICING.oneTime);

function planFor(oneTime: number) {
  const { installments, total: regularTotal } = PRICING.plan;
  const total = Math.round((oneTime * regularTotal) / PRICING.oneTime);
  return { installments, amount: total / installments, total };
}

/** Launch prices, or null when NEXT_PUBLIC_LAUNCH_PRICE is not set. */
export const LAUNCH_PRICING = LAUNCH_PRICE === null ? null : { oneTime: LAUNCH_PRICE, plan: planFor(LAUNCH_PRICE) };

/** The prices the page shows for a given state: launch prices while the offer is active, otherwise regular. */
export function pricingFor(launchPrice: boolean): { oneTime: number; plan: { installments: number; amount: number; total: number } } {
  return launchPrice && LAUNCH_PRICING ? LAUNCH_PRICING : { oneTime: PRICING.oneTime, plan: PRICING.plan };
}

/** "€299", "€87.50". Whole euros without decimals, anything else with two. */
export function formatEur(n: number): string {
  return Number.isInteger(n) ? `€${n}` : `€${n.toFixed(2)}`;
}
/** Installments always carry two decimals ("€87.50"), as on the current page. */
export function formatInstallment(n: number): string {
  return `€${n.toFixed(2)}`;
}

function safeCheckoutUrl(raw: string | undefined): string | null {
  try {
    const u = new URL(raw?.trim() || "");
    if (u.protocol !== "https:" || !["healthy.leonors.com", "leonors.com"].includes(u.hostname)) return null;
    return u.toString();
  } catch {
    return null;
  }
}

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
  /**
   * Second cart with the launch prices (Leonor, 2026-10-18). Only https URLs on Leonor's own
   * hosts are accepted; anything else falls back to the regular cart.
   */
  checkoutLaunch: safeCheckoutUrl(process.env.NEXT_PUBLIC_CHECKOUT_LAUNCH_URL),
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

/** What the page shows right now. Computed once per cache window in src/lib/launch.ts. */
export type LaunchState = {
  /** Doors open: CTAs go to the cart instead of the waiting list form. */
  open: boolean;
  /** Launch offer active: regular prices struck through, launch prices highlighted. */
  launchPrice: boolean;
  /** Cart the CTAs link to while open (launch cart during the offer when configured). */
  checkoutUrl: string;
};

/** Pure function of the clock, so it can be unit-checked and reused on the client. */
export function resolveLaunchState(nowMs: number): LaunchState {
  const open =
    LAUNCH_MODE_SETTING === "open" ? true
    : LAUNCH_MODE_SETTING === "waitlist" ? false
    : LAUNCH_DATE_MS !== null && nowMs >= LAUNCH_DATE_MS;
  const launchPrice = LAUNCH_PRICING !== null && (LAUNCH_PRICE_UNTIL_MS === null || nowMs < LAUNCH_PRICE_UNTIL_MS);
  const checkoutUrl = launchPrice && LINKS.checkoutLaunch ? LINKS.checkoutLaunch : LINKS.checkout;
  return { open, launchPrice, checkoutUrl };
}

/**
 * LEAD_CAPTURE (Leonor, 2026-10-16: option B, forms on this page)
 *   "native":  the waiting list form (hero and price card) and the free guide form post to
 *              /api/leads, which creates the contact in Systeme.io with the right tag
 *              (Supabase optional). Default.
 *   "systeme": no forms; the buttons link to the Systeme.io sign-up and opt-in pages.
 */
export const LEAD_CAPTURE: "systeme" | "native" =
  process.env.NEXT_PUBLIC_LEAD_CAPTURE === "systeme" ? "systeme" : "native";
export const usesNativeForms = LEAD_CAPTURE === "native";

/**
 * Where every "Join the waiting list" button goes while doors are closed: the form on the
 * price card (same anchor the old page used). The Systeme.io page stays live as a fallback.
 */
export const WAITLIST_HREF = usesNativeForms ? `#${ANCHORS.waitlist}` : LINKS.waitingListPage;
