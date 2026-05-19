"use client";

import { m } from "framer-motion";
import { Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AnimatedCheckmark } from "./AnimatedCheckmark";
import { DocumentStack } from "./DocumentStack";
import { MonoValue, VEHICLE } from "./shared";

export function State03DocsDeposit() {
  return (
    <div className="grid items-stretch gap-0 md:grid-cols-2">
      {/* Left — documents */}
      <div className="flex flex-col border-neutral-800/80 pb-6 md:border-r md:pb-0 md:pr-6">
        <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-[var(--text-secondary)]">
          Documentation
        </p>
        <DocumentStack compact />
      </div>

      {/* Right — deposit */}
      <div className="flex flex-col justify-center border-t border-neutral-800/80 pt-6 md:border-t-0 md:pl-6 md:pt-0">
        <p className="mb-4 text-[10px] font-medium uppercase tracking-wider text-[var(--text-secondary)]">
          Payment
        </p>
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <m.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="relative"
          >
            <m.div
              animate={{ boxShadow: ["0 0 0 0 rgba(52,211,153,0)", "0 0 24px rgba(52,211,153,0.25)", "0 0 0 0 rgba(52,211,153,0)"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex size-12 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10"
            >
              <svg
                viewBox="0 0 24 24"
                className="size-5 text-emerald-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <rect x="5" y="11" width="14" height="10" rx="2" />
                <path d="M8 11V7a4 4 0 018 0v4" strokeLinecap="round" />
              </svg>
            </m.div>
          </m.div>

          <m.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.35 }}
            className="mt-4 text-sm font-medium text-[var(--text-primary)]"
          >
            {VEHICLE.name} · <MonoValue>{VEHICLE.budget}</MonoValue>
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.35 }}
            className="mt-3 flex items-center gap-2"
          >
            <AnimatedCheckmark className="size-8 shrink-0" />
            <p className="text-sm text-emerald-400">Deposit held in escrow</p>
          </m.div>

          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.35 }}
            className="mt-4"
          >
            <Badge
              variant="outline"
              className="gap-1.5 border-neutral-700 bg-neutral-900/40 px-3 py-1 text-xs text-[var(--text-secondary)]"
            >
              <Shield className="size-3.5 text-[var(--red)]" aria-hidden />
              Protected by Grade Five
            </Badge>
          </m.div>
        </div>
      </div>
    </div>
  );
}
