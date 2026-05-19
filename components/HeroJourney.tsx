"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import { cn } from "@/lib/utils";
import { State01PostRequest } from "./HeroJourney/State01PostRequest";
import { State02QuotesNotify } from "./HeroJourney/State02QuotesNotify";
import { State03Messaging } from "./HeroJourney/State03Messaging";
import { State04AcceptQuote } from "./HeroJourney/State04AcceptQuote";
import { State05DocsDeposit } from "./HeroJourney/State05DocsDeposit";
import { State06ShippingDelivered } from "./HeroJourney/State06ShippingDelivered";
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

  const copy = STAGE_COPY[state];

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const duration = STATE_DURATIONS_MS[state] ?? 4000;

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
            "relative mt-4",
            state === 5 ? "min-h-[360px] sm:min-h-[400px]" : "min-h-[260px] sm:min-h-[280px]",
          )}
        >
          <AnimatePresence mode="wait">
            <m.div key={state} className="absolute inset-0 flex flex-col justify-center" {...stageFade}>
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
              animate={{ opacity: 0.92 }}
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
