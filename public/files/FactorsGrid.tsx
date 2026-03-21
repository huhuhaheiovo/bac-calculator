// components/content/FactorsGrid.tsx

const factors = [
  {
    icon: '⚖️',
    title: 'Body Weight',
    body: 'Heavier individuals have a larger volume of body fluids, diluting alcohol more efficiently. A 120 lb person reaches a much higher BAC than a 200 lb person after identical drinks — our BAC Calculator accounts for this directly.',
  },
  {
    icon: '⚥',
    title: 'Biological Sex',
    body: 'Women typically have higher body fat percentage, lower total body water, and produce less alcohol dehydrogenase (ADH) enzyme. Both factors elevate BAC relative to men of the same weight, which is why the BAC Calculator uses sex-specific Widmark constants.',
  },
  {
    icon: '🕐',
    title: 'Time Elapsed',
    body: 'Your liver metabolizes alcohol at roughly 0.015% BAC per hour on average. The longer you wait after drinking, the lower your blood alcohol content. Enter elapsed time into the BAC Calculator to see how your BAC declines over time.',
  },
  {
    icon: '🍽️',
    title: 'Food Intake',
    body: 'Eating before or during drinking significantly slows alcohol absorption into the bloodstream. An empty stomach can nearly double peak BAC compared to drinking after a full meal — a variable the Widmark formula does not directly capture.',
  },
  {
    icon: '💊',
    title: 'Medications',
    body: 'Many prescription and OTC medications interact with alcohol, amplifying impairment or accelerating BAC rise. Antihistamines, benzodiazepines, and opioids are especially dangerous. Always consult your pharmacist before drinking.',
  },
  {
    icon: '🧬',
    title: 'Genetics & Tolerance',
    body: 'Genetic variants in ADH and ALDH2 enzymes cause significant variation in metabolism speed across individuals and ethnic groups. Tolerance affects how impaired you feel — but it does NOT lower your actual BAC level.',
  },
]

export default function FactorsGrid() {
  return (
    <section className="py-16 border-b border-border">
      <div className="max-w-3xl mx-auto px-6">
        <p className="font-mono text-xs text-accent uppercase tracking-widest mb-3">Science</p>
        <h2 className="font-serif text-2xl md:text-3xl mb-4">Factors That Affect Your BAC</h2>
        <p className="text-muted text-sm leading-relaxed max-w-xl mb-8">
          No two people metabolize alcohol identically. Our BAC Calculator uses the Widmark
          formula to account for the major physiological variables. Understanding these
          factors helps you interpret your BAC Calculator results more accurately.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {factors.map((f, i) => (
            <div key={i} className="bg-card border border-border rounded-sm p-5 hover:border-accent/30 transition-colors">
              <div className="text-2xl mb-3">{f.icon}</div>
              <h3 className="font-mono text-xs text-accent uppercase tracking-widest mb-2">{f.title}</h3>
              <p className="text-muted text-xs leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
