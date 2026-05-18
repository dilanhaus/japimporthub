import { Award, Clock, ShieldCheck } from "lucide-react";

const stats = [
  { value: "100%", label: "Transparent pipeline", hint: "Every stage visible in your dashboard" },
  { value: "UK", label: "Compliance-first", hint: "Structured around registration & duty realities" },
  { value: "JP", label: "On-the-ground network", hint: "Dealer & auction relationships you can trust" },
] as const;

export function LandingTrust() {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] px-4 py-24 sm:px-6">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_100%,rgba(56,189,248,0.08),transparent)]"
      />
      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400/80">Trust & experience</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Specialists in Japanese imports, grounded in UK reality
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-400 sm:text-lg">
              We combine auction-floor judgement with import logistics experience—so you’re not learning the
              hard way on your first JDM purchase.
            </p>

            <ul className="mt-10 space-y-5">
              {[
                {
                  icon: ShieldCheck,
                  title: "Duty of care",
                  text: "We document condition, pricing context, and risk—before you commit.",
                },
                {
                  icon: Clock,
                  title: "Predictable communication",
                  text: "Expect clear updates at each milestone, not silence between port and driveway.",
                },
                {
                  icon: Award,
                  title: "Premium experience",
                  text: "The product is your car; the experience is calm, modern, and respectful of your time.",
                },
              ].map((item) => (
                <li key={item.title} className="flex gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-zinc-200">
                    <item.icon className="size-5" strokeWidth={1.5} aria-hidden />
                  </span>
                  <div>
                    <p className="font-medium text-white">{item.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-500">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 lg:gap-5">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-sm"
              >
                <p className="text-3xl font-semibold tabular-nums tracking-tight text-white">{s.value}</p>
                <p className="mt-2 text-sm font-medium text-zinc-300">{s.label}</p>
                <p className="mt-2 text-xs leading-relaxed text-zinc-500">{s.hint}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
