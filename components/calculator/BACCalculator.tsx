"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { BAC_LEVEL_CONFIG, calculateBAC } from "@/lib/bac";
import { DRINK_TYPES, LEGAL_LIMITS } from "@/lib/constants";
import type { BACResult, LegalLimit, Sex, WeightUnit } from "@/types/calculator";

export default function BACCalculator() {
  const [sex, setSex] = useState<Sex>("male");
  const [unit, setUnit] = useState<WeightUnit>("lbs");
  const [weight, setWeight] = useState("");
  const [drinks, setDrinks] = useState("");
  const [hours, setHours] = useState("");
  const [drinkTypeId, setDrinkTypeId] = useState("beer");
  const [countryId, setCountryId] = useState("us");
  const [result, setResult] = useState<BACResult | null>(null);
  const [error, setError] = useState("");

  const selectedDrink = DRINK_TYPES.find((drink) => drink.id === drinkTypeId)!;
  const selectedCountry =
    LEGAL_LIMITS.find((country) => country.id === countryId) ?? LEGAL_LIMITS[0];

  function handleCalculate() {
    const parsedWeight = Number.parseFloat(weight);
    const parsedDrinks = Number.parseFloat(drinks);
    const parsedHours = Number.parseFloat(hours) || 0;

    if (!parsedWeight || parsedWeight <= 0) {
      setError("Please enter your body weight.");
      return;
    }

    if (Number.isNaN(parsedDrinks) || parsedDrinks < 0) {
      setError("Please enter the number of drinks.");
      return;
    }

    const weightLbs = unit === "kg" ? parsedWeight * 2.20462 : parsedWeight;

    setError("");
    setResult(
      calculateBAC({
        sex,
        weightLbs,
        drinks: parsedDrinks,
        alcoholOzPerDrink: selectedDrink.alcoholOz,
        hoursElapsed: parsedHours,
      }),
    );
  }

  const config = result ? BAC_LEVEL_CONFIG[result.level] : null;
  const barPct = result ? Math.min((result.bac / 0.3) * 100, 100) : 0;
  const isWithinSelectedLimit =
    result ? result.bac <= selectedCountry.limitPercent : false;
  const legalStatusText = getLegalStatusText(selectedCountry, isWithinSelectedLimit);

  return (
    <section id="calculator" className="border-b border-border py-16">
      <div className="mx-auto w-full max-w-5xl px-6">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent">
          Interactive Tool
        </p>
        <h2 className="mb-2 text-3xl md:text-4xl">Estimate Your BAC</h2>
        <p className="mb-8 max-w-2xl text-sm leading-relaxed text-muted">
          Enter your details below. This calculator applies the Widmark formula
          to estimate blood alcohol content and approximate time to sober.
        </p>

        <div className="overflow-hidden rounded-sm border border-border bg-card shadow-[0_30px_120px_rgba(0,0,0,0.28)]">
          <div className="flex items-center gap-2 border-b border-border bg-surface px-6 py-4">
            <span className="h-2 w-2 rounded-full bg-red-500" />
            <span className="h-2 w-2 rounded-full bg-yellow-400" />
            <span className="h-2 w-2 rounded-full bg-green-400" />
            <span className="ml-2 font-mono text-xs text-muted">
              bac-calculator.com - Widmark Formula Engine
            </span>
          </div>

          <div className="grid grid-cols-1 gap-5 p-7 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                Biological Sex
              </label>
              <div className="flex gap-3">
                {(["male", "female"] as const).map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setSex(value)}
                    className={`flex-1 rounded-sm border py-2.5 font-mono text-xs uppercase transition-all ${
                      sex === value
                        ? "border-accent bg-accent/5 text-accent"
                        : "border-border text-muted hover:border-white/30"
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                Weight Unit
              </label>
              <div className="flex gap-3">
                {(["lbs", "kg"] as const).map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setUnit(value)}
                    className={`flex-1 rounded-sm border py-2.5 font-mono text-xs uppercase transition-all ${
                      unit === value
                        ? "border-accent bg-accent/5 text-accent"
                        : "border-border text-muted hover:border-white/30"
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                Body Weight
              </label>
              <input
                type="number"
                value={weight}
                onChange={(event) => setWeight(event.target.value)}
                placeholder={unit === "lbs" ? "e.g. 160" : "e.g. 72"}
                min="1"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                Hours Drinking
              </label>
              <input
                type="number"
                value={hours}
                onChange={(event) => setHours(event.target.value)}
                placeholder="e.g. 2"
                min="0"
                step="0.5"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                Number of Drinks
              </label>
              <input
                type="number"
                value={drinks}
                onChange={(event) => setDrinks(event.target.value)}
                placeholder="e.g. 3"
                min="0"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                Drink Type
              </label>
              <select
                value={drinkTypeId}
                onChange={(event) => setDrinkTypeId(event.target.value)}
              >
                {DRINK_TYPES.map((drink) => (
                  <option key={drink.id} value={drink.id}>
                    {drink.label} ({drink.description})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2 sm:col-span-2">
              <label className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                Country / Legal Threshold
              </label>
              <select
                value={countryId}
                onChange={(event) => setCountryId(event.target.value)}
              >
                {LEGAL_LIMITS.map((country) => (
                  <option key={country.id} value={country.id}>
                    {formatCountryOption(country)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <AnimatePresence>
            {result && config ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                className="mx-7 mb-5 rounded-sm border border-border bg-surface p-6"
              >
                <div className="mb-3 flex items-baseline gap-2">
                  <motion.span
                    key={result.bac}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="font-mono text-5xl font-semibold leading-none"
                    style={{ color: config.color }}
                  >
                    {result.bac.toFixed(3)}%
                  </motion.span>
                  <span className="font-mono text-sm text-muted">BAC (g/dL)</span>
                </div>

                <span
                  className="mb-4 inline-block rounded-sm border px-2.5 py-1 font-mono text-xs font-semibold uppercase tracking-[0.2em]"
                  style={{
                    color: config.color,
                    background: config.bgColor,
                    borderColor: `${config.color}40`,
                  }}
                >
                  {config.label}
                </span>

                <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-border">
                  <motion.div
                    className="h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${barPct}%` }}
                    transition={{ duration: 0.8 }}
                    style={{ background: config.color }}
                  />
                </div>

                <div className="font-mono text-xs leading-loose text-muted">
                  <span className="font-semibold text-text">Time to sober:</span>{" "}
                  about {result.soberInHours}h
                  {" | "}
                  <span className="font-semibold text-text">
                    {selectedCountry.country} limit:
                  </span>{" "}
                  {legalStatusText}
                  <div className="mt-2 text-muted/80">
                    Selected threshold: {formatPercent(selectedCountry.limitPercent)}
                    {" · "}
                    {selectedCountry.notes}
                  </div>
                  <div className="mt-2 text-muted/80">{config.description}</div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {error ? (
            <p className="mx-7 mb-4 font-mono text-xs text-danger">{error}</p>
          ) : null}

          <div className="px-7 pb-7">
            <button
              type="button"
              onClick={handleCalculate}
              className="w-full rounded-sm bg-accent py-4 font-mono text-sm font-semibold uppercase tracking-[0.2em] text-black transition-opacity hover:opacity-90"
            >
              Calculate My BAC
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function formatPercent(value: number) {
  if (value === 0) {
    return "Zero";
  }

  return `${(value * 100).toFixed(value < 0.1 ? 1 : 0)}%`;
}

function formatCountryOption(country: LegalLimit) {
  return `${country.country} (${formatPercent(country.limitPercent)}) ${country.nativeName} (${formatPercent(country.limitPercent)})`;
}

function getLegalStatusText(country: LegalLimit, isWithinSelectedLimit: boolean) {
  if (country.limitPercent === 0) {
    return isWithinSelectedLimit ? "at zero tolerance" : "above zero tolerance";
  }

  return isWithinSelectedLimit
    ? `below ${formatPercent(country.limitPercent)}`
    : `above ${formatPercent(country.limitPercent)}`;
}
