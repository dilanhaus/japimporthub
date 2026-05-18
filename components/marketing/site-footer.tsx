import Link from "next/link";

const links = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Contact", href: "#" },
  { label: "Dealer Applications", href: "/dealer" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.06] bg-zinc-950/90">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500/40 to-cyan-500/25 ring-1 ring-white/10">
                <span className="text-[10px] font-bold text-white">IB</span>
              </span>
              <span className="text-sm font-semibold text-white">ImportBase</span>
            </div>
            <p className="mt-2 text-sm font-medium text-zinc-400">Trusted Japanese Import Marketplace</p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-500">
              Connect UK buyers with verified Japanese exporters. Transparent quotes, secure messaging, and
              import guidance — end to end.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-3 text-sm text-zinc-400 sm:grid-cols-2">
            {links.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-14 border-t border-white/[0.06] pt-8 text-xs text-zinc-600">
          © {new Date().getFullYear()} ImportBase. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
