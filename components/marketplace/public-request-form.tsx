"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { addLocalSubmission } from "@/lib/marketplace/local-requests";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const schema = z
  .object({
    fullName: z.string().min(2, "Enter your full name"),
    email: z.string().email("Enter a valid email"),
    phone: z.string().min(8, "Enter a valid phone number").max(20),
    make: z.string().min(1, "Make is required"),
    model: z.string().min(1, "Model is required"),
    yearMin: z.string().optional(),
    yearMax: z.string().optional(),
    budgetGbp: z.string().optional(),
    mileagePreference: z.string().max(120).optional(),
    transmission: z.string().optional(),
    notes: z.string().max(4000).optional(),
  })
  .superRefine((val, ctx) => {
    const ymin = val.yearMin ? Number(val.yearMin) : undefined;
    const ymax = val.yearMax ? Number(val.yearMax) : undefined;
    if (ymin !== undefined && (Number.isNaN(ymin) || ymin < 1980)) {
      ctx.addIssue({ code: "custom", path: ["yearMin"], message: "Invalid year" });
    }
    if (ymax !== undefined && (Number.isNaN(ymax) || ymax < 1980)) {
      ctx.addIssue({ code: "custom", path: ["yearMax"], message: "Invalid year" });
    }
    if (ymin !== undefined && ymax !== undefined && ymin > ymax) {
      ctx.addIssue({ code: "custom", path: ["yearMax"], message: "Max year must be after min" });
    }
    if (val.budgetGbp) {
      const b = Number(val.budgetGbp);
      if (Number.isNaN(b) || b <= 0) {
        ctx.addIssue({ code: "custom", path: ["budgetGbp"], message: "Enter a valid budget" });
      }
    }
  });

type FormValues = z.infer<typeof schema>;

export function PublicRequestForm() {
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      make: "",
      model: "",
      yearMin: "",
      yearMax: "",
      budgetGbp: "",
      mileagePreference: "",
      transmission: undefined,
      notes: "",
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = form;

  function onSubmit(values: FormValues) {
    const entry = addLocalSubmission({
      fullName: values.fullName.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      make: values.make.trim(),
      model: values.model.trim(),
      yearMin: values.yearMin ? Number(values.yearMin) : undefined,
      yearMax: values.yearMax ? Number(values.yearMax) : undefined,
      budgetGbp: values.budgetGbp ? Number(values.budgetGbp) : undefined,
      mileagePreference: values.mileagePreference?.trim() || undefined,
      transmission: values.transmission || undefined,
      notes: values.notes?.trim() || undefined,
    });
    setSubmittedId(entry.id);
  }

  if (submittedId) {
    return (
      <Card className="mx-auto max-w-lg border-emerald-500/30 bg-emerald-500/5 text-center shadow-lg">
        <CardHeader>
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
            <CheckCircle2 className="size-8" />
          </div>
          <CardTitle className="mt-4 text-2xl text-white">Request submitted</CardTitle>
          <CardDescription className="text-zinc-400">
            Your brief is saved locally for this session. When we connect Supabase, verified dealers will be
            able to quote on it immediately.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 font-mono text-xs text-zinc-500">
            Reference: {submittedId}
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Link href="/buyer" className={cn(buttonVariants(), "inline-flex")}>
              View buyer dashboard
            </Link>
            <Button
              type="button"
              variant="outline"
              className="border-white/15 text-zinc-200"
              onClick={() => setSubmittedId(null)}
            >
              Submit another
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mx-auto max-w-2xl border-white/[0.08] bg-white/[0.02] shadow-xl shadow-black/20">
      <CardHeader>
        <CardTitle className="text-2xl text-white">Post a vehicle request</CardTitle>
        <CardDescription className="text-zinc-400">
          Tell us what you want to import. Dealers on Grade Five will compete with transparent quotes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="space-y-4">
            <legend className="text-sm font-medium text-zinc-300">Your details</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="fullName">Full name</Label>
                <Input id="fullName" {...register("fullName")} placeholder="Alex Taylor" />
                {errors.fullName ? (
                  <p className="text-sm text-destructive">{errors.fullName.message}</p>
                ) : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...register("email")} placeholder="you@example.com" />
                {errors.email ? <p className="text-sm text-destructive">{errors.email.message}</p> : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone number</Label>
                <Input id="phone" type="tel" {...register("phone")} placeholder="+44 7700 900000" />
                {errors.phone ? <p className="text-sm text-destructive">{errors.phone.message}</p> : null}
              </div>
            </div>
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="text-sm font-medium text-zinc-300">Vehicle</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="make">Vehicle make</Label>
                <Input id="make" {...register("make")} placeholder="Nissan" />
                {errors.make ? <p className="text-sm text-destructive">{errors.make.message}</p> : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="model">Vehicle model</Label>
                <Input id="model" {...register("model")} placeholder="Skyline GT-R" />
                {errors.model ? <p className="text-sm text-destructive">{errors.model.message}</p> : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="yearMin">Year from</Label>
                <Input id="yearMin" inputMode="numeric" {...register("yearMin")} placeholder="1999" />
                {errors.yearMin ? <p className="text-sm text-destructive">{errors.yearMin.message}</p> : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="yearMax">Year to</Label>
                <Input id="yearMax" inputMode="numeric" {...register("yearMax")} placeholder="2002" />
                {errors.yearMax ? <p className="text-sm text-destructive">{errors.yearMax.message}</p> : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="budgetGbp">Budget (GBP)</Label>
                <Input id="budgetGbp" inputMode="decimal" {...register("budgetGbp")} placeholder="35000" />
                {errors.budgetGbp ? (
                  <p className="text-sm text-destructive">{errors.budgetGbp.message}</p>
                ) : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="mileagePreference">Mileage preference</Label>
                <Input
                  id="mileagePreference"
                  {...register("mileagePreference")}
                  placeholder="Under 80,000 km"
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Transmission</Label>
                <Select
                  onValueChange={(v) =>
                    setValue("transmission", !v || v === "any" ? undefined : String(v))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="manual">Manual</SelectItem>
                    <SelectItem value="automatic">Automatic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="notes">Additional notes</Label>
                <Textarea
                  id="notes"
                  rows={4}
                  {...register("notes")}
                  placeholder="Colour preferences, trim, compliance questions…"
                />
              </div>
            </div>
          </fieldset>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting…" : "Submit request"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
