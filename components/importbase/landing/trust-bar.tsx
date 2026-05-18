import { MessageSquareLock, Receipt, ShieldCheck, Users } from "lucide-react";

const items = [
  { icon: Users, label: "Verified Japanese dealer network" },
  { icon: Receipt, label: "Transparent quotations" },
  { icon: MessageSquareLock, label: "Secure communication" },
  { icon: ShieldCheck, label: "Import guidance from start to finish" },
] as const;

export function TrustBarSection() {
  return (
    <section className="border-y border-white/[0.06] bg-white/[0.02] px-4 py-10 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-zinc-300">
              <item.icon className="size-5" strokeWidth={1.5} aria-hidden />
            </div>
            <p className="text-sm font-medium leading-snug text-zinc-300">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
