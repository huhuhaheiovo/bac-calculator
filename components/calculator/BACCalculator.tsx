"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Mars, Venus } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { BAC_LEVEL_CONFIG, calculateBAC } from "@/lib/bac";
import { DRINK_TYPES, LEGAL_LIMITS } from "@/lib/constants";
import type { Locale } from "@/i18n/config";
import type { BACResult, LegalLimit, Sex, WeightUnit } from "@/types/calculator";

export default function BACCalculator() {
  const locale = useLocale() as Locale;
  const t = useTranslations("calculator");
  const [sex, setSex] = useState<Sex>("male");
  const [weightUnit, setWeightUnit] = useState<WeightUnit>("lbs");
  const [weight, setWeight] = useState("");
  const [drinks, setDrinks] = useState("");
  const [hours, setHours] = useState("");
  const [drinkTypeId, setDrinkTypeId] = useState("beer");
  const [countryId, setCountryId] = useState("us");
  const [result, setResult] = useState<BACResult | null>(null);
  const [error, setError] = useState("");

  const selectedDrink = DRINK_TYPES.find((drink) => drink.id === drinkTypeId) ?? DRINK_TYPES[0];
  const selectedCountry =
    LEGAL_LIMITS.find((country) => country.id === countryId) ?? LEGAL_LIMITS[0];

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
  const legalLimitLabel = formatPercent(selectedCountry.limitPercent);

  return (
    <section id="calculator" className="border-b border-border py-16">
      <div className="mx-auto w-full max-w-5xl px-6">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent">
          {t("eyebrow")}
        </p>
        <h2 className="mb-2 text-3xl md:text-4xl">{t("title")}</h2>
        <p className="mb-8 max-w-3xl text-sm leading-relaxed text-muted">
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
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
              {t("panelTitle")}
            </p>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">
              {t("panelDescription")}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 p-7 sm:grid-cols-2">
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
              <InfoStrip>
                <span>{getFlagEmoji(selectedCountry.code)}</span>
                <span>{selectedCountry.name[locale]}</span>
                <span>{t("countryStripSeparator")}</span>
                <span>
                  {t("countryStripLegalLimit")} {legalLimitLabel}
                </span>
                <span>{t("countryStripSeparator")}</span>
                <span>{selectedCountry.notes[locale]}</span>
              </InfoStrip>
            </Field>

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
              <div className="flex gap-3">
                <input
                  type="number"
                  value={weight}
                  onChange={(event) => setWeight(event.target.value)}
                  placeholder={
                    weightUnit === "lbs"
                      ? t("placeholderWeightLbs")
                      : t("placeholderWeightKg")
                  }
                  min="1"
                />
                <div className="inline-flex rounded-sm border border-border p-1">
                  {(["lbs", "kg"] as const).map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setWeightUnit(value)}
                      className={`rounded-sm px-3 py-2 font-mono text-xs uppercase tracking-[0.16em] transition-colors ${
                        weightUnit === value
                          ? "bg-accent text-black"
                          : "text-muted hover:text-text"
                      }`}
                    >
                      {t(value === "lbs" ? "unitLbs" : "unitKg")}
                    </button>
                  ))}
                </div>
              </div>
            </Field>

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

            <Field label={t("drinks")}>
              <input
                type="number"
                value={drinks}
                onChange={(event) => setDrinks(event.target.value)}
                placeholder={t("placeholderDrinks")}
                min="0"
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
          </div>

          <AnimatePresence>
            {result && config ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
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
                      style={{ color: resultLabelColor }}
                    >
                      {t("resultLabel")}
                    </p>
                    <div className="mb-3 flex items-baseline gap-2">
                      <motion.span
                        key={result.bac}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="font-mono text-5xl font-semibold leading-none"
                        style={{ color: resultValueColor }}
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
                    initial={{ width: 0 }}
                    animate={{ width: `${barPct}%` }}
                    transition={{ duration: 0.8 }}
                    style={{ background: config.color }}
                  />
                </div>

                <VerdictCard
                  country={selectedCountry}
                  locale={locale}
                  isLegal={result.isLegal}
                  label={legalLimitLabel}
                  t={t}
                />

                <div className="mt-5 border-t border-border/80 pt-5">
                  <div className="space-y-3 font-mono text-xs text-muted">
                    <MetricRow
                      label={t("timeToZero")}
                      value={formatHours(result.soberInHours)}
                      accentColor={config.color}
                    />
                    <MetricRow
                      label={t("timeToLegal", { country: selectedCountry.name[locale] })}
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

function InfoStrip({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 rounded-sm border border-border bg-background/50 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
      {children}
    </div>
  );
}

function VerdictCard({
  country,
  locale,
  isLegal,
  label,
  t,
}: {
  country: LegalLimit;
  locale: Locale;
  isLegal: boolean;
  label: string;
  t: ReturnType<typeof useTranslations>;
}) {
  return (
    <div
      className={`mb-5 rounded-sm border px-4 py-4 ${
        isLegal
          ? "border-accent/30 bg-accent/10 text-accent"
          : "border-danger/30 bg-danger/10 text-danger"
      }`}
    >
      <p className="font-mono text-xs uppercase tracking-[0.16em]">
        {isLegal
          ? t("belowLegal", { country: country.name[locale], limit: label })
          : t("aboveLegal", { country: country.name[locale], limit: label })}
      </p>
      <p className="mt-2 text-sm leading-7 text-muted">
        {getFlagEmoji(country.code)} {country.notes[locale]}
      </p>
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
      <span className="text-right text-base font-semibold" style={{ color: accentColor }}>
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
  const padding = { top: 28, right: 28, bottom: 64, left: 78 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const totalHours = Math.max(result.hoursElapsed + result.soberInHours, 1);
  const roundedMaxHours = Math.max(2, Math.ceil(totalHours / 2) * 2);
  const yMaxBase = Math.max(result.startingBac, result.bac, legalLimitPercent, 0.02);
  const yMax = roundUpChartValue(yMaxBase * 1.18);
  const currentX = scaleX(result.hoursElapsed, roundedMaxHours, chartWidth, padding.left);
  const currentY = scaleY(result.bac, yMax, chartHeight, padding.top);
  const startY = scaleY(result.startingBac, yMax, chartHeight, padding.top);
  const endX = scaleX(
    result.hoursElapsed + result.soberInHours,
    roundedMaxHours,
    chartWidth,
    padding.left,
  );
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
    return "Zero Tolerance";
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
  return Array.from({ length: count + 1 }, (_, index) =>
    Math.round((maxValue / count) * index),
  );
}

function createYTicks(maxValue: number) {
  return [maxValue, maxValue * 0.75, maxValue * 0.5, maxValue * 0.25, 0];
}

function formatCountryOption(country: LegalLimit, locale: Locale) {
  const threshold = formatPercent(country.limitPercent);
  return `${getFlagEmoji(country.code)} ${country.name[locale]} - ${threshold}`;
}

function getFlagEmoji(code: string) {
  const normalized = code === "UK" ? "GB" : code;
  return normalized
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397));
}
