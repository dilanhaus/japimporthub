"use client";

import { useCallback, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { FileText, GitCompare, MessageCircle, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

export type HorizontalStep = {
  id: string;
  number: string;
  label: string;
  help: string;
  icon: LucideIcon;
};

const DEFAULT_STEPS: HorizontalStep[] = [
  {
    id: "post",
    number: "01",
    label: "Post your request",
    help: "Describe the car you want, your budget, and preferences. UK buyers only need a few minutes.",
    icon: FileText,
  },
  {
    id: "quotes",
    number: "02",
    label: "Get verified quotes",
    help: "Exporters and dealers in our network review your brief and send transparent, itemised offers.",
    icon: MessageCircle,
  },
  {
    id: "milestones",
    number: "03",
    label: "We handle import milestones",
    help: "Review landed costs, timelines, and dealer ratings — all messaging stays on-platform.",
    icon: GitCompare,
  },
  {
    id: "delivery",
    number: "04",
    label: "Collect or door‑to‑door delivery",
    help: "Award your preferred quote and track milestones from Japan to UK registration.",
    icon: Truck,
  },
];

type HorizontalStepsProps = {
  steps?: HorizontalStep[];
  className?: string;
};

export function HorizontalSteps({ steps = DEFAULT_STEPS, className }: HorizontalStepsProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const setActive = useCallback((id: string | null) => {
    setActiveId(id);
  }, []);

  return (
    <div className={cn("mt-16", className)}>
      <div className="relative mx-auto w-full overflow-x-auto snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:overflow-visible">
        <ol className="flex min-w-max items-start gap-8 px-4 md:min-w-0 md:gap-12 md:px-0">
          {steps.map((step, index) => {
            const isActive = activeId === step.id;
            const Icon = step.icon;
            const isLast = index === steps.length - 1;

            return (
              <li
                key={step.id}
                tabIndex={0}
                className={cn(
                  "group/step relative snap-start min-w-[220px] outline-none md:min-w-0 md:flex-1",
                  !isLast &&
                    "md:after:absolute md:after:top-4 md:after:left-[calc(50%+1rem)] md:after:right-[calc(-50%+1rem)] md:after:z-0 md:after:h-[2px] md:after:bg-neutral-800 md:after:content-['']",
                  isActive && "md:after:bg-[var(--red)]/40",
                )}
                onMouseEnter={() => setActive(step.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(step.id)}
                onBlur={() => setActive(null)}
                aria-current={isActive ? "step" : undefined}
              >
                <div className="relative z-10 flex flex-col items-start">
                  <div
                    className={cn(
                      "relative flex h-8 w-8 items-center justify-center rounded-full border border-neutral-700 bg-[var(--surface)] text-[var(--text-secondary)] transition-colors",
                      "group-hover/step:border-[var(--red)]/50 group-hover/step:text-[var(--text-primary)] group-focus-visible/step:border-[var(--red)]/50 group-focus-visible/step:text-[var(--text-primary)]",
                      isActive && "border-[var(--red)]/60 text-[var(--text-primary)]",
                    )}
                  >
                    <Icon className="size-4" strokeWidth={1.5} aria-hidden />
                    <span
                      className={cn(
                        "absolute -bottom-1 -right-1 h-2 w-2 rounded-full bg-[var(--red)] transition-transform",
                        isActive ? "scale-125" : "scale-100",
                      )}
                      aria-hidden
                    />
                  </div>

                  <p className="mt-4 font-mono text-xs tracking-widest text-[var(--text-secondary)] group-hover/step:text-[var(--text-primary)] group-focus-visible/step:text-[var(--text-primary)]">
                    {step.number}
                  </p>
                  <h3
                    className={cn(
                      "mt-2 text-sm font-semibold text-[var(--text-secondary)] transition-colors md:text-base",
                      "group-hover/step:text-[var(--text-primary)] group-focus-visible/step:text-[var(--text-primary)]",
                      isActive && "text-[var(--text-primary)]",
                    )}
                  >
                    {step.label}
                  </h3>
                  <p className="mt-1 max-w-[220px] text-xs leading-relaxed text-[var(--text-secondary)] md:max-w-none">
                    {step.help}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 md:hidden" aria-hidden>
        {steps.map((step) => (
          <span
            key={step.id}
            className={cn(
              "h-1.5 rounded-full bg-neutral-800 transition-all",
              activeId === step.id ? "w-6 bg-[var(--red)]" : "w-1.5",
            )}
          />
        ))}
      </div>
    </div>
  );
}
