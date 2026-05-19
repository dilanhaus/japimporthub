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
  const [state3Accepted, setState3Accepted] = useState(false);

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

  useEffect(() => {
    if (state !== 2) {
      setState3Accepted(false);
      return;
    }
    const id = window.setTimeout(() => setState3Accepted(true), 1500);
    return () => window.clearTimeout(id);
  }, [state]);

  const ActiveState = STATES[state];
  const currentStage = JOURNEY_STAGES[state];
  const stageLabel =
    state === 2 && state3Accepted && currentStage && "labelAccepted" in currentStage
      ? currentStage.labelAccepted
      : (currentStage?.label ?? "");

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
          <m.div
            key={`label-${state}-${state3Accepted}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2"
          >
            {state === 2 && state3Accepted ? (
              <m.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="size-2 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]"
                aria-hidden
              />
            ) : null}
            <p
              className={cn(
                "font-mono text-[11px] tracking-wide",
                state === 2 && state3Accepted
                  ? "text-emerald-400/90"
                  : "text-[var(--text-secondary)]",
              )}
            >
              {stageLabel}
            </p>
          </m.div>
        </AnimatePresence>

        <div className="relative mt-4 min-h-[280px] sm:min-h-[320px]">
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
