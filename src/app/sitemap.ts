import type { MetadataRoute } from "next";
import { PAGE_SLUG, SITE_URL } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}${PAGE_SLUG}`,
      // Fixed date on purpose: the build must stay deterministic under Cache Components.
      lastModified: "2026-10-12",
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
