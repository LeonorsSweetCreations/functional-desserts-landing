"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { sticky } from "@/content/copy";
import { ANCHORS, LINKS, WAITLIST_HREF, isOpen } from "@/config/site";

/** Mobile-only bar that appears after the hero scrolls out and hides near the price card. */
export function StickyCta() {
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

  const href = isOpen ? LINKS.checkout : WAITLIST_HREF;
  const label = isOpen ? sticky.open : sticky.waitlist;

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-brand-linen bg-white/95 p-3 shadow-[0_-8px_30px_-12px_rgb(51_51_51/0.25)] backdrop-blur transition-transform duration-300 md:hidden ${visible ? "translate-y-0" : "translate-y-full"}`}
    >
      <div className="mx-auto flex max-w-lg items-center justify-between gap-3">
        <p className="text-xs leading-tight text-brand-muted">
          <span className="block font-semibold text-brand-ink">{sticky.priceNote}</span>
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
