"use client";

import { m } from "framer-motion";
import { CheckCircle2, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { fadeSlide, MonoValue, STAGE_SCENE_PT } from "./shared";

const QUOTES = [
  { dealer: "Tokyo Auto Exports", price: "£28,400", rating: "4.9" },
  { dealer: "Osaka Motors JP", price: "£29,750", rating: "4.8" },
  { dealer: "Yokohama Trading", price: "£27,900", rating: "4.9" },
] as const;

export function Stage2Quotes() {
  return (
    <m.div className={cn("flex h-full flex-col px-4 pb-6 sm:px-8", STAGE_SCENE_PT)} {...fadeSlide}>
      <m.div
        initial={{ scale: 1, y: 0 }}
        animate={{ scale: 0.85, y: -4 }}
        transition={{ duration: 0.35 }}
        className="mx-auto w-fit rounded-full border border-neutral-800 bg-[var(--bg)] px-3 py-1 text-[10px] text-[var(--text-secondary)]"
      >
        Request sent · Nissan Skyline R33
      </m.div>

      <div className="mt-4 flex flex-1 flex-col justify-center gap-2.5 sm:gap-3">
        {QUOTES.map((q, i) => (
          <m.div
            key={q.dealer}
            initial={{ opacity: 0, x: 48 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.2, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-between rounded-xl border border-neutral-800 bg-[var(--bg)] px-4 py-3"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="truncate text-sm font-medium text-[var(--text-primary)]">{q.dealer}</p>
                <CheckCircle2 className="size-3.5 shrink-0 text-[var(--red)]" aria-hidden />
              </div>
              <p className="mt-0.5 flex items-center gap-1 text-[10px] text-[var(--text-secondary)]">
                <Star className="size-2.5 fill-amber-500/80 text-amber-500/80" aria-hidden />
                {q.rating} ★
              </p>
            </div>
            <p className="shrink-0 font-mono text-base font-semibold text-[var(--text-primary)]">
              <MonoValue>{q.price}</MonoValue>
            </p>
          </m.div>
        ))}
      </div>
    </m.div>
  );
}
