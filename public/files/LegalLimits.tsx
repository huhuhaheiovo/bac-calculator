// components/content/LegalLimits.tsx
import { LEGAL_LIMITS } from '@/lib/constants'

const uStates = [
  { state: 'Most States',  limit: '0.08%', note: 'Standard federal guideline' },
  { state: 'Utah',         limit: '0.05%', note: 'Strictest in the US' },
  { state: 'Under 21',     limit: '0.00%', note: 'Zero tolerance nationwide' },
  { state: 'CDL Drivers',  limit: '0.04%', note: 'Commercial vehicle operators' },
]

export default function LegalLimits() {
  return (
    <section className="py-16 border-b border-border">
      <div className="max-w-3xl mx-auto px-6">
        <p className="font-mono text-xs text-accent uppercase tracking-widest mb-3">Legal Reference</p>
        <h2 className="font-serif text-2xl md:text-3xl mb-4">Legal BAC Limits by State &amp; Country</h2>
        <p className="text-muted text-sm leading-relaxed max-w-xl mb-2">
          The legal BAC limit for driving varies significantly by jurisdiction. In the United States,
          the standard legal limit is <strong className="text-text">0.08%</strong> for drivers aged
          21 and over — but Utah lowered its limit to 0.05% in 2019. Use our BAC Calculator to
          always stay well below these thresholds.
        </p>
        <p className="text-muted text-sm leading-relaxed max-w-xl mb-8">
          Important: a legal BAC does not mean you are safe to drive. Impairment begins below
          the legal limit for many people, especially those with lower alcohol tolerance.
        </p>

        {/* US breakdown */}
        <h3 className="font-mono text-xs text-accent uppercase tracking-widest mb-4">United States</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {uStates.map((s, i) => (
            <div key={i} className="bg-card border border-border rounded-sm p-4">
              <div className="font-mono text-xs text-muted uppercase tracking-wide mb-1">{s.state}</div>
              <div className="font-mono text-2xl font-semibold text-caution mb-1"
                style={{ color: 'var(--accent3)' }}>{s.limit}</div>
              <div className="font-mono text-xs text-muted/70">{s.note}</div>
            </div>
          ))}
        </div>

        {/* International */}
        <h3 className="font-mono text-xs text-accent uppercase tracking-widest mb-4">International</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {LEGAL_LIMITS.map((l, i) => (
            <div key={i} className="bg-card border border-border rounded-sm p-4">
              <div className="font-mono text-xs text-muted uppercase tracking-wide mb-1">
                {l.flag} {l.country}
              </div>
              <div className="font-mono text-2xl font-semibold mb-1"
                style={{ color: 'var(--accent3)' }}>
                {l.limitPercent.toFixed(2)}%
              </div>
              <div className="font-mono text-xs text-muted/70">{l.notes}</div>
            </div>
          ))}
        </div>

        <p className="text-muted text-xs leading-relaxed mt-6 max-w-xl">
          Always verify the current legal BAC limit with your local authority before driving.
          Laws change and vary by vehicle class, age, and prior offenses.
        </p>
      </div>
    </section>
  )
}
