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
    <section className="border-b border-border py-16">
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
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {LEGAL_LIMITS.slice(0, 6).map((limit) => (
            <div key={limit.id} className="rounded-sm border border-border bg-card p-4">
              <p className="mb-1 font-mono text-xs uppercase tracking-wide text-muted">
                {limit.code} {limit.name[locale]}
              </p>
              <p className="mb-1 font-mono text-2xl font-semibold text-accent-warm">
                {limit.limitPercent.toFixed(2)}%
              </p>
              <p className="font-mono text-xs text-muted/70">{limit.notes[locale]}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 max-w-2xl text-xs leading-relaxed text-muted">
          {t("note")}
        </p>
      </div>
    </section>
  );
}
