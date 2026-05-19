"use client";

import { useEffect, useState } from "react";
import { m } from "framer-motion";
import Image from "next/image";
import { Star } from "lucide-react";
import { VEHICLE_IMAGES } from "@/lib/marketplace/vehicle-images";
import { AnimatedCheckmark } from "./AnimatedCheckmark";
import { VEHICLE } from "./shared";

export function State07Delivered() {
  const [showRate, setShowRate] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowRate(true), 1500);
    return () => window.clearTimeout(timer);
  }, []);

  const image = VEHICLE_IMAGES.skylineR34;

  return (
    <div className="grid items-center gap-6 md:grid-cols-2 md:gap-8">
      {/* Left — confirmation */}
      <div className="flex flex-col items-center text-center md:items-start md:text-left">
        <AnimatedCheckmark className="size-16 sm:size-[4.5rem]" />
        <m.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="mt-5 text-lg font-semibold leading-snug text-[var(--text-primary)] sm:text-xl"
        >
          Your Nissan Skyline R33 has arrived
        </m.h3>
        <m.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.35 }}
          className="mt-2 text-sm text-[var(--text-secondary)]"
        >
          Estimated delivery · {VEHICLE.deliveryEta}
        </m.p>
        {showRate ? (
          <m.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mt-6 flex items-center justify-center gap-1.5 text-xs text-[var(--text-secondary)] md:justify-start"
          >
            <Star className="size-3.5 text-amber-500/80" aria-hidden />
            Rate your dealer
          </m.p>
        ) : null}
      </div>

      {/* Right — vehicle reveal */}
      <m.div
        initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ delay: 0.25, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <p className="mb-2 text-center text-[10px] font-medium tracking-wide text-[var(--text-secondary)] md:text-left">
          Nissan Skyline R33 · Grade 4.5 · 62,000 km
        </p>
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-neutral-800/90 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.9)] ring-1 ring-white/[0.06]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 100vw, 480px"
            className="object-cover"
            priority={false}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--bg)]/50 via-transparent to-transparent" />
        </div>
      </m.div>
    </div>
  );
}
