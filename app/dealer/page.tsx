import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function DealerHomePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Welcome, verified exporter</CardTitle>
          <CardDescription>
            GradeFive connects you with UK buyers posting structured vehicle requests. Submit itemised quotes
            and build your reputation on-platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/dealer/requests" className={cn(buttonVariants())}>
            Browse open requests
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
