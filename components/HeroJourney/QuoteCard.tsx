"use client";

import { m } from "framer-motion";
import { BadgeCheck, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { MonoValue, type DEMO_QUOTES } from "./shared";

type Quote = (typeof DEMO_QUOTES)[number];

type QuoteCardProps = {
  quote: Quote;
  dimmed?: boolean;
  accepted?: boolean;
  acceptedLabel?: string;
  footerText?: string;
  className?: string;
};

export function QuoteCard({
  quote,
  dimmed = false,
  accepted = false,
  acceptedLabel = "Quote Accepted ✓",
  footerText,
  className,
}: QuoteCardProps) {
  return (
    <m.article
      className={cn(
        "relative flex h-full min-w-0 flex-col rounded-xl border bg-[var(--bg)]/90 p-3 md:p-4",
        accepted ? "border-emerald-400/70" : "border-neutral-800/90",
        dimmed && "opacity-35",
        className,
      )}
    >
      {accepted ? (
        <m.div
          initial={{ opacity: 0, y: -6, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <Badge className="absolute -top-3 left-2 z-10 max-w-[calc(100%-0.5rem)] border-emerald-400/50 bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-300 shadow-[0_0_20px_rgba(52,211,153,0.35)] md:left-1/2 md:max-w-none md:-translate-x-1/2 md:px-2.5 md:text-[11px]">
            {acceptedLabel}
          </Badge>
        </m.div>
      ) : null}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-1.5">
            <p className="truncate text-sm font-medium text-[var(--text-primary)]">{quote.dealer}</p>
            <Badge className="h-4 border-emerald-500/40 bg-emerald-500/15 px-1.5 text-[9px] font-medium text-emerald-400">
              <BadgeCheck className="size-2.5" aria-hidden />
              Verified
            </Badge>
          </div>
          <p className="mt-1 flex items-center gap-1 text-xs text-[var(--text-secondary)]">
            <Star className="size-3 fill-amber-500/90 text-amber-500/90" aria-hidden />
            {quote.rating.toFixed(1)} ★
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-[10px] uppercase tracking-wider text-[var(--text-secondary)]">Landed</p>
          <p className="text-lg font-bold">
            <MonoValue>{quote.price}</MonoValue>
          </p>
        </div>
      </div>
      <div className="mt-auto flex items-end justify-between pt-3 text-xs text-[var(--text-secondary)]">
        <span>
          ETA <MonoValue>{quote.eta}</MonoValue>
        </span>
        <Badge variant="outline" className="h-5 border-neutral-700 text-[10px]">
          Grade <MonoValue>{quote.grade}</MonoValue>
        </Badge>
      </div>
      {footerText ? (
        <p className="mt-3 border-t border-neutral-800/80 pt-2 text-center text-[11px] font-medium text-emerald-400/90">
          {footerText}
        </p>
      ) : null}
    </m.article>
  );
}
