import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import { HeroMedia } from "@/components/importbase/landing/hero-media";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section className="relative isolate min-h-[92vh] overflow-hidden bg-[var(--bg)]">
      {/* Option B: CSS gradient cue (desktop) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden md:block md:before:absolute md:before:inset-0 md:before:content-[''] md:before:bg-[radial-gradient(1200px_600px_at_85%_40%,#E11D2E14_0%,transparent_60%),linear-gradient(180deg,transparent_0%,#E11D2E0A_100%)] md:before:mix-blend-screen"
      />

      {/* Red-tinted gradient mask (desktop+) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden bg-gradient-to-l from-[#E11D2E1A] via-transparent to-transparent md:block"
      />

      {/* Option A: car silhouette — hidden on mobile */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden md:block"
      >
        <Image
          src="/hero-car-silhouette.svg"
          alt=""
          width={1200}
          height={500}
          className="absolute right-0 top-1/2 h-auto max-h-[min(70vh,520px)] w-[min(72vw,900px)] -translate-y-1/2 object-contain object-center opacity-[0.07] 2xl:opacity-10"
          priority={false}
        />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_80%_20%,rgba(225,29,46,0.12),transparent_55%)]"
      />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-4 pt-28 pb-16 sm:px-6 sm:pt-32 lg:min-h-[88vh] lg:grid-cols-2 lg:gap-12 lg:pb-20">
        <div className="relative flex flex-col justify-center [text-shadow:0_1px_24px_rgba(11,13,16,0.85)]">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-neutral-800 bg-[var(--surface)]/90 px-3 py-1 text-xs font-medium text-[var(--text-secondary)] backdrop-blur-sm">
            <span className="size-1.5 rounded-full bg-[var(--red)] shadow-[0_0_8px_rgba(225,29,46,0.6)]" />
            Skyline · Supra · NSX — verified Japanese dealers
          </p>

          <h1 className="mt-8 max-w-xl text-4xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-[3.25rem] lg:leading-[1.06]">
            Import the exact Japanese car you want—safely.
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-[var(--text-secondary)] sm:text-xl">
            Post your request, compare verified quotes, and track sourcing, shipping, and customs with
            total cost clarity.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href="/request"
              className={cn(buttonVariants({ variant: "primary", size: "lg" }), "h-12 px-7 text-base")}
            >
              Start your request
              <ArrowRight className="ml-2 size-4" />
            </Link>
            <a
              href="#how-it-works"
              className={cn(buttonVariants({ variant: "ghostDark", size: "lg" }), "h-12 px-7 text-base")}
            >
              See how it works
              <ChevronDown className="ml-2 size-4 opacity-70" />
            </a>
          </div>

          <div className="mt-12 hidden flex-wrap gap-2 lg:flex">
            {["R34 Skyline", "MK4 Supra", "NSX", "RX-7"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-neutral-800 bg-[var(--surface)]/90 px-3 py-1 text-xs text-[var(--text-secondary)] backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="relative w-full lg:justify-self-end">
          <HeroMedia className="max-w-xl lg:ml-auto" />
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-32 bg-gradient-to-t from-[var(--bg)] to-transparent"
      />
    </section>
  );
}
