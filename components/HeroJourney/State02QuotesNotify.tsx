"use client";

import { useEffect, useRef, useState } from "react";
import { m } from "framer-motion";
import { QuoteCard } from "./QuoteCard";
import type { StageLifecycleProps } from "./stage-lifecycle";
import { WhatsAppNotification } from "./WhatsAppNotification";
import { DEMO_QUOTES } from "./shared";

const CARDS_STAGGER_MS = 1000;
const POST_CARDS_WAIT_MS = 1000;
const NOTIFICATION_VISIBLE_MS = 3000;
const POST_NOTIFICATION_HOLD_MS = 1000;

export function State02QuotesNotify({ onContentReady, onSequenceComplete }: StageLifecycleProps) {
  const contentReadyFired = useRef(false);
  const sequenceCompleteFired = useRef(false);

  const [visibleCards, setVisibleCards] = useState(0);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const timers: number[] = [];

    DEMO_QUOTES.forEach((_, i) => {
      timers.push(window.setTimeout(() => setVisibleCards(i + 1), i * CARDS_STAGGER_MS));
    });

    const allCardsAt = (DEMO_QUOTES.length - 1) * CARDS_STAGGER_MS;
    const notificationShowAt = allCardsAt + POST_CARDS_WAIT_MS;
    const notificationHideAt = notificationShowAt + NOTIFICATION_VISIBLE_MS;
    const sequenceEndAt = notificationHideAt + POST_NOTIFICATION_HOLD_MS;

    timers.push(window.setTimeout(() => setShowNotification(true), notificationShowAt));
    timers.push(window.setTimeout(() => setShowNotification(false), notificationHideAt));
    timers.push(
      window.setTimeout(() => {
        if (sequenceCompleteFired.current) return;
        sequenceCompleteFired.current = true;
        onSequenceComplete?.();
      }, sequenceEndAt),
    );

    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [onSequenceComplete]);

  useEffect(() => {
    if (visibleCards < DEMO_QUOTES.length) return;
    if (contentReadyFired.current) return;
    contentReadyFired.current = true;
    onContentReady?.();
  }, [visibleCards, onContentReady]);

  return (
    <div className="relative">
      <div className="grid gap-3 md:grid-cols-3">
        {DEMO_QUOTES.map((quote, index) => (
          <m.div
            key={quote.id}
            initial={{ opacity: 0, x: 44 }}
            animate={index < visibleCards ? { opacity: 1, x: 0 } : { opacity: 0, x: 44 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <QuoteCard quote={quote} />
          </m.div>
        ))}
      </div>
      <WhatsAppNotification visible={showNotification} />
    </div>
  );
}
