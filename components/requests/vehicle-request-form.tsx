"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { createVehicleRequest } from "@/actions/vehicle-requests";
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

const formSchema = z
  .object({
    make: z.string().min(1, "Required").max(120),
    model: z.string().min(1, "Required").max(120),
    variant: z.string().max(160).optional(),
    yearMin: z.string().optional(),
    yearMax: z.string().optional(),
    budgetMaxGbp: z.string().optional(),
    mileageMaxKm: z.string().optional(),
    transmission: z.string().optional(),
    colorPreferences: z.string().max(500).optional(),
    destinationPort: z.string().max(120).optional(),
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
      ctx.addIssue({ code: "custom", path: ["yearMax"], message: "Must be after min year" });
    }
  });

type FormValues = z.infer<typeof formSchema>;

export function VehicleRequestForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      make: "",
      model: "",
      variant: "",
      yearMin: "",
      yearMax: "",
      budgetMaxGbp: "",
      mileageMaxKm: "",
      transmission: undefined,
      colorPreferences: "",
      destinationPort: "UK",
      notes: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setSubmitting(true);
    const res = await createVehicleRequest({
      make: values.make,
      model: values.model,
      variant: values.variant || null,
      yearMin: values.yearMin ? Number(values.yearMin) : null,
      yearMax: values.yearMax ? Number(values.yearMax) : null,
      budgetMaxGbp: values.budgetMaxGbp ? Number(values.budgetMaxGbp) : null,
      mileageMaxKm: values.mileageMaxKm ? Number(values.mileageMaxKm) : null,
      transmission: values.transmission || null,
      colorPreferences: values.colorPreferences || null,
      destinationPort: values.destinationPort || "UK",
      notes: values.notes || null,
    });
    setSubmitting(false);

    if (res.ok) {
      toast.success("Request submitted. We’ll review it shortly.");
      router.push(`/dashboard/requests/${res.requestId}`);
      return;
    }

    toast.error(res.error);
    if (res.fieldErrors) {
      Object.entries(res.fieldErrors).forEach(([key, messages]) => {
        const msg = messages?.[0];
        if (msg) {
          form.setError(key as keyof FormValues, { message: msg });
        }
      });
    }
  }

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = form;

  const transmission = useWatch({ control, name: "transmission" }) ?? "";

  return (
    <Card className="mx-auto max-w-3xl border-border/80 shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl tracking-tight">Vehicle request</CardTitle>
        <CardDescription>
          Share the clearest brief you can. We&apos;ll come back with sourcing options or questions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="make">Make</Label>
              <Input id="make" placeholder="Nissan" {...register("make")} />
              {errors.make ? <p className="text-sm text-destructive">{errors.make.message}</p> : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Input id="model" placeholder="Skyline GT-R" {...register("model")} />
              {errors.model ? <p className="text-sm text-destructive">{errors.model.message}</p> : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="variant">Trim / variant (optional)</Label>
              <Input id="variant" placeholder="V-Spec II · Nismo …" {...register("variant")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="yearMin">Year from</Label>
              <Input id="yearMin" inputMode="numeric" placeholder="1999" {...register("yearMin")} />
              {errors.yearMin ? <p className="text-sm text-destructive">{errors.yearMin.message}</p> : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="yearMax">Year to</Label>
              <Input id="yearMax" inputMode="numeric" placeholder="2002" {...register("yearMax")} />
              {errors.yearMax ? <p className="text-sm text-destructive">{errors.yearMax.message}</p> : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="budgetMaxGbp">Max budget (GBP, optional)</Label>
              <Input id="budgetMaxGbp" inputMode="decimal" placeholder="45000" {...register("budgetMaxGbp")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mileageMaxKm">Max mileage (km, optional)</Label>
              <Input id="mileageMaxKm" inputMode="numeric" placeholder="80000" {...register("mileageMaxKm")} />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>Transmission (optional)</Label>
              <Select
                value={transmission || "any"}
                onValueChange={(v) =>
                  setValue("transmission", !v || v === "any" ? undefined : v)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="manual">Manual</SelectItem>
                  <SelectItem value="automatic">Automatic</SelectItem>
                  <SelectItem value="cvt">CVT</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="colorPreferences">Colour preferences</Label>
              <Input id="colorPreferences" placeholder="Midnight purple II, no silver…" {...register("colorPreferences")} />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="destinationPort">UK destination / port preference</Label>
              <Input id="destinationPort" placeholder="Southampton, Felixstowe…" {...register("destinationPort")} />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                rows={5}
                placeholder="Must-haves, compliance questions, prior import experience…"
                {...register("notes")}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button type="submit" disabled={submitting}>
              {submitting ? "Submitting…" : "Submit request"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()} disabled={submitting}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
