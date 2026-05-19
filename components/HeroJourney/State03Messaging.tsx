"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { StageLifecycleProps } from "./stage-lifecycle";
import { CHAT_MESSAGES } from "./shared";

const MESSAGE_IN_MS = 380;

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-neutral-800 bg-neutral-800/80 px-3 py-2.5">
      {[0, 1, 2].map((i) => (
        <m.span
          key={i}
          className="size-1.5 rounded-full bg-neutral-500"
          animate={{ opacity: [0.35, 1, 0.35], y: [0, -2, 0] }}
          transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.14 }}
          aria-hidden
        />
      ))}
    </div>
  );
}

export function State03Messaging({ onContentReady, onSequenceComplete }: StageLifecycleProps) {
  const contentReadyFired = useRef(false);
  const sequenceCompleteFired = useRef(false);

  const [visibleCount, setVisibleCount] = useState(0);
  const [typing, setTyping] = useState(false);
  const [showBadge, setShowBadge] = useState(false);

  useEffect(() => {
    const timers: number[] = [];

    const showMessage = (index: number, at: number) => {
      timers.push(
        window.setTimeout(() => {
          setTyping(false);
          setVisibleCount(index + 1);
        }, at),
      );
    };

    const showTyping = (at: number) => {
      timers.push(window.setTimeout(() => setTyping(true), at));
    };

    showMessage(0, 500);

    showTyping(500 + MESSAGE_IN_MS);
    showMessage(1, 500 + MESSAGE_IN_MS + 1200);

    const dealer2TypingAt = 500 + MESSAGE_IN_MS + 1200 + MESSAGE_IN_MS + 1400;
    showTyping(dealer2TypingAt);
    showMessage(2, dealer2TypingAt + 1400);

    const customer2At = dealer2TypingAt + 1400 + MESSAGE_IN_MS + 1000;
    showMessage(3, customer2At);

    const dealer3At = customer2At + MESSAGE_IN_MS + 1600;
    showMessage(4, dealer3At);

    const badgeAt = dealer3At + MESSAGE_IN_MS + 1000;
    timers.push(window.setTimeout(() => setShowBadge(true), badgeAt));
    timers.push(
      window.setTimeout(() => {
        if (sequenceCompleteFired.current) return;
        sequenceCompleteFired.current = true;
        onSequenceComplete?.();
      }, badgeAt + 400),
    );

    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [onSequenceComplete]);

  useEffect(() => {
    if (visibleCount < 1) return;
    if (contentReadyFired.current) return;
    contentReadyFired.current = true;
    onContentReady?.();
  }, [visibleCount, onContentReady]);

  return (
    <div className="flex flex-col">
      <div className="max-h-[240px] space-y-2.5 overflow-hidden rounded-xl border border-neutral-800/90 bg-[var(--bg)]/50 p-3 sm:max-h-[260px] sm:p-4">
        <AnimatePresence initial={false}>
          {CHAT_MESSAGES.slice(0, visibleCount).map((msg, index) => (
            <m.div
              key={index}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className={cn("flex", msg.side === "customer" ? "justify-end" : "justify-start")}
            >
              <div
                className={cn(
                  "max-w-[92%] rounded-2xl px-3 py-2 text-xs leading-relaxed sm:max-w-[85%] sm:text-[13px]",
                  msg.side === "dealer"
                    ? "rounded-bl-md border border-neutral-800 bg-neutral-800/90 text-[var(--text-primary)]"
                    : "rounded-br-md border border-[var(--red)]/25 bg-[var(--red)]/10 text-[var(--text-primary)]",
                )}
              >
                {msg.text}
              </div>
            </m.div>
          ))}
        </AnimatePresence>

        {typing ? (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-start"
          >
            <TypingIndicator />
          </m.div>
        ) : null}
      </div>

      <AnimatePresence>
        {showBadge ? (
          <m.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-3 flex items-center justify-center gap-1.5 text-center text-[11px] text-[var(--text-secondary)]"
          >
            <Lock className="size-3 shrink-0 text-emerald-500/80" aria-hidden />
            Conversations are logged and protected on Grade Five
          </m.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
