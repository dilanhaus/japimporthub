"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { MousePointer2 } from "lucide-react";
import { QuoteCard } from "./QuoteCard";
import { DEMO_QUOTES, SELECTED_QUOTE_INDEX } from "./shared";

type Phase = "arriving" | "review" | "cursor" | "click" | "accepted";

const BURST_PARTICLES = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  angle: (i / 8) * Math.PI * 2,
}));

const CARD_STAGGER_MS = 300;

export function State02QuotesFlow() {
  const [visibleCards, setVisibleCards] = useState(0);
  const [phase, setPhase] = useState<Phase>("arriving");

  useEffect(() => {
    const timers: number[] = [];

    DEMO_QUOTES.forEach((_, i) => {
      timers.push(window.setTimeout(() => setVisibleCards(i + 1), 150 + i * CARD_STAGGER_MS));
    });

    const allIn = 150 + (DEMO_QUOTES.length - 1) * CARD_STAGGER_MS + 400;
    timers.push(window.setTimeout(() => setPhase("review"), allIn));
    timers.push(window.setTimeout(() => setPhase("cursor"), allIn + 400));
    timers.push(window.setTimeout(() => setPhase("click"), allIn + 1100));
    timers.push(window.setTimeout(() => setPhase("accepted"), allIn + 1350));

    return () => timers.forEach((id) => window.clearTimeout(id));
  }, []);

  const accepted = phase === "accepted";
  const clicking = phase === "click";
  const showCursor = phase === "cursor" || clicking || accepted;

  return (
    <div className="relative">
      <div className="grid gap-3 md:grid-cols-3">
        {DEMO_QUOTES.map((quote, index) => {
          const isWinner = index === SELECTED_QUOTE_INDEX;
          const visible = index < visibleCards;
          const isAccepted = accepted && isWinner;

          return (
            <m.div
              key={quote.id}
              initial={{ opacity: 0, x: 48 }}
              animate={
                visible
                  ? {
                      opacity: accepted ? (isWinner ? 1 : 0.4) : 1,
                      x: 0,
                      scale: accepted
                        ? isWinner
                          ? 1.03
                          : 0.97
                        : clicking && isWinner
                          ? 0.98
                          : 1,
                    }
                  : { opacity: 0, x: 48 }
              }
              transition={{
                duration: 0.42,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative"
            >
              {isAccepted ? (
                <m.div
                  className="pointer-events-none absolute inset-0 -z-10 rounded-xl"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: [0.75, 0], scale: [1, 1.4] }}
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
                          "0 0 0 1px rgba(255,255,255,0.2), 0 0 36px rgba(52,211,153,0.35)",
                      }
                    : clicking && isWinner
                      ? { boxShadow: "0 0 0 2px rgba(255,255,255,0.15)" }
                      : { boxShadow: "0 0 0 0px transparent" }
                }
                transition={{ duration: 0.35 }}
                className="rounded-xl"
              >
                <QuoteCard
                  quote={quote}
                  accepted={isAccepted}
                  dimmed={accepted && !isWinner}
                  acceptedLabel="Quote Accepted ✓"
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
                          x: Math.cos(p.angle) * 32,
                          y: Math.sin(p.angle) * 32,
                        }}
                        transition={{ duration: 0.48, ease: "easeOut" }}
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
        {showCursor ? (
          <m.div
            className="pointer-events-none absolute z-30 hidden md:block"
            initial={{ left: "72%", top: "30%", opacity: 0 }}
            animate={{
              left:
                phase === "cursor"
                  ? "28%"
                  : accepted || clicking
                    ? "16.5%"
                    : "50%",
              top: phase === "cursor" ? "38%" : "42%",
              opacity: 1,
              scale: clicking ? 0.88 : 1,
            }}
            transition={{
              duration: phase === "cursor" ? 0.65 : 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
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
