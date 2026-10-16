"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { forms } from "@/content/copy";
import { LINKS } from "@/config/site";
import type { LeadSource } from "@/lib/leads-types";

type Props = {
  source: LeadSource;
  buttonLabel: string;
  successTitle: string;
  successText: string;
  compact?: boolean;
  idPrefix: string;
};

type State = { status: "idle" | "submitting" | "success" | "error"; message?: string };

function readUtm() {
  if (typeof window === "undefined") return undefined;
  const sp = new URLSearchParams(window.location.search);
  const utm = {
    source: sp.get("utm_source") ?? undefined,
    medium: sp.get("utm_medium") ?? undefined,
    campaign: sp.get("utm_campaign") ?? undefined,
  };
  return utm.source || utm.medium || utm.campaign ? utm : undefined;
}

export function LeadForm({ source, buttonLabel, successTitle, successText, compact = false, idPrefix }: Props) {
  const [state, setState] = useState<State>({ status: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const email = String(fd.get("email") ?? "").trim();
    const firstName = String(fd.get("firstName") ?? "").trim();
    const consent = fd.get("consent") === "on";
    const website = String(fd.get("website") ?? "");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState({ status: "error", message: forms.errorEmail });
      return;
    }
    if (!consent) {
      setState({ status: "error", message: forms.errorConsent });
      return;
    }

    setState({ status: "submitting" });
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName, source, consent, website, utm: readUtm() }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setState({ status: "success" });
      form.reset();
      if (typeof window !== "undefined" && typeof (window as unknown as { fbq?: unknown }).fbq === "function") {
        (window as unknown as { fbq: (a: string, b: string, c?: unknown) => void }).fbq("track", "Lead", { content_name: source });
      }
    } catch {
      setState({ status: "error", message: forms.errorGeneric });
    }
  }

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-2xl bg-brand-teal-pale px-5 py-6 text-brand-teal-dark">
        <div className="flex items-start gap-3">
          <CheckCircle2 aria-hidden className="mt-0.5 h-6 w-6 shrink-0" />
          <div>
            <p className="font-display text-xl">{successTitle}</p>
            <p className="mt-1 text-sm leading-relaxed">{successText}</p>
          </div>
        </div>
      </div>
    );
  }

  const inputCls =
    "w-full rounded-xl border border-brand-linen bg-white px-4 py-3 text-base text-brand-ink placeholder:text-brand-grey focus:border-brand-teal focus:outline-none";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-3">
      <div className={compact ? "grid gap-3 sm:grid-cols-2" : "space-y-3"}>
        <div>
          <label htmlFor={`${idPrefix}-firstName`} className="mb-1 block text-xs font-semibold uppercase tracking-wider text-brand-muted">
            {forms.firstName}
          </label>
          <input id={`${idPrefix}-firstName`} name="firstName" type="text" autoComplete="given-name" placeholder={forms.firstNamePlaceholder} className={inputCls} />
        </div>
        <div>
          <label htmlFor={`${idPrefix}-email`} className="mb-1 block text-xs font-semibold uppercase tracking-wider text-brand-muted">
            {forms.email}
          </label>
          <input id={`${idPrefix}-email`} name="email" type="email" required autoComplete="email" inputMode="email" placeholder={forms.emailPlaceholder} className={inputCls} />
        </div>
      </div>

      {/* Honeypot: hidden from people, filled by bots */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor={`${idPrefix}-website`}>Website</label>
        <input id={`${idPrefix}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <label htmlFor={`${idPrefix}-consent`} className="flex items-start gap-3 text-sm leading-snug text-brand-muted">
        <input id={`${idPrefix}-consent`} name="consent" type="checkbox" required className="mt-1 h-4 w-4 shrink-0 accent-brand-teal-dark" />
        <span>
          {forms.consent.replace(`${forms.privacyLinkText}.`, "")}
          <a href={LINKS.privacy} className="underline decoration-brand-teal underline-offset-2 hover:text-brand-teal-dark" rel="noopener">
            {forms.privacyLinkText}
          </a>
          .
        </span>
      </label>

      {state.status === "error" ? (
        <p role="alert" className="text-sm font-medium text-brand-rose">
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={state.status === "submitting"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-pink px-7 py-3.5 text-base font-semibold text-brand-ink shadow-card transition-colors hover:bg-brand-rose hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state.status === "submitting" ? (
          <>
            <Loader2 aria-hidden className="h-5 w-5 animate-spin" /> {forms.submitting}
          </>
        ) : (
          buttonLabel
        )}
      </button>
      <p className="text-center text-xs text-brand-muted">{forms.spamFree}</p>
    </form>
  );
}
