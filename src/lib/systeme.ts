/**
 * Minimal Systeme.io public API client. Server only.
 * Docs: https://developer.systeme.io/reference
 *
 * Creates (or finds) a contact and assigns a tag so Leonor's existing email
 * automations keep working. Tags can be configured by numeric id or exact name.
 */

import "server-only";
const BASE_URL = "https://api.systeme.io/api";

type SystemeContact = { id: number; email: string };
type SystemeTag = { id: number; name: string };

function apiKey(): string | null {
  return process.env.SYSTEME_API_KEY?.trim() || null;
}

export function isSystemeConfigured(): boolean {
  return apiKey() !== null;
}

async function systemeFetch<T>(path: string, init: RequestInit = {}): Promise<{ ok: boolean; status: number; data: T | null }> {
  const key = apiKey();
  if (!key) return { ok: false, status: 0, data: null };

  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      "X-API-Key": key,
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
    cache: "no-store",
  });

  let data: T | null = null;
  const text = await res.text();
  if (text) {
    try {
      data = JSON.parse(text) as T;
    } catch {
      data = null;
    }
  }
  return { ok: res.ok, status: res.status, data };
}

async function findContactByEmail(email: string): Promise<SystemeContact | null> {
  const res = await systemeFetch<{ items?: SystemeContact[] }>(`/contacts?email=${encodeURIComponent(email)}&limit=1`);
  const found = res.data?.items?.find((c) => c.email.toLowerCase() === email.toLowerCase());
  return found ?? null;
}

async function createContact(email: string, firstName?: string): Promise<SystemeContact | null> {
  const body: Record<string, unknown> = { email };
  if (firstName) body.fields = [{ slug: "first_name", value: firstName }];

  const res = await systemeFetch<SystemeContact>("/contacts", { method: "POST", body: JSON.stringify(body) });
  if (res.ok && res.data?.id) return res.data;

  // 422 usually means the contact already exists.
  if (res.status === 422) return findContactByEmail(email);
  return null;
}

async function resolveTagId(tagRef: string): Promise<number | null> {
  const trimmed = tagRef.trim();
  if (!trimmed) return null;
  if (/^\d+$/.test(trimmed)) return Number(trimmed);

  const res = await systemeFetch<{ items?: SystemeTag[] }>(`/tags?limit=100`);
  const tag = res.data?.items?.find((t) => t.name.toLowerCase() === trimmed.toLowerCase());
  if (tag) return tag.id;

  // Create the tag if it does not exist yet so automations can be attached to it.
  const created = await systemeFetch<SystemeTag>("/tags", { method: "POST", body: JSON.stringify({ name: trimmed }) });
  return created.ok && created.data?.id ? created.data.id : null;
}

async function assignTag(contactId: number, tagId: number): Promise<boolean> {
  const res = await systemeFetch(`/contacts/${contactId}/tags`, {
    method: "POST",
    body: JSON.stringify({ tagId }),
  });
  // 422 here means the tag was already assigned, which is fine.
  return res.ok || res.status === 422;
}

export type SyncResult = { synced: boolean; contactId: string | null; error?: string };

/**
 * Upsert the contact and assign the tag. Never throws: the caller stores the
 * lead regardless and records whether the sync succeeded.
 */
export async function syncLeadToSysteme(input: {
  email: string;
  firstName?: string;
  tagRef: string;
}): Promise<SyncResult> {
  if (!isSystemeConfigured()) return { synced: false, contactId: null, error: "SYSTEME_API_KEY not set" };

  try {
    const contact = await createContact(input.email, input.firstName);
    if (!contact) return { synced: false, contactId: null, error: "Could not create or find contact" };

    const tagId = await resolveTagId(input.tagRef);
    if (!tagId) return { synced: false, contactId: String(contact.id), error: `Tag "${input.tagRef}" not found` };

    const tagged = await assignTag(contact.id, tagId);
    return { synced: tagged, contactId: String(contact.id), error: tagged ? undefined : "Could not assign tag" };
  } catch (err) {
    return { synced: false, contactId: null, error: err instanceof Error ? err.message : "Unknown error" };
  }
}
