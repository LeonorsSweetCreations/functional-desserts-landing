/**
 * Supabase clients. Server only. Never import this file from a client component.
 *
 * - adminClient(): service role, used by the leads Route Handler to insert rows
 *   while RLS stays on with no public policies.
 * - publicClient(): anon key, used at render time to read published testimonials.
 */

import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || "";
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() || "";
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || "";

export function isSupabaseConfigured(): boolean {
  return Boolean(url && anonKey);
}

export function hasServiceRole(): boolean {
  return Boolean(url && serviceKey);
}

let admin: SupabaseClient | null = null;
let pub: SupabaseClient | null = null;

export function adminClient(): SupabaseClient | null {
  if (!hasServiceRole()) return null;
  if (!admin) {
    admin = createClient(url, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return admin;
}

export function publicClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;
  if (!pub) {
    pub = createClient(url, anonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return pub;
}
