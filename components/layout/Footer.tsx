import {getTranslations} from "next-intl/server";
import {Link} from "@/i18n/navigation";

export default async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div className="max-w-sm">
            <p className="mb-2 font-mono text-sm font-semibold text-accent">
              baccalculator.me
            </p>
            <p className="font-mono text-xs leading-relaxed text-muted whitespace-pre-line">
              {t("description")}
            </p>
          </div>

          <div className="flex gap-12">
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
                {t("tools")}
              </p>
              <ul className="space-y-2">
                <li>
                  <Link href="/bac-calculator" className="font-mono text-xs text-muted transition-colors hover:text-text">
                    {t("calculator")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
                {t("learn")}
              </p>
              <ul className="space-y-2">
                <li>
                  <Link href="/blog/how-bac-is-calculated" className="font-mono text-xs text-muted transition-colors hover:text-text">
                    {t("howBac")}
                  </Link>
                </li>
                <li>
                  <Link href="/blog/legal-bac-limits-by-state" className="font-mono text-xs text-muted transition-colors hover:text-text">
                    {t("legalLimits")}
                  </Link>
                </li>
                <li>
                  <Link href="/blog/bac-calculator-vs-breathalyzer" className="font-mono text-xs text-muted transition-colors hover:text-text">
                    {t("comparison")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <p className="max-w-3xl font-mono text-xs leading-relaxed text-muted/70">
            {t("disclaimer")}
          </p>
        </div>
      </div>
    </footer>
  );
}
