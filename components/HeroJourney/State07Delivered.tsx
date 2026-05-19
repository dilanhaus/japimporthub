"use client";

import { useEffect, useState } from "react";
import { m } from "framer-motion";
import { CheckCircle2, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { VEHICLE } from "./shared";

export function State07Delivered() {
  const [showRate, setShowRate] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowRate(true), 700);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <Card className="mx-auto max-w-lg border-neutral-800/90 bg-[var(--bg)]/70 py-0 ring-neutral-800/80">
      <CardContent className="flex flex-col items-center px-6 py-10 text-center sm:py-12">
        <m.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <CheckCircle2
            className="size-14 text-emerald-400 sm:size-16"
            strokeWidth={1.25}
            aria-hidden
          />
        </m.div>
        <m.h3
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.35 }}
          className="mt-5 text-lg font-semibold text-[var(--text-primary)] sm:text-xl"
        >
          Your Skyline R33 is on its way to your door
        </m.h3>
        <m.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.28, duration: 0.3 }}
          className="mt-2 text-sm text-[var(--text-secondary)]"
        >
          Estimated delivery · {VEHICLE.deliveryEta}
        </m.p>
        {showRate ? (
          <m.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 flex items-center gap-1.5 text-xs text-[var(--text-secondary)]"
          >
            <Star className="size-3.5 text-amber-500/80" aria-hidden />
            Rate your dealer
          </m.p>
        ) : null}
      </CardContent>
    </Card>
  );
}
