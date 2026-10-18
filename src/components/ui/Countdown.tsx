"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";

/** Ticks once a minute. Server snapshot is null so the static shell stays deterministic. */
function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 60_000);
  return () => window.clearInterval(id);
}
const getMinute = () => Math.floor(Date.now() / 60_000);
const getServerMinute = () => null;

function parts(target: number, nowMs: number) {
  const diff = Math.max(0, target - nowMs);
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  return { days, hours, minutes, done: diff === 0 };
}

export function Countdown({ iso, label }: { iso: string; label: string }) {
  const target = new Date(iso).getTime();
  const minute = useSyncExternalStore(subscribe, getMinute, getServerMinute);
  const router = useRouter();
  const done = minute !== null && !Number.isNaN(target) && target - minute * 60_000 <= 0;

  // The moment the countdown reaches zero, ask the server for the fresh page state so the CTAs
  // switch to the cart without a reload. Runs once per mount; the server state is cached for
  // 5 minutes, so the switch can take up to that long.
  useEffect(() => {
    if (done) router.refresh();
  }, [done, router]);

  if (minute === null || Number.isNaN(target)) return null;
  const p = parts(target, minute * 60_000);
  if (p.done) return null;

  const cells = [
    { v: p.days, l: p.days === 1 ? "day" : "days" },
    { v: p.hours, l: p.hours === 1 ? "hour" : "hours" },
    { v: p.minutes, l: p.minutes === 1 ? "minute" : "minutes" },
  ];

  return (
    <div className="mt-6" aria-live="polite">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-teal-dark">{label}</p>
      <div className="mt-3 flex gap-3">
        {cells.map((c) => (
          <div key={c.l} className="min-w-[4.5rem] rounded-xl bg-white px-3 py-2 text-center shadow-card">
            <div className="font-display text-2xl text-brand-ink">{c.v}</div>
            <div className="text-[0.65rem] uppercase tracking-wider text-brand-muted">{c.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
