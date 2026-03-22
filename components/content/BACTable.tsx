import {getTranslations} from "next-intl/server";

const dots = ["#00d4aa", "#80e040", "#ffd166", "#ff6b35", "#ff4757"];

type TableRow = {
  range: string;
  level: string;
  effects: string;
};

export default async function BACTable() {
  const t = await getTranslations("table");
  const rows = t.raw("rows") as TableRow[];
  const headers = t.raw("headers") as string[];

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

        <div className="overflow-hidden rounded-[1.5rem] border border-border bg-card">
          <div className="md:hidden">
            {rows.map((row, index) => (
              <article
                key={row.range}
                className="border-b border-white/5 p-5 last:border-none"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="inline-block h-3 w-3 rounded-full"
                    style={{background: dots[index]}}
                  />
                  <p className="font-mono text-lg text-text">{row.range}</p>
                </div>

                <div className="mt-4 grid gap-4">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                      {headers[1]}
                    </p>
                    <p className="mt-2 text-base text-muted">{row.level}</p>
                  </div>

                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                      {headers[2]}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-muted">{row.effects}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <table className="hidden w-full border-collapse font-mono text-sm md:table">
            <thead>
              <tr>
                {headers.map((heading) => (
                  <th
                    key={heading}
                    className="border-b border-border px-4 py-4 text-left text-xs uppercase tracking-[0.2em] text-accent"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr
                  key={row.range}
                  className="border-b border-white/5 last:border-none"
                >
                  <td className="whitespace-nowrap px-4 py-5 text-text">
                    <span
                      className="mr-2 inline-block h-2.5 w-2.5 rounded-full align-middle"
                      style={{background: dots[index]}}
                    />
                    {row.range}
                  </td>
                  <td className="whitespace-nowrap px-4 py-5 text-muted">
                    {row.level}
                  </td>
                  <td className="px-4 py-5 text-xs leading-relaxed text-muted">
                    {row.effects}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
