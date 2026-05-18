import Link from "next/link";

const links = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Contact", href: "#" },
  { label: "Dealer Applications", href: "/dealer" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-neutral-800 bg-[var(--surface)]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex size-8 items-center justify-center rounded-lg bg-[var(--red)]">
                <span className="text-[10px] font-bold text-white">G5</span>
              </span>
              <span className="text-sm font-semibold text-[var(--text-primary)]">GradeFive</span>
            </div>
            <p className="mt-2 text-sm font-medium text-[var(--text-secondary)]">
              Trusted Japanese Import Marketplace
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--text-secondary)]">
              Connect UK buyers with verified Japanese exporters. Transparent quotes, secure messaging, and
              import guidance — end to end.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-3 text-sm text-[var(--text-secondary)]">
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-[var(--red)] hover:underline hover:underline-offset-4"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-10 text-xs leading-relaxed text-[var(--text-secondary)]">
          UK buyers remain the Importer of Record unless your dealer quote includes full IOR services. Confirm
          IOR, duty, and VAT responsibilities in writing before you commit.
        </p>
        <p className="mt-6 border-t border-neutral-800 pt-8 text-xs text-[var(--text-secondary)]">
          © {new Date().getFullYear()} GradeFive. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
