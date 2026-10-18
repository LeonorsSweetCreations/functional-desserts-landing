# AGENTS.md

Instructions for every AI coding agent working in this repository (Codex, Claude Code, or any other). Read this file and `PLAN.md` before touching anything. Update the checklist in `PLAN.md` when you finish a task.

## 1. What this project is

A single, dedicated sales landing page for **The Functional Desserts Program** by Leonor Capristano (Leonor's Sweet Creations, leonors.com). It replaces the current sales page hosted on Systeme.io at `https://healthy.leonors.com/functionaldessertsprogram-main`.

The owner is Leonor. She approves every phase. Phases:

1. **Localhost only**. Done. Leonor approved the page on 2026-10-15 ("está pronta").
2. **GitHub**: private repo. Approved by Leonor on 2026-10-15 (current phase).
3. **Vercel**: approved by Leonor on 2026-10-15, together with phase 2. Supabase is optional now, see `LEAD_CAPTURE` below.

Never run `git init`, `git push`, `vercel`, or any deploy command unless Leonor has asked for it in the current conversation.

## 2. Non-negotiable copy rules (set by Leonor)

Apply these to every string on the page, every placeholder, every alt text, and every message you write to Leonor.

1. **No em dashes (—) and no en dashes (–). Ever.** Use a full stop, a comma, or start a new sentence. Hyphens inside compound words (gluten-free, cook-along) are fine.
2. **No analogies, no metaphors.** Say the thing directly.
3. **The student is the subject.** Write in second person ("you"). Describe what she gains, feels, can do, and stops suffering. The program is the means, never the hero.
4. **Benefit before feature.** Every module, bonus, or mentorship element is introduced by its result for the student first, then by what it contains. Internal formula: "You will [result], because [feature]".
5. **Every section title states an outcome for the student**, not a section name. Write "What you will be able to do after each module", not "Curriculum".
6. **Pains first, then the solution.** Start from the real problems (recipes that fail, wasted ingredients, feeling unwell after sweets, doing it alone) and resolve each one.
7. **Mentorship is the central message.** One year of monthly live Q&A sessions, a monthly cook-along session, recordings of every live, personal feedback on the student's recipes, a private student community, and direct messaging between lives. It appears in the hero, has its own section, leads the pricing list, and has its own FAQ entries.
8. Language of the page: **English only** (British spelling: favourite, colour).
9. Replies to Leonor: **European Portuguese**, no dashes.

## 3. Facts that must not change

- Program: 5 modules (The Basics of Baking; All About Functional Baking; All About Nutrition; The Alchemy of Baking; Adjusting and Creating Recipes). 30+ video lessons, PDF guides, charts, quizzes, worksheets.
- Bonuses: #01 DIY Recipes (€39), #02 Healthy Syrups, Fillings, Frostings and Creams + ebook (€49), #03 Raw Vegan Desserts + ebook (€49), #04 Cakes, Desserts and Bread + ebook (€99). Stated total value €776 before mentorship.
- Price: **€299 one-time** (changed from €199 by Leonor on 2026-10-15) or **4 x €87.50** (payment plan total €350, always shown explicitly; was 4 x €62.50 before 2026-10-15). Launch price (2026-10-18): when `NEXT_PUBLIC_LAUNCH_PRICE` is set (e.g. `199`) the price card, the sticky bar, the FAQ and the JSON-LD offer show €299 struck through and the launch price highlighted, with the plan recomputed at the same markup (total = round(launch x 350 / 299), 4 installments; 199 gives 4 x €58.25, total €233). Unset: the regular prices. `NEXT_PUBLIC_LAUNCH_PRICE_UNTIL` ends the offer automatically and `NEXT_PUBLIC_CHECKOUT_LAUNCH_URL` (https on healthy.leonors.com only) is the cart linked while the offer runs. The regular prices stay in `PRICING`; components call `pricingFor(launch.launchPrice)` and `priceStrings(...)` with the state they receive.
- Guarantee: 14-day money-back.
- Mentorship: included in the €299, lasts **12 months**, live Q&A is **monthly** (changed from weekly by Leonor on 2026-10-12), runs on Zoom plus a private student group (platform to be confirmed by Leonor; keep wording generic until then).
- Leonor: 10+ years as a professional baker and cake designer, 3 years studying nutrition, Integrative Nutrition Health Coach. Diagnosed with food intolerances, which led her to functional baking.
- Program status: closed now, launch expected in 1 to 3 months. Until launch the primary CTA is "Join the waiting list". Since 2026-10-18 the switch is automatic: with `NEXT_PUBLIC_LAUNCH_MODE=auto` doors open at `NEXT_PUBLIC_LAUNCH_DATE` and every CTA points to the cart, recomputed on the server every 5 minutes (`src/lib/launch.ts`, a `use cache` function with a 5-minute `cacheLife`). `waitlist` and `open` still force a state. Components never read the clock themselves; they receive a `launch` prop (`LaunchState` in `src/config/site.ts`) from `page.tsx`.
- Waiting list (Leonor, 2026-10-16, option B): the sign-up form lives on this page, once in the hero and once on the price card (`#waitlist`). Every "Join the waiting list" button scrolls to the price card form. Both post to `/api/leads` with `source: "waitlist"` and the contact gets the Systeme.io tag `FDP Waitlist`, the same tag the Systeme.io page `https://healthy.leonors.com/waiting-list` assigns, so the same automation runs. That page stays live as a fallback (`NEXT_PUBLIC_LEAD_CAPTURE=systeme`).
- Free guide (Leonor, 2026-10-15): the form on this page sends the contact to Systeme.io through `/api/leads` with the tag "[EBOOK][REGISTO] Indulge in Wellness" (`LEAD_CAPTURE=native`, the default; Supabase optional). `NEXT_PUBLIC_LEAD_CAPTURE=systeme` replaces the form with a link to the Systeme.io opt-in page.

## 4. URLs and slugs (no link may break)

- The page route is **`/functionaldessertsprogram-main`**. The root `/` permanently redirects to it.
- All outbound links stay exactly as they are today, centralised in `src/config/site.ts`:
  - Cart: `https://healthy.leonors.com/functionaldessertsprogram-cart`
  - Waiting list page: `https://healthy.leonors.com/waiting-list`
  - Free guide "Indulge in Wellness": `https://healthy.leonors.com/optinindulgeinwellness`
  - Free ebook: `https://healthy.leonors.com/optin7quickandhealthyrecipes`
  - Healthy Snacks Course: `https://healthy.leonors.com/healthysnackscourse`
  - Paid ebook: `https://healthy.leonors.com/dessertisnottheenemy`
  - Legal: `https://leonors.com/privacy-policy/`, `https://leonors.com/disclaimer/`, `https://leonors.com/terms-and-conditions/`
  - Blog: `https://leonors.com/blog/`
- Keep the existing anchors where they apply: `#functional-course`, `#ebooks`, `#leonor`, `#leadmagnet`.
- Social: facebook.com/LeonorsSweetCreations, instagram.com/leonorssweetcreations, youtube.com/c/LeonorsSweetCreations, pinterest.pt/leonorssweetcreations. Support: support@leonors.com.
- Final domain strategy is decided in phase 3. Do not assume one.

## 5. Brand

- **Fonts:** Playfair Display for headings, Montserrat for body (16px base). Loaded through `next/font/google`, self-hosted at build.
- **Colours (Tailwind tokens in `tailwind.config.ts`):**
  - `brand.pink` #E9A8A8 (primary accent, backgrounds and buttons only, never for body text)
  - `brand.rose` #C5676E, `brand.mauve` #A36E6D, `brand.plum` #9E4072
  - `brand.teal` #0F9598, `brand.tealDark` #086062, `brand.tealLight` #6DC1C3, `brand.tealPale` #D6F1F2
  - `brand.cream` #F4EDE4, `brand.sand` #F0E0CC, `brand.linen` #EAE0D2
  - `brand.ink` #333333 (text), `brand.muted` #5E5A5A (secondary text, passes AA on cream), `brand.grey` #8B8686 and `brand.greyDark` #7B7777 (decorative only, fail AA on cream), `brand.stone` #908A82
- Text contrast must meet WCAG AA. Body text is `brand.ink` or `brand.tealDark` on light backgrounds.
- No dark mode.
- Logo files live in `public/images/`. Until Leonor supplies originals, use the PNGs listed in `public/images/README.md`.

## 6. Stack and commands

- Next.js 15 (App Router, TypeScript, `src/` directory), Tailwind CSS, `@supabase/supabase-js`, `zod`, `lucide-react`. Package manager: **pnpm**.
- `pnpm dev` starts localhost:3000. `pnpm build` must pass with zero TypeScript errors before any hand-off. `pnpm lint` must pass.
- No heavy animation libraries. CSS transitions and `IntersectionObserver` only.
- Every image goes through `next/image`.

## 7. Folder map

```
src/app/                         layout, root redirect, functionaldessertsprogram-main/page.tsx, api/leads/route.ts, opengraph-image.tsx, sitemap.ts, robots.ts
src/components/sections/         one file per page section, in page order
src/components/ui/               Button, Container, SectionHeading, Accordion, forms
src/components/Analytics.tsx     GTM + Meta Pixel, only loads when env IDs exist and cookies accepted
src/content/copy.ts              ALL page text. Edit copy here, never inline in components
src/config/site.ts               launch settings (mode, date, price, offer end, launch cart), prices, every URL
src/lib/launch.ts                getLaunchState(): time-based open/launch-price decision, cached 5 minutes
src/lib/supabase.ts              server-side client (service role)
src/lib/systeme.ts               Systeme.io contact + tag API
src/lib/leads-mock.ts            local JSON fallback when Supabase env is missing
supabase/migrations/             SQL, applied by Leonor in Supabase Studio or CLI
public/images/                   assets Leonor supplies, see README there
```

## 8. Data and secrets

- Tables: `leads` (email, first_name, source in waitlist|free_guide, utm_*, consent, synced_to_systeme, created_at) and `testimonials`. RLS enabled. Inserts happen only in the server Route Handler with the service role key.
- **Never** import `SUPABASE_SERVICE_ROLE_KEY` or `SYSTEME_API_KEY` in a client component or expose them with a `NEXT_PUBLIC_` prefix.
- **Never** commit `.env.local`. `.env.local.example` lists every variable with empty values.
- If Supabase env vars are missing, the API falls back to `src/lib/leads-mock.ts` (writes `.local-data/leads.json`, gitignored) so the page can be reviewed without credentials.
- Systeme.io sync failure must not fail the user's submission. Store the lead, log the error, return success.

## 8b. Security rules (Leonor's five rules, mandatory)

Before implementing or reviewing code, read and apply the rules in `docs/regras-de-seguranca.md`. Adapt the mechanisms to this project's technology (Next.js Route Handlers, Supabase RLS, Vercel env vars) and state what was verified and what was left unverified. The current review and the list of controls live in `SECURITY.md`; update it whenever you add an entry point, a table, an integration or a config change.

## 9. Quality bar

- Mobile-first. Check 375px, 768px, 1280px.
- Lighthouse mobile: Performance, Accessibility, Best Practices, SEO all 90 or above on `pnpm build && pnpm start`.
- Semantic HTML, one `h1`, headings in order, every form input labelled, focus states visible.
- `Course` and `FAQPage` JSON-LD present.
- Cookie consent banner before any tracking script loads.

## 10. How to work here

1. Read `PLAN.md`, find the next unchecked item.
2. Make the change. Keep copy in `src/content/copy.ts`.
3. Run `pnpm lint` and `pnpm build`.
4. Grep your diff for `—` and `–`. Remove any you find.
5. Tick the item in `PLAN.md`. Add a one-line note if you deviated and why.
6. Ask Leonor before doing anything outside `PLAN.md`.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
