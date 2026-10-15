import Image from "next/image";
import { IMAGES, LINKS } from "@/config/site";

/**
 * Brand mark for the header and footer: Leonor's horizontal wordmark
 * (badge with the "L" plus "Leonor's sweet-creations").
 *
 * Leonor supplied the white version on 2026-10-15. The colour version for
 * light backgrounds was derived from it with the brand colours (pink badge,
 * ink text). See public/images/README.md.
 */
const WORDMARK = "Leonor's sweet-creations";

export function BrandLogo({ variant = "dark", className = "" }: { variant?: "dark" | "white"; className?: string }) {
  const src = variant === "white" ? IMAGES.logoWhite : IMAGES.logo;
  return (
    <a href={LINKS.home} className={`inline-flex items-center ${className}`} aria-label="Leonor's Sweet Creations, home">
      <Image src={src} alt={WORDMARK} width={755} height={295} className="h-11 w-auto sm:h-12" loading="eager" fetchPriority="high" />
    </a>
  );
}
