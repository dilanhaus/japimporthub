import type { LucideIcon } from "lucide-react";
import {
  FileText,
  Lock,
  MapPin,
  MessageSquare,
  Receipt,
  ShieldCheck,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const usps: {
  icon: LucideIcon;
  title: string;
  copy: string;
}[] = [
  {
    icon: ShieldCheck,
    title: "Verified dealers only",
    copy: "Every exporter on Grade Five is reviewed and approved before they can respond to a single request. No anonymous brokers, no unverified middlemen.",
  },
  {
    icon: Receipt,
    title: "Full landed cost transparency",
    copy: "Quotes show vehicle price, shipping, customs, and fees as separate line items. You know exactly what you're paying before you commit to anything.",
  },
  {
    icon: MessageSquare,
    title: "Direct dealer communication",
    copy: "Talk to exporters directly through the platform. Ask questions, request documents, and negotiate — all in one auditable thread.",
  },
  {
    icon: Lock,
    title: "Deposit protection",
    copy: "Deposits are held securely and only released to the dealer once you confirm your vehicle has arrived as described. Your money is protected at every stage.",
  },
  {
    icon: FileText,
    title: "Translated documentation",
    copy: "Auction sheets, inspection reports, and export certificates are translated and verified. You can read exactly what the Japanese auction recorded about your car.",
  },
  {
    icon: MapPin,
    title: "End-to-end tracking",
    copy: "Track your vehicle from auction win to UK delivery. Milestone updates are logged on-platform so you always know where your car is.",
  },
];

export function WhyGradeFiveSection() {
  return (
    <section className="border-y border-neutral-800 bg-[#0e1014] px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Why Grade Five
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
            The smarter way to import from Japan
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
            We built Grade Five because importing a car from Japan shouldn&apos;t require months of
            research, blind trust, and crossed fingers.
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {usps.map((usp) => (
            <li key={usp.title} className="flex">
              <Card className="card-dark flex w-full flex-col border-neutral-800 shadow-none">
                <CardContent className="flex flex-1 flex-col p-6 text-left">
                  <usp.icon
                    className="size-5 shrink-0 text-[var(--red)]/70"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <h3 className="mt-4 text-base font-semibold text-[var(--text-primary)]">
                    {usp.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {usp.copy}
                  </p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
