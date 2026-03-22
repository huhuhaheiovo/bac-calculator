import {getLocale, getTranslations} from "next-intl/server";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import {Link} from "@/i18n/navigation";
import type {Locale} from "@/i18n/config";
import {getSeoContent} from "@/lib/seo";

export default async function HowBacArticlePage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations();
  const article = await getTranslations("articles.how");
  const seo = getSeoContent(locale, "howBac");

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
            2025-01-15 · {article("readTime")}
          </p>
          <h1 className="mb-6 text-4xl leading-tight md:text-5xl">
            {seo.h1}
          </h1>
          <p className="mb-6 text-base leading-8 text-muted">
            {article("intro")}
          </p>

          <h2 className="mb-4 mt-10 text-2xl">{article("formulaTitle")}</h2>
          <div className="mb-6 rounded-sm border border-border bg-card p-5 font-mono text-sm text-accent">
            BAC = (A / (W x r)) x 100 - (0.015 x T)
          </div>
          <ul className="mb-6 space-y-2 text-sm text-muted">
            {(article.raw("formulaItems") as string[]).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h2 className="mb-4 mt-10 text-2xl">{article("distributionTitle")}</h2>
          <p className="mb-4 text-sm leading-7 text-muted">
            {article("distributionBody")}
          </p>

          <h2 className="mb-4 mt-10 text-2xl">{article("conversionTitle")}</h2>
          <p className="mb-4 text-sm leading-7 text-muted">
            {article("conversionBody")}
          </p>

          <h2 className="mb-4 mt-10 text-2xl">{article("metabolismTitle")}</h2>
          <p className="mb-4 text-sm leading-7 text-muted">
            {article("metabolismBody")}
          </p>

          <h2 className="mb-4 mt-10 text-2xl">{article("limitsTitle")}</h2>
          <p className="mb-4 text-sm leading-7 text-muted">
            {article("limitsBody")}
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
