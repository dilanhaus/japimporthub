import { HorizontalSteps } from "@/components/importbase/landing/horizontal-steps";
import { SectionHeading } from "@/components/importbase/section-heading";

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 border-t border-neutral-800 bg-[var(--surface)] px-4 py-24 sm:px-6"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Process"
          title="How GradeFive Works"
          description="A marketplace built for clarity — from your first post to your car on UK soil."
        />
        <HorizontalSteps />
      </div>
    </section>
  );
}
