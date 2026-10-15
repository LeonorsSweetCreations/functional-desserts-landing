/**
 * Published testimonials from Supabase. Returns [] when Supabase is not
 * configured or the table is empty, and the section falls back to the image.
 * Server only.
 */

import "server-only";
import { publicClient } from "./supabase";
import type { Testimonial } from "./leads-types";

/** Hosts next/image is allowed to load from (must match next.config.ts remotePatterns). */
const ALLOWED_PHOTO_HOSTS = new Set(["leonors.com", "d1yei2z3i6k35z.cloudfront.net"]);

/** Keep only local paths or https URLs on allowed hosts. Anything else is dropped, never rendered. */
function safePhotoUrl(value: unknown): string | null {
  if (typeof value !== "string" || value.length === 0 || value.length > 512) return null;
  if (value.startsWith("/images/") && !value.includes("..")) return value;
  try {
    const u = new URL(value);
    if (u.protocol === "https:" && ALLOWED_PHOTO_HOSTS.has(u.hostname)) return u.toString();
  } catch {
    // not a URL
  }
  return null;
}

function clean(s: unknown, max: number): string {
  return typeof s === "string" ? s.replace(/\s+/g, " ").trim().slice(0, max) : "";
}

export async function getPublishedTestimonials(): Promise<Testimonial[]> {
  const supabase = publicClient();
  if (!supabase) return [];

  try {
    const { data, error } = await supabase
      .from("testimonials")
      .select("id, name, text, photo_url, highlight, sort_order")
      .eq("is_published", true)
      .order("sort_order", { ascending: true })
      .limit(12);
    if (error || !data) return [];

    return data
      .map((row) => ({
        id: String(row.id),
        name: clean(row.name, 80),
        text: clean(row.text, 600),
        highlight: clean(row.highlight, 120) || null,
        photo_url: safePhotoUrl(row.photo_url),
        sort_order: Number(row.sort_order) || 0,
      }))
      .filter((t) => t.name && t.text);
  } catch {
    return [];
  }
}
