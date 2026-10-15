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

`NEXT_PUBLIC_LEAD_CAPTURE` (default `systeme`): the waiting list buttons link to the Systeme.io waiting list page and the free guide button links to the Systeme.io opt-in page. No form on this page, no database needed. Set it to `native` to use the forms on this page, which post to `/api/leads` (Supabase required in production).

## Leads without Supabase (native mode only)

When the Supabase variables are empty, submissions are appended to `.local-data/leads.json` (gitignored) so the page can be reviewed end to end on localhost.
