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
- [x] GTM and Meta Pixel IDs added (2026-10-19: `NEXT_PUBLIC_GTM_ID` and `NEXT_PUBLIC_META_PIXEL_ID` set on Vercel for production and preview, production redeployed. Verified in Chrome on the live page: with consent denied no third party script loads; after clicking Accept the page requests `gtm.js?id=GTM-5CXKS2L`, `fbevents.js` and the Pixel config for id 334659672895495, `window.fbq` and `window.google_tag_manager` exist, and the GTM container loads three GA4 tags. No CSP block observed, the only third party hosts were googletagmanager.com, connect.facebook.net and google-analytics.com, all already allowed)
- [x] End-to-end test of the waiting list form in production (2026-10-16, contact created in Systeme.io with the tag `FDP Waitlist`)
- [ ] End-to-end test of the free guide form in production with a real email (localhost test passed on 2026-10-15)

## Phase 4: Launch (price, date, opening the doors)

- [x] Launch price mechanism (2026-10-18): `NEXT_PUBLIC_LAUNCH_PRICE` (e.g. `199`) shows €299 struck through and the launch price highlighted on the price card and on the sticky bar; the FAQ answer and the JSON-LD offer use it too. The payment plan keeps the regular markup (350 / 299), its total is rounded to whole euros and divided by 4: with 199 the plan is 4 x €58.25, total €233. Unset, empty, malformed, zero or not lower than €299: the page shows €299 and 4 x €87.50 as before. Checked with `pnpm build` in both states and a headless Chrome render at 412 and 1280 px
- [x] Countdown confirmed in waitlist mode with `NEXT_PUBLIC_LAUNCH_DATE` set (2026-10-18): the price card shows "Doors open on 1 December 2026" and, after hydration, "Doors open in" with days, hours and minutes, ticking once a minute. The static HTML carries no countdown (client only, by design, see the notes of 2026-10-12). Unset: no countdown, text "Enrolment opens soon"
- [x] Automatic switch (Leonor, 2026-10-18, option 1): `NEXT_PUBLIC_LAUNCH_MODE=auto` opens the doors at `NEXT_PUBLIC_LAUNCH_DATE`, `NEXT_PUBLIC_LAUNCH_PRICE_UNTIL` ends the launch offer, `NEXT_PUBLIC_CHECKOUT_LAUNCH_URL` is the cart linked while the offer runs. Decided on the server by `src/lib/launch.ts` (`use cache`, 5-minute `cacheLife`), so the page flips within 5 minutes of each date with no redeploy; the countdown asks for a refresh when it hits zero. The page stays static (revalidate 5 min instead of 1 h). Verified with four builds: auto without date (closed, €299), auto past date with price and launch cart (open, €199 struck €299, launch cart, JSON-LD InStock), same with the offer ended (open, €299, regular cart), waitlist forced with a bad cart URL (closed, regular cart). Vercel env `NEXT_PUBLIC_LAUNCH_MODE` changed from `waitlist` to `auto` on 2026-10-18 (same behaviour until a date is set)
- [x] No euro amounts while doors are closed (Leonor, 2026-10-20). One switch, `launch.open` (`isOpen` in each component): closed means the price card shows "Launch price revealed to the waiting list first" plus "Join the list and you get first access and the lowest price we will ever offer." instead of the €299 and 4 x €87.50 blocks, the "Everything you get" list shows "Included" on every line with no €540/€236 and no "Value of the content and bonuses €776", the bonus cards lose the "€39/€49/€99 value" badges and the "Total value of the bonuses" line, the mobile sticky bar shows only "Doors open in December" and the button, the FAQ "How does the payment plan work?" answers "You will be able to pay in one payment or in 4 monthly instalments. Exact prices are announced to the waiting list first." and the Course JSON-LD carries no `offers`. Open: everything as before (prices, values, launch price, offer with InStock). Checked with two builds: `NEXT_PUBLIC_LAUNCH_MODE=waitlist` gives zero "€" in the prerendered HTML, `open` gives the prices, the values and the offer. Applies to `auto` mode before the launch date as well, since the switch is the open state, not the mode name
- [x] "Doors open" sentences follow the launch date (Leonor, 2026-10-20). `LAUNCH_MONTH` and `LAUNCH_DATE_TEXT` in `src/config/site.ts` read `NEXT_PUBLIC_LAUNCH_DATE`; `doorsOpen` in `src/content/copy.ts` gives "Doors open in {month}" (hero waiting list note, mobile sticky bar) and "Doors open on {full date}" (price card, next to the countdown). Without a date every sentence says "Doors open in December" (the price card no longer says "Enrolment opens soon"). Checked with three builds: no date (5 x "Doors open in December"), waitlist with 2026-12-01 ("Doors open on 1 December 2026" on the card, "in December" elsewhere), auto with 2027-01-15 ("on 15 January 2027" and "in January"). Vercel env untouched (`auto`, no date)
- [x] Launch runbook in `README.md` (2026-10-19): the three variables with a filled example (date, €199, offer end, all in UTC), the Vercel steps (set, redeploy once, what to check closed and open), the WordPress popup switch to "Doors are open" with the campaign cart link and the priority swap with the free guide popup, and the check that both Systeme.io products give access to the same course "Functional Desserts Program" (progressive access, verified in both cart steps; only the regular cart has the coupon DESSERTS100)
- [ ] Leonor decides the launch date, the launch price and when the offer ends; set `NEXT_PUBLIC_LAUNCH_DATE`, `NEXT_PUBLIC_LAUNCH_PRICE` and `NEXT_PUBLIC_LAUNCH_PRICE_UNTIL` on Vercel (production) and redeploy once. From then on everything switches by itself
- [x] Two Systeme.io carts (Leonor, 2026-10-19; done the same day, with Leonor approving the clicks). Regular cart `healthy.leonors.com/functionaldessertsprogram-cart` (step 16265240, page 25571139): product "The Functional Desserts Program" now carries "The Functional Desserts Program - Full Payment" €299 and "The Functional Desserts Program - Payment Plan" 4 x €87.50 every 30 days, both tax included (plans that already existed); the old €199 and 4 x €62.50 plans were detached, not deleted. Campaign cart `healthy.leonors.com/functionaldessertsprogram-cart-launch` (step 25861637 "The Functional Desserts Program - Cart (campaign)", page 45865489, a duplicate of the Cart step): its own product "The Functional Desserts Program (campaign)" with the same resource (course Functional Desserts Program, progressive access), plans "Full Payment (launch offer)" €199 and the new "Payment Plan (campaign)" 4 x €58.25 every 30 days, tax included. A separate product was needed because Systeme.io attaches price plans to the product, so two carts on one product would always show the same plans. Page texts fixed on both pages (they had "Now 199€ or 4 x €62.50", "Until Sunday, Sept 27" and "€100 off until Sunday, Sept 27" hard-coded): regular page shows 776€ struck, "Regular price", "299€ / or 4 x €87.50", "Payment plan total €350" and "One-time payment of €299, or 4 instalments of €87.50 (total €350)."; campaign page shows 776€ and 299€ struck, "Now 199€ / or 4 x €58.25", "Payment plan total €233" and "€100 off the regular price of €299 while the campaign lasts.". Both public pages checked with curl and in Chrome (order forms list the right plans, VAT 23% included). Vercel: `NEXT_PUBLIC_CHECKOUT_LAUNCH_URL` set for production and preview (2026-10-19). Not done: a real test purchase; the Thank You redirect of the duplicated step was not changed and should be confirmed with the first campaign sale or a test order. Link audit of 2026-10-19: no page on leonors.com (8 pages, 98 posts), no blog post and no Systeme.io page (linktree, waiting list, opt-ins, courses) links to the cart URL directly; the only direct cart links are the 9 buttons of the old sales page `functionaldessertsprogram-main`, which already redirects to program.leonors.com. Side finding: the leonors.com homepage links three times to `functionaldessertsprogram_main` (underscore), a separate copy of the old page without the redirect, whose buttons go to the Systeme.io waiting list page; the linktree links to `functionaldessertsprogram-main` (hyphen), which redirects. Note for next time: in the Systeme.io page editor the element trash icon opens a native confirm() that freezes the Chrome renderer under Claude in Chrome; overriding window.confirm with the javascript tool before clicking the trash works. The invisible white "397€" text element was deleted from both pages on 2026-10-19 (Leonor's request) Update 2026-10-19 (evening): on both carts the surname field placeholder is now "Last name" and the consent text reads "I understand that my information will be used in accordance with these Terms and Conditions. This includes emails with updates and offers from Leonor’s Sweet Creations." Neither page had a link on "Terms and Conditions" before, so one was added to https://leonors.com/terms-and-conditions/ (opens in a new tab). On the campaign cart the struck "776€" was deleted, leaving the struck "299€" followed by "Now 199€". Both pages saved and confirmed on the public HTML.

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
- Free guide emails now run on two new Systeme.io workflows built on 2026-10-19: "[EBOOK][REGISTO] Indulge in Wellness v2" (ID 564338, trigger tag "[EBOOK][REGISTO] Indulge in Wellness", email "Your free guide is here", 3 h, decision on the CONFIRMADO tag, "Did your guide arrive", 21 h, same decision, "Last reminder") and "[EBOOK][CONFIRMADO] Indulge in Wellness v2" (ID 564345, trigger tag "[EBOOK][CONFIRMADO] Indulge in Wellness", "You have the guide", 1 day, "A Surprising Fact About Healthy Eating!", 1 day, "Your Insights on Indulge in Wellness Matter to Me", 2 days, "Transform Desserts into Health Boosters"). Both proven on 2026-10-19 with a fresh contact signed up through the guide form on program.leonors.com: both first emails went out. The old workflows 198568 and 199749 stay Inativo (scheduled tasks kept); Leonor deletes them the following week.
- Systeme.io note: on 2026-10-19 the platform processed "Tag adicionada" events with a 10 to 20 minute backlog, and the contact's "Histórico de tags" only shows an addition once the event is processed. A trigger test that looks dead minutes after the signup is not a failure; wait 20 to 30 minutes before concluding.
- Test contacts: +teste, +teste2, +teste3 and +teste4 were deleted from the CRM on 2026-10-19. The only test contact that stays is support@leonors.com (ID 449252355). Do not create more test contacts without Leonor's authorisation.
- WordPress popups on phones (2026-10-19): the Popup Maker close button of theme 607 was 26 x 26 px, placed 13 px outside the container, and the popup container had no max height, so on a 375 px screen the program popup (644 px tall) ran past the viewport and the overlay could not scroll. Fix now lives in Customizer > Additional CSS (block "pum-mobile-fix 2026-10-19": close button absolute, top and right 8 px, 44 x 44 px, z-index 999999, pointer-events auto; container max-height 90vh with overflow-y auto; 92% width under 782 px); the temporary style blocks inside the content of popups 2811 and 26149 were removed again. The "Join the waiting list" button of popup 26149 links program.leonors.com/functionaldessertsprogram-main with utm_source=site, utm_medium=popup, utm_campaign=fdp_waitlist and no #waitlist. Both popups have "click overlay to close" and ESC on and a cookie on close for 7 days (26149: pum-fdp-waitlist; 2811: pum-2811). Both auto open at 6 s and are not stackable, so the free guide popup closes the program popup and both cookies get set; they never open one after the other in the same visit. LiteSpeed "Purge All" done; tested in a 375 px frame: X and overlay tap close the popup and set the cookie, the popup scrolls inside itself, the button opens the program page at the top.
- Meta Pixel 334659672895495 "Leonor Ad Account" (2026-10-19): the dataset only allowed traffic from "healthy.leonors.com and subdomains" (Events Manager > Settings > Traffic permissions), so the pixel on program.leonors.com loaded but refused to send (console warning "unavailable on this website due to its traffic permission settings", no /tr request). "leonors.com and subdomains" was added to the allow list; the change took about 20 minutes to reach the pixel config, after which Test events received a PageView from program.leonors.com (test code TEST95745, processed). leonors.com itself has no Meta base pixel: the WordPress HTML has no fbevents.js and the GTM container GTM-5CXKS2L only holds a custom HTML tag with fbq("track","Lead") and no Meta Pixel base tag, so no PageView can come from leonors.com until the base pixel is installed there (GTM tag with the pixel ID, fired only after CookieYes consent, or the Meta WordPress plugin). GTM-5CXKS2L workspace, saved but NOT published (2026-10-19, 14:15): new Custom HTML tag "Meta Pixel base" (standard base code, fbq init 334659672895495 and PageView, trigger All Pages, firing once per page, consent setting "require additional consent" ad_storage and ad_user_data); the existing tag "[FB] Thank You Mini Course" (fbq track Lead on /thank-you-healthy-desserts-mini-course/) now has "Meta Pixel base" as setup tag and does not fire if the setup tag fails. Blocker: leonors.com has no cookie banner at all (no CookieYes, no Complianz; GA4, Clarity, AdSense and GTM load for everyone), so the consent condition cannot gate anything yet; with no consent defaults GTM treats the consent check as granted. Decision pending: install CookieYes with Google Consent Mode v2 and then publish, or publish without consent gating.

## Decisions of 2026-10-18

- Automatic launch (option 1, chosen by Leonor): the page follows the dates on the server, with a 5-minute cache; no cron, no Vercel API token, no feature flag service. Manual overrides stay (`open`, `waitlist`).
- Launch price: a single public env var, `NEXT_PUBLIC_LAUNCH_PRICE`, no code change at launch. The regular price stays the source of truth in `src/config/site.ts` (`PRICING`); components read `pricingFor(launch.launchPrice)` with the state resolved on the server. Plan formula: total = round(launch price x 350 / 299), installment = total / 4, so the markup of the regular plan is kept and the total always divides exactly by 4.
- The CNAME `program` on Cloudflare is done (2026-10-16); the duplicate open item in phase 3 is now ticked.

## Open items (do not block)

- Exact launch date (`NEXT_PUBLIC_LAUNCH_DATE`), campaign price (`NEXT_PUBLIC_LAUNCH_PRICE=199`) and end of the campaign (`NEXT_PUBLIC_LAUNCH_PRICE_UNTIL`) on Vercel; the campaign cart URL is already set
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
