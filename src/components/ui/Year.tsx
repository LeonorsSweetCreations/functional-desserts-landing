"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** Current year, read on the client so the static shell never calls Date at build time. */
export function Year({ fallback = "2026" }: { fallback?: string }) {
  const year = useSyncExternalStore(
    subscribe,
    () => String(new Date().getFullYear()),
    () => fallback,
  );
  return <>{year}</>;
}
