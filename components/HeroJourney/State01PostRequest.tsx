"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { SimulatedCursor, type CursorPoint } from "./SimulatedCursor";
import type { StageLifecycleProps } from "./stage-lifecycle";
import { MonoValue, REQUEST_FIELDS, staggerItem } from "./shared";

const FIELD_DELAY_MS = 360;
const CURSOR_TRAVEL_MS = 1150;
const CURSOR_PAUSE_MS = 500;
const SENT_LABEL_MS = 800;

type Phase = "filling" | "ready" | "cursor" | "pause" | "pressing" | "done";

type CursorPath = {
  start: CursorPoint;
  end: CursorPoint;
};

export function State01PostRequest({ onContentReady, onSequenceComplete }: StageLifecycleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const contentReadyFired = useRef(false);
  const sequenceCompleteFired = useRef(false);

  const [visibleCount, setVisibleCount] = useState(0);
  const [phase, setPhase] = useState<Phase>("filling");
  const [cursorPath, setCursorPath] = useState<CursorPath | null>(null);

  const measureCursorPath = useCallback(() => {
    const container = containerRef.current;
    const button = buttonRef.current;
    if (!container || !button) return;

    const cr = container.getBoundingClientRect();
    const br = button.getBoundingClientRect();

    const endX = br.left + br.width / 2 - cr.left;
    const endY = br.top + br.height / 2 - cr.top;
    const startX = cr.width * 0.9;
    const startY = cr.height * 0.78;

    setCursorPath({
      start: { x: startX, y: startY },
      end: { x: endX, y: endY },
    });
  }, []);

  useEffect(() => {
    const timers: number[] = [];

    REQUEST_FIELDS.forEach((_, index) => {
      timers.push(window.setTimeout(() => setVisibleCount(index + 1), 80 + index * FIELD_DELAY_MS));
    });

    const allFieldsAt = 80 + (REQUEST_FIELDS.length - 1) * FIELD_DELAY_MS + 280;
    const buttonVisibleAt = allFieldsAt + 380;

    timers.push(
      window.setTimeout(() => {
        setPhase("ready");
        measureCursorPath();
      }, buttonVisibleAt),
    );

    timers.push(window.setTimeout(() => setPhase("cursor"), buttonVisibleAt + 120));
    const travelEnd = buttonVisibleAt + 120 + CURSOR_TRAVEL_MS;
    timers.push(window.setTimeout(() => setPhase("pause"), travelEnd));
    timers.push(window.setTimeout(() => setPhase("pressing"), travelEnd + CURSOR_PAUSE_MS));
    timers.push(
      window.setTimeout(() => setPhase("done"), travelEnd + CURSOR_PAUSE_MS + SENT_LABEL_MS),
    );

    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [measureCursorPath]);

  useEffect(() => {
    if (phase !== "ready" && phase !== "cursor" && phase !== "pause") return;
    measureCursorPath();
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => measureCursorPath());
    observer.observe(container);
    window.addEventListener("resize", measureCursorPath);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measureCursorPath);
    };
  }, [phase, measureCursorPath, visibleCount]);

  useEffect(() => {
    if (phase === "filling") return;
    if (contentReadyFired.current) return;
    contentReadyFired.current = true;
    onContentReady?.();
  }, [phase, onContentReady]);

  useEffect(() => {
    if (phase !== "done") return;
    if (sequenceCompleteFired.current) return;
    sequenceCompleteFired.current = true;
    onSequenceComplete?.();
  }, [phase, onSequenceComplete]);

  const showButton = visibleCount >= REQUEST_FIELDS.length;
  const showCursor = phase === "cursor" || phase === "pause" || phase === "pressing";
  const isPressing = phase === "pressing" || phase === "done";
  const labelSent = phase === "pressing" || phase === "done";

  return (
    <div ref={containerRef} className="relative">
      <Card className="border-neutral-800/90 bg-[var(--bg)]/60 py-0 ring-neutral-800/80">
        <CardContent className="p-5 sm:p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text-secondary)]">
            New import request
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {REQUEST_FIELDS.map((field, index) => (
              <div
                key={field.label}
                className="min-h-[3.25rem] rounded-lg border border-neutral-800/80 bg-[var(--surface)]/60 px-3 py-2.5"
              >
                {index < visibleCount ? (
                  <m.div {...staggerItem} transition={{ duration: 0.32 }}>
                    <p className="text-[10px] text-[var(--text-secondary)]">{field.label}</p>
                    <p className="mt-0.5 text-sm font-medium text-[var(--text-primary)]">
                      {field.mono ? <MonoValue>{field.value}</MonoValue> : field.value}
                    </p>
                  </m.div>
                ) : (
                  <div className="flex h-8 items-center">
                    <span
                      className="h-1.5 w-1.5 animate-pulse rounded-full bg-neutral-600"
                      aria-hidden
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <AnimatePresence>
            {showButton ? (
              <m.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative mt-5"
              >
                <m.button
                  ref={buttonRef}
                  type="button"
                  tabIndex={-1}
                  aria-hidden
                  animate={{
                    scale: isPressing ? 0.96 : 1,
                    filter: isPressing ? "brightness(0.85)" : "brightness(1)",
                  }}
                  transition={{ duration: 0.12 }}
                  className={cn(
                    buttonVariants({ variant: "primary", size: "lg" }),
                    "relative h-11 w-full overflow-hidden text-sm font-semibold sm:w-auto sm:min-w-[200px]",
                  )}
                >
                  {labelSent ? "Request sent ✓" : "Send Request"}
                  {isPressing && phase === "pressing" ? (
                    <m.span
                      className="absolute inset-0 bg-white/25"
                      initial={{ scale: 0, opacity: 0.7 }}
                      animate={{ scale: 2.8, opacity: 0 }}
                      transition={{ duration: 0.55, ease: "easeOut" }}
                      style={{
                        borderRadius: "50%",
                        left: "50%",
                        top: "50%",
                        x: "-50%",
                        y: "-50%",
                      }}
                      aria-hidden
                    />
                  ) : null}
                </m.button>
              </m.div>
            ) : null}
          </AnimatePresence>
        </CardContent>
      </Card>

      {cursorPath ? (
        <SimulatedCursor
          visible={showCursor}
          clicking={phase === "pressing"}
          start={cursorPath.start}
          end={cursorPath.end}
          travelDuration={CURSOR_TRAVEL_MS / 1000}
        />
      ) : null}
    </div>
  );
}
