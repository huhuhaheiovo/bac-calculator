import {getLocale, getTranslations} from "next-intl/server";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import {Link} from "@/i18n/navigation";
import type {Locale} from "@/i18n/config";
import {legalStateRows} from "@/lib/content";
import {getSeoContent} from "@/lib/seo";

export default async function LegalLimitsArticlePage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations();
  const article = await getTranslations("articles.legalLimits");
  const seo = getSeoContent(locale, "legalLimits");
  const headers = article.raw("tableHeaders") as string[];

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <article className="mx-auto w-full max-w-3xl px-6 py-16">
          <Link
            href="/blog"
            className="mb-8 inline-block font-mono text-xs text-muted transition-colors hover:text-accent"
          >
            {t("blog.back")}
          </Link>

          <p className="mb-3 font-mono text-xs text-muted">
            2025-01-20 · {article("readTime")}
          </p>
          <h1 className="mb-6 text-4xl leading-tight md:text-5xl">
            {seo.h1}
          </h1>
          <p className="mb-6 text-base leading-8 text-muted">
            {article("intro")}
          </p>

          <h2 className="mb-4 mt-10 text-2xl">{article("federalTitle")}</h2>
          <p className="mb-4 text-sm leading-7 text-muted">
            {article("federalBody")}
          </p>

          <h2 className="mb-4 mt-10 text-2xl">{article("selectedTitle")}</h2>
          <div className="mb-8 overflow-x-auto rounded-sm border border-border bg-card">
            <table className="w-full border-collapse font-mono text-xs">
              <thead>
                <tr>
                  {headers.map((heading) => (
                    <th
                      key={heading}
                      className="border-b border-border px-3 py-3 text-left uppercase tracking-wide text-accent"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {legalStateRows.map((row) => (
                  <tr key={row.state} className="border-b border-white/5 last:border-none">
                    <td className="px-3 py-3 text-text">{row.state}</td>
                    <td className="px-3 py-3 text-muted">{row.standard}</td>
                    <td className="px-3 py-3 text-muted">{row.cdl}</td>
                    <td className="px-3 py-3 text-muted">{row.under21}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="mb-4 mt-10 text-2xl">{article("under21Title")}</h2>
          <p className="mb-4 text-sm leading-7 text-muted">
            {article("under21Body")}
          </p>

          <h2 className="mb-4 mt-10 text-2xl">{article("cdlTitle")}</h2>
          <p className="mb-4 text-sm leading-7 text-muted">
            {article("cdlBody")}
          </p>

          <div className="mt-12 border-t border-border pt-8">
            <Link
              href="/bac-calculator"
              className="inline-block rounded-sm bg-accent px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-black"
            >
              {t("blog.useCalculator")}
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
