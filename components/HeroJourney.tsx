"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import { cn } from "@/lib/utils";
import { JourneyProgress } from "./HeroJourney/JourneyProgress";
import { State01PostRequest } from "./HeroJourney/State01PostRequest";
import { State02DealersQuote } from "./HeroJourney/State02DealersQuote";
import { State03AcceptQuote } from "./HeroJourney/State03AcceptQuote";
import { State04Documentation } from "./HeroJourney/State04Documentation";
import { State05SecureDeposit } from "./HeroJourney/State05SecureDeposit";
import { State06ShippingTracker } from "./HeroJourney/State06ShippingTracker";
import { State07Delivered } from "./HeroJourney/State07Delivered";
import {
  JOURNEY_STAGES,
  REQUEST_FIELDS,
  STATE_COUNT,
  STATE_DURATIONS_MS,
  stateFade,
} from "./HeroJourney/shared";

const STATES = [
  State01PostRequest,
  State02DealersQuote,
  State03AcceptQuote,
  State04Documentation,
  State05SecureDeposit,
  State06ShippingTracker,
  State07Delivered,
] as const;

const PAUSE_MS = 8000;

type HeroJourneyProps = {
  className?: string;
};

export function HeroJourney({ className }: HeroJourneyProps) {
  const [state, setState] = useState(0);
  const [pausedUntil, setPausedUntil] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const duration = STATE_DURATIONS_MS[state] ?? 2500;
    const id = window.setTimeout(() => {
      if (Date.now() < pausedUntil) return;
      setState((current) => (current + 1) % STATE_COUNT);
    }, duration);
    return () => window.clearTimeout(id);
  }, [state, pausedUntil, reducedMotion]);

  const jumpToState = useCallback((index: number) => {
    setState(index);
    setPausedUntil(Date.now() + PAUSE_MS);
  }, []);

  const ActiveState = STATES[state];
  const stageLabel = JOURNEY_STAGES[state]?.label ?? "";

  if (reducedMotion) {
    return (
      <div
        className={cn(
          "w-full rounded-2xl border border-neutral-700/60 bg-[var(--surface)]/80 p-6 shadow-2xl backdrop-blur-md sm:p-8",
          className,
        )}
        role="region"
        aria-label="How Grade Five works"
      >
        <p className="font-mono text-xs text-[var(--text-secondary)]">01 — Post your request</p>
        <ul className="mt-4 grid gap-2 text-sm text-[var(--text-primary)] sm:grid-cols-2">
          {REQUEST_FIELDS.map((field) => (
            <li key={field.label}>
              <span className="text-[var(--text-secondary)]">{field.label}: </span>
              {field.value}
            </li>
          ))}
        </ul>
        <ol className="mt-8 grid gap-2 border-t border-neutral-800 pt-6 sm:grid-cols-2">
          {JOURNEY_STAGES.map((stage) => (
            <li key={stage.label} className="text-xs text-[var(--text-secondary)]">
              {stage.label}
            </li>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-2xl",
          "border border-neutral-700/60 bg-[var(--surface)]/70 shadow-[0_32px_100px_-40px_rgba(0,0,0,0.9)] backdrop-blur-md",
          "ring-1 ring-white/[0.04]",
          "px-5 py-5 sm:px-8 sm:py-7",
          className,
        )}
        role="region"
        aria-label="How Grade Five works"
        aria-roledescription="carousel"
      >
        <AnimatePresence mode="wait">
          <m.p
            key={`label-${state}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="font-mono text-[11px] tracking-wide text-[var(--text-secondary)]"
          >
            {stageLabel}
          </m.p>
        </AnimatePresence>

        <div className="relative mt-4 min-h-[280px] sm:min-h-[300px]">
          <AnimatePresence mode="wait">
            <m.div key={state} className="absolute inset-0 flex flex-col justify-center" {...stateFade}>
              <ActiveState />
            </m.div>
          </AnimatePresence>
        </div>

        <JourneyProgress activeIndex={state} onSelect={jumpToState} />
      </div>
    </LazyMotion>
  );
}
