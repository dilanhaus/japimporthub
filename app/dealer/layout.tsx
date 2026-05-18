import { AppShell } from "@/components/marketplace/app-shell";
import { FileText, LayoutDashboard, Send, Star } from "lucide-react";

const nav = [
  { href: "/dealer", label: "Overview", icon: LayoutDashboard },
  { href: "/dealer/requests", label: "Browse requests", icon: FileText },
  { href: "/dealer/requests/req-1/quote", label: "Submit quotation", icon: Send },
  { href: "/dealer/profile", label: "Your profile", icon: Star },
];

export default function DealerLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      title="Dealer workspace"
      subtitle="Browse buyer requests and submit transparent quotations."
      badge="Dealer · MVP"
      nav={nav}
    >
      {children}
    </AppShell>
  );
}
