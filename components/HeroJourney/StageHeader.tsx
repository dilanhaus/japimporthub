"use client";

import { m } from "framer-motion";

type StageHeaderProps = {
  stageNumber: number;
  totalStages: number;
  title: string;
  subtitle: string;
  reducedMotion?: boolean;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function StageHeader({
  stageNumber,
  totalStages,
  title,
  subtitle,
  reducedMotion = false,
}: StageHeaderProps) {
  const num = String(stageNumber).padStart(2, "0");
  const total = String(totalStages).padStart(2, "0");

  const titleInitial = reducedMotion ? { opacity: 0 } : { opacity: 0, x: -20 };
  const titleAnimate = reducedMotion
    ? { opacity: 1, transition: { duration: 0.2 } }
    : { opacity: 1, x: 0, transition: { delay: 0.2, duration: 0.35, ease } };
  const titleExit = reducedMotion
    ? { opacity: 0, transition: { duration: 0.15 } }
    : { opacity: 0, x: -8, transition: { duration: 0.15, ease } };

  const subtitleInitial = reducedMotion ? { opacity: 0 } : { opacity: 0, x: -20 };
  const subtitleAnimate = reducedMotion
    ? { opacity: 1, transition: { delay: 0.05, duration: 0.2 } }
    : { opacity: 1, x: 0, transition: { delay: 0.3, duration: 0.35, ease } };
  const subtitleExit = reducedMotion
    ? { opacity: 0, transition: { duration: 0.15 } }
    : { opacity: 0, x: -8, transition: { duration: 0.15, ease } };

  return (
    <m.div
      className="pointer-events-none absolute inset-x-0 top-0 z-20 p-6 md:p-8"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      aria-live="polite"
    >
      <p className="absolute right-6 top-6 font-mono text-xs tracking-wide text-[var(--text-secondary)] md:right-8 md:top-8">
        {num} / {total}
      </p>

      <div className="max-w-md">
        <div className="mb-3 h-1 w-8 rounded-full bg-[var(--red)]" aria-hidden />
        <m.h3
          initial={titleInitial}
          animate={titleAnimate}
          exit={titleExit}
          className="text-2xl font-bold tracking-tight text-[var(--text-primary)] md:text-3xl"
        >
          {title}
        </m.h3>
        <m.p
          initial={subtitleInitial}
          animate={subtitleAnimate}
          exit={subtitleExit}
          className="mt-1 text-sm text-[var(--text-secondary)] md:text-base"
        >
          {subtitle}
        </m.p>
      </div>
    </m.div>
  );
}
