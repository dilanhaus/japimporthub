"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import Image from "next/image";
import { Check, Ship, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedCheckmark } from "./AnimatedCheckmark";
import {
  DELIVERY_IMAGE,
  SHIP_ROUTE,
  SHIP_TRAVEL_DURATION_S,
  SHIPPING_MILESTONES,
  SHIPPING_SUBLINE,
} from "./shared";

function milestoneLeftPercent(index: number) {
  return (index / (SHIPPING_MILESTONES.length - 1)) * 100;
}

export function State06ShippingDelivered() {
  const [phase, setPhase] = useState<"tracking" | "delivery">("tracking");
  const [showRate, setShowRate] = useState(false);

  const fromPct = milestoneLeftPercent(SHIP_ROUTE.fromIndex);
  const toPct = milestoneLeftPercent(SHIP_ROUTE.toIndex);
  const travelWidth = toPct - fromPct;

  useEffect(() => {
    const toDelivery = window.setTimeout(() => setPhase("delivery"), 2000);
    const toRate = window.setTimeout(() => setShowRate(true), 3000);
    return () => {
      window.clearTimeout(toDelivery);
      window.clearTimeout(toRate);
    };
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <m.div
        animate={{ opacity: phase === "delivery" ? 0.45 : 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative px-0.5 pt-1">
          <div className="absolute left-0 right-0 top-[1.125rem] h-0.5 rounded-full bg-neutral-800" aria-hidden />
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
                      "mt-1.5 max-w-[3rem] text-center text-[7px] leading-tight sm:max-w-none sm:text-[9px]",
                      isHighlighted ? "text-[var(--text-primary)]" : "text-neutral-600",
                    )}
                  >
                    {milestone.label}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
        <p className="mt-4 text-center text-[11px] text-[var(--text-secondary)] sm:text-xs">
          {SHIPPING_SUBLINE}
        </p>
      </m.div>

      <AnimatePresence>
        {phase === "delivery" ? (
          <m.div
            key="delivery"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="grid items-center gap-5 border-t border-neutral-800/60 pt-5 md:grid-cols-2 md:gap-8"
          >
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <AnimatedCheckmark className="size-14 sm:size-16" />
              <p className="mt-4 text-base font-semibold text-[var(--text-primary)] sm:text-lg">
                Your Skyline R33 is ready for delivery
              </p>
              <p className="mt-1.5 text-sm text-[var(--text-secondary)]">
                Landed · Cleared customs · Out for delivery to Manchester
              </p>
              {showRate ? (
                <m.p
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 flex items-center gap-1.5 text-xs text-[var(--text-secondary)]"
                >
                  <Star className="size-3.5 text-amber-500/80" aria-hidden />
                  Rate your dealer
                </m.p>
              ) : null}
            </div>
            <m.div
              initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.15, duration: 0.6 }}
            >
              <p className="mb-2 text-center text-[10px] font-medium text-[var(--text-secondary)] md:text-left">
                Nissan Skyline R33 · Grade 4.5 · 62,000 km
              </p>
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-emerald-500/35 shadow-lg ring-1 ring-white/10">
                <Image
                  src={DELIVERY_IMAGE}
                  alt="Nissan Skyline at Oishi Park, Japan"
                  fill
                  sizes="(max-width: 768px) 100vw, 480px"
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--bg)]/35 via-transparent to-transparent" />
              </div>
            </m.div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
