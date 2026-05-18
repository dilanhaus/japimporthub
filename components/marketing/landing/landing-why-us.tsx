import { BadgeCheck, Eye, Headphones, LineChart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const reasons = [
  {
    icon: Eye,
    title: "Radical transparency",
    body: "Real auction data, photos, and landed estimates—so you decide with confidence, not hype.",
  },
  {
    icon: BadgeCheck,
    title: "Proven import process",
    body: "Structured checks from inspection to documentation, aligned with UK registration requirements.",
  },
  {
    icon: Headphones,
    title: "Dedicated guidance",
    body: "One thread for your request—no chasing DMs across platforms or losing context.",
  },
  {
    icon: LineChart,
    title: "Progress you can see",
    body: "Milestones in your dashboard mirror where your car actually is, updated as things move.",
  },
] as const;

export function LandingWhyUs() {
  return (
    <section className="relative px-4 py-24 sm:px-6">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_0%_50%,rgba(99,102,241,0.08),transparent)]"
      />
      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400/90">Why choose us</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Built for trust, not transaction pressure
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-400 sm:text-lg">
            We optimise for clarity and long-term reputation—because importing a car should feel exciting, not
            risky.
          </p>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:gap-6">
          {reasons.map((r) => (
            <Card
              key={r.title}
              className="border-white/[0.06] bg-white/[0.02] shadow-none backdrop-blur-sm transition-colors hover:border-white/10 hover:bg-white/[0.03]"
            >
              <CardContent className="flex gap-4 p-6">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-zinc-200">
                  <r.icon className="size-5" strokeWidth={1.5} aria-hidden />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{r.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{r.body}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
