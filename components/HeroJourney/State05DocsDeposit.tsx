"use client";

import { useEffect, useState } from "react";
import { m } from "framer-motion";
import { Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AnimatedCheckmark } from "./AnimatedCheckmark";
import { DocumentStack } from "./DocumentStack";
import { MonoValue, VEHICLE } from "./shared";

export function State05DocsDeposit() {
  const [showTick, setShowTick] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setShowTick(true), 1000);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div className="grid items-stretch gap-0 md:grid-cols-2">
      <div className="flex flex-col border-neutral-800/80 pb-6 md:border-r md:pb-0 md:pr-6">
        <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-neutral-500">
          Import Documents
        </p>
        <DocumentStack compact />
      </div>

      <div className="flex flex-col justify-center border-t border-neutral-800/80 pt-6 md:border-t-0 md:pl-6 md:pt-0">
        <p className="mb-4 text-[10px] font-medium uppercase tracking-wider text-neutral-500">
          Secure Deposit
        </p>
        <div className="flex flex-col md:pl-1">
          <m.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="relative inline-flex"
          >
            <m.div
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(52,211,153,0)",
                  "0 0 28px rgba(52,211,153,0.3)",
                  "0 0 0 0 rgba(52,211,153,0)",
                ],
              }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="flex size-12 items-center justify-center rounded-full border border-emerald-500/35 bg-emerald-500/10"
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
            transition={{ delay: 0.2, duration: 0.35 }}
            className="mt-4 text-xl font-semibold text-[var(--text-primary)]"
          >
            <MonoValue>{VEHICLE.deposit}</MonoValue> deposit
          </m.p>
          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="mt-1 text-sm text-[var(--text-secondary)]"
          >
            Held in Grade Five escrow
          </m.p>
          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.38, duration: 0.3 }}
            className="mt-2 text-xs leading-relaxed text-neutral-500"
          >
            Released to dealer only after you confirm receipt
          </m.p>

          {showTick ? (
            <m.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="mt-4 flex items-center gap-2"
            >
              <AnimatedCheckmark className="size-7 shrink-0" />
              <span className="text-sm text-emerald-400">Deposit confirmed</span>
            </m.div>
          ) : null}

          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.35 }}
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
          <p className="mt-3 text-[11px] text-neutral-500">Full payment due on UK arrival</p>
        </div>
      </div>
    </div>
  );
}
