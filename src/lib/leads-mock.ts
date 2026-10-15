/**
 * Local fallback used only when Supabase env vars are missing (phase 1 on
 * localhost). Appends leads to .local-data/leads.json, which is gitignored.
 * Server only.
 */

import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import type { LeadInsert, LeadRecord } from "./leads-types";

const DATA_DIR = path.join(process.cwd(), ".local-data");
const FILE = path.join(DATA_DIR, "leads.json");

async function readAll(): Promise<LeadRecord[]> {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as LeadRecord[]) : [];
  } catch {
    return [];
  }
}

export async function mockInsertLead(lead: LeadInsert): Promise<{ record: LeadRecord; duplicate: boolean }> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const all = await readAll();

  const existing = all.find(
    (l) => l.email.toLowerCase() === lead.email.toLowerCase() && l.source === lead.source,
  );
  if (existing) return { record: existing, duplicate: true };

  const record: LeadRecord = {
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    synced_to_systeme: false,
    systeme_contact_id: null,
    ...lead,
  };
  all.push(record);
  await fs.writeFile(FILE, JSON.stringify(all, null, 2), "utf8");
  return { record, duplicate: false };
}

export async function mockMarkSynced(id: string, contactId: string | null): Promise<void> {
  const all = await readAll();
  const idx = all.findIndex((l) => l.id === id);
  if (idx === -1) return;
  all[idx] = { ...all[idx], synced_to_systeme: true, systeme_contact_id: contactId };
  await fs.writeFile(FILE, JSON.stringify(all, null, 2), "utf8");
}
