import { Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const placeholders = [
  {
    quote:
      "Placeholder testimonial — Swap in your first customer story here. Focus on clarity, timelines, and how you reduced their anxiety.",
    name: "Customer name",
    detail: "Vehicle imported · UK",
  },
  {
    quote:
      "Second quote slot — Great for highlighting communication style or a specific import that exceeded expectations.",
    name: "Customer name",
    detail: "First-time JDM buyer",
  },
  {
    quote:
      "Third quote slot — Ideal for mentioning transparency on landed cost or auction sheet walkthroughs.",
    name: "Customer name",
    detail: "Enthusiast import",
  },
] as const;

export function LandingTestimonials() {
  return (
    <section className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400/90">Testimonials</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            What buyers say—coming soon
          </h2>
          <p className="mt-4 text-base text-zinc-400">
            We&apos;re collecting stories from early customers. These cards are ready for real quotes whenever you
            are.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {placeholders.map((t, i) => (
            <Card
              key={`testimonial-${i}`}
              className="border-white/[0.06] border-dashed bg-white/[0.02] shadow-none"
            >
              <CardContent className="flex h-full flex-col p-6">
                <Quote className="size-8 text-indigo-400/40" aria-hidden />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-zinc-400">&ldquo;{t.quote}&rdquo;</blockquote>
                <footer className="mt-6 border-t border-white/[0.06] pt-4">
                  <p className="text-sm font-medium text-zinc-300">{t.name}</p>
                  <p className="text-xs text-zinc-500">{t.detail}</p>
                </footer>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
