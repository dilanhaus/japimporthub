"use client";

import { m } from "framer-motion";
import { QuoteCard } from "./QuoteCard";
import { DEMO_QUOTES, SELECTED_QUOTE_INDEX } from "./shared";

export function State03AcceptQuote() {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {DEMO_QUOTES.map((quote, index) => {
        const selected = index === SELECTED_QUOTE_INDEX;
        return (
          <m.div
            key={quote.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: selected ? 1 : 0.5, scale: selected ? 1 : 0.97 }}
            transition={{ delay: index * 0.06, duration: 0.32 }}
          >
            <QuoteCard
              quote={quote}
              selected={selected}
              dimmed={!selected}
              accepted={selected}
            />
          </m.div>
        );
      })}
    </div>
  );
}
