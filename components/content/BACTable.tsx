const levels = [
  {
    range: "0.01 - 0.05%",
    dot: "#00d4aa",
    level: "Sober / Minimal",
    effects:
      "Slight relaxation and mild mood lift. Reaction time is largely unaffected. Below legal limits in all jurisdictions.",
  },
  {
    range: "0.06 - 0.08%",
    dot: "#80e040",
    level: "Mildly Impaired",
    effects:
      "Reduced inhibition and subtly impaired judgment. Fine motor control begins to decline. At or near the 0.08% US legal limit.",
  },
  {
    range: "0.09 - 0.15%",
    dot: "#ffd166",
    level: "Impaired",
    effects:
      "Noticeable balance, coordination, and reaction impairment. Slurred speech and memory gaps become more common.",
  },
  {
    range: "0.16 - 0.25%",
    dot: "#ff6b35",
    level: "Severely Impaired",
    effects:
      "Major loss of coordination and balance. Nausea and disorientation are common. Blackout risk rises sharply.",
  },
  {
    range: "0.26%+",
    dot: "#ff4757",
    level: "Potentially Fatal",
    effects:
      "Risk of alcohol poisoning, loss of consciousness, and respiratory suppression. Seek emergency medical attention immediately.",
  },
];

export default function BACTable() {
  return (
    <section className="border-b border-border py-16">
      <div className="mx-auto w-full max-w-5xl px-6">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent">
          Education
        </p>
        <h2 className="mb-4 text-3xl md:text-4xl">
          What Your BAC Level Really Means
        </h2>
        <p className="mb-8 max-w-2xl text-sm leading-relaxed text-muted">
          Blood alcohol content measures grams of alcohol per deciliter of
          blood. Even a BAC of 0.02% can affect divided-attention tasks. Use
          this table as context for the number you see in the calculator.
        </p>

        <div className="overflow-x-auto rounded-sm border border-border bg-card">
          <table className="w-full border-collapse font-mono text-sm">
            <thead>
              <tr>
                {["BAC Range", "Level", "Typical Effects"].map((heading) => (
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
              {levels.map((row) => (
                <tr
                  key={row.range}
                  className="border-b border-white/5 last:border-none"
                >
                  <td className="whitespace-nowrap px-4 py-4 text-text">
                    <span
                      className="mr-2 inline-block h-2 w-2 rounded-full align-middle"
                      style={{ background: row.dot }}
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
