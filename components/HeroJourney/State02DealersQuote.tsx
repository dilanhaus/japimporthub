"use client";

import { m } from "framer-motion";
import { QuoteCard } from "./QuoteCard";
import { DEMO_QUOTES } from "./shared";

export function State02DealersQuote() {
  return (
    <div>
      <p className="mb-4 text-xs text-[var(--text-secondary)]">
        3 quotes received · Nissan Skyline R33
      </p>
      <div className="grid gap-3 md:grid-cols-3">
        {DEMO_QUOTES.map((quote, index) => (
          <m.div
            key={quote.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.1 + index * 0.18,
              duration: 0.42,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <QuoteCard quote={quote} />
          </m.div>
        ))}
      </div>
    </div>
  );
}
