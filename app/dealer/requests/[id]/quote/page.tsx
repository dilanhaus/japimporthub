"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { getRequestById } from "@/lib/marketplace/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2 } from "lucide-react";

export default function DealerSubmitQuotePage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "req-1";
  const request = getRequestById(id) ?? getRequestById("req-1");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <Card className="mx-auto max-w-lg border-emerald-500/30 bg-emerald-500/5 text-center">
        <CardHeader>
          <CheckCircle2 className="mx-auto size-10 text-emerald-600" />
          <CardTitle className="mt-4">Quotation submitted</CardTitle>
          <CardDescription>
            Stored in local state for this MVP. The buyer will see your offer in their comparison view when
            Supabase is connected.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="mx-auto max-w-2xl">
      <CardHeader>
        <CardTitle>Submit quotation</CardTitle>
        <CardDescription>
          {request?.title ?? "Vehicle request"} — provide transparent landed pricing for the buyer.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="vehicle">Vehicle price (£)</Label>
              <Input id="vehicle" type="number" required placeholder="31200" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="shipping">Shipping (£)</Label>
              <Input id="shipping" type="number" required placeholder="1800" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fees">Fees (£)</Label>
              <Input id="fees" type="number" required placeholder="2100" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="eta">ETA (weeks)</Label>
            <Input id="eta" type="number" required placeholder="10" className="max-w-[120px]" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message to buyer</Label>
            <Textarea
              id="message"
              required
              rows={4}
              placeholder="Explain sourcing approach, inspection, and what's included…"
            />
          </div>
          <Button type="submit" className="w-full">
            Submit quotation
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
