"use client";

import { useEffect, useState } from "react";
import { m } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { MonoValue, REQUEST_FIELDS, staggerItem } from "./shared";

const FIELD_DELAY_MS = 340;

export function State01PostRequest() {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const timers = REQUEST_FIELDS.map((_, index) =>
      window.setTimeout(() => setVisibleCount(index + 1), 100 + index * FIELD_DELAY_MS),
    );
    return () => timers.forEach(window.clearTimeout);
  }, []);

  return (
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
                <m.div {...staggerItem} transition={{ duration: 0.3, delay: 0 }}>
                  <p className="text-[10px] text-[var(--text-secondary)]">{field.label}</p>
                  <p className="mt-0.5 text-sm font-medium text-[var(--text-primary)]">
                    {field.mono ? <MonoValue>{field.value}</MonoValue> : field.value}
                  </p>
                </m.div>
              ) : (
                <div className="flex h-8 items-center">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neutral-600" aria-hidden />
                </div>
              )}
            </div>
          ))}
        </div>
        {visibleCount >= REQUEST_FIELDS.length ? (
          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.25 }}
            className="mt-4 text-xs text-[var(--text-secondary)]"
          >
            Ready to publish to verified dealers
          </m.p>
        ) : null}
      </CardContent>
    </Card>
  );
}
