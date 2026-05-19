"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { QuoteCard } from "./QuoteCard";
import { SimulatedCursor } from "./SimulatedCursor";
import { DEMO_QUOTES, SELECTED_QUOTE_INDEX } from "./shared";

const BURST_PARTICLES = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  angle: (i / 8) * Math.PI * 2,
}));

type Phase = "idle" | "cursor" | "pause" | "click" | "accepted";

export function State04AcceptQuote() {
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    const timers: number[] = [];
    timers.push(window.setTimeout(() => setPhase("cursor"), 400));
    timers.push(window.setTimeout(() => setPhase("pause"), 1200));
    timers.push(window.setTimeout(() => setPhase("click"), 1600));
    timers.push(window.setTimeout(() => setPhase("accepted"), 1850));
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, []);

  const accepted = phase === "accepted";
  const clicking = phase === "click";
  const showCursor = phase !== "idle";

  return (
    <div className="relative">
      <div className="grid gap-3 md:grid-cols-3">
        {DEMO_QUOTES.map((quote, index) => {
          const isWinner = index === SELECTED_QUOTE_INDEX;
          const isAccepted = accepted && isWinner;

          return (
            <m.div
              key={quote.id}
              animate={{
                opacity: accepted ? (isWinner ? 1 : 0.35) : 1,
                scale: accepted ? (isWinner ? 1.02 : 0.96) : clicking && isWinner ? 0.98 : 1,
                x: accepted && !isWinner ? -4 : 0,
              }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {isAccepted ? (
                <m.div
                  className="pointer-events-none absolute inset-0 -z-10 rounded-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.8, 0], scale: [1, 1.35] }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                  style={{
                    background:
                      "radial-gradient(circle at 50% 50%, rgba(52,211,153,0.4) 0%, transparent 70%)",
                  }}
                  aria-hidden
                />
              ) : null}

              <m.div
                animate={
                  isAccepted
                    ? {
                        boxShadow:
                          "0 0 0 1px rgba(255,255,255,0.22), 0 0 40px rgba(52,211,153,0.35)",
                      }
                    : { boxShadow: "0 0 0 0px transparent" }
                }
                transition={{ duration: 0.4 }}
                className="rounded-xl"
              >
                <QuoteCard
                  quote={quote}
                  accepted={isAccepted}
                  dimmed={accepted && !isWinner}
                  acceptedLabel="Quote Accepted ✓"
                  footerText={
                    isAccepted
                      ? "Tokyo Export Partners · £28,400 · 9 weeks"
                      : undefined
                  }
                />
              </m.div>

              <AnimatePresence>
                {isAccepted ? (
                  <div
                    className="pointer-events-none absolute inset-0 flex items-center justify-center"
                    aria-hidden
                  >
                    {BURST_PARTICLES.map((p) => (
                      <m.span
                        key={p.id}
                        className="absolute size-1.5 rounded-full bg-emerald-400/90"
                        initial={{ opacity: 0.9, x: 0, y: 0 }}
                        animate={{
                          opacity: 0,
                          x: Math.cos(p.angle) * 34,
                          y: Math.sin(p.angle) * 34,
                        }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      />
                    ))}
                  </div>
                ) : null}
              </AnimatePresence>
            </m.div>
          );
        })}
      </div>

      <SimulatedCursor
        visible={showCursor}
        clicking={clicking}
        transitionDuration={phase === "cursor" ? 0.7 : 0.15}
        keyframes={
          phase === "accepted" || clicking || phase === "pause"
            ? [
                { left: "55%", top: "28%" },
                { left: "32%", top: "42%" },
                { left: "16.5%", top: "48%" },
              ]
            : [
                { left: "75%", top: "25%" },
                { left: "45%", top: "38%" },
                { left: "18%", top: "45%" },
              ]
        }
      />
    </div>
  );
}
