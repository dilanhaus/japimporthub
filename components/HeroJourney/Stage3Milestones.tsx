"use client";

import { useEffect, useState } from "react";
import { m } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeSlide, STAGE_SCENE_PT } from "./shared";

const MILESTONES = [
  { icon: "🇯🇵", label: "Auction won" },
  { icon: "🚢", label: "On vessel" },
  { icon: "🛃", label: "UK customs" },
  { icon: "🏠", label: "Delivered" },
] as const;

export function Stage3Milestones() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2200;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const p = Math.min(100, ((now - start) / duration) * 100);
      setProgress(p);
      if (p < 100) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <m.div
      className={cn("flex h-full flex-col items-center justify-center px-4 pb-8 sm:px-10", STAGE_SCENE_PT)}
      {...fadeSlide}
    >
      <m.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-6 w-full max-w-lg rounded-lg border border-[var(--red)]/40 bg-[var(--red)]/5 px-3 py-2 text-center text-xs text-[var(--text-primary)]"
      >
        Selected · Osaka Motors JP · <span className="font-mono font-semibold">£29,750</span>
      </m.div>

      <div className="relative w-full max-w-2xl px-2">
        <div
          className="absolute left-2 right-2 top-5 h-0.5 overflow-hidden rounded-full bg-neutral-800"
          aria-hidden
        >
          <m.div
            className="h-full w-full origin-left bg-[var(--red)]"
            style={{ scaleX: progress / 100 }}
          />
        </div>

        <div className="relative flex justify-between pt-1">
          {MILESTONES.map((node, i) => {
            const threshold = (i / (MILESTONES.length - 1)) * 100;
            const active = progress >= threshold - 0.5;
            return (
              <m.div
                key={node.label}
                className="flex flex-col items-center gap-2"
                animate={{ opacity: active ? 1 : 0.4 }}
                transition={{ duration: 0.25 }}
              >
                <span
                  className={`flex size-10 items-center justify-center rounded-full border text-lg transition-colors duration-300 ${
                    active
                      ? "border-[var(--red)] bg-[var(--red)]/15 shadow-[0_0_12px_rgba(225,29,46,0.35)]"
                      : "border-neutral-700 bg-[var(--bg)]"
                  }`}
                >
                  {node.icon}
                </span>
                <span
                  className={`max-w-[4.5rem] text-center text-[10px] sm:max-w-none sm:text-xs ${
                    active ? "font-medium text-[var(--text-primary)]" : "text-[var(--text-secondary)]"
                  }`}
                >
                  {node.label}
                </span>
              </m.div>
            );
          })}
        </div>
      </div>
    </m.div>
  );
}
