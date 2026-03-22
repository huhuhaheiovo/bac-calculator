"use client";

import {AnimatePresence, motion} from "framer-motion";
import {Mars, Venus} from "lucide-react";
import Image from "next/image";
import {useLocale, useTranslations} from "next-intl";
import {useState} from "react";
import {BAC_LEVEL_CONFIG, calculateBAC} from "@/lib/bac";
import {DRINK_TYPES, LEGAL_LIMITS} from "@/lib/constants";
import type {Locale} from "@/i18n/config";
import type {BACResult, DrinkType, LegalLimit, Sex} from "@/types/calculator";

type CalculatorMode = "simple" | "normal";

export default function BACCalculator() {
  const locale = useLocale() as Locale;
  const t = useTranslations("calculator");
  const [mode, setMode] = useState<CalculatorMode>("simple");
  const [sex, setSex] = useState<Sex>("male");
  const [weight, setWeight] = useState("");
  const [drinks, setDrinks] = useState("");
  const [hours, setHours] = useState("");
  const [drinkTypeId, setDrinkTypeId] = useState("beer");
  const [countryId, setCountryId] = useState("us");
  const [result, setResult] = useState<BACResult | null>(null);
  const [error, setError] = useState("");
  const weightUnit = locale === "zh" ? "kg" : "lbs";
  const effectiveCountryId = mode === "simple" ? getSimpleModeCountryId(locale) : countryId;

  const selectedDrink = DRINK_TYPES.find((drink) => drink.id === drinkTypeId)!;
  const selectedCountry =
    LEGAL_LIMITS.find((country) => country.id === effectiveCountryId) ?? LEGAL_LIMITS[0];
  const simpleDrinkTypes = DRINK_TYPES.filter(
    (drink) => drink.showInSimpleMode && drink.iconSrc,
  );

  function handleCalculate() {
    const parsedWeight = Number.parseFloat(weight);
    const parsedDrinks = Number.parseFloat(drinks);
    const parsedHours = Number.parseFloat(hours) || 0;

    if (!parsedWeight || parsedWeight <= 0) {
      setError(t("weightError"));
      return;
    }

    if (Number.isNaN(parsedDrinks) || parsedDrinks < 0) {
      setError(t("drinksError"));
      return;
    }

    const weightLbs = weightUnit === "kg" ? parsedWeight * 2.20462 : parsedWeight;

    setError("");
    setResult(
      calculateBAC({
        sex,
        weightLbs,
        drinks: parsedDrinks,
        alcoholOzPerDrink: selectedDrink.alcoholOz,
        hoursElapsed: parsedHours,
        legalLimitPercent: selectedCountry.limitPercent,
      }),
    );
  }

  const config = result ? BAC_LEVEL_CONFIG[result.level] : null;
  const barPct = result ? Math.min((result.bac / 0.3) * 100, 100) : 0;
  const legalBadgeText = result
    ? result.isLegal
      ? t("legalBadgeSafe")
      : t("legalBadgeOver")
    : "";
  const legalBadgeStyles = result
    ? result.isLegal
      ? {
          color: "#00d4aa",
          background: "rgba(0, 212, 170, 0.12)",
          borderColor: "rgba(0, 212, 170, 0.32)",
        }
      : {
          color: "#ff4757",
          background: "rgba(255, 71, 87, 0.12)",
          borderColor: "rgba(255, 71, 87, 0.32)",
        }
    : null;
  const resultLabelColor = result?.isLegal ? "#8a94a7" : "#ff4757";
  const resultValueColor = result?.isLegal ? config?.color ?? "#00d4aa" : "#ff4757";

  return (
    <section id="calculator" className="border-b border-border py-16">
      <div className="mx-auto w-full max-w-5xl px-6">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent">
          {t("eyebrow")}
        </p>
        <p className="mb-2 text-3xl md:text-4xl">{t("title")}</p>
        <p className="mb-8 max-w-2xl text-sm leading-relaxed text-muted">
          {t("description")}
        </p>

        <div className="overflow-hidden rounded-sm border border-border bg-card shadow-[0_30px_120px_rgba(0,0,0,0.28)]">
          <div className="flex items-center gap-2 border-b border-border bg-surface px-6 py-4">
            <span className="h-2 w-2 rounded-full bg-red-500" />
            <span className="h-2 w-2 rounded-full bg-yellow-400" />
            <span className="h-2 w-2 rounded-full bg-green-400" />
            <span className="ml-2 font-mono text-xs text-muted">
              baccalculator.me - Widmark Formula Engine
            </span>
          </div>

          <div className="border-b border-border bg-surface/60 px-7 py-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
                  {mode === "simple" ? t("simpleTitle") : t("title")}
                </p>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                  {mode === "simple" ? t("simpleDescription") : t("normalDescription")}
                </p>
              </div>
              <div className="inline-flex rounded-sm border border-border p-1">
                {(["simple", "normal"] as const).map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setMode(value)}
                    className={`rounded-sm px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] transition-all ${
                      mode === value
                        ? "bg-accent text-black"
                        : "text-muted hover:text-text"
                    }`}
                  >
                    {value === "simple" ? t("modeSimple") : t("modeNormal")}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {mode === "simple" ? (
            <div className="border-b border-border bg-[linear-gradient(180deg,rgba(0,212,170,0.08),rgba(255,255,255,0.02))] px-7 py-7">
              <Field label={t("simpleDrinkPrompt")}>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {simpleDrinkTypes.map((drink) => (
                    <SimpleDrinkCard
                      key={drink.id}
                      drink={drink}
                      locale={locale}
                      selected={drink.id === drinkTypeId}
                      onSelect={() => setDrinkTypeId(drink.id)}
                    />
                  ))}
                </div>
              </Field>
            </div>
          ) : null}

          <div className="grid grid-cols-1 gap-5 p-7 sm:grid-cols-2">
            <Field label={t("sex")}>
              <div className="flex gap-3">
                {(["male", "female"] as const).map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setSex(value)}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-sm border py-2.5 font-mono text-xs uppercase transition-all ${
                      sex === value
                        ? "border-accent bg-accent/5 text-accent"
                        : "border-border text-muted hover:border-white/30"
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
              <input
                type="number"
                value={weight}
                onChange={(event) => setWeight(event.target.value)}
                placeholder={
                  weightUnit === "lbs" ? t("placeholderWeightLbs") : t("placeholderWeightKg")
                }
                min="1"
              />
            </Field>

            <Field label={t("hours")}>
              <input
                type="number"
                value={hours}
                onChange={(event) => setHours(event.target.value)}
                placeholder={t("placeholderHours")}
                min="0"
                step="0.5"
              />
            </Field>

            <Field label={t("drinks")}>
              <input
                type="number"
                value={drinks}
                onChange={(event) => setDrinks(event.target.value)}
                placeholder={t("placeholderDrinks")}
                min="0"
              />
            </Field>

            {mode === "normal" ? (
              <Field label={t("drinkType")}>
                <select
                  value={drinkTypeId}
                  onChange={(event) => setDrinkTypeId(event.target.value)}
                >
                  {DRINK_TYPES.map((drink) => (
                    <option key={drink.id} value={drink.id}>
                      {drink.label[locale]} ({drink.description[locale]})
                    </option>
                  ))}
                </select>
              </Field>
            ) : null}

            {mode === "normal" ? (
              <Field label={t("country")} className="sm:col-span-2">
              <select
                value={countryId}
                onChange={(event) => setCountryId(event.target.value)}
              >
                {LEGAL_LIMITS.map((country) => (
                  <option key={country.id} value={country.id}>
                    {formatCountryOption(country, locale)}
                  </option>
                ))}
              </select>
              </Field>
            ) : null}
          </div>

          <AnimatePresence>
            {result && config ? (
              <motion.div
                initial={{opacity: 0, y: 8}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: 4}}
                className="mx-7 mb-5 rounded-sm border border-border bg-surface p-6"
                style={{
                  borderColor: `${config.color}80`,
                  boxShadow: `0 0 0 1px ${config.color}20 inset`,
                }}
              >
                <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p
                      className="mb-3 font-mono text-xs uppercase tracking-[0.3em]"
                      style={{color: resultLabelColor}}
                    >
                      {t("resultLabel")}
                    </p>
                    <div className="mb-3 flex items-baseline gap-2">
                      <motion.span
                        key={result.bac}
                        initial={{scale: 0.9, opacity: 0}}
                        animate={{scale: 1, opacity: 1}}
                        className="font-mono text-5xl font-semibold leading-none"
                        style={{color: resultValueColor}}
                      >
                        {result.bac.toFixed(3)}%
                      </motion.span>
                    </div>
                    <p className="max-w-2xl text-sm leading-relaxed text-muted">
                      {t(`levelDescriptions.${result.level}`)}
                    </p>
                  </div>

                  <span
                    className="inline-flex rounded-full border px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.15em]"
                    style={legalBadgeStyles ?? undefined}
                  >
                    {legalBadgeText}
                  </span>
                </div>

                <span
                  className="mb-4 inline-block rounded-sm border px-2.5 py-1 font-mono text-xs font-semibold uppercase tracking-[0.2em]"
                  style={{
                    color: config.color,
                    background: config.bgColor,
                    borderColor: `${config.color}40`,
                  }}
                >
                  {t(`levelLabels.${result.level}`)}
                </span>

                <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-border">
                  <motion.div
                    className="h-full rounded-full"
                    initial={{width: 0}}
                    animate={{width: `${barPct}%`}}
                    transition={{duration: 0.8}}
                    style={{background: config.color}}
                  />
                </div>

                <div className="mt-5 border-t border-border/80 pt-5">
                  <div className="space-y-3 font-mono text-xs text-muted">
                    <MetricRow
                      label={t("timeToZero")}
                      value={formatHours(result.soberInHours)}
                      accentColor={config.color}
                    />
                    <MetricRow
                      label={t("timeToLegal", {country: selectedCountry.name[locale]})}
                      value={
                        result.timeToLegalHours > 0
                          ? formatHours(result.timeToLegalHours)
                          : t("alreadyLegal")
                      }
                      accentColor={config.color}
                    />
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {result ? (
            <div className="mx-7 mb-7 rounded-[1.5rem] border border-border bg-card/60 p-6">
              <BACOverTimeChart
                result={result}
                legalLimitPercent={selectedCountry.limitPercent}
                countryName={selectedCountry.name[locale]}
                t={t}
              />
            </div>
          ) : null}

          {error ? (
            <p className="mx-7 mb-4 font-mono text-xs text-danger">{error}</p>
          ) : null}

          <div className="px-7 pb-7">
            <button
              type="button"
              onClick={handleCalculate}
              className="w-full rounded-sm bg-accent py-4 font-mono text-sm font-semibold uppercase tracking-[0.2em] text-black transition-opacity hover:opacity-90"
            >
              {t("calculate")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function SimpleDrinkCard({
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
      className={`flex min-h-36 flex-col items-center justify-center rounded-sm border px-4 py-5 text-center transition-all ${
        selected
          ? "border-accent bg-accent/8 shadow-[0_0_0_1px_rgba(0,212,170,0.25)]"
          : "border-border bg-background/60 hover:border-white/30 hover:bg-white/[0.03]"
      }`}
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-border bg-surface">
        <Image
          src={drink.iconSrc ?? ""}
          alt={drink.label[locale]}
          width={34}
          height={34}
          className="h-8 w-8"
        />
      </div>
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-text">
        {drink.label[locale]}
      </span>
      <span className="mt-2 text-xs leading-relaxed text-muted">
        {drink.description[locale]}
      </span>
    </button>
  );
}

function Field({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-2 ${className ?? ""}`}>
      <label className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
        {label}
      </label>
      {children}
    </div>
  );
}

function MetricRow({
  label,
  value,
  accentColor,
}: {
  label: string;
  value: string;
  accentColor: string;
}) {
  return (
    <div className="flex items-center justify-between gap-6 border-b border-border/60 pb-3 last:border-b-0 last:pb-0">
      <span>{label}</span>
      <span className="text-right text-base font-semibold" style={{color: accentColor}}>
        {value}
      </span>
    </div>
  );
}

function BACOverTimeChart({
  result,
  legalLimitPercent,
  countryName,
  t,
}: {
  result: BACResult;
  legalLimitPercent: number;
  countryName: string;
  t: ReturnType<typeof useTranslations>;
}) {
  const width = 960;
  const height = 420;
  const padding = {top: 28, right: 28, bottom: 64, left: 78};
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const totalHours = Math.max(result.hoursElapsed + result.soberInHours, 1);
  const roundedMaxHours = Math.max(2, Math.ceil(totalHours / 2) * 2);
  const yMaxBase = Math.max(result.startingBac, result.bac, legalLimitPercent, 0.02);
  const yMax = roundUpChartValue(yMaxBase * 1.18);
  const currentX = scaleX(result.hoursElapsed, roundedMaxHours, chartWidth, padding.left);
  const currentY = scaleY(result.bac, yMax, chartHeight, padding.top);
  const startY = scaleY(result.startingBac, yMax, chartHeight, padding.top);
  const endX = scaleX(result.hoursElapsed + result.soberInHours, roundedMaxHours, chartWidth, padding.left);
  const limitY = scaleY(legalLimitPercent, yMax, chartHeight, padding.top);
  const xTicks = createTicks(roundedMaxHours, 4);
  const yTicks = createYTicks(yMax);
  const currentDotColor = result.isLegal ? "#2563eb" : "#ff4757";

  return (
    <div>
      <p className="mb-5 font-mono text-xl uppercase tracking-[0.2em] text-muted">
        {t("chartTitle")}
      </p>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full overflow-visible">
        {yTicks.map((tick) => (
          <g key={tick}>
            <line
              x1={padding.left}
              y1={scaleY(tick, yMax, chartHeight, padding.top)}
              x2={padding.left + chartWidth}
              y2={scaleY(tick, yMax, chartHeight, padding.top)}
              stroke="rgba(138,148,167,0.16)"
              strokeWidth="1"
            />
            <text
              x={padding.left - 12}
              y={scaleY(tick, yMax, chartHeight, padding.top) + 6}
              textAnchor="end"
              className="fill-[#8a94a7] text-[18px]"
            >
              {formatPercent(tick)}
            </text>
          </g>
        ))}

        {xTicks.map((tick) => (
          <g key={tick}>
            <text
              x={scaleX(tick, roundedMaxHours, chartWidth, padding.left)}
              y={padding.top + chartHeight + 38}
              textAnchor="middle"
              className="fill-[#8a94a7] text-[18px]"
            >
              {`${tick}h`}
            </text>
          </g>
        ))}

        <line
          x1={padding.left}
          y1={padding.top + chartHeight}
          x2={padding.left + chartWidth}
          y2={padding.top + chartHeight}
          stroke="rgba(138,148,167,0.28)"
          strokeWidth="1.5"
        />
        <line
          x1={padding.left}
          y1={padding.top}
          x2={padding.left}
          y2={padding.top + chartHeight}
          stroke="rgba(138,148,167,0.28)"
          strokeWidth="1.5"
        />

        <line
          x1={padding.left}
          y1={startY}
          x2={currentX}
          y2={currentY}
          stroke="#2563eb"
          strokeWidth="4"
          strokeLinecap="round"
        />

        <line
          x1={currentX}
          y1={currentY}
          x2={endX}
          y2={padding.top + chartHeight}
          stroke="#16a34a"
          strokeWidth="4"
          strokeDasharray="10 8"
          strokeLinecap="round"
        />

        <line
          x1={padding.left}
          y1={limitY}
          x2={padding.left + chartWidth}
          y2={limitY}
          stroke="#ff4757"
          strokeWidth="2"
          strokeDasharray="12 8"
        />

        <circle cx={currentX} cy={currentY} r="10" fill={currentDotColor} stroke="#ffffff" strokeWidth="4" />
        <text
          x={currentX}
          y={currentY - 22}
          textAnchor="middle"
          className="text-[20px] font-semibold"
          fill={currentDotColor}
        >
          {`${result.bac.toFixed(3)}%`}
        </text>

        <text
          x={padding.left + chartWidth - 6}
          y={limitY - 10}
          textAnchor="end"
          className="fill-[#ff4757] text-[18px]"
        >
          {t("chartLimitLabel", {
            limit: formatPercent(legalLimitPercent),
            country: countryName,
          })}
        </text>
      </svg>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-8 text-sm text-muted">
        <LegendSwatch label={t("chartPast")} color="#2563eb" />
        <LegendSwatch label={t("chartProjected")} color="#16a34a" dashed />
        <LegendSwatch label={t("chartLegalLimit")} color="#ff4757" dashed />
      </div>
    </div>
  );
}

function LegendSwatch({
  label,
  color,
  dashed = false,
}: {
  label: string;
  color: string;
  dashed?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <svg width="32" height="10" viewBox="0 0 32 10" aria-hidden="true">
        <line
          x1="1"
          y1="5"
          x2="31"
          y2="5"
          stroke={color}
          strokeWidth="3"
          strokeDasharray={dashed ? "6 5" : undefined}
          strokeLinecap="round"
        />
      </svg>
      <span>{label}</span>
    </div>
  );
}

function formatPercent(value: number) {
  if (value === 0) {
    return "Zero";
  }

  return `${(value * 100).toFixed(value < 0.1 ? 1 : 0)}%`;
}

function formatHours(value: number) {
  return `~${value.toFixed(1)}h`;
}

function scaleX(value: number, maxValue: number, chartWidth: number, offset: number) {
  return offset + (value / maxValue) * chartWidth;
}

function scaleY(value: number, maxValue: number, chartHeight: number, offset: number) {
  return offset + chartHeight - (value / maxValue) * chartHeight;
}

function roundUpChartValue(value: number) {
  if (value <= 0.05) {
    return 0.05;
  }

  return Math.ceil(value / 0.01) * 0.01;
}

function createTicks(maxValue: number, count: number) {
  return Array.from({length: count + 1}, (_, index) => Math.round((maxValue / count) * index));
}

function createYTicks(maxValue: number) {
  return [maxValue, maxValue * 0.75, maxValue * 0.5, maxValue * 0.25, 0];
}

function formatCountryOption(country: LegalLimit, locale: Locale) {
  const threshold = formatPercent(country.limitPercent);
  const otherLocale = locale === "en" ? "zh" : "en";
  return `${country.name[locale]} (${threshold}) ${country.name[otherLocale]} (${threshold})`;
}

function getSimpleModeCountryId(locale: Locale) {
  return locale === "zh" ? "china" : "us";
}
