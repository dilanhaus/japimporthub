"use client";

import { m } from "framer-motion";

export const STAGE_CAPTIONS = [
  "1. You tell us what you want",
  "2. Verified Japanese dealers send quotes",
  "3. We manage sourcing, shipping, and customs",
  "4. Your car arrives at your door",
] as const;

export const fadeSlide = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
};

export function StageCaption({ text }: { text: string }) {
  return (
    <m.p
      key={text}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pointer-events-none absolute bottom-14 left-0 right-0 z-20 px-4 text-center text-sm text-[var(--text-secondary)]"
      aria-live="polite"
    >
      {text}
    </m.p>
  );
}

export function MonoValue({ children }: { children: React.ReactNode }) {
  return <span className="font-mono text-[var(--text-primary)]">{children}</span>;
}
