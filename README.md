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

## Where the buttons go

The waiting list form appears twice, in the hero and on the price card (`#waitlist`); every "Join the waiting list" button scrolls to the price card. It and the free guide form post to `/api/leads`, which creates the contact in Systeme.io and assigns the tag (`SYSTEME_API_KEY`, `SYSTEME_TAG_WAITLIST`, `SYSTEME_TAG_FREE_GUIDE`). Supabase is optional and keeps a copy of each lead. In production with neither configured the route answers 503. `NEXT_PUBLIC_LEAD_CAPTURE=systeme` removes both forms and links the buttons to the Systeme.io waiting list and opt-in pages instead.

## Leads without Supabase (native mode only)

When the Supabase variables are empty, submissions are appended to `.local-data/leads.json` (gitignored) so the page can be reviewed end to end on localhost.
