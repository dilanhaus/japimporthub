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
    <div className="mt-6 border-t border-neutral-800/80 pt-4" role="tablist" aria-label="Journey progress">
      <div className="flex gap-1">
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
              className="relative h-1 flex-1 overflow-hidden rounded-full bg-neutral-800"
            >
              {isComplete ? <span className="absolute inset-0 bg-[var(--red)]/50" aria-hidden /> : null}
              {isActive ? (
                <m.span
                  key={`fill-${activeIndex}`}
                  className="absolute inset-y-0 left-0 bg-[var(--red)]"
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
      <div className="mt-2 hidden justify-between gap-2 sm:flex">
        {JOURNEY_STAGES.map((stage, index) => (
          <span
            key={stage.label}
            className={cn(
              "flex-1 truncate text-center text-[9px] tracking-wide",
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
