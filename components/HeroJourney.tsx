"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import { cn } from "@/lib/utils";
import { State01PostRequest } from "./HeroJourney/State01PostRequest";
import { State02QuotesNotify } from "./HeroJourney/State02QuotesNotify";
import { State03Messaging } from "./HeroJourney/State03Messaging";
import { State04AcceptQuote } from "./HeroJourney/State04AcceptQuote";
import { State05DocsDeposit } from "./HeroJourney/State05DocsDeposit";
import { State06ShippingDelivered } from "./HeroJourney/State06ShippingDelivered";
import type { StageLifecycleProps } from "./HeroJourney/stage-lifecycle";
import {
  LOOP_BLACKOUT_MS,
  REQUEST_FIELDS,
  STAGE_COPY,
  STATE_COUNT,
  STATE_DURATIONS_MS,
  stageFade,
} from "./HeroJourney/shared";

const STATES = [
  State01PostRequest,
  State02QuotesNotify,
  State03Messaging,
  State04AcceptQuote,
  State05DocsDeposit,
  State06ShippingDelivered,
] as const;

type HeroJourneyProps = {
  className?: string;
};

export function HeroJourney({ className }: HeroJourneyProps) {
  const [state, setState] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [blackout, setBlackout] = useState(false);
  const [contentReady, setContentReady] = useState(false);

  const sequenceCompleteRef = useRef(false);
  const holdElapsedRef = useRef(false);

  const copy = STAGE_COPY[state];

  const tryAdvance = useCallback(() => {
    if (!contentReady || !sequenceCompleteRef.current || !holdElapsedRef.current) {
      return;
    }
    if (state === STATE_COUNT - 1) return;
    setState((current) => current + 1);
  }, [contentReady, state]);

  const resetLifecycle = useCallback(() => {
    sequenceCompleteRef.current = false;
    holdElapsedRef.current = false;
    setContentReady(false);
  }, []);

  const handleContentReady = useCallback(() => {
    setContentReady(true);
  }, []);

  const handleSequenceComplete = useCallback(() => {
    sequenceCompleteRef.current = true;
    tryAdvance();
  }, [tryAdvance]);

  const handleLoopFadeStart = useCallback(() => {
    setBlackout(true);
  }, []);

  const handleStage6Complete = useCallback(() => {
    sequenceCompleteRef.current = true;
    holdElapsedRef.current = true;
    setBlackout(false);
    setState(0);
    resetLifecycle();
  }, [resetLifecycle]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    resetLifecycle();
    setBlackout(false);
  }, [state, resetLifecycle]);

  useEffect(() => {
    if (reducedMotion || !contentReady) return;

    const holdMs = STATE_DURATIONS_MS[state] ?? 5000;

    const holdId = window.setTimeout(() => {
      holdElapsedRef.current = true;
      if (state === STATE_COUNT - 1) return;
      tryAdvance();
    }, holdMs);

    return () => window.clearTimeout(holdId);
  }, [state, contentReady, reducedMotion, tryAdvance]);

  const lifecycleProps: StageLifecycleProps = {
    onContentReady: handleContentReady,
    onSequenceComplete: state === STATE_COUNT - 1 ? handleStage6Complete : handleSequenceComplete,
    onLoopFadeStart: state === STATE_COUNT - 1 ? handleLoopFadeStart : undefined,
  };

  const ActiveState = STATES[state];

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
        <p className="font-mono text-[10px] text-neutral-500">{STAGE_COPY[0]?.label}</p>
        <h3 className="mt-2 text-lg font-semibold">{STAGE_COPY[0]?.headline}</h3>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">{STAGE_COPY[0]?.subline}</p>
        <ul className="mt-4 grid gap-2 text-sm text-[var(--text-primary)] sm:grid-cols-2">
          {REQUEST_FIELDS.map((field) => (
            <li key={field.label}>
              <span className="text-[var(--text-secondary)]">{field.label}: </span>
              {field.value}
            </li>
          ))}
        </ul>
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
        <AnimatePresence mode="wait">
          <m.div
            key={`copy-${state}`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.35 }}
          >
            {copy ? (
              <>
                <p className="font-mono text-[10px] tracking-wide text-neutral-500">{copy.label}</p>
                <h3 className="mt-2 text-base font-semibold leading-snug text-[var(--text-primary)] sm:text-lg">
                  {copy.headline}
                </h3>
                <p className="mt-1 max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)]">
                  {copy.subline}
                </p>
              </>
            ) : null}
          </m.div>
        </AnimatePresence>

        <div
          className={cn(
            "relative mt-4 h-auto min-h-[520px] overflow-hidden",
            state === 5 && "min-h-[680px]",
            "md:h-[480px] md:min-h-[480px]",
          )}
        >
          <AnimatePresence mode="wait">
            <m.div
              key={state}
              className="relative flex flex-col justify-start md:absolute md:inset-0 md:justify-center"
              {...stageFade}
            >
              <ActiveState {...lifecycleProps} />
            </m.div>
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {blackout ? (
            <m.div
              key="blackout"
              className="pointer-events-none absolute inset-0 z-50 bg-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.92 }}
              exit={{ opacity: 0 }}
              transition={{ duration: LOOP_BLACKOUT_MS / 1000, ease: "easeInOut" }}
              aria-hidden
            />
          ) : null}
        </AnimatePresence>
      </div>
    </LazyMotion>
  );
}
