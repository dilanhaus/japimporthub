"use client";

export const STAGE_COUNT = 4;

export const STAGE_META = [
  {
    title: "Tell us what you want",
    subtitle: "Your spec. Your budget. Your terms.",
  },
  {
    title: "Verified dealers respond",
    subtitle: "Compare real quotes from trusted exporters.",
  },
  {
    title: "We handle every step",
    subtitle: "Auction. Shipping. Customs. Sorted.",
  },
  {
    title: "Straight to your driveway",
    subtitle: "Your Japanese car, delivered to the UK.",
  },
] as const;

export const fadeSlide = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
};

export function MonoValue({ children }: { children: React.ReactNode }) {
  return <span className="font-mono text-[var(--text-primary)]">{children}</span>;
}

/** Top padding so scene content clears the stage headline overlay */
export const STAGE_SCENE_PT = "pt-28 md:pt-32";
