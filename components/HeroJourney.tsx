"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import { cn } from "@/lib/utils";
import { STAGE_CAPTIONS } from "./HeroJourney/shared";
import { Stage1Request } from "./HeroJourney/Stage1Request";
import { Stage2Quotes } from "./HeroJourney/Stage2Quotes";
import { Stage3Milestones } from "./HeroJourney/Stage3Milestones";
import { Stage4Delivered } from "./HeroJourney/Stage4Delivered";

const STAGE_DURATION_MS = 3000;
const PAUSE_MS = 8000;

const STAGES = [Stage1Request, Stage2Quotes, Stage3Milestones, Stage4Delivered] as const;

type HeroJourneyProps = {
  className?: string;
};

export function HeroJourney({ className }: HeroJourneyProps) {
  const [stage, setStage] = useState(0);
  const [pausedUntil, setPausedUntil] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const id = window.setInterval(() => {
      if (Date.now() < pausedUntil) return;
      setStage((s) => (s + 1) % STAGES.length);
    }, STAGE_DURATION_MS);
    return () => window.clearInterval(id);
  }, [pausedUntil, reducedMotion]);

  const jumpToStage = useCallback((index: number) => {
    setStage(index);
    setPausedUntil(Date.now() + PAUSE_MS);
  }, []);

  const ActiveStage = STAGES[stage];

  if (reducedMotion) {
    return (
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-2xl border border-neutral-800 bg-[var(--surface)] shadow-2xl shadow-[0_0_80px_-20px_#E11D2E33]",
          "aspect-[4/3] md:aspect-[16/9]",
          className,
        )}
      >
        <div className="flex h-full flex-col items-center justify-center p-6">
          <div className="w-full max-w-md rounded-xl border border-neutral-800 bg-[var(--bg)] p-5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
              Your request
            </p>
            <ul className="mt-3 space-y-2 text-sm text-[var(--text-primary)]">
              <li>Car: Nissan Skyline R33</li>
              <li>Colour: Blue or Black</li>
              <li>
                Max mileage: <span className="font-mono">100,000</span>
              </li>
              <li>
                Budget: <span className="font-mono">£30,000</span>
              </li>
            </ul>
          </div>
          <ol className="mt-8 w-full max-w-md space-y-2 text-left text-sm text-[var(--text-secondary)]">
            {STAGE_CAPTIONS.map((caption) => (
              <li key={caption}>{caption}</li>
            ))}
          </ol>
        </div>
      </div>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-2xl border border-neutral-800 bg-[var(--surface)] shadow-2xl shadow-[0_0_80px_-20px_#E11D2E33]",
          "aspect-[4/3] md:aspect-[16/9]",
          className,
        )}
        role="region"
        aria-label="How Grade Five works"
        aria-roledescription="carousel"
      >
        <AnimatePresence mode="wait">
          <m.div key={stage} className="absolute inset-0">
            <ActiveStage />
          </m.div>
        </AnimatePresence>

        <p
          className="pointer-events-none absolute bottom-14 left-0 right-0 z-20 px-4 text-center text-sm text-[var(--text-secondary)]"
          aria-live="polite"
        >
          {STAGE_CAPTIONS[stage]}
        </p>

        <div
          className="absolute bottom-4 left-0 right-0 z-30 flex items-center justify-center gap-2"
          role="tablist"
          aria-label="Journey steps"
        >
          {STAGE_CAPTIONS.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={stage === i}
              aria-label={`Step ${i + 1}`}
              onClick={() => jumpToStage(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                stage === i ? "w-8 bg-[var(--red)]" : "w-2 bg-neutral-700 hover:bg-neutral-600",
              )}
            />
          ))}
        </div>
      </div>
    </LazyMotion>
  );
}
