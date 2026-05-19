"use client";

import { useEffect, useState } from "react";
import { m } from "framer-motion";
import { fadeSlide, MonoValue } from "./shared";

const LINES = [
  { label: "Car", value: "Nissan Skyline R33" },
  { label: "Colour", value: "Blue or Black" },
  { label: "Max mileage", value: "100,000", mono: true },
  { label: "Budget", value: "£30,000", mono: true },
] as const;

export function Stage1Request() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    LINES.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleLines(i + 1), 400 + i * 550));
    });
    timers.push(setTimeout(() => setShowButton(true), 400 + LINES.length * 550 + 300));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <m.div
      className="flex h-full flex-col items-center justify-center px-6 py-8"
      {...fadeSlide}
    >
      <div className="w-full max-w-md rounded-xl border border-neutral-800 bg-[var(--bg)] p-5 shadow-lg">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
          New import request
        </p>
        <div className="mt-4 space-y-3">
          {LINES.map((line, i) => (
            <div
              key={line.label}
              className="min-h-[2.25rem] rounded-lg border border-neutral-800/80 bg-[var(--surface)] px-3 py-2"
            >
              {i < visibleLines ? (
                <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
                  <p className="text-[10px] text-[var(--text-secondary)]">{line.label}</p>
                  <p className="text-sm text-[var(--text-primary)]">
                    {"mono" in line && line.mono ? <MonoValue>{line.value}</MonoValue> : line.value}
                  </p>
                </m.div>
              ) : null}
            </div>
          ))}
        </div>
        {showButton ? (
          <m.button
            type="button"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-5 w-full animate-pulse rounded-lg bg-[var(--red)] py-2.5 text-sm font-semibold text-white"
            tabIndex={-1}
            aria-hidden
          >
            Submit request
          </m.button>
        ) : (
          <div className="mt-5 h-10" aria-hidden />
        )}
      </div>
    </m.div>
  );
}
