import { ArrowRight } from "lucide-react";
import { Button } from "./Button";
import { LINKS, WAITLIST_HREF, isOpen } from "@/config/site";

/**
 * The primary call to action. In waitlist mode it opens the Systeme.io waiting
 * list page; in open mode it links to the Systeme.io cart. One place to change it.
 */
export function Cta({
  labelOpen,
  labelWaitlist,
  size = "lg",
  variant = "primary",
  className = "",
  withArrow = true,
}: {
  labelOpen: string;
  labelWaitlist: string;
  size?: "md" | "lg";
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  withArrow?: boolean;
}) {
  const href = isOpen ? LINKS.checkout : WAITLIST_HREF;
  const label = isOpen ? labelOpen : labelWaitlist;
  return (
    <Button href={href} size={size} variant={variant} className={className}>
      {label}
      {withArrow ? <ArrowRight aria-hidden className="h-4 w-4" /> : null}
    </Button>
  );
}
