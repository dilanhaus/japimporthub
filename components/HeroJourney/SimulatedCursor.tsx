"use client";

import { AnimatePresence, m } from "framer-motion";
import { MousePointer2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type CursorPoint = { x: number; y: number };

type PercentKeyframe = { left: string; top: string };

type PixelCursorProps = {
  mode?: "pixel";
  visible: boolean;
  start: CursorPoint;
  end: CursorPoint;
  mid?: CursorPoint;
  clicking?: boolean;
  className?: string;
  travelDuration?: number;
};

type PercentCursorProps = {
  mode: "percent";
  visible: boolean;
  keyframes: PercentKeyframe[];
  clicking?: boolean;
  className?: string;
  transitionDuration?: number;
};

export type SimulatedCursorProps = PixelCursorProps | PercentCursorProps;

export function SimulatedCursor(props: SimulatedCursorProps) {
  if (props.mode === "percent") {
    const { visible, keyframes, clicking = false, className, transitionDuration = 0.7 } = props;
    const start = keyframes[0] ?? { left: "80%", top: "75%" };
    const end = keyframes[keyframes.length - 1] ?? start;
    const mid = keyframes.length > 2 ? keyframes[1] : undefined;

    return (
      <AnimatePresence>
        {visible ? (
          <m.div
            className={cn("pointer-events-none absolute z-40 hidden md:block", className)}
            initial={{
              left: start.left,
              top: start.top,
              opacity: 0,
              scale: 1,
            }}
            animate={{
              left: mid ? [start.left, mid.left, end.left] : [start.left, end.left],
              top: mid ? [start.top, mid.top, end.top] : [start.top, end.top],
              opacity: 1,
              scale: clicking ? 0.88 : 1,
            }}
            exit={{ opacity: 0 }}
            transition={{
              left: {
                duration: transitionDuration,
                ease: [0.22, 1, 0.36, 1],
                times: mid ? [0, 0.55, 1] : [0, 1],
              },
              top: {
                duration: transitionDuration,
                ease: [0.22, 1, 0.36, 1],
                times: mid ? [0, 0.55, 1] : [0, 1],
              },
              opacity: { duration: 0.25 },
              scale: { duration: 0.12 },
            }}
            style={{ transform: "translate(-2px, -2px)" }}
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

  const {
    visible,
    start,
    end,
    mid,
    clicking = false,
    className,
    travelDuration = 1.15,
  } = props;

  const waypoint = mid ?? {
    x: (start.x + end.x) / 2 + 24,
    y: (start.y + end.y) / 2 - 28,
  };

  return (
    <AnimatePresence>
      {visible ? (
        <m.div
          className={cn("pointer-events-none absolute z-40 hidden md:block", className)}
          initial={{
            left: start.x,
            top: start.y,
            opacity: 0,
            scale: 1,
          }}
          animate={{
            left: [start.x, waypoint.x, end.x],
            top: [start.y, waypoint.y, end.y],
            opacity: 1,
            scale: clicking ? 0.88 : 1,
          }}
          exit={{ opacity: 0 }}
          transition={{
            left: {
              duration: travelDuration,
              ease: [0.22, 1, 0.36, 1],
              times: [0, 0.55, 1],
            },
            top: {
              duration: travelDuration,
              ease: [0.22, 1, 0.36, 1],
              times: [0, 0.55, 1],
            },
            opacity: { duration: 0.25 },
            scale: { duration: 0.12 },
          }}
          style={{
            left: end.x,
            top: end.y,
            transform: "translate(-2px, -2px)",
          }}
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
