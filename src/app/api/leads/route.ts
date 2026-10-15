import { NextResponse, type NextRequest } from "next/server";
import { leadSchema, type LeadInsert } from "@/lib/leads-types";
import { storeLead, markLeadSynced } from "@/lib/leads";
import { isSystemeConfigured, syncLeadToSysteme } from "@/lib/systeme";
import { hasServiceRole } from "@/lib/supabase";

/**
 * Public, unauthenticated endpoint by design: it only creates a lead for the
 * email the visitor typed. It never reads, lists or returns stored data.
 * Security notes: docs/regras-de-seguranca.md and SECURITY.md.
 */

/** Simple in-memory rate limit: 5 submissions per IP per 10 minutes, per server instance. */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const MAX_BODY_BYTES = 8 * 1024;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim().slice(0, 64);
  return (req.headers.get("x-real-ip") ?? "unknown").slice(0, 64);
}

function tagFor(source: LeadInsert["source"]): string {
  return source === "waitlist"
    ? process.env.SYSTEME_TAG_WAITLIST?.trim() || "FDP Waitlist"
    : process.env.SYSTEME_TAG_FREE_GUIDE?.trim() || "[EBOOK][REGISTO] Indulge in Wellness";
}

/** One identical success body for every accepted request, so nothing about stored data leaks. */
const OK = { ok: true } as const;

export async function POST(req: NextRequest) {
  const ip = clientIp(req);
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many requests" }, { status: 429 });
  }

  const length = Number(req.headers.get("content-length") ?? "0");
  if (length > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "Payload too large" }, { status: 413 });
  }

  // Without Supabase the contact goes straight to Systeme.io, which is the system of record
  // for Leonor's email lists. On Vercel the filesystem is ephemeral, so the local JSON
  // fallback is never used there: with neither backend configured the request is refused.
  const systemeOnly = !hasServiceRole() && isSystemeConfigured();
  if (process.env.VERCEL && !hasServiceRole() && !systemeOnly) {
    console.error("[leads] Neither Supabase nor Systeme.io is configured in a deployed environment");
    return NextResponse.json({ ok: false, error: "Service unavailable" }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid input" }, { status: 400 });
  }

  // Honeypot filled: pretend success, store nothing.
  if (parsed.data.website) return NextResponse.json(OK);

  const d = parsed.data;
  const lead: LeadInsert = {
    email: d.email,
    first_name: d.firstName ? d.firstName : null,
    source: d.source,
    utm_source: d.utm?.source ?? null,
    utm_medium: d.utm?.medium ?? null,
    utm_campaign: d.utm?.campaign ?? null,
    consent: true,
  };

  if (systemeOnly) {
    const sync = await syncLeadToSysteme({
      email: lead.email,
      firstName: lead.first_name ?? undefined,
      tagRef: tagFor(lead.source),
    });
    if (!sync.synced) {
      console.error("[leads] Systeme.io sync failed:", sync.error);
      return NextResponse.json({ ok: false, error: "Could not save your details" }, { status: 502 });
    }
    return NextResponse.json(OK);
  }

  try {
    const stored = await storeLead(lead);

    if (!stored.record.synced_to_systeme) {
      const sync = await syncLeadToSysteme({
        email: lead.email,
        firstName: lead.first_name ?? undefined,
        tagRef: tagFor(lead.source),
      });
      if (sync.synced) {
        await markLeadSynced(stored.record.id, sync.contactId);
      } else if (sync.error && sync.error !== "SYSTEME_API_KEY not set") {
        console.warn("[leads] Systeme.io sync failed:", sync.error);
      }
    }

    return NextResponse.json(OK);
  } catch (err) {
    console.error("[leads] store failed:", err instanceof Error ? err.message : "unknown error");
    return NextResponse.json({ ok: false, error: "Could not save your details" }, { status: 500 });
  }
}
