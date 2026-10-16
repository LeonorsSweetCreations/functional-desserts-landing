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

Set `NEXT_PUBLIC_LAUNCH_MODE=open` in `.env.local` (or on Vercel) and redeploy. Every call to action then points to the Systeme.io cart. Set `NEXT_PUBLIC_LAUNCH_DATE` to an ISO date to show the countdown while in waiting list mode.

## Where the buttons go

Every "Join the waiting list" button opens the Systeme.io waiting list page (`LINKS.waitingListPage`). The free guide form posts to `/api/leads`, which creates the contact in Systeme.io and assigns the tag (`SYSTEME_API_KEY`, `SYSTEME_TAG_FREE_GUIDE`). Supabase is optional and keeps a copy of each lead. In production with neither configured the route answers 503. `NEXT_PUBLIC_LEAD_CAPTURE=systeme` removes the form and links the free guide button to the Systeme.io opt-in page instead.

## Leads without Supabase (native mode only)

When the Supabase variables are empty, submissions are appended to `.local-data/leads.json` (gitignored) so the page can be reviewed end to end on localhost.
