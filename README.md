# The Functional Desserts Program, landing page

Sales page for The Functional Desserts Program by Leonor's Sweet Creations. Built with Next.js 16, Tailwind CSS 4 and Supabase. Agent instructions live in `AGENTS.md`, the plan and checklist in `PLAN.md`.

## Run locally

```bash
pnpm install
cp .env.local.example .env.local   # fill in later, the page works without it
pnpm dev
```

Open http://localhost:3000. The root redirects to `/functionaldessertsprogram-main`.

## Checks

```bash
pnpm lint          # ESLint
pnpm exec tsc --noEmit
pnpm build && pnpm start   # production build on http://localhost:3000
```

## Where things are

| What | Where |
|---|---|
| All page text | `src/content/copy.ts` |
| Launch mode, prices, every URL | `src/config/site.ts` and `.env.local` |
| Page sections | `src/components/sections/` |
| Lead API (waiting list, free guide) | `src/app/api/leads/route.ts` |
| Supabase schema | `supabase/migrations/0001_init.sql` |
| Images Leonor supplies | `public/images/` (see the README there) |
| Screenshots and Lighthouse report | `docs/` |

## Switching from waiting list to open doors

The page switches by itself. With `NEXT_PUBLIC_LAUNCH_MODE=auto` (the default) doors are closed until `NEXT_PUBLIC_LAUNCH_DATE` and open from that moment on, with every call to action pointing to the Systeme.io cart; the state is recomputed on the server every 5 minutes, so no redeploy is needed. `waitlist` and `open` force a state whatever the date. `NEXT_PUBLIC_LAUNCH_DATE` also drives the countdown while closed.

Launch offer: `NEXT_PUBLIC_LAUNCH_PRICE` (e.g. `199`) shows €299 struck through and the launch price highlighted, with the payment plan recomputed at the same markup (199 gives 4 x €58.25, total €233). `NEXT_PUBLIC_LAUNCH_PRICE_UNTIL` ends the offer at that moment, and `NEXT_PUBLIC_CHECKOUT_LAUNCH_URL` is the cart with the launch prices that the buttons link to while the offer runs. All of these are read in `src/config/site.ts`; the time-based decision lives in `src/lib/launch.ts`.

### Launch day, step by step

The three dates and the price are public env vars on Vercel, so they are inlined at build time: changing them needs one redeploy, after which the page follows the clock by itself. Example for a launch on 1 December 2026 at 09:00 Lisbon time (08:00 UTC in winter; always write the value in UTC with the `Z` suffix) with the €199 offer running for one week:

| Variable | Example value | What it does |
|---|---|---|
| `NEXT_PUBLIC_LAUNCH_MODE` | `auto` | Already set. Doors closed before the date, open from it on. |
| `NEXT_PUBLIC_LAUNCH_DATE` | `2026-12-01T08:00:00Z` | Opens the doors at that moment; shows the countdown and "Doors open on 1 December 2026" before it. |
| `NEXT_PUBLIC_LAUNCH_PRICE` | `199` | €299 struck through, €199 highlighted, plan 4 x €58.25 (total €233). |
| `NEXT_PUBLIC_LAUNCH_PRICE_UNTIL` | `2026-12-08T08:00:00Z` | Offer ends at that moment: regular prices and regular cart again. |
| `NEXT_PUBLIC_CHECKOUT_LAUNCH_URL` | `https://healthy.leonors.com/functionaldessertsprogram-cart-launch` | Already set. Cart the buttons link to while the offer runs. |

Before the launch (any day, ideally a week ahead):

1. Vercel > project `functional-desserts-landing` > Settings > Environment Variables, environment Production: set `NEXT_PUBLIC_LAUNCH_DATE`, `NEXT_PUBLIC_LAUNCH_PRICE` and `NEXT_PUBLIC_LAUNCH_PRICE_UNTIL` with the values above (change the dates to the real ones). Leave `NEXT_PUBLIC_LAUNCH_MODE=auto` and `NEXT_PUBLIC_CHECKOUT_LAUNCH_URL` as they are. Set the same three on Preview if you want preview deployments to match.
2. Redeploy once: Deployments > latest production deployment > "..." > Redeploy (or push any commit to `main`). Without this the page keeps the old values, because `NEXT_PUBLIC_*` is baked into the build.
3. Check https://program.leonors.com/functionaldessertsprogram-main while still closed: the price card shows "Doors open on 1 December 2026" and the countdown, no euro amount appears anywhere, every button says "Join the waiting list" and scrolls to the waiting list form.
4. Check the campaign cart https://healthy.leonors.com/functionaldessertsprogram-cart-launch by hand: the order form lists "Full Payment (launch offer)" €199 and "Payment Plan (campaign)" 4 x €58.25, and the page texts say "Now 199€ / or 4 x €58.25". Those texts are hard-coded in the Systeme.io page editor; the site does not update them.
5. Nothing else to do on Vercel on the day itself.

On launch day (within 5 minutes of `NEXT_PUBLIC_LAUNCH_DATE`; the server state is cached for 5 minutes and a page open in a visitor's browser refreshes itself when the countdown hits zero):

1. Open the page in a private window and confirm: no countdown, prices visible with €299 struck through and €199 highlighted, "4 x €58.25 (total €233)", every button says "Join the program" and links to the campaign cart URL above (hover a button or check the link), the FAQ answer mentions the launch price.
2. Click a button through to the cart and confirm the order form shows the €199 plans. If you can, run a test order with a 100 % coupon or a €1 plan and confirm the buyer gets access to the course "Functional Desserts Program" (see "Products on Systeme.io" below).
3. Switch the WordPress popup to "Doors are open" (next section) and update the three homepage buttons on leonors.com (page 23936, buttons `5f2c5d5` and `571c6ff` and the text widget `3ae5442`, "Doors open in December" copy) to "Doors are open" with the cart link if you want them to sell directly; by default they link to this page, which already sells.
4. If anything is wrong and you need to close again, set `NEXT_PUBLIC_LAUNCH_MODE=waitlist` on Vercel and redeploy; `open` forces the opposite.

When the offer ends (`NEXT_PUBLIC_LAUNCH_PRICE_UNTIL`): nothing to do. Within 5 minutes the page shows €299 and 4 x €87.50 and links the regular cart. Check once that the campaign cart is no longer reachable from the page, and consider disabling the campaign cart step in Systeme.io so a bookmarked link cannot buy at €199.

### WordPress popup "Pop up Desserts Program" on launch day

The leonors.com homepage and posts show the Popup Maker popup 26149 "Pop up Desserts Program" (waiting list version: opens after 6 seconds on every post, cookie `pum-fdp-waitlist` for 7 days). The free guide popup 2811 opens at the same 6 seconds and wins for first-time visitors; the program popup only shows once the guide cookie `pum-2811` is set.

On launch day, in WordPress > Popup Maker > All Popups > "Pop up Desserts Program":

1. Content (a core/html block): title to "Doors are open", subtitle to one line about the launch price and the end date (e.g. "€199 instead of €299 until 8 December"), button text to "Enrol now", button link to `https://healthy.leonors.com/functionaldessertsprogram-cart-launch` (the campaign cart; switch it to `https://program.leonors.com/functionaldessertsprogram-main` without `#waitlist` if you prefer the sales page). Remove `#waitlist` from any remaining link.
2. Invert the priority with the guide popup so the program popup is the one first-time visitors see: in popup 26149 set the trigger delay to 6000 ms and remove the condition that requires the guide cookie (or set its cookie rule so it ignores `pum-2811`); in popup 2811 "free guide" raise the delay (e.g. 30000 ms) or add the condition "cookie pum-fdp-waitlist is set" so it only shows after the program popup. Popup Maker shows the popup with the lower delay first; two popups at the same delay follow the order of the popups list.
3. Save and check in a private window: the program popup appears on a post after 6 seconds with the new text and link, the guide popup does not appear in the same visit.
4. When the offer ends, set the button link to the regular cart or to the sales page and update the subtitle; when doors close again, restore the waiting list copy, the `#waitlist` link and the original priority.

Popup settings (cookies, triggers, conditions) are post meta edited on the popup edit page; the content is a core/html block editable through the REST route `/wp/v2/popups/26149`. Saving through the block editor wipes conditions that are not present as inputs, so re-read the settings after each save.

### Products on Systeme.io

Carts on Systeme.io (funnel "[VSL] The Functional Desserts Program"): the regular cart is `healthy.leonors.com/functionaldessertsprogram-cart` (product "The Functional Desserts Program", plans €299 one-time or 4 x €87.50, tax included). The campaign cart is `healthy.leonors.com/functionaldessertsprogram-cart-launch`, a duplicate of that step with its own product "The Functional Desserts Program (campaign)" (same course access) and the plans €199 one-time or 4 x €58.25; its URL is in `NEXT_PUBLIC_CHECKOUT_LAUNCH_URL` on Vercel. Price plans belong to the product in Systeme.io, which is why each cart has its own product. Checked on 2026-10-19 in the funnel step configuration of both carts: both products list the same single resource, the course "Functional Desserts Program" (the only course with that name in Recursos > Cursos) with progressive access, so a campaign buyer gets exactly what a regular buyer gets. Only the regular cart carries the coupon DESSERTS100; the campaign cart has no coupon. The price texts on both cart pages are hard-coded in the page editor and must be kept in line with `PRICING` and the launch price. Nothing else links to the cart URL directly (checked on 2026-10-19 across leonors.com, the blog, the linktree and the Systeme.io pages).

## Where the buttons go

The waiting list form appears twice, in the hero and on the price card (`#waitlist`); every "Join the waiting list" button scrolls to the price card. It and the free guide form post to `/api/leads`, which creates the contact in Systeme.io and assigns the tag (`SYSTEME_API_KEY`, `SYSTEME_TAG_WAITLIST`, `SYSTEME_TAG_FREE_GUIDE`). Supabase is optional and keeps a copy of each lead. In production with neither configured the route answers 503. `NEXT_PUBLIC_LEAD_CAPTURE=systeme` removes both forms and links the buttons to the Systeme.io waiting list and opt-in pages instead.

## Leads without Supabase (native mode only)

When the Supabase variables are empty, submissions are appended to `.local-data/leads.json` (gitignored) so the page can be reviewed end to end on localhost.
