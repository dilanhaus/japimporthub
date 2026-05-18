"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatedStepper } from "@/components/AnimatedStepper";
import { cn } from "@/lib/utils";

function StepPanel({
  title,
  lines,
  highlight,
}: {
  title: string;
  lines: string[];
  highlight?: string;
}) {
  return (
    <div className="card-dark flex h-full flex-col p-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
        {title}
      </p>
      <ul className="mt-3 space-y-2 text-sm text-[var(--text-primary)]">
        {lines.map((line) => (
          <li key={line} className="flex items-center gap-2 rounded-lg border border-neutral-800 bg-[var(--bg)]/80 px-3 py-2">
            <span className="size-1.5 shrink-0 rounded-full bg-[var(--red)]" aria-hidden />
            {line}
          </li>
        ))}
      </ul>
      {highlight ? (
        <p className="mt-auto pt-4 text-xs font-medium text-[var(--red)]">{highlight}</p>
      ) : null}
    </div>
  );
}

const STEPPER_STEPS = [
  {
    id: "post",
    label: "Post request",
    content: (
      <StepPanel
        title="New import request"
        lines={["Nissan Skyline GT-R R34", "Budget £35,000 · 1999–2002", "Manual · UK delivery"]}
        highlight="Published to verified exporters"
      />
    ),
  },
  {
    id: "quotes",
    label: "Verified quotes",
    content: (
      <StepPanel
        title="7 quotes received"
        lines={[
          "Tokyo Export — £35,100 landed",
          "Osaka Auto — £36,400 landed",
          "Yokohama Motors — £34,000 landed",
        ]}
        highlight="Compare total landed cost side-by-side"
      />
    ),
  },
  {
    id: "track",
    label: "Track milestones",
    content: (
      <StepPanel
        title="Import milestones"
        lines={["Auction won · 12 May", "On vessel · ETA 3 weeks", "Landed UK · Customs cleared"]}
        highlight="Documents & messaging on-platform"
      />
    ),
  },
];

type HeroMediaProps = {
  className?: string;
};

export function HeroMedia({ className }: HeroMediaProps) {
  const [useVideo, setUseVideo] = useState(true);
  const [videoReady, setVideoReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch("/hero-loop.webm", { method: "HEAD" })
      .then((r) => {
        if (!cancelled) setUseVideo(r.ok);
      })
      .catch(() => {
        if (!cancelled) setUseVideo(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const showVideo = useVideo && !reducedMotion;

  return (
    <div
      className={cn(
        "relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-neutral-800 bg-[var(--surface)] shadow-2xl shadow-black/50 ring-1 ring-[var(--red)]/10",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,rgba(225,29,46,0.15),transparent_70%)] blur-2xl"
      />

      {showVideo ? (
        <video
          className={cn(
            "absolute inset-0 size-full object-cover transition-opacity duration-500",
            videoReady ? "opacity-100" : "opacity-0",
          )}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster="/hero-poster.jpg"
          onCanPlay={() => setVideoReady(true)}
          onError={() => setUseVideo(false)}
        >
          <source src="/hero-loop.webm" type="video/webm" />
        </video>
      ) : null}

      {(!showVideo || !videoReady) && (
        <div
          className={cn(
            "absolute inset-0",
            showVideo && !videoReady && "opacity-0",
          )}
        >
          {reducedMotion ? (
            <Image
              src="/hero-poster.jpg"
              alt=""
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 600px"
              className="object-cover"
            />
          ) : (
            <AnimatedStepper steps={STEPPER_STEPS} className="h-full bg-[var(--bg)]" />
          )}
        </div>
      )}

      {!showVideo && reducedMotion ? null : (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[var(--bg)] to-transparent" />
      )}
    </div>
  );
}
