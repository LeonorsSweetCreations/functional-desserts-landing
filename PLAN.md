# PLAN.md

Project plan and progress checklist for The Functional Desserts Program landing page. Approved by Leonor on 2026-10-12. Any agent (Claude Code, Codex) reads this before working and ticks items as they finish. Rules of conduct and copy are in `AGENTS.md`.

## Context

Leonor wants a new, dedicated sales page for The Functional Desserts Program, built from scratch with the leonors.com branding, replacing the current Systeme.io page at `healthy.leonors.com/functionaldessertsprogram-main`.

Problems with the current page that this project fixes: 370 to 456 KB of HTML with duplicated mobile and desktop content, a broken purchase link, "Masterclass" vs "Program" naming inconsistency, a payment plan whose total does not match the one-time price, testimonials shown only as one image, an expired launch popup, no FAQ on the home page, no mention of the live mentorship.

## Decisions (final)

| Topic | Decision |
|---|---|
| Scope | One page, dedicated to the program |
| Primary goal | Purchase of the program |
| Status | Closed now, launch in 1 to 3 months |
| Pre-launch behaviour | Full sales page, primary CTA "Join the waiting list". Since 2026-10-18 the page opens by itself at `NEXT_PUBLIC_LAUNCH_DATE` (`NEXT_PUBLIC_LAUNCH_MODE=auto`); `open` and `waitlist` still force a state |
| Language | English only |
| Checkout | Existing Systeme.io cart (`healthy.leonors.com/functionaldessertsprogram-cart`) |
| Leads | Supabase + Systeme.io API (contact + tag) |
| Supabase | New cloud project (free tier). No Docker on this machine, so no local Supabase |
| Copy | Rewritten freely, Leonor's voice and facts kept, Leonor approves |
| Stack | Next.js 15 App Router, TypeScript, Tailwind CSS, pnpm |
| Domain | Decided in phase 3 |
| Assets from Leonor | Text testimonials, high-res photos, original logo, hero video |
| Tracking | GTM + Meta Pixel, IDs provided in phase 3, disabled on localhost, behind cookie consent |
| Price | €299 one-time (was €199, changed by Leonor on 2026-10-15) or 4 x €87.50 (plan total €350 shown explicitly; was 4 x €62.50, changed 2026-10-15). Optional launch price through `NEXT_PUBLIC_LAUNCH_PRICE` (2026-10-18): €299 struck through, launch price highlighted, plan recomputed with the same markup |
| Secondary lead magnet | Free guide "Indulge in Wellness" |
| Success metrics | Conversion, Lighthouse 90+, mobile-first, SEO |
| Mentorship (central message) | Included in €299 for 12 months: monthly live Q&A (was weekly, changed 2026-10-12), monthly cook-along, recordings, personal recipe feedback, private community, direct messages between lives. Zoom + private group |
| URLs | Same slug `/functionaldessertsprogram-main`, root redirects to it, all outbound links unchanged, existing Systeme.io optin pages stay live |

## Hero (chosen by Leonor, combination of options B and C)

> **Eat desserts that love you back, every single day.**
> **No more guessing, no more failed batches.**
>
> Master the swaps, ratios and techniques that make healthy desserts work the first time, and bring every doubt to a live session with Leonor for a full year.
>
> [ Join the waiting list ]   30+ lessons · monthly lives · 14-day guarantee

## Page structure (in order)

Every section title must state an outcome for the student. Working titles below are placeholders; final copy lives in `src/content/copy.ts`.

1. Header: logo + CTA, fixed, light.
2. Hero: headline above, video placeholder, primary CTA, three micro-proofs.
3. Pains: recipes that fail, wasted money and ingredients, not knowing ratios, doing it alone.
4. Transformation: what changes for the student after the program.
5. Who this is for / not for.
6. Modules: 5 accordion items, each led by what the student can do afterwards.
7. Mentorship: highlighted section, six cards (monthly live Q&A, monthly cook-along, recordings, personal recipe feedback, private community, direct messages), "for a full 12 months", a simple visual of the student's week and month.
8. Bonuses: 4 cards with value.
9. Testimonials: text from Supabase or local JSON; image fallback until Leonor supplies text.
10. About Leonor: short story, credentials, mentor tone.
11. Pricing: "What you get" list with mentorship first, €299 vs 4 x €87.50 (€350 total), value stack, 14-day guarantee. In waitlist mode: price + "Doors open [date]" + waiting list form.
12. FAQ: existing 6 questions rewritten + mentorship questions (live schedule, missed a live, how long support lasts, how to send recipes for feedback). FAQPage JSON-LD.
13. Secondary lead magnet: "Indulge in Wellness" short form.
14. Final CTA + footer (logo, socials, legal links, copyright).
15. Sticky mobile CTA bar after scroll.
16. Cookie consent banner.

## Data

Tables in `supabase/migrations/0001_init.sql`:

- `leads`: id, email, first_name, source (waitlist | free_guide), utm_source, utm_medium, utm_campaign, consent, synced_to_systeme, created_at. Unique on (email, source). RLS on, no public policies, writes only via service role from the Route Handler.
- `testimonials`: id, name, text, photo_url, is_published, sort_order. RLS on, public read of published rows.

API: `POST /api/leads` validates with zod, inserts, calls Systeme.io, marks synced. Honeypot field and in-memory IP rate limit. Falls back to `.local-data/leads.json` when Supabase env is missing.

## Environment variables

```
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_LAUNCH_MODE=
NEXT_PUBLIC_LAUNCH_DATE=
NEXT_PUBLIC_LAUNCH_PRICE=
NEXT_PUBLIC_LAUNCH_PRICE_UNTIL=
NEXT_PUBLIC_CHECKOUT_LAUNCH_URL=
NEXT_PUBLIC_LEAD_CAPTURE=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SYSTEME_API_KEY=
SYSTEME_TAG_WAITLIST=
SYSTEME_TAG_FREE_GUIDE=
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_META_PIXEL_ID=
```

## Phase 1: Localhost. Checklist

- [x] 1.0 `AGENTS.md`, `CLAUDE.md`, `PLAN.md` created
- [x] 1.1 Next.js scaffold (pnpm, TypeScript, Tailwind, src/, App Router), `.env.local.example`, `.gitignore` incl. `.env.local` and `.local-data/`
- [x] 1.2 `src/config/site.ts` (LAUNCH_MODE, LAUNCH_DATE, prices, all URLs) and Tailwind brand tokens + fonts
- [x] 1.3 Root redirect `/` to `/functionaldessertsprogram-main`
- [x] 1.4 `src/content/copy.ts` with all page text (rules in AGENTS.md section 2)
- [x] 1.5 UI primitives: Container, Button, SectionHeading, Accordion, Input, Checkbox
- [x] 1.6 Sections 1 to 6 (Header, Hero, Pains, Transformation, ForWho, Modules)
- [x] 1.7 Sections 7 to 11 (Mentorship, Bonuses, Testimonials, About, Pricing)
- [x] 1.8 Sections 12 to 16 (FAQ, LeadMagnet, FinalCTA + Footer, StickyCTA, CookieBanner)
- [x] 1.9 Supabase migration SQL, `lib/supabase.ts`, `lib/systeme.ts`, `lib/leads-mock.ts`, `api/leads/route.ts`
- [x] 1.10 Forms wired (waitlist, free guide) with success and error states
- [x] 1.11 Metadata, OG image, `Course` + `FAQPage` JSON-LD, sitemap, robots
- [x] 1.12 `Analytics.tsx` behind consent, no-op without IDs
- [x] 1.13 `public/images/README.md` listing assets Leonor must supply; brand placeholders in place
- [x] 1.14 `pnpm lint` and `pnpm build` clean; grep for dashes clean
- [x] 1.15 Visual check at 412 / 768 / 1280 px, screenshots in `docs/screenshots/`
- [x] 1.16 Lighthouse mobile 90+ on all four categories (95 / 100 / 100 / 100 on 2026-10-12, report in `docs/lighthouse-mobile.json`)
- [x] 1.16b Visual draft of the whole page with placeholder photos in every spot where Leonor's photos go (2026-10-12): hero photo with floating "live" card and numbers strip, pains with side photo, dessert gallery, modules with photo and stats card, mentorship with portrait card, bonuses with thumbnails, about with framed portrait, guide cover mock, final CTA on a photo background
- [x] 1.16c Leonor reviewed the visual draft (2026-10-12) and her photos were pulled from her Drive into `public/images/` (list in the README there). On 2026-10-15 Leonor added her white horizontal wordmark (`logo-leonors-white.png`), from which the colour version for the header and footer was generated, the square emblem (`logo-emblem.png`) and the real guide mockup (`guide-mockup.png`) in the free guide section. Still missing: the hero video
- [x] 1.17 Leonor reviews copy in `src/content/copy.ts` and approves (2026-10-15, with the price at €299 and the plan at 4 x €87.50)
- [ ] 1.18 (optional now) Leonor creates Supabase project, pastes keys, migration applied, waitlist form tested end to end. Only needed if `NEXT_PUBLIC_LEAD_CAPTURE=native`
- [x] 1.19 Leonor provided the Systeme.io API key and the tag names, sync tested for both forms (2026-10-15 and 2026-10-16)

### Security (Leonor's five rules)

- [x] Rules stored in `docs/regras-de-seguranca.md`, linked from `AGENTS.md` and `CLAUDE.md`
- [x] Review done and recorded in `SECURITY.md` (2026-10-12): server-only modules, strict validation, uniform API responses, grants + RLS, CSP and security headers, tracking id validation, Vercel guard for the local fallback
- [ ] Phase 3 checklist in `SECURITY.md` completed before go-live

## Phase 2: GitHub (only after Leonor approves phase 1)

- [x] `git init` and first commit on this machine (2026-10-15)
- [x] Private repo `LeonorsSweetCreations/functional-desserts-landing` created and pushed (2026-10-15)

## Phase 3: Vercel + Supabase cloud (only after Leonor approves again)

- [x] Vercel project `functional-desserts-landing` (team leonors) linked to the GitHub repo, first production deploy on 2026-10-16. Every push to `main` deploys
- [x] Env vars on Vercel (production and preview): `NEXT_PUBLIC_SITE_URL=https://program.leonors.com`, `NEXT_PUBLIC_LAUNCH_MODE=waitlist`, `NEXT_PUBLIC_LEAD_CAPTURE=native`, `SYSTEME_API_KEY` (sensitive), `SYSTEME_TAG_WAITLIST`, `SYSTEME_TAG_FREE_GUIDE`
- [x] CNAME `program` added by Leonor on Cloudflare (2026-10-16), `https://program.leonors.com/functionaldessertsprogram-main` answers 200 with a valid certificate
- [x] Domain `program.leonors.com` added to the Vercel project (2026-10-16)
- [x] Leonor adds the CNAME in Cloudflare (name `program`, target `01c315d9c9bc9e5a.vercel-dns-017.com`, proxy off), Vercel issues the certificate (done 2026-10-16, confirmed 2026-10-18)
- [x] Redirect on Systeme.io from `healthy.leonors.com/functionaldessertsprogram-main` to `program.leonors.com/functionaldessertsprogram-main` (2026-10-16: meta refresh plus a script that keeps query string and hash, in the head code of the old page, settings > tracking > header code; the old page itself was not deleted)
- [ ] GTM and Meta Pixel IDs added
- [x] End-to-end test of the waiting list form in production (2026-10-16, contact created in Systeme.io with the tag `FDP Waitlist`)
- [ ] End-to-end test of the free guide form in production with a real email (localhost test passed on 2026-10-15)

## Phase 4: Launch (price, date, opening the doors)

- [x] Launch price mechanism (2026-10-18): `NEXT_PUBLIC_LAUNCH_PRICE` (e.g. `199`) shows €299 struck through and the launch price highlighted on the price card and on the sticky bar; the FAQ answer and the JSON-LD offer use it too. The payment plan keeps the regular markup (350 / 299), its total is rounded to whole euros and divided by 4: with 199 the plan is 4 x €58.25, total €233. Unset, empty, malformed, zero or not lower than €299: the page shows €299 and 4 x €87.50 as before. Checked with `pnpm build` in both states and a headless Chrome render at 412 and 1280 px
- [x] Countdown confirmed in waitlist mode with `NEXT_PUBLIC_LAUNCH_DATE` set (2026-10-18): the price card shows "Doors open on 1 December 2026" and, after hydration, "Doors open in" with days, hours and minutes, ticking once a minute. The static HTML carries no countdown (client only, by design, see the notes of 2026-10-12). Unset: no countdown, text "Enrolment opens soon"
- [x] Automatic switch (Leonor, 2026-10-18, option 1): `NEXT_PUBLIC_LAUNCH_MODE=auto` opens the doors at `NEXT_PUBLIC_LAUNCH_DATE`, `NEXT_PUBLIC_LAUNCH_PRICE_UNTIL` ends the launch offer, `NEXT_PUBLIC_CHECKOUT_LAUNCH_URL` is the cart linked while the offer runs. Decided on the server by `src/lib/launch.ts` (`use cache`, 5-minute `cacheLife`), so the page flips within 5 minutes of each date with no redeploy; the countdown asks for a refresh when it hits zero. The page stays static (revalidate 5 min instead of 1 h). Verified with four builds: auto without date (closed, €299), auto past date with price and launch cart (open, €199 struck €299, launch cart, JSON-LD InStock), same with the offer ended (open, €299, regular cart), waitlist forced with a bad cart URL (closed, regular cart). Vercel env `NEXT_PUBLIC_LAUNCH_MODE` changed from `waitlist` to `auto` on 2026-10-18 (same behaviour until a date is set)
- [ ] Leonor decides the launch date, the launch price and when the offer ends; set `NEXT_PUBLIC_LAUNCH_DATE`, `NEXT_PUBLIC_LAUNCH_PRICE` and `NEXT_PUBLIC_LAUNCH_PRICE_UNTIL` on Vercel (production) and redeploy once. From then on everything switches by itself
- [ ] Two Systeme.io carts (Leonor, 2026-10-19): the regular cart `functionaldessertsprogram-cart` keeps its URL and must charge €299 or 4 x €87.50; a second cart with the campaign prices (€199 or 4 x €58.25, proportional markup) gets a new URL and goes in `NEXT_PUBLIC_CHECKOUT_LAUNCH_URL`. The page links the regular cart by default and the campaign cart only while the offer runs (already automatic). Link audit of 2026-10-19: no page on leonors.com (8 pages, 98 posts), no blog post and no Systeme.io page (linktree, waiting list, opt-ins, courses) links to the cart URL directly; the only direct cart links are the 9 buttons of the old sales page `functionaldessertsprogram-main`, which already redirects to program.leonors.com. So keeping the existing cart URL for the regular price breaks nothing. Side finding: the leonors.com homepage links three times to `functionaldessertsprogram_main` (underscore), a separate copy of the old page without the redirect, whose buttons go to the Systeme.io waiting list page; the linktree links to `functionaldessertsprogram-main` (hyphen), which redirects. Price plans already in the account (2026-10-19): "The Functional Desserts Program - Full Payment" €299 tax included, "The Functional Desserts Program - Payment Plan" 4 x €87.50 tax included, "Full Payment (launch offer)" €199, "Payment Plan (launch offer)" 4 x €62.50 (the latter two are the ones attached to the cart today); a 4 x €58.25 plan does not exist yet. Attaching plans from this session was blocked by the Claude Code permission classifier, so the Systeme.io steps are listed in the README for Leonor to do or to approve in a session with the permission granted
  - Steps left in Systeme.io: (1) on the product of the Cart step, attach the €299 and 4 x €87.50 plans and remove the two launch offer plans from that order form; (2) duplicate the Cart step, name it "The Functional Desserts Program - Cart (campaign)", URL path `functionaldessertsprogram-cart-launch`, attach the €199 plan and a new "Payment Plan (launch offer)" of 4 x €58.25 (tax included), make sure its order form sends buyers to the Thank You step; (3) set `NEXT_PUBLIC_CHECKOUT_LAUNCH_URL=https://healthy.leonors.com/functionaldessertsprogram-cart-launch` on Vercel and redeploy; (4) test both carts with a test card

## Notes from implementation (2026-10-12)

- Next.js 16.4 with Cache Components: no `Date`/`Math.random` in server render. Year and countdown are client components using `useSyncExternalStore`.
- Root redirect lives in `next.config.ts` (`redirects`), returns 308.
- `lucide-react` no longer ships brand icons; social icons are inline SVG in `Footer.tsx`.
- Brand greys #7B7777 and #8B8686 fail WCAG AA on cream, so body secondary text uses `brand.muted` #5E5A5A.
- Claude in Chrome was not connected; screenshots were taken with headless Chrome and Lighthouse's emulated mobile capture.

- 2026-10-12, testimonials: the seven testimonials already published on the Systeme.io page live in `src/content/testimonials.ts` and render as text cards when the Supabase table is empty. Bonus images are 2:3 covers; bonuses 01 and 02 use Unsplash photos (sources in `public/images/README.md`).
- 2026-10-12, visual draft: scroll-reveal styles now only apply when `html.js` is set by a one-line inline script in `layout.tsx`, so content is never hidden without JavaScript. `suppressHydrationWarning` on `<html>` covers that class. CSP gets `'unsafe-eval'` in development only, which removes the Next dev overlay warning. Placeholder photos in `public/images/` are AI-generated and listed in the README there.

## Decisions of 2026-10-15

- Price €299 one-time, plan 4 x €87.50 (total €350).
- Waiting list (Leonor, 2026-10-16, option B): form on this page, in the hero and on the price card; every button scrolls to the price card form. Tag `FDP Waitlist`, the same one the Systeme.io page `https://healthy.leonors.com/waiting-list` assigns (confirmed on 2026-10-16 by Leonor's test on that page). Free guide: the form on this page sends the contact to Systeme.io with the tag "[EBOOK][REGISTO] Indulge in Wellness" (`LEAD_CAPTURE=native`, default; Supabase optional). `NEXT_PUBLIC_LEAD_CAPTURE=systeme` swaps that form for a link to the opt-in page.
- Leonor approved phases 2 and 3 ("Segue com os passos necessários, para acrescentar esta página ao meu website").

## Decisions of 2026-10-19

- €299 is the regular price; €199 is only for campaign weeks. The site links the regular cart except during a campaign (automatic through `NEXT_PUBLIC_LAUNCH_PRICE_UNTIL` and `NEXT_PUBLIC_CHECKOUT_LAUNCH_URL`).
- Payment plans are always more than the one-time price; both plans are proportional (regular 4 x €87.50 = €350 for €299; campaign 4 x €58.25 = €233 for €199). The Systeme.io campaign plan has to be created at €58.25, the old 4 x €62.50 plan is not used.
- The existing cart URL stays the regular cart; the campaign cart gets a new URL.

## Decisions of 2026-10-18

- Automatic launch (option 1, chosen by Leonor): the page follows the dates on the server, with a 5-minute cache; no cron, no Vercel API token, no feature flag service. Manual overrides stay (`open`, `waitlist`).
- Launch price: a single public env var, `NEXT_PUBLIC_LAUNCH_PRICE`, no code change at launch. The regular price stays the source of truth in `src/config/site.ts` (`PRICING`); components read `pricingFor(launch.launchPrice)` with the state resolved on the server. Plan formula: total = round(launch price x 350 / 299), installment = total / 4, so the markup of the regular plan is kept and the total always divides exactly by 4.
- The CNAME `program` on Cloudflare is done (2026-10-16); the duplicate open item in phase 3 is now ticked.

## Open items (do not block)

- Exact launch date (`NEXT_PUBLIC_LAUNCH_DATE`), end of the campaign (`NEXT_PUBLIC_LAUNCH_PRICE_UNTIL`) and the campaign cart URL (`NEXT_PUBLIC_CHECKOUT_LAUNCH_URL`), once the second cart exists
- Homepage of leonors.com still sends visitors to the old Systeme.io page `functionaldessertsprogram_main` (underscore, no redirect) instead of program.leonors.com; fix either the three links in Elementor or add the same redirect to that page
- Mentorship: usual day and time of the monthly live, which private group platform, € value to show for mentorship in the value stack
- Assets: testimonials, photos, logo, video
- Final domain and tracking IDs

## Verification (phase 1)

1. `pnpm dev` serves `http://localhost:3000` with no console errors, root redirects to `/functionaldessertsprogram-main`.
2. Submitting the waitlist form creates a row in `leads` (or `.local-data/leads.json` without Supabase), and with the API key creates a Systeme.io contact with the tag.
3. Setting `LAUNCH_MODE` to `open` points every CTA to the cart URL.
4. Lighthouse mobile on `pnpm build && pnpm start`: all categories 90 or above.
5. Screenshots at 375, 768, 1280 px for Leonor.
6. `pnpm build` passes with zero TypeScript errors.
