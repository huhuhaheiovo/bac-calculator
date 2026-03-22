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

        <div className="overflow-x-auto rounded-sm border border-border bg-card">
          <table className="w-full border-collapse font-mono text-sm">
            <thead>
              <tr>
                {headers.map((heading) => (
                  <th
                    key={heading}
                    className="border-b border-border px-4 py-3 text-left text-xs uppercase tracking-[0.2em] text-accent"
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
                  <td className="whitespace-nowrap px-4 py-4 text-text">
                    <span
                      className="mr-2 inline-block h-2 w-2 rounded-full align-middle"
                      style={{background: dots[index]}}
                    />
                    {row.range}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-muted">
                    {row.level}
                  </td>
                  <td className="px-4 py-4 text-xs leading-relaxed text-muted">
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
