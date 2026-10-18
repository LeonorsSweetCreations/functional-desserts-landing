"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { sticky, priceStrings } from "@/content/copy";
import { ANCHORS, WAITLIST_HREF, type LaunchState } from "@/config/site";

/** Mobile-only bar that appears after the hero scrolls out and hides near the price card. */
export function StickyCta({ launch }: { launch: LaunchState }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.9;
      const target = document.getElementById(ANCHORS.waitlist);
      let nearTarget = false;
      if (target) {
        const r = target.getBoundingClientRect();
        nearTarget = r.top < window.innerHeight && r.bottom > 0;
      }
      setVisible(pastHero && !nearTarget);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const href = launch.open ? launch.checkoutUrl : WAITLIST_HREF;
  const label = launch.open ? sticky.open : sticky.waitlist;
  const lp = launch.launchPrice;
  const ps = priceStrings(lp);

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-brand-linen bg-white/95 p-3 shadow-[0_-8px_30px_-12px_rgb(51_51_51/0.25)] backdrop-blur transition-transform duration-300 md:hidden ${visible ? "translate-y-0" : "translate-y-full"}`}
    >
      <div className="mx-auto flex max-w-lg items-center justify-between gap-3">
        <p className="text-xs leading-tight text-brand-muted">
          {lp ? (
            <>
              <span className="block">
                <span className="sr-only">{sticky.regularPriceLabel} </span>
                <s className="decoration-brand-rose/80">{ps.regularOneTime}</s>{" "}
                <span className="font-display text-base font-semibold text-brand-teal-dark">{ps.oneTime}</span>
              </span>
              <span className="block">{sticky.launchPlanNote(lp)}</span>
            </>
          ) : (
            <span className="block font-semibold text-brand-ink">{sticky.priceNote(lp)}</span>
          )}
        </p>
        <a
          href={href}
          tabIndex={visible ? 0 : -1}
          className="inline-flex items-center gap-2 rounded-full bg-brand-pink px-5 py-2.5 text-sm font-semibold text-brand-ink transition-colors hover:bg-brand-rose hover:text-white"
        >
          {label} <ArrowRight aria-hidden className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
