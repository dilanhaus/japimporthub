import Link from "next/link";
import { redirect } from "next/navigation";
import { Inbox, LayoutDashboard } from "lucide-react";
import { getSessionUser } from "@/lib/auth/session";
import { UserNav } from "@/components/dashboard/user-nav";
import { Separator } from "@/components/ui/separator";

const links = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/requests", label: "Requests", icon: Inbox },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSessionUser();
  if (!session) {
    redirect("/login");
  }
  if (session.profile?.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border/80 bg-background/95 py-6 pl-6 pr-4 lg:flex">
        <Link href="/admin" className="text-sm font-semibold tracking-tight text-foreground">
          Grade Five · Admin
        </Link>
        <p className="mt-1 text-xs text-muted-foreground">Operations</p>
        <Separator className="my-6" />
        <nav className="flex flex-col gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <l.icon className="size-4" />
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto pt-8">
          <Link href="/dashboard" className="text-xs font-medium text-muted-foreground hover:text-foreground">
            ← Customer view
          </Link>
          <div className="mt-4">
            <UserNav email={session.email} name={session.profile?.full_name ?? null} />
          </div>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-border/80 bg-background/90 px-4 py-3 backdrop-blur lg:hidden">
          <Link href="/admin" className="text-sm font-semibold">
            Admin
          </Link>
          <UserNav email={session.email} name={session.profile?.full_name ?? null} />
        </header>
        <main className="flex-1 p-4 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
