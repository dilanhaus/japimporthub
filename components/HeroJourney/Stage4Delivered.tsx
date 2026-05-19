"use client";

import Image from "next/image";
import { m } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { fadeSlide, STAGE_SCENE_PT } from "./shared";

export function Stage4Delivered() {
  return (
    <m.div
      className={cn("relative flex h-full flex-col items-center justify-center px-4 pb-6", STAGE_SCENE_PT)}
      {...fadeSlide}
    >
      <m.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-2xl"
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-neutral-800 bg-[var(--bg)]">
          <Image
            src="/skyline-r33.jpg"
            alt="Nissan Skyline R33 delivered to customer"
            fill
            sizes="(max-width: 1024px) 100vw, 800px"
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/80 via-transparent to-[var(--bg)]/20" />
        </div>

        <m.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.35 }}
          className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full border border-[var(--red)]/40 bg-[var(--red)] px-3 py-1.5 text-xs font-semibold text-white shadow-lg"
        >
          <Check className="size-3.5" aria-hidden />
          Delivered
        </m.div>
      </m.div>
    </m.div>
  );
}
