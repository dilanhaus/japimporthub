import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function LandingCta() {
  return (
    <section className="px-4 pb-24 pt-4 sm:px-6">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-indigo-500/15 via-white/[0.04] to-cyan-500/10 px-6 py-16 sm:px-12 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-indigo-500/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-16 size-80 rounded-full bg-cyan-500/15 blur-3xl"
        />

        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Start your import brief</h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-400 sm:text-lg">
            Create an account, tell us what you want, and we&apos;ll respond with sourcing options or questions—no
            obligation, no spam.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/signup"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-12 min-w-[200px] px-8 text-base shadow-lg shadow-indigo-500/25",
              )}
            >
              Request A Vehicle
              <ArrowRight className="ml-2 size-4" />
            </Link>
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "ghost", size: "lg" }),
                "h-12 text-zinc-400 hover:bg-white/[0.05] hover:text-white",
              )}
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
