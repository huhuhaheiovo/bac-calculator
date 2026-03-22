import {getTranslations} from "next-intl/server";

type ReferenceItem = {
  title: string;
  body: string;
};

export default async function MethodReferences() {
  const t = await getTranslations("references");
  const items = t.raw("items") as ReferenceItem[];

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

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.title}
              className="rounded-sm border border-border bg-card p-5"
            >
              <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-accent">
                {item.title}
              </h3>
              <p className="text-sm leading-7 text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
