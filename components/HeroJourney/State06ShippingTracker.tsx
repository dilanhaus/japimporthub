"use client";

import { m } from "framer-motion";
import { Check, Ship } from "lucide-react";
import { cn } from "@/lib/utils";
import { SHIP_ROUTE, SHIP_TRAVEL_DURATION_S, SHIPPING_MILESTONES } from "./shared";

function milestoneLeftPercent(index: number) {
  return (index / (SHIPPING_MILESTONES.length - 1)) * 100;
}

export function State06ShippingTracker() {
  const fromPct = milestoneLeftPercent(SHIP_ROUTE.fromIndex);
  const toPct = milestoneLeftPercent(SHIP_ROUTE.toIndex);
  const travelWidth = toPct - fromPct;

  return (
    <div className="w-full px-1">
      <div className="relative pt-2 pb-2">
        {/* Track background */}
        <div className="absolute left-0 right-0 top-[1.125rem] h-0.5 rounded-full bg-neutral-800" aria-hidden />

        {/* Fill grows behind the vessel */}
        <m.div
          className="absolute top-[1.125rem] h-0.5 rounded-full bg-[var(--red)]"
          style={{ left: `${fromPct}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${travelWidth}%` }}
          transition={{ duration: SHIP_TRAVEL_DURATION_S, ease: "linear" }}
          aria-hidden
        />

        {/* Vessel travels Osaka → UK Port */}
        <m.div
          className="absolute top-2 z-20 -translate-x-1/2"
          initial={{ left: `${fromPct}%` }}
          animate={{ left: `${toPct}%` }}
          transition={{ duration: SHIP_TRAVEL_DURATION_S, ease: "linear" }}
          aria-hidden
        >
          <div className="flex size-7 items-center justify-center rounded-full border border-[var(--red)]/60 bg-[var(--surface)] shadow-[0_0_16px_rgba(225,29,46,0.35)]">
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
                    "relative z-10 flex size-8 items-center justify-center rounded-full border bg-[var(--bg)]",
                    isDone && "border-[var(--red)]/40 text-[var(--red)]",
                    isTransit && "border-[var(--red)] text-[var(--red)]",
                    isDestination && "border-neutral-500 text-neutral-400",
                    !isHighlighted && "border-neutral-700 text-neutral-600",
                  )}
                >
                  {isDone ? (
                    <Check className="size-3.5" strokeWidth={2.5} aria-hidden />
                  ) : isTransit ? (
                    <m.span
                      className="size-2 rounded-full bg-[var(--red)]"
                      animate={{ opacity: [1, 0.35, 1] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                      aria-hidden
                    />
                  ) : (
                    <span className="size-1.5 rounded-full bg-neutral-600" aria-hidden />
                  )}
                </div>
                <p
                  className={cn(
                    "mt-2 max-w-[3.25rem] text-center text-[8px] leading-tight sm:max-w-none sm:text-[9px]",
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
    </div>
  );
}
