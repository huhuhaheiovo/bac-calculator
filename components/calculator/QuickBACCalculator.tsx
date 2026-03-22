"use client";

import { Mars, Minus, Plus, Venus } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { BAC_LEVEL_CONFIG, calculateBAC } from "@/lib/bac";
import type { Locale } from "@/i18n/config";
import { Link } from "@/i18n/navigation";
import { DRINK_TYPES } from "@/lib/constants";
import type { BACResult, DrinkType, Sex, WeightUnit } from "@/types/calculator";

const QUICK_DRINK_TYPES = DRINK_TYPES.filter((drink) =>
  ["beer", "wine", "shot"].includes(drink.id),
);

const DEFAULT_WEIGHT_LBS = 160;
export default function QuickBACCalculator() {
  const locale = useLocale() as Locale;
  const t = useTranslations("quickCalculator");
  const calculatorT = useTranslations("calculator");
  const [drinkTypeId, setDrinkTypeId] = useState<DrinkType["id"]>("beer");
  const [drinks, setDrinks] = useState(2);
  const [sex, setSex] = useState<Sex>("male");
  const [weightUnit, setWeightUnit] = useState<WeightUnit>("lbs");
  const [weight, setWeight] = useState(DEFAULT_WEIGHT_LBS);
  const [hours, setHours] = useState(1);
  const [result, setResult] = useState<BACResult | null>(null);

  const selectedDrink =
    QUICK_DRINK_TYPES.find((drink) => drink.id === drinkTypeId) ?? QUICK_DRINK_TYPES[0];
  const config = result ? BAC_LEVEL_CONFIG[result.level] : null;

  function handleCalculate() {
    const weightLbs = weightUnit === "kg" ? weight * 2.20462 : weight;

    setResult(
      calculateBAC({
        sex,
        weightLbs,
        drinks,
        alcoholOzPerDrink: selectedDrink.alcoholOz,
        hoursElapsed: hours,
        legalLimitPercent: locale === "zh" ? 0.02 : 0.08,
      }),
    );
  }

  function handleWeightUnitChange(nextUnit: WeightUnit) {
    if (nextUnit === weightUnit) {
      return;
    }

    if (nextUnit === "kg") {
      setWeight(clamp(Math.round(weight / 2.20462), 35, 180));
    } else {
      setWeight(clamp(Math.round((weight * 2.20462) / 5) * 5, 80, 400));
    }

    setWeightUnit(nextUnit);
  }

  return (
    <section id="calculator" className="border-b border-border py-14 sm:py-16">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <div className="grid gap-5 lg:grid-cols-[1.18fr_0.82fr]">
          <div className="rounded-sm border border-border bg-card shadow-[0_30px_120px_rgba(0,0,0,0.24)]">
            <div className="border-b border-border px-5 py-4 sm:px-6">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">
                {t("cardTitle")}
              </p>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">
                {t("cardDescription")}
              </p>
            </div>

            <div className="space-y-6 px-5 py-5 sm:px-6 sm:py-6">
              <Field label={t("drinkType")}>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {QUICK_DRINK_TYPES.map((drink) => (
                    <DrinkButton
                      key={drink.id}
                      drink={drink}
                      locale={locale}
                      selected={drink.id === drinkTypeId}
                      onSelect={() => setDrinkTypeId(drink.id)}
                    />
                  ))}
                </div>
              </Field>

              <div className="grid gap-5 md:grid-cols-2">
                <Field label={t("drinks")}>
                  <Stepper
                    value={drinks}
                    min={0}
                    max={30}
                    step={1}
                    onChange={setDrinks}
                  />
                </Field>

                <Field label={t("sex")}>
                  <div className="inline-flex w-full rounded-sm border border-border bg-surface p-1">
                    {(["male", "female"] as const).map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setSex(value)}
                        className={`flex flex-1 items-center justify-center gap-2 rounded-[0.2rem] px-3 py-3 font-mono text-xs uppercase tracking-[0.16em] transition-colors ${
                          sex === value
                            ? "bg-accent text-black"
                            : "text-muted hover:text-text"
                        }`}
                      >
                        {value === "male" ? (
                          <Mars className="h-4 w-4" aria-hidden="true" />
                        ) : (
                          <Venus className="h-4 w-4" aria-hidden="true" />
                        )}
                        {value === "male" ? t("male") : t("female")}
                      </button>
                    ))}
                  </div>
                </Field>

                <Field label={t("weight")}>
                  <div className="space-y-3">
                    <div className="inline-flex rounded-sm border border-border bg-surface p-1">
                      {(["lbs", "kg"] as const).map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => handleWeightUnitChange(value)}
                          className={`rounded-[0.2rem] px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] transition-colors ${
                            weightUnit === value
                              ? "bg-accent text-black"
                              : "text-muted hover:text-text"
                          }`}
                        >
                          {t(value)}
                        </button>
                      ))}
                    </div>
                    <Stepper
                      value={weight}
                      min={weightUnit === "lbs" ? 80 : 35}
                      max={weightUnit === "lbs" ? 400 : 180}
                      step={weightUnit === "lbs" ? 5 : 1}
                      suffix={t(weightUnit)}
                      onChange={setWeight}
                    />
                  </div>
                </Field>

                <Field label={t("hours")}>
                  <Stepper
                    value={hours}
                    min={0}
                    max={24}
                    step={0.5}
                    suffix={t("hoursUnit")}
                    onChange={setHours}
                  />
                </Field>
              </div>
            </div>

            <div className="border-t border-border px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
              <button
                type="button"
                onClick={handleCalculate}
                className="w-full rounded-sm bg-accent px-4 py-4 font-mono text-sm font-semibold uppercase tracking-[0.18em] text-black transition-opacity hover:opacity-90"
              >
                {t("calculate")}
              </button>
              <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                {t("disclaimer")}
              </p>
              <div className="mt-4 text-center">
                <Link
                  href="/bac-calculator"
                  className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent transition-opacity hover:opacity-80"
                >
                  {t("fullCalculator")}
                </Link>
              </div>
            </div>
          </div>

          <div className="rounded-sm border border-border bg-surface p-5 sm:p-6">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">
              {t("resultEyebrow")}
            </p>

            {result && config ? (
              <div className="mt-5 space-y-5">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
                    {t("resultBac")}
                  </p>
                  <p
                    className="mt-2 font-mono text-5xl font-semibold leading-none sm:text-6xl"
                    style={{ color: config.color }}
                  >
                    {result.bac.toFixed(3)}%
                  </p>
                </div>

                <div
                  className="inline-flex rounded-sm border px-3 py-2 font-mono text-xs uppercase tracking-[0.16em]"
                  style={{
                    color: config.color,
                    background: config.bgColor,
                    borderColor: `${config.color}40`,
                  }}
                >
                  {calculatorT(`levelLabels.${result.level}`)}
                </div>

                <p className="text-sm leading-7 text-muted">
                  {calculatorT(`levelDescriptions.${result.level}`)}
                </p>

                <div className="rounded-sm border border-border bg-background/60 p-4">
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
                    {t("resultSober")}
                  </p>
                  <p className="mt-2 font-mono text-2xl text-text">
                    {result.soberInHours > 0 ? formatHours(result.soberInHours) : t("resultNow")}
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-5 rounded-sm border border-dashed border-border bg-background/40 p-5">
                <p className="text-sm leading-7 text-muted">{t("resultPlaceholder")}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function DrinkButton({
  drink,
  locale,
  selected,
  onSelect,
}: {
  drink: DrinkType;
  locale: Locale;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex min-h-32 flex-col items-center justify-center rounded-sm border px-4 py-5 text-center transition-colors ${
        selected
          ? "border-accent bg-accent/8"
          : "border-border bg-background/50 hover:border-white/20 hover:bg-white/[0.03]"
      }`}
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-sm border border-border bg-surface">
        <Image
          src={drink.iconSrc ?? ""}
          alt={`${drink.label[locale]} - BAC Calculator drink option`}
          width={34}
          height={34}
          className="h-8 w-8"
        />
      </div>
      <span className="font-mono text-xs uppercase tracking-[0.16em] text-text">
        {drink.label[locale]}
      </span>
      <span className="mt-2 text-xs leading-6 text-muted">{drink.description[locale]}</span>
    </button>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">{label}</p>
      {children}
    </div>
  );
}

function Stepper({
  value,
  min,
  max,
  step,
  suffix,
  onChange,
}: {
  value: number;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  onChange: (value: number) => void;
}) {
  const canDecrease = value > min;
  const canIncrease = value < max;

  return (
    <div className="flex items-center justify-between rounded-sm border border-border bg-background/60 p-2">
      <IconButton
        label="-"
        disabled={!canDecrease}
        onClick={() => onChange(clamp(roundValue(value - step, step), min, max))}
      >
        <Minus className="h-4 w-4" aria-hidden="true" />
      </IconButton>

      <div className="min-w-0 px-3 text-center">
        <p className="font-mono text-2xl text-text">{formatStepperValue(value)}</p>
        {suffix ? (
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            {suffix}
          </p>
        ) : null}
      </div>

      <IconButton
        label="+"
        disabled={!canIncrease}
        onClick={() => onChange(clamp(roundValue(value + step, step), min, max))}
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
      </IconButton>
    </div>
  );
}

function IconButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex h-11 w-11 items-center justify-center rounded-[0.2rem] border border-border bg-surface text-text transition-colors hover:border-white/30 hover:bg-white/[0.04] disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function roundValue(value: number, step: number) {
  const rounded = Math.round(value / step) * step;
  return Number(rounded.toFixed(step < 1 ? 1 : 0));
}

function formatStepperValue(value: number) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

function formatHours(value: number) {
  return `~${value.toFixed(1)}h`;
}
