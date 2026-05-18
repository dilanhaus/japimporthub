import { SectionHeading } from "@/components/importbase/section-heading";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "How pricing works",
    a: "Dealers submit itemised quotes showing vehicle price, shipping, and UK-side fees. You compare total landed cost—not headline auction price alone.",
  },
  {
    q: "How escrow/deposits work",
    a: "Deposits and staged payments are agreed in your quote. Escrow options protect both parties when enabled for your deal tier.",
  },
  {
    q: "Duty and VAT explained",
    a: "Import duty and VAT are calculated on the vehicle's customs value at UK entry. Your dealer quote should show these as separate line items where applicable.",
  },
  {
    q: "Typical timelines",
    a: "Sourcing and auction: 1–3 weeks. Shipping: 3–6 weeks. UK customs and registration: 1–2 weeks. Door-to-door delivery adds 3–7 days.",
  },
] as const;

export function FaqSection({ className }: { className?: string }) {
  return (
    <section className={cn("border-t border-neutral-800 px-4 py-20 sm:px-6", className)}>
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="FAQs"
          title="Answers before you commit"
          description="Clear guidance on pricing, payments, and timelines."
          align="center"
          className="mx-auto"
        />
        <div className="mt-10 space-y-2">
          {FAQS.map((item) => (
            <details
              key={item.q}
              className="group card-dark overflow-hidden [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-medium text-[var(--text-primary)] transition-colors hover:text-[var(--red)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]">
                {item.q}
                <span
                  className="text-[var(--text-secondary)] transition-transform group-open:rotate-45"
                  aria-hidden
                >
                  +
                </span>
              </summary>
              <p className="border-t border-neutral-800 px-5 pb-4 pt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
