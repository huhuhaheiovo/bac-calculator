import { LEGAL_LIMITS } from "@/lib/constants";

const usLimits = [
  { state: "Most States", limit: "0.08%", note: "Standard federal guideline" },
  { state: "Utah", limit: "0.05%", note: "Strictest in the US" },
  { state: "Under 21", limit: "0.00%", note: "Zero tolerance laws" },
  { state: "CDL Drivers", limit: "0.04%", note: "Commercial vehicle operators" },
];

export default function LegalLimits() {
  return (
    <section className="border-b border-border py-16">
      <div className="mx-auto w-full max-w-5xl px-6">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent">
          Legal Reference
        </p>
        <h2 className="mb-4 text-3xl md:text-4xl">
          Legal BAC Limits by State and Country
        </h2>
        <p className="mb-8 max-w-2xl text-sm leading-relaxed text-muted">
          The legal BAC limit for driving varies by jurisdiction and driver
          category. A legal BAC does not mean you are safe to drive.
        </p>

        <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent">
          United States
        </h3>
        <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {usLimits.map((entry) => (
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
          International
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {LEGAL_LIMITS.slice(0, 6).map((limit) => (
            <div key={limit.id} className="rounded-sm border border-border bg-card p-4">
              <p className="mb-1 font-mono text-xs uppercase tracking-wide text-muted">
                {limit.label} {limit.country}
              </p>
              <p className="mb-1 font-mono text-2xl font-semibold text-accent-warm">
                {limit.limitPercent.toFixed(2)}%
              </p>
              <p className="font-mono text-xs text-muted/70">{limit.notes}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 max-w-2xl text-xs leading-relaxed text-muted">
          Always verify the current legal BAC limit with your local authority
          before driving. Laws can change and often vary by age, license type,
          and prior offenses.
        </p>
      </div>
    </section>
  );
}
