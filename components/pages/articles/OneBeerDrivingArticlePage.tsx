import {getTranslations} from "next-intl/server";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import {Link} from "@/i18n/navigation";
import {getSeoContent} from "@/lib/seo";

export default async function OneBeerDrivingArticlePage() {
  const t = await getTranslations();
  const article = await getTranslations("articles.oneBeerDriving");
  const seo = getSeoContent("zh", "oneBeerDriving");
  const exampleCards = article.raw("exampleCards") as Array<{
    label: string;
    value: string;
    note: string;
  }>;

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
            2025-03-22 · {article("readTime")}
          </p>
          <h1 className="mb-6 text-4xl leading-tight md:text-5xl">
            {seo.h1}
          </h1>
          <p className="mb-6 text-base leading-8 text-muted">
            {article("intro")}
          </p>

          <div className="mb-8 rounded-sm border border-accent/20 bg-[linear-gradient(180deg,rgba(0,212,170,0.08),rgba(255,255,255,0.02))] p-5">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              {article("quickAnswerLabel")}
            </p>
            <h2 className="mt-3 text-2xl leading-snug text-text">
              {article("quickAnswerTitle")}
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted">
              {article("quickAnswerBody")}
            </p>
          </div>

          <h2 className="mb-4 mt-10 text-2xl">{article("answerTitle")}</h2>
          <p className="mb-4 text-sm leading-7 text-muted">
            {article("answerBody")}
          </p>

          <h2 className="mb-4 mt-10 text-2xl">{article("standardTitle")}</h2>
          <p className="mb-4 text-sm leading-7 text-muted">
            {article("standardBody")}
          </p>

          <h2 className="mb-4 mt-10 text-2xl">{article("exampleTitle")}</h2>
          <p className="mb-5 text-sm leading-7 text-muted">
            {article("exampleIntro")}
          </p>
          <div className="mb-6 grid gap-4 sm:grid-cols-2">
            {exampleCards.map((card) => (
              <div
                key={card.label}
                className="rounded-sm border border-border bg-card p-5"
              >
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                  {card.label}
                </p>
                <p className="mt-3 text-2xl text-text">{card.value}</p>
                <p className="mt-3 text-sm leading-7 text-muted">{card.note}</p>
              </div>
            ))}
          </div>

          <h2 className="mb-4 mt-10 text-2xl">{article("factorsTitle")}</h2>
          <ul className="mb-6 space-y-3 text-sm leading-7 text-muted">
            {(article.raw("factorsItems") as string[]).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h2 className="mb-4 mt-10 text-2xl">{article("bacTitle")}</h2>
          <p className="mb-4 text-sm leading-7 text-muted">
            {article("bacBody")}
          </p>

          <h2 className="mb-4 mt-10 text-2xl">{article("timeTitle")}</h2>
          <p className="mb-4 text-sm leading-7 text-muted">
            {article("timeBody")}
          </p>

          <h2 className="mb-4 mt-10 text-2xl">{article("calculatorTitle")}</h2>
          <p className="mb-4 text-sm leading-7 text-muted">
            {article("calculatorBody")}
          </p>

          <h2 className="mb-4 mt-10 text-2xl">{article("safeTitle")}</h2>
          <p className="mb-4 text-sm leading-7 text-muted">
            {article("safeBody")}
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
