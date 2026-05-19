"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { SimulatedCursor } from "./SimulatedCursor";
import { MonoValue, REQUEST_FIELDS, staggerItem } from "./shared";

const FIELD_DELAY_MS = 360;

type Phase = "filling" | "ready" | "cursor" | "pressing" | "sent";

export function State01PostRequest() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [phase, setPhase] = useState<Phase>("filling");

  useEffect(() => {
    const timers: number[] = [];

    REQUEST_FIELDS.forEach((_, index) => {
      timers.push(window.setTimeout(() => setVisibleCount(index + 1), 80 + index * FIELD_DELAY_MS));
    });

    const allFieldsAt = 80 + (REQUEST_FIELDS.length - 1) * FIELD_DELAY_MS + 250;
    timers.push(window.setTimeout(() => setPhase("ready"), allFieldsAt));
    timers.push(window.setTimeout(() => setPhase("cursor"), allFieldsAt + 300));
    timers.push(window.setTimeout(() => setPhase("pressing"), allFieldsAt + 1300));
    timers.push(window.setTimeout(() => setPhase("sent"), allFieldsAt + 1750));

    return () => timers.forEach((id) => window.clearTimeout(id));
  }, []);

  const showButton = visibleCount >= REQUEST_FIELDS.length;
  const showCursor = phase === "cursor" || phase === "pressing";
  const isPressing = phase === "pressing";
  const isSent = phase === "sent";

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {!isSent ? (
          <m.div
            key="form"
            exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
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
                        {isPressing ? "Request sent ✓" : "Send Request"}
                        {isPressing ? (
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
          </m.div>
        ) : (
          <m.div key="sent" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-1" aria-hidden />
        )}
      </AnimatePresence>

      <SimulatedCursor
        visible={showCursor}
        clicking={isPressing}
        transitionDuration={0.85}
        keyframes={[
          { left: "88%", top: "32%" },
          { left: "58%", top: "55%" },
          { left: "22%", top: "78%" },
        ]}
      />
    </div>
  );
}
