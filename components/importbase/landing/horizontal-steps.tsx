"use client";

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

function StepIcon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div
      className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-neutral-700 bg-[var(--surface)]"
    >
      <Icon className="size-4 text-[var(--red)]" strokeWidth={1.5} aria-hidden />
    </div>
  );
}

type HorizontalStepsProps = {
  steps?: HorizontalStep[];
  className?: string;
};

export function HorizontalSteps({ steps = DEFAULT_STEPS, className }: HorizontalStepsProps) {
  return (
    <div className={cn("mt-16", className)}>
      {/* Desktop: single connector from first icon through end of row */}
      <ol className="relative hidden w-full md:flex">
        <div
          aria-hidden
          className="pointer-events-none absolute left-4 right-0 top-4 z-0 h-px bg-neutral-700"
        />
        {steps.map((step) => (
            <li
              key={step.id}
              className="relative flex min-w-0 flex-1 flex-col items-start px-3 first:pl-0 last:pr-0"
            >
              <StepIcon icon={step.icon} />
              <p className="mt-5 font-mono text-xs tracking-widest text-[var(--text-secondary)]">
                {step.number}
              </p>
              <h3 className="mt-2 text-base font-semibold leading-snug text-[var(--text-primary)]">
                {step.label}
              </h3>
              <p className="mt-2 min-h-[4.75rem] text-sm leading-relaxed text-[var(--text-secondary)]">
                {step.help}
              </p>
            </li>
        ))}
      </ol>

      {/* Mobile: vertical connector from first icon through end of list */}
      <ol className="relative space-y-0 md:hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-4 top-4 z-0 w-px bg-neutral-700"
        />
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          return (
            <li
              key={step.id}
              className={cn("relative flex flex-col items-start", !isLast && "pb-10")}
            >
              <StepIcon icon={step.icon} />
              <p className="mt-5 font-mono text-xs tracking-widest text-[var(--text-secondary)]">
                {step.number}
              </p>
              <h3 className="mt-2 text-base font-semibold text-[var(--text-primary)]">{step.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{step.help}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
