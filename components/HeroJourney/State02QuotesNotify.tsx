"use client";

import { useEffect, useState } from "react";
import { m } from "framer-motion";
import { QuoteCard } from "./QuoteCard";
import { WhatsAppNotification } from "./WhatsAppNotification";
import { DEMO_QUOTES } from "./shared";

const CARD_STAGGER_MS = 350;

export function State02QuotesNotify() {
  const [visibleCards, setVisibleCards] = useState(0);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const timers: number[] = [];

    DEMO_QUOTES.forEach((_, i) => {
      timers.push(window.setTimeout(() => setVisibleCards(i + 1), 200 + i * CARD_STAGGER_MS));
    });

    const allIn = 200 + (DEMO_QUOTES.length - 1) * CARD_STAGGER_MS + 500;
    timers.push(window.setTimeout(() => setShowNotification(true), allIn + 1500));
    timers.push(window.setTimeout(() => setShowNotification(false), allIn + 2700));

    return () => timers.forEach((id) => window.clearTimeout(id));
  }, []);

  return (
    <div className="relative">
      <div className="grid gap-3 md:grid-cols-3">
        {DEMO_QUOTES.map((quote, index) => (
          <m.div
            key={quote.id}
            initial={{ opacity: 0, x: 44 }}
            animate={index < visibleCards ? { opacity: 1, x: 0 } : { opacity: 0, x: 44 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <QuoteCard quote={quote} />
          </m.div>
        ))}
      </div>
      <WhatsAppNotification visible={showNotification} />
    </div>
  );
}
