import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function LandingHero() {
  return (
    <section className="relative overflow-hidden px-4 pt-24 pb-20 sm:px-6 sm:pt-32 sm:pb-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.35),transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_100%_0%,rgba(56,189,248,0.12),transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,oklch(0.145_0_0)_55%,oklch(0.145_0_0)_100%)]"
      />

      <div className="relative mx-auto max-w-6xl">
        <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium tracking-wide text-zinc-400 backdrop-blur-sm">
          <span className="size-1.5 rounded-full bg-emerald-400/90 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
          UK buyers · Japan sourcing · Full import support
        </p>

        <h1 className="mt-8 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl md:leading-[1.08]">
          Import Your Dream Car From Japan{" "}
          <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            Without the Stress
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl">
          Get expert sourcing, transparent pricing, shipping support, and trusted guidance from experienced
          Japanese import specialists.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Link
            href="/signup"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-12 px-7 text-base shadow-lg shadow-indigo-500/20 transition-shadow hover:shadow-indigo-500/30",
            )}
          >
            Request A Vehicle
            <ArrowRight className="ml-2 size-4" />
          </Link>
          <a
            href="#how-it-works"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-12 border-white/15 bg-white/[0.03] px-7 text-base text-zinc-200 backdrop-blur-sm hover:bg-white/[0.06] hover:text-white",
            )}
          >
            Learn More
            <ChevronDown className="ml-2 size-4 opacity-70" />
          </a>
        </div>

        <dl className="mt-20 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Transparent quotes", value: "Auction sheets & landed costs upfront." },
            { label: "One dashboard", value: "Track every milestone from Japan to the UK." },
            { label: "Secure deposits", value: "Pay with confidence—receipts and status in-app." },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-sm"
            >
              <dt className="text-sm font-medium text-zinc-200">{item.label}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-zinc-500">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
