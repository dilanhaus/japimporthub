import { MessageSquareLock, Receipt, ShieldCheck, Users } from "lucide-react";

const items = [
  { icon: Users, label: "Verified exporters" },
  { icon: Receipt, label: "Escrow options" },
  { icon: MessageSquareLock, label: "Transparent landed costs" },
  { icon: ShieldCheck, label: "Import guidance end-to-end" },
] as const;

export function TrustBarSection() {
  return (
    <section className="border-y border-neutral-800 bg-[var(--surface)]/50 px-4 py-10 sm:px-6">
      <p className="mx-auto mb-8 max-w-6xl text-center text-xs font-medium text-[var(--text-secondary)]">
        Verified exporters • Escrow options • Transparent landed costs
      </p>
      <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-3 rounded-xl border border-neutral-800 bg-[var(--bg)] px-4 py-3"
          >
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-neutral-800 text-[var(--text-secondary)]">
              <item.icon className="size-4" strokeWidth={1.5} aria-hidden />
            </div>
            <p className="text-sm font-medium leading-snug text-[var(--text-primary)]">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
