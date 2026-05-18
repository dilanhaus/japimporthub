import { Car, HandCoins, Search, Ship } from "lucide-react";

const steps = [
  {
    icon: Car,
    title: "Tell us the car you want",
    description:
      "Share make, model, budget, and must-haves. We refine the brief with you so nothing gets lost in translation.",
  },
  {
    icon: Search,
    title: "We source matching vehicles from Japan",
    description:
      "We search dealers and auction networks, vet condition and history, and present clear options with pricing context.",
  },
  {
    icon: HandCoins,
    title: "Secure with a deposit",
    description:
      "When you’re ready, lock in your import with a tracked deposit—you always know what’s paid and what’s outstanding.",
  },
  {
    icon: Ship,
    title: "We handle shipping and import",
    description:
      "From purchase to UK compliance, we coordinate shipping, documentation, and milestones you can follow online.",
  },
] as const;

export function LandingHowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 border-t border-white/[0.06] px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400/90">How it works</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Four simple steps</h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-400 sm:text-lg">
            No guesswork—just a clear path from your brief to your driveway, with specialists who do this every day.
          </p>
        </div>

        <ol className="mt-16 grid gap-6 md:grid-cols-2">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-transparent p-6 transition-colors hover:border-white/10"
            >
              <div className="flex items-start gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-indigo-500/10 text-indigo-300">
                  <step.icon className="size-5" strokeWidth={1.5} aria-hidden />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-zinc-500">Step {String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-1 text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{step.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
