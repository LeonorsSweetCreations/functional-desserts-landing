import { z } from "zod";

/**
 * "leonor" -> "Leonor", "maria joão" -> "Maria João", "ana-rita" -> "Ana-Rita",
 * "LEONOR" -> "Leonor". Collapses repeated spaces.
 */
export function capitalizeName(name: string): string {
  return name
    .replace(/\s+/g, " ")
    .toLocaleLowerCase()
    .replace(/(^|[\s\-'])(\p{L})/gu, (_m, sep: string, ch: string) => sep + ch.toLocaleUpperCase());
}

export const LEAD_SOURCES = ["waitlist", "free_guide"] as const;
export type LeadSource = (typeof LEAD_SOURCES)[number];

export const leadSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  firstName: z
    .string()
    .trim()
    .max(80)
    .transform(capitalizeName)
    .optional()
    .or(z.literal("")),
  source: z.enum(LEAD_SOURCES),
  consent: z.literal(true, { message: "Consent is required" }),
  utm: z
    .object({
      source: z.string().max(120).optional(),
      medium: z.string().max(120).optional(),
      campaign: z.string().max(120).optional(),
    })
    .optional(),
  /** Honeypot. Real users never fill this. */
  website: z.string().max(200).optional(),
}).strict();

export type LeadPayload = z.infer<typeof leadSchema>;

export type LeadInsert = {
  email: string;
  first_name: string | null;
  source: LeadSource;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  consent: boolean;
};

export type LeadRecord = LeadInsert & {
  id: string;
  created_at: string;
  synced_to_systeme: boolean;
  systeme_contact_id: string | null;
};

export type Testimonial = {
  id: string;
  name: string;
  text: string;
  photo_url: string | null;
  highlight: string | null;
  sort_order: number;
};
