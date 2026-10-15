/**
 * Lead storage: Supabase when configured, local JSON otherwise. Server only.
 */

import "server-only";
import { adminClient, hasServiceRole } from "./supabase";
import { mockInsertLead, mockMarkSynced } from "./leads-mock";
import type { LeadInsert, LeadRecord } from "./leads-types";

export type StoreResult = { record: LeadRecord; duplicate: boolean; backend: "supabase" | "local" };

export async function storeLead(lead: LeadInsert): Promise<StoreResult> {
  const supabase = adminClient();

  if (!supabase) {
    const { record, duplicate } = await mockInsertLead(lead);
    return { record, duplicate, backend: "local" };
  }

  const { data, error } = await supabase
    .from("leads")
    .insert(lead)
    .select("id, created_at, synced_to_systeme, systeme_contact_id")
    .single();

  if (error) {
    // 23505 = unique violation: same email already on this list.
    if (error.code === "23505") {
      const { data: existing } = await supabase
        .from("leads")
        .select("id, created_at, synced_to_systeme, systeme_contact_id")
        .eq("email", lead.email)
        .eq("source", lead.source)
        .single();
      if (existing) {
        return { record: { ...lead, ...existing } as LeadRecord, duplicate: true, backend: "supabase" };
      }
    }
    throw new Error(`Supabase insert failed: ${error.message}`);
  }

  return { record: { ...lead, ...data } as LeadRecord, duplicate: false, backend: "supabase" };
}

export async function markLeadSynced(id: string, contactId: string | null): Promise<void> {
  if (!hasServiceRole()) {
    await mockMarkSynced(id, contactId);
    return;
  }
  const supabase = adminClient();
  if (!supabase) return;
  await supabase
    .from("leads")
    .update({ synced_to_systeme: true, systeme_contact_id: contactId })
    .eq("id", id);
}
