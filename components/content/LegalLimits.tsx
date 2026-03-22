import {getLocale, getTranslations} from "next-intl/server";
import {LEGAL_LIMITS} from "@/lib/constants";
import type {Locale} from "@/i18n/config";

type LegalCard = {
  state: string;
  note: string;
  limit: string;
};

export default async function LegalLimits() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("legal");
  const usCards = t.raw("usCards") as LegalCard[];

  return (
    <section id="legal" className="border-b border-border py-16">
      <div className="mx-auto w-full max-w-5xl px-6">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent">
          {t("eyebrow")}
        </p>
        <h2 className="mb-4 text-3xl md:text-4xl">{t("title")}</h2>
        <p className="mb-8 max-w-2xl text-sm leading-relaxed text-muted">
          {t("description")}
        </p>

        <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent">
          {t("unitedStates")}
        </h3>
        <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {usCards.map((entry) => (
            <div key={entry.state} className="rounded-sm border border-border bg-card p-4">
              <p className="mb-1 font-mono text-xs uppercase tracking-wide text-muted">
                {entry.state}
              </p>
              <p className="mb-1 font-mono text-2xl font-semibold text-accent-warm">
                {entry.limit}
              </p>
              <p className="font-mono text-xs text-muted/70">{entry.note}</p>
            </div>
          ))}
        </div>

        <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent">
          {t("international")}
        </h3>
        <div className="overflow-x-auto rounded-sm border border-border bg-card">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-surface/80">
              <tr className="text-left font-mono text-xs uppercase tracking-[0.16em] text-muted">
                <th className="px-4 py-3">{t("countryColumn")}</th>
                <th className="px-4 py-3">{t("limitColumn")}</th>
                <th className="px-4 py-3">{t("notesColumn")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/80">
              {LEGAL_LIMITS.map((limit) => (
                <tr key={limit.id}>
                  <td className="px-4 py-4 text-sm text-text">
                    <span className="mr-2">{getFlagEmoji(limit.code)}</span>
                    {limit.name[locale]}
                  </td>
                  <td className="px-4 py-4 font-mono text-sm">
                    <span style={{ color: getLimitColor(limit.limitPercent) }}>
                      {formatLimit(limit.limitPercent)}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-muted">{limit.notes[locale]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-5 font-mono text-xs uppercase tracking-[0.14em] text-muted">
          <span className="mr-4" style={{ color: "#ff4757" }}>
            ■ {t("legendZero")}
          </span>
          <span className="mr-4" style={{ color: "#ff9f43" }}>
            ■ {t("legendLow")}
          </span>
          <span className="mr-4" style={{ color: "#ffd166" }}>
            ■ {t("legendMid")}
          </span>
          <span>
            ■ {t("legendStandard")}
          </span>
        </p>

        <p className="mt-6 max-w-2xl text-xs leading-relaxed text-muted">
          {t("note")}
        </p>
      </div>
    </section>
  );
}

function formatLimit(limitPercent: number) {
  if (limitPercent === 0) {
    return "Zero Tolerance";
  }

  return `${limitPercent.toFixed(limitPercent < 0.1 ? 3 : 2)}%`;
}

function getLimitColor(limitPercent: number) {
  if (limitPercent === 0) {
    return "#ff4757";
  }

  if (limitPercent <= 0.02) {
    return "#ff9f43";
  }

  if (limitPercent <= 0.05) {
    return "#ffd166";
  }

  return "#f5f7fa";
}

function getFlagEmoji(code: string) {
  const normalized = code === "UK" ? "GB" : code;
  return normalized
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397));
}
