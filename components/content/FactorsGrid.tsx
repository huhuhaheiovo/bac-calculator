import {getTranslations} from "next-intl/server";

type FactorItem = {
  title: string;
  body: string;
};

export default async function FactorsGrid() {
  const t = await getTranslations("factors");
  const items = t.raw("items") as FactorItem[];

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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((factor, index) => (
            <article
              key={factor.title}
              className="rounded-sm border border-border bg-card p-5 transition-colors hover:border-accent/30"
            >
              <p className="mb-3 font-mono text-xs text-muted">
                0{index + 1}
              </p>
              <h3 className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-accent">
                {factor.title}
              </h3>
              <p className="text-xs leading-relaxed text-muted">{factor.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
