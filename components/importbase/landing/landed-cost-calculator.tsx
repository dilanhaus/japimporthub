"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LandedCostCalculator() {
  const [vehicle, setVehicle] = useState("28000");
  const [shipping, setShipping] = useState("1800");
  const [fees, setFees] = useState("2100");
  const [fx, setFx] = useState("1.02");

  const { subtotal, total } = useMemo(() => {
    const v = Number(vehicle) || 0;
    const s = Number(shipping) || 0;
    const f = Number(fees) || 0;
    const rate = Number(fx) || 1;
    const sub = v + s + f;
    return { subtotal: sub, total: Math.round(sub * rate) };
  }, [vehicle, shipping, fees, fx]);

  return (
    <div className="card-dark p-6">
      <h3 className="text-lg font-semibold text-[var(--text-primary)]">
        See your total landed cost—before you commit.
      </h3>
      <p className="mt-1 text-sm text-[var(--text-secondary)]">
        Rough estimate from vehicle price, shipping, and UK-side fees.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="calc-vehicle" className="text-[var(--text-secondary)]">
            Vehicle (¥ → £)
          </Label>
          <Input
            id="calc-vehicle"
            type="number"
            min={0}
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value)}
            className="border-neutral-800 bg-[var(--bg)] text-[var(--text-primary)]"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="calc-shipping" className="text-[var(--text-secondary)]">
            Shipping to UK port
          </Label>
          <Input
            id="calc-shipping"
            type="number"
            min={0}
            value={shipping}
            onChange={(e) => setShipping(e.target.value)}
            className="border-neutral-800 bg-[var(--bg)] text-[var(--text-primary)]"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="calc-fees" className="text-[var(--text-secondary)]">
            Agent &amp; compliance fees
          </Label>
          <Input
            id="calc-fees"
            type="number"
            min={0}
            value={fees}
            onChange={(e) => setFees(e.target.value)}
            className="border-neutral-800 bg-[var(--bg)] text-[var(--text-primary)]"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="calc-fx" className="text-[var(--text-secondary)]">
            FX buffer (multiplier)
          </Label>
          <Input
            id="calc-fx"
            type="number"
            min={1}
            step={0.01}
            value={fx}
            onChange={(e) => setFx(e.target.value)}
            className="border-neutral-800 bg-[var(--bg)] text-[var(--text-primary)]"
          />
          <p className="text-xs text-[var(--text-secondary)]">Typical range 1.01–1.05</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <span className="rounded-lg border border-neutral-800 bg-[var(--bg)] px-3 py-1.5 text-xs text-[var(--text-secondary)]">
          Subtotal{" "}
          <span className="font-mono text-[var(--text-primary)]">£{subtotal.toLocaleString()}</span>
        </span>
        <span className="rounded-lg border border-[var(--red)]/40 bg-[var(--red)]/10 px-3 py-1.5 text-xs text-[var(--text-primary)]">
          Total{" "}
          <span className="font-mono font-semibold text-[var(--red)]">£{total.toLocaleString()}</span>
        </span>
      </div>

      <p className="mt-4 text-xs text-[var(--text-secondary)]">
        Estimates include FX and port fees; finalized at purchase.
      </p>
    </div>
  );
}
