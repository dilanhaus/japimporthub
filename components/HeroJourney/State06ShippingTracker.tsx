"use client";

import { m } from "framer-motion";
import { Check, Ship } from "lucide-react";
import { cn } from "@/lib/utils";
import { SHIPPING_MILESTONES } from "./shared";

export function State06ShippingTracker() {
  const activeIndex = SHIPPING_MILESTONES.findIndex((m) => m.status === "active");
  const progressPercent = ((activeIndex + 0.5) / (SHIPPING_MILESTONES.length - 1)) * 100;

  return (
    <div className="w-full">
      <div className="relative mb-8">
        <div className="absolute left-0 right-0 top-4 h-px bg-neutral-800" aria-hidden />
        <m.div
          className="absolute left-0 top-4 h-px bg-[var(--red)]/60"
          initial={{ width: "0%" }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        />
        <m.div
          className="absolute top-2.5 z-10 -translate-x-1/2"
          initial={{ left: "0%" }}
          animate={{ left: `${progressPercent}%` }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        >
          <div className="flex size-6 items-center justify-center rounded-full border border-[var(--red)]/50 bg-[var(--surface)] shadow-lg">
            <Ship className="size-3 text-[var(--red)]" aria-hidden />
          </div>
        </m.div>

        <ol className="relative flex justify-between gap-1">
          {SHIPPING_MILESTONES.map((milestone) => {
            const done = milestone.status === "done";
            const active = milestone.status === "active";
            return (
              <li key={milestone.id} className="flex max-w-[4.5rem] flex-col items-center sm:max-w-none">
                <div
                  className={cn(
                    "relative z-10 flex size-8 items-center justify-center rounded-full border bg-[var(--bg)]",
                    done && "border-[var(--red)]/40 text-[var(--red)]",
                    active && "border-[var(--red)] text-[var(--red)]",
                    milestone.status === "pending" && "border-neutral-700 text-neutral-600",
                  )}
                >
                  {done ? (
                    <Check className="size-3.5" strokeWidth={2.5} aria-hidden />
                  ) : active ? (
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
                    active || done ? "text-[var(--text-primary)]" : "text-neutral-600",
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
