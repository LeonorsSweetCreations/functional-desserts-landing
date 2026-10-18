import { ArrowRight } from "lucide-react";
import { Button } from "./Button";
import { WAITLIST_HREF, type LaunchState } from "@/config/site";

/**
 * The primary call to action. In waitlist mode it scrolls to the waiting list form on the
 * price card; in open mode it links to the Systeme.io cart. One place to change it.
 */
export function Cta({
  launch,
  labelOpen,
  labelWaitlist,
  size = "lg",
  variant = "primary",
  className = "",
  withArrow = true,
}: {
  launch: LaunchState;
  labelOpen: string;
  labelWaitlist: string;
  size?: "md" | "lg";
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  withArrow?: boolean;
}) {
  const href = launch.open ? launch.checkoutUrl : WAITLIST_HREF;
  const label = launch.open ? labelOpen : labelWaitlist;
  return (
    <Button href={href} size={size} variant={variant} className={className}>
      {label}
      {withArrow ? <ArrowRight aria-hidden className="h-4 w-4" /> : null}
    </Button>
  );
}
