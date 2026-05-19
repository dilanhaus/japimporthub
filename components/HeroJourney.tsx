"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import { cn } from "@/lib/utils";
import { State01PostRequest } from "./HeroJourney/State01PostRequest";
import { State02QuotesFlow } from "./HeroJourney/State02QuotesFlow";
import { State03DocsDeposit } from "./HeroJourney/State03DocsDeposit";
import { State04Shipping } from "./HeroJourney/State04Shipping";
import { State05Delivered } from "./HeroJourney/State05Delivered";
import {
  JOURNEY_STAGES,
  LOOP_BLACKOUT_MS,
  REQUEST_FIELDS,
  STATE_COUNT,
  STATE_DURATIONS_MS,
  stageFade,
} from "./HeroJourney/shared";

const STATES = [
  State01PostRequest,
  State02QuotesFlow,
  State03DocsDeposit,
  State04Shipping,
  State05Delivered,
] as const;

type HeroJourneyProps = {
  className?: string;
};

export function HeroJourney({ className }: HeroJourneyProps) {
  const [state, setState] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [blackout, setBlackout] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const duration = STATE_DURATIONS_MS[state] ?? 3500;

    if (state === STATE_COUNT - 1) {
      const blackoutAt = duration - LOOP_BLACKOUT_MS;
      const startBlack = window.setTimeout(() => setBlackout(true), blackoutAt);
      const advance = window.setTimeout(() => {
        setBlackout(false);
        setState(0);
      }, duration);
      return () => {
        window.clearTimeout(startBlack);
        window.clearTimeout(advance);
      };
    }

    const id = window.setTimeout(() => {
      setState((current) => current + 1);
    }, duration);

    return () => window.clearTimeout(id);
  }, [state, reducedMotion]);

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
        <p className="font-mono text-[10px] text-neutral-500">01 — Post your request</p>
        <ul className="mt-4 grid gap-2 text-sm text-[var(--text-primary)] sm:grid-cols-2">
          {REQUEST_FIELDS.map((field) => (
            <li key={field.label}>
              <span className="text-[var(--text-secondary)]">{field.label}: </span>
              {field.value}
            </li>
          ))}
        </ul>
        <ol className="mt-6 space-y-1 border-t border-neutral-800 pt-4">
          {JOURNEY_STAGES.map((s) => (
            <li key={s.label} className="font-mono text-[10px] text-neutral-500">
              {s.label}
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
          "px-5 py-5 sm:px-8 sm:py-6",
          className,
        )}
        role="region"
        aria-label="How Grade Five works"
      >
        <p className="font-mono text-[10px] tracking-wide text-neutral-500">{stageLabel}</p>

        <div className="relative mt-3 min-h-[280px] sm:min-h-[300px]">
          <AnimatePresence mode="wait">
            <m.div
              key={state}
              className="absolute inset-0 flex flex-col justify-center"
              {...stageFade}
            >
              <ActiveState />
            </m.div>
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {blackout ? (
            <m.div
              key="blackout"
              className="pointer-events-none absolute inset-0 z-50 bg-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              aria-hidden
            />
          ) : null}
        </AnimatePresence>
      </div>
    </LazyMotion>
  );
}
