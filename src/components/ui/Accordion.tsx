import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

type Item = { id: string; summary: ReactNode; details: ReactNode };

/** Native, accessible accordion. No JavaScript needed. */
export function Accordion({ items, defaultOpenId }: { items: Item[]; defaultOpenId?: string }) {
  return (
    <div className="divide-y divide-brand-linen rounded-2xl border border-brand-linen bg-white shadow-card">
      {items.map((item) => (
        <details key={item.id} id={item.id} open={item.id === defaultOpenId} className="group">
          <summary className="flex items-center justify-between gap-4 px-5 py-5 text-left sm:px-7">
            <span className="flex-1">{item.summary}</span>
            <ChevronDown aria-hidden className="chevron h-5 w-5 shrink-0 text-brand-teal-dark" />
          </summary>
          <div className="px-5 pb-6 sm:px-7">{item.details}</div>
        </details>
      ))}
    </div>
  );
}
