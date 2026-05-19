import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { HeroJourney } from "@/components/HeroJourney";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--bg)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_400px_at_50%_60%,#E11D2E0F_0%,transparent_70%)]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-5xl sm:leading-[1.08]">
            Your dream Japanese car, imported without the guesswork.
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-[var(--text-secondary)]">
            Post your request, compare verified quotes, and track every step from Japan to your driveway.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
        </div>

        <div className="mx-auto mt-12 max-w-6xl md:mt-16">
          <HeroJourney className="md:aspect-[2/1]" />
        </div>
      </div>
    </section>
  );
}
