"use client";

import { m } from "framer-motion";

export function AnimatedCheckmark({ className }: { className?: string }) {
  return (
    <m.svg
      viewBox="0 0 52 52"
      className={className}
      initial="hidden"
      animate="visible"
      aria-hidden
    >
      <m.circle
        cx="26"
        cy="26"
        r="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-emerald-500/30"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: { pathLength: 1, opacity: 1 },
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />
      <m.path
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-emerald-400"
        d="M14 27l8 8 16-18"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: { pathLength: 1, opacity: 1 },
        }}
        transition={{ duration: 0.45, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      />
    </m.svg>
  );
}
