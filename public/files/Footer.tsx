// components/layout/Footer.tsx
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="max-w-3xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between gap-8">

          <div>
            <div className="font-mono text-sm font-semibold text-accent mb-2">
              bac-calculators.org
            </div>
            <p className="font-mono text-xs text-muted leading-relaxed max-w-xs">
              Free BAC Calculator powered by the Widmark formula.<br />
              No ads. No login. No data collected.
            </p>
          </div>

          <div className="flex gap-12">
            <div>
              <div className="font-mono text-xs text-accent uppercase tracking-widest mb-3">Tools</div>
              <ul className="space-y-2">
                <li><Link href="/bac-calculator" className="font-mono text-xs text-muted hover:text-text transition-colors">BAC Calculator</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-mono text-xs text-accent uppercase tracking-widest mb-3">Learn</div>
              <ul className="space-y-2">
                <li><Link href="/blog/how-bac-is-calculated" className="font-mono text-xs text-muted hover:text-text transition-colors">How BAC Is Calculated</Link></li>
                <li><Link href="/blog/legal-bac-limits-by-state" className="font-mono text-xs text-muted hover:text-text transition-colors">Legal Limits by State</Link></li>
                <li><Link href="/blog/bac-calculator-vs-breathalyzer" className="font-mono text-xs text-muted hover:text-text transition-colors">BAC vs Breathalyzer</Link></li>
              </ul>
            </div>
          </div>

        </div>

        <div className="mt-10 pt-6 border-t border-border">
          <p className="font-mono text-xs text-muted/60 leading-relaxed max-w-2xl">
            © {new Date().getFullYear()} bac-calculators.org — This BAC Calculator is provided for
            educational purposes only. It does not constitute medical or legal advice.
            Never drink and drive. If you or someone you know struggles with alcohol,
            contact SAMHSA: <span className="text-muted">1-800-662-4357</span>.
          </p>
        </div>

      </div>
    </footer>
  )
}
