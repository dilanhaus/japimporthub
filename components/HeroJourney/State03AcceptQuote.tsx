"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { MousePointer2 } from "lucide-react";
import { QuoteCard } from "./QuoteCard";
import { DEMO_QUOTES, SELECTED_QUOTE_INDEX } from "./shared";

type Phase = "equal" | "cursor" | "accepted";

const BURST_PARTICLES = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  angle: (i / 8) * Math.PI * 2,
}));

export function State03AcceptQuote() {
  const [phase, setPhase] = useState<Phase>("equal");

  useEffect(() => {
    const toCursor = window.setTimeout(() => setPhase("cursor"), 800);
    const toAccepted = window.setTimeout(() => setPhase("accepted"), 1500);
    return () => {
      window.clearTimeout(toCursor);
      window.clearTimeout(toAccepted);
    };
  }, []);

  return (
    <div className="relative">
      <div className="grid gap-3 md:grid-cols-3">
        {DEMO_QUOTES.map((quote, index) => {
          const isWinner = index === SELECTED_QUOTE_INDEX;
          const accepted = phase === "accepted" && isWinner;

          return (
            <m.div
              key={quote.id}
              className="relative"
              initial={false}
              animate={{
                opacity: phase === "accepted" ? (isWinner ? 1 : 0.4) : 1,
                scale:
                  phase === "accepted"
                    ? isWinner
                      ? 1.03
                      : 0.97
                    : 1,
              }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {accepted ? (
                <m.div
                  className="pointer-events-none absolute inset-0 -z-10 rounded-xl"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: [0.7, 0], scale: [1, 1.35] }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                  style={{
                    background:
                      "radial-gradient(circle at 50% 50%, rgba(52,211,153,0.35) 0%, transparent 70%)",
                  }}
                  aria-hidden
                />
              ) : null}

              <m.div
                animate={
                  accepted
                    ? {
                        boxShadow: [
                          "0 0 0 1px rgba(52,211,153,0.4), 0 0 24px rgba(52,211,153,0.2)",
                          "0 0 0 1px rgba(255,255,255,0.25), 0 0 32px rgba(52,211,153,0.35)",
                        ],
                      }
                    : { boxShadow: "0 0 0 0px transparent" }
                }
                transition={{ duration: 0.4 }}
                className="rounded-xl"
              >
                <QuoteCard
                  quote={quote}
                  selected={accepted}
                  dimmed={phase === "accepted" && !isWinner}
                  accepted={accepted}
                  acceptedLabel="Quote Accepted ✓"
                />
              </m.div>

              <AnimatePresence>
                {accepted ? (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
                    {BURST_PARTICLES.map((p) => (
                      <m.span
                        key={p.id}
                        className="absolute size-1.5 rounded-full bg-emerald-400/90"
                        initial={{ opacity: 0.9, x: 0, y: 0, scale: 1 }}
                        animate={{
                          opacity: 0,
                          x: Math.cos(p.angle) * 36,
                          y: Math.sin(p.angle) * 36,
                          scale: 0.2,
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

      <AnimatePresence>
        {phase === "cursor" || phase === "accepted" ? (
          <m.div
            className="pointer-events-none absolute z-20 hidden md:block"
            initial={{ left: "58%", top: "45%", opacity: 0 }}
            animate={{
              left: phase === "accepted" ? "16.5%" : "22%",
              top: "42%",
              opacity: 1,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <MousePointer2
              className="size-5 fill-[var(--text-primary)] text-[var(--text-primary)] drop-shadow-lg"
              aria-hidden
            />
          </m.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
