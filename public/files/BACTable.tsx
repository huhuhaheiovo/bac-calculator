// components/content/BACTable.tsx

const levels = [
  { range: '0.01 – 0.05%', dot: '#00d4aa', level: 'Sober / Minimal',      effects: 'Slight relaxation and mild mood lift. Reaction time is largely unaffected. Below legal limits in all jurisdictions.' },
  { range: '0.06 – 0.08%', dot: '#80e040', level: 'Mildly Impaired',      effects: 'Reduced inhibition and subtly impaired judgment. Fine motor control begins to decline. At or near the 0.08% US legal limit.' },
  { range: '0.09 – 0.15%', dot: '#ffd166', level: 'Impaired',             effects: 'Noticeable balance, coordination, and reaction impairment. Slurred speech and memory gaps common. Above legal limits in most countries.' },
  { range: '0.16 – 0.25%', dot: '#ff6b35', level: 'Severely Impaired',   effects: 'Major loss of coordination and balance. Nausea and disorientation. Significant blackout risk. Do not drive under any circumstances.' },
  { range: '0.26%+',       dot: '#ff4757', level: 'Potentially Fatal',    effects: 'Risk of alcohol poisoning, loss of consciousness, and respiratory suppression. Seek emergency medical attention immediately.' },
]

export default function BACTable() {
  return (
    <section className="py-16 border-b border-border">
      <div className="max-w-3xl mx-auto px-6">
        <p className="font-mono text-xs text-accent uppercase tracking-widest mb-3">Education</p>
        <h2 className="font-serif text-2xl md:text-3xl mb-4">What Your BAC Level Really Means</h2>
        <p className="text-muted text-sm leading-relaxed max-w-xl mb-3">
          Blood alcohol content (BAC) measures grams of alcohol per deciliter of blood. Even a
          <strong className="text-text"> BAC of 0.02%</strong> can subtly impair divided-attention
          tasks — far below any legal limit. Use this BAC Calculator to understand your number
          before making any decisions.
        </p>
        <p className="text-muted text-sm leading-relaxed max-w-xl mb-8">
          The table below maps BAC ranges to their typical physiological effects, based on data
          from the National Highway Traffic Safety Administration (NHTSA) and peer-reviewed
          toxicology research.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse font-mono text-sm">
            <thead>
              <tr>
                {['BAC Range', 'Level', 'Typical Effects'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs text-accent uppercase tracking-widest border-b border-border">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {levels.map((row, i) => (
                <tr key={i} className="border-b border-border/50 last:border-none hover:bg-surface/50 transition-colors">
                  <td className="px-4 py-4 text-text font-semibold whitespace-nowrap">
                    <span className="inline-block w-2 h-2 rounded-full mr-2 align-middle"
                      style={{ background: row.dot }} />
                    {row.range}
                  </td>
                  <td className="px-4 py-4 text-muted whitespace-nowrap">{row.level}</td>
                  <td className="px-4 py-4 text-muted text-xs leading-relaxed">{row.effects}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
