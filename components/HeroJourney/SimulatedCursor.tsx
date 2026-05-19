"use client";

import { AnimatePresence, m } from "framer-motion";
import { MousePointer2 } from "lucide-react";
import { cn } from "@/lib/utils";

type CursorKeyframe = {
  left: string;
  top: string;
};

type SimulatedCursorProps = {
  visible: boolean;
  keyframes: CursorKeyframe[];
  clicking?: boolean;
  className?: string;
  transitionDuration?: number;
};

export function SimulatedCursor({
  visible,
  keyframes,
  clicking = false,
  className,
  transitionDuration = 0.75,
}: SimulatedCursorProps) {
  const last = keyframes[keyframes.length - 1] ?? { left: "50%", top: "50%" };

  return (
    <AnimatePresence>
      {visible ? (
        <m.div
          className={cn(
            "pointer-events-none absolute z-40 hidden md:block",
            className,
          )}
          initial={{
            left: keyframes[0]?.left ?? "80%",
            top: keyframes[0]?.top ?? "30%",
            opacity: 0,
          }}
          animate={{
            left: keyframes.map((k) => k.left),
            top: keyframes.map((k) => k.top),
            opacity: 1,
            scale: clicking ? 0.88 : 1,
          }}
          exit={{ opacity: 0 }}
          transition={{
            left: { duration: transitionDuration, ease: [0.4, 0, 0.2, 1] },
            top: { duration: transitionDuration, ease: [0.25, 0.1, 0.25, 1] },
            opacity: { duration: 0.2 },
            scale: { duration: 0.12 },
          }}
          style={{ left: last.left, top: last.top }}
        >
          <MousePointer2
            className="size-5 fill-[var(--text-primary)] text-[var(--text-primary)] drop-shadow-lg"
            aria-hidden
          />
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}
