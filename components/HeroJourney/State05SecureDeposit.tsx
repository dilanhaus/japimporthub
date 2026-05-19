"use client";

import { m } from "framer-motion";
import { BadgeCheck, Lock, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MonoValue, VEHICLE } from "./shared";

export function State05SecureDeposit() {
  return (
    <Card className="mx-auto max-w-xl border-neutral-800/90 bg-[var(--bg)]/70 py-0 ring-neutral-800/80">
      <CardContent className="space-y-5 p-6 sm:p-8">
        <div className="border-b border-neutral-800 pb-4">
          <p className="text-[10px] uppercase tracking-wider text-[var(--text-secondary)]">Order summary</p>
          <p className="mt-1 text-base font-medium text-[var(--text-primary)]">
            {VEHICLE.name} · <MonoValue>{VEHICLE.budget}</MonoValue>
          </p>
        </div>

        <m.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.35 }}
          className="flex items-center gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3"
        >
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
            <Lock className="size-4 text-emerald-400" aria-hidden />
          </div>
          <div>
            <p className="flex items-center gap-1.5 text-sm font-medium text-emerald-400">
              <BadgeCheck className="size-4" aria-hidden />
              Deposit secured
            </p>
            <p className="mt-0.5 text-xs text-[var(--text-secondary)]">
              Funds held until export documents are verified
            </p>
          </div>
        </m.div>

        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.3 }}
        >
          <Badge
            variant="outline"
            className="gap-1.5 border-neutral-700 bg-neutral-900/40 px-3 py-1 text-xs text-[var(--text-secondary)]"
          >
            <Shield className="size-3.5 text-[var(--red)]" aria-hidden />
            Protected by Grade Five Escrow
          </Badge>
        </m.div>
      </CardContent>
    </Card>
  );
}
