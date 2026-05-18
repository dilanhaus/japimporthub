"use client";

import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type AnimatedStep = {
  id: string;
  label: string;
  content: React.ReactNode;
};

type AnimatedStepperProps = {
  steps: AnimatedStep[];
  intervalMs?: number;
  className?: string;
};

export function AnimatedStepper({
  steps,
  intervalMs = 2500,
  className,
}: AnimatedStepperProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const advance = useCallback(() => {
    setActive((i) => (i + 1) % steps.length);
  }, [steps.length]);

  useEffect(() => {
    if (paused || steps.length < 2) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const id = window.setInterval(advance, intervalMs);
    return () => window.clearInterval(id);
  }, [advance, intervalMs, paused, steps.length]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => {
      if (mq.matches) setPaused(true);
    };
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <div
      className={cn("flex h-full flex-col", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex gap-1 border-b border-neutral-800 px-3 py-2">
        {steps.map((step, i) => (
          <button
            key={step.id}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              "flex flex-1 items-center gap-1.5 rounded-md px-2 py-1.5 text-left text-[10px] font-medium transition-colors sm:text-xs",
              i === active
                ? "bg-[var(--surface)] text-[var(--text-primary)]"
                : "text-[var(--text-secondary)] hover:bg-[var(--surface)]/60",
            )}
            aria-current={i === active ? "step" : undefined}
          >
            <span
              className={cn(
                "flex size-4 shrink-0 items-center justify-center rounded-full text-[9px] font-bold",
                i === active
                  ? "bg-[var(--red)] text-white"
                  : i < active
                    ? "bg-neutral-700 text-neutral-300"
                    : "border border-neutral-700 text-neutral-500",
              )}
            >
              {i + 1}
            </span>
            <span className="truncate">{step.label}</span>
          </button>
        ))}
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden p-3">
        {steps.map((step, i) => (
          <div
            key={step.id}
            className={cn(
              "absolute inset-3 transition-all duration-500",
              i === active
                ? "translate-y-0 opacity-100"
                : i < active
                  ? "-translate-y-2 opacity-0 pointer-events-none"
                  : "translate-y-2 opacity-0 pointer-events-none",
            )}
            aria-hidden={i !== active}
          >
            {step.content}
          </div>
        ))}
      </div>
    </div>
  );
}
