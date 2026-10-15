"use client";

import { useSyncExternalStore } from "react";
import { cookies } from "@/content/copy";
import { LINKS } from "@/config/site";

export const CONSENT_KEY = "fdp-consent";
export const CONSENT_EVENT = "fdp-consent-change";
export type Consent = "granted" | "denied";
/** "unknown" = not decided yet. "pending" = server render, nothing shown. */
export type ConsentState = Consent | "unknown" | "pending";

function readConsent(): ConsentState {
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : "unknown";
  } catch {
    return "unknown";
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener(CONSENT_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CONSENT_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}
const getServerSnapshot = (): ConsentState => "pending";

/** Hydration-safe consent state shared by the banner and the analytics loader. */
export function useConsent(): ConsentState {
  return useSyncExternalStore(subscribe, readConsent, getServerSnapshot);
}

function writeConsent(value: Consent) {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // Storage blocked. The banner shows again next visit, which is acceptable.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}

export function CookieBanner() {
  const consent = useConsent();
  if (consent !== "unknown") return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie preferences"
      className="fixed inset-x-3 bottom-20 z-50 mx-auto max-w-xl rounded-2xl border border-brand-linen bg-white p-4 shadow-card-lg md:bottom-5"
    >
      <p className="text-sm leading-relaxed text-brand-ink">
        {cookies.text}{" "}
        <a href={LINKS.privacy} rel="noopener" className="underline decoration-brand-teal underline-offset-2 hover:text-brand-teal-dark">
          {cookies.more}
        </a>
      </p>
      <div className="mt-3 flex flex-wrap justify-end gap-2">
        <button type="button" onClick={() => writeConsent("denied")} className="rounded-full px-4 py-2 text-sm font-semibold text-brand-teal-dark hover:bg-brand-teal-pale">
          {cookies.reject}
        </button>
        <button type="button" onClick={() => writeConsent("granted")} className="rounded-full bg-brand-pink px-4 py-2 text-sm font-semibold text-brand-ink hover:bg-brand-rose hover:text-white">
          {cookies.accept}
        </button>
      </div>
    </div>
  );
}
