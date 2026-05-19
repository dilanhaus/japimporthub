"use client";

import { m } from "framer-motion";
import { cn } from "@/lib/utils";
import { JOURNEY_STAGES, STATE_DURATIONS_MS } from "./shared";

type JourneyProgressProps = {
  activeIndex: number;
  onSelect: (index: number) => void;
};

export function JourneyProgress({ activeIndex, onSelect }: JourneyProgressProps) {
  return (
    <div className="mt-6 border-t border-neutral-800/80 pt-5" role="tablist" aria-label="Journey progress">
      {/* Segmented bar */}
      <div className="flex gap-1.5">
        {JOURNEY_STAGES.map((stage, index) => {
          const isActive = index === activeIndex;
          const isComplete = index < activeIndex;
          return (
            <button
              key={stage.label}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={stage.label}
              onClick={() => onSelect(index)}
              className={cn(
                "relative h-2 flex-1 overflow-hidden rounded-full transition-colors",
                isActive ? "bg-neutral-700" : "bg-neutral-800",
                isComplete && "bg-neutral-700/80",
              )}
            >
              {isComplete ? (
                <span className="absolute inset-0 bg-[var(--red)]/70" aria-hidden />
              ) : null}
              {isActive ? (
                <m.span
                  key={`fill-${activeIndex}`}
                  className="absolute inset-y-0 left-0 rounded-full bg-[var(--red)] shadow-[0_0_12px_rgba(225,29,46,0.5)]"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: STATE_DURATIONS_MS[activeIndex]! / 1000,
                    ease: "linear",
                  }}
                  aria-hidden
                />
              ) : null}
              <span className="sr-only">{stage.label}</span>
            </button>
          );
        })}
      </div>

      {/* Dot indicators */}
      <div className="mt-3 flex items-center justify-center gap-2.5">
        {JOURNEY_STAGES.map((stage, index) => {
          const isActive = index === activeIndex;
          const isComplete = index < activeIndex;
          return (
            <button
              key={`dot-${stage.label}`}
              type="button"
              aria-label={stage.label}
              onClick={() => onSelect(index)}
              className={cn(
                "rounded-full transition-all duration-300",
                isActive
                  ? "size-2.5 bg-[var(--red)] shadow-[0_0_10px_rgba(225,29,46,0.55)] ring-2 ring-[var(--red)]/25"
                  : isComplete
                    ? "size-2 bg-[var(--red)]/55"
                    : "size-2 bg-neutral-600 hover:bg-neutral-500",
              )}
            />
          );
        })}
      </div>

      <div className="mt-2 flex justify-between gap-1 px-0.5">
        {JOURNEY_STAGES.map((stage, index) => (
          <span
            key={`num-${stage.label}`}
            className={cn(
              "flex-1 truncate text-center font-mono text-[9px] tracking-wide",
              index === activeIndex ? "text-[var(--text-primary)]" : "text-neutral-600",
            )}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        ))}
      </div>
    </div>
  );
}
