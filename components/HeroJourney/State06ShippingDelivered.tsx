"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import Image from "next/image";
import { Check, Ship } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedCheckmark } from "./AnimatedCheckmark";
import type { StageLifecycleProps } from "./stage-lifecycle";
import {
  DELIVERY_IMAGE,
  LOOP_BLACKOUT_MS,
  LOOP_PAUSE_MS,
  SHIP_ROUTE,
  SHIP_TRAVEL_DURATION_S,
  SHIPPING_MILESTONES,
  SHIPPING_SUBLINE,
  STAGE6_DELIVERY_HOLD_MS,
  STAGE6_TRACKING_FADE_MS,
  STAGE6_TRACKING_MS,
} from "./shared";

function milestoneLeftPercent(index: number) {
  return (index / (SHIPPING_MILESTONES.length - 1)) * 100;
}

const MILESTONE_MOBILE_LABELS: Record<string, string> = {
  auction: "Won",
  export: "Exported",
  osaka: "Departed",
  transit: "Transit",
  uk: "UK Port",
  customs: "Customs",
  delivered: "Delivered",
};

type Phase = "tracking" | "fading" | "delivery";

export function State06ShippingDelivered({
  onContentReady,
  onSequenceComplete,
  onLoopFadeStart,
}: StageLifecycleProps) {
  const contentReadyFired = useRef(false);
  const sequenceCompleteFired = useRef(false);

  const [phase, setPhase] = useState<Phase>("tracking");
  const [showRate, setShowRate] = useState(false);

  const fromPct = milestoneLeftPercent(SHIP_ROUTE.fromIndex);
  const toPct = milestoneLeftPercent(SHIP_ROUTE.toIndex);
  const travelWidth = toPct - fromPct;

  useEffect(() => {
    if (contentReadyFired.current) return;
    contentReadyFired.current = true;
    onContentReady?.();
  }, [onContentReady]);

  useEffect(() => {
    const timers: number[] = [];

    timers.push(window.setTimeout(() => setPhase("fading"), STAGE6_TRACKING_MS));
    timers.push(
      window.setTimeout(() => setPhase("delivery"), STAGE6_TRACKING_MS + STAGE6_TRACKING_FADE_MS),
    );

    const deliveryStart = STAGE6_TRACKING_MS + STAGE6_TRACKING_FADE_MS;
    timers.push(window.setTimeout(() => setShowRate(true), deliveryStart + 2000));

    const loopFadeAt = deliveryStart + STAGE6_DELIVERY_HOLD_MS;
    timers.push(window.setTimeout(() => onLoopFadeStart?.(), loopFadeAt));

    timers.push(
      window.setTimeout(() => {
        if (sequenceCompleteFired.current) return;
        sequenceCompleteFired.current = true;
        onSequenceComplete?.();
      }, loopFadeAt + LOOP_BLACKOUT_MS + LOOP_PAUSE_MS),
    );

    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [onLoopFadeStart, onSequenceComplete]);

  const showTracker = phase === "tracking" || phase === "fading";
  const showDelivery = phase === "delivery";

  return (
    <div className="relative min-w-0 md:min-h-[340px]">
      <AnimatePresence mode="wait">
        {showTracker ? (
          <m.div
            key="tracker"
            initial={{ opacity: 1 }}
            animate={{ opacity: phase === "fading" ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: STAGE6_TRACKING_FADE_MS / 1000, ease: "easeInOut" }}
            className="relative flex flex-col justify-center md:absolute md:inset-0"
          >
            <div className="relative px-0.5 pt-1">
              <div
                className="absolute left-0 right-0 top-[1.125rem] h-0.5 rounded-full bg-neutral-800"
                aria-hidden
              />
              <m.div
                className="absolute top-[1.125rem] h-0.5 rounded-full bg-[var(--red)]"
                style={{ left: `${fromPct}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${travelWidth}%` }}
                transition={{ duration: SHIP_TRAVEL_DURATION_S, ease: "linear" }}
                aria-hidden
              />
              <m.div
                className="absolute top-2 z-20 -translate-x-1/2"
                initial={{ left: `${fromPct}%` }}
                animate={{ left: `${toPct}%` }}
                transition={{ duration: SHIP_TRAVEL_DURATION_S, ease: "linear" }}
                aria-hidden
              >
                <div className="flex size-7 items-center justify-center rounded-full border border-[var(--red)]/60 bg-[var(--surface)] shadow-[0_0_16px_rgba(225,29,46,0.4)]">
                  <Ship className="size-3.5 text-[var(--red)]" aria-hidden />
                </div>
              </m.div>
              <ol className="relative flex justify-between">
                {SHIPPING_MILESTONES.map((milestone, index) => {
                  const isDone = index <= SHIP_ROUTE.fromIndex;
                  const isTransit = index === SHIP_ROUTE.fromIndex + 1;
                  const isDestination = index === SHIP_ROUTE.toIndex;
                  const isHighlighted = isDone || isTransit || isDestination;
                  return (
                    <li
                      key={milestone.id}
                      className="flex max-w-[4.5rem] flex-col items-center sm:max-w-none"
                      style={{ width: `${100 / SHIPPING_MILESTONES.length}%` }}
                    >
                      <div
                        className={cn(
                          "relative z-10 flex size-7 items-center justify-center rounded-full border bg-[var(--bg)] sm:size-8",
                          isDone && "border-[var(--red)]/40 text-[var(--red)]",
                          isTransit && "border-[var(--red)] text-[var(--red)]",
                          !isHighlighted && "border-neutral-700 text-neutral-600",
                        )}
                      >
                        {isDone ? (
                          <Check className="size-3" strokeWidth={2.5} aria-hidden />
                        ) : isTransit ? (
                          <m.span
                            className="size-1.5 rounded-full bg-[var(--red)] sm:size-2"
                            animate={{ opacity: [1, 0.35, 1] }}
                            transition={{ duration: 1.2, repeat: Infinity }}
                            aria-hidden
                          />
                        ) : (
                          <span className="size-1 rounded-full bg-neutral-600" aria-hidden />
                        )}
                      </div>
                      <p
                        className={cn(
                          "mt-1.5 max-w-[2.5rem] text-center text-[10px] leading-tight md:max-w-none md:text-[9px]",
                          isHighlighted ? "text-[var(--text-primary)]" : "text-neutral-600",
                        )}
                      >
                        <span className="md:hidden">{MILESTONE_MOBILE_LABELS[milestone.id]}</span>
                        <span className="hidden md:inline">{milestone.label}</span>
                      </p>
                    </li>
                  );
                })}
              </ol>
            </div>
            <p className="mt-4 px-1 text-center text-[10px] leading-snug text-[var(--text-secondary)] md:text-xs">
              {SHIPPING_SUBLINE}
            </p>
          </m.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {showDelivery ? (
          <m.div
            key="delivery"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative grid grid-cols-1 items-start gap-4 md:absolute md:inset-0 md:grid-cols-2 md:items-center md:gap-8"
          >
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <AnimatedCheckmark className="size-12 md:size-16" />
              <p className="mt-3 text-sm font-semibold text-[var(--text-primary)] md:mt-4 md:text-lg">
                Your Skyline R33 is ready for delivery
              </p>
              <p className="mt-1.5 text-sm text-[var(--text-secondary)]">
                Landed · Customs cleared · Out for delivery to Manchester
              </p>
              {showRate ? (
                <m.p
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mt-5 text-xs text-[var(--text-secondary)]"
                >
                  ⭐ Rate your dealer
                </m.p>
              ) : null}
            </div>

            <m.div
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative h-[140px] max-h-[140px] overflow-hidden rounded-xl border border-emerald-500/40 shadow-lg ring-1 ring-white/10 md:aspect-[4/3] md:h-40 md:max-h-none">
                <Image
                  src={DELIVERY_IMAGE}
                  alt="Nissan Skyline R33"
                  fill
                  sizes="(max-width: 768px) 100vw, 480px"
                  className="object-cover object-center"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--bg)]/35 via-transparent to-transparent" />
              </div>
              <p className="mt-2 text-center text-[10px] font-medium text-[var(--text-secondary)] md:text-left">
                Nissan Skyline R33 · Grade 4.5 · 61,000 km
              </p>
            </m.div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
