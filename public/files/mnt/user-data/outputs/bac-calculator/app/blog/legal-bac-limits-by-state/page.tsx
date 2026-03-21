// app/blog/legal-bac-limits-by-state/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata } from '@/lib/metadata'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = buildMetadata({
  title: 'Legal BAC Limits by State 2025 – Complete US Guide | bac-calculators.org',
  description: 'Every US state\'s legal blood alcohol content limit for driving in 2025. Includes limits for commercial drivers, under-21, and first-offense penalties.',
  path: '/blog/legal-bac-limits-by-state',
})

const stateLimits = [
  { state: 'Alabama', standard: '0.08%', cdl: '0.04%', under21: '0.02%' },
  { state: 'Alaska', standard: '0.08%', cdl: '0.04%', under21: '0.00%' },
  { state: 'Arizona', standard: '0.08%', cdl: '0.04%', under21: '0.00%' },
  { state: 'California', standard: '0.08%', cdl: '0.04%', under21: '0.01%' },
  { state: 'Colorado', standard: '0.08%', cdl: '0.04%', under21: '0.02%' },
  { state: 'Florida', standard: '0.08%', cdl: '0.04%', under21: '0.02%' },
  { state: 'Georgia', standard: '0.08%', cdl: '0.04%', under21: '0.02%' },
  { state: 'Illinois', standard: '0.08%', cdl: '0.04%', under21: '0.00%' },
  { state: 'New York', standard: '0.08%', cdl: '0.04%', under21: '0.02%' },
  { state: 'Texas', standard: '0.08%', cdl: '0.04%', under21: '0.00%' },
  { state: 'Utah', standard: '0.05%', cdl: '0.04%', under21: '0.00%' },
  { state: 'Washington', standard: '0.08%', cdl: '0.04%', under21: '0.02%' },
]

export default function LegalBACLimitsByState() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <article className="max-w-2xl mx-auto px-6 py-16">

          <Link href="/blog" className="font-mono text-xs text-muted hover:text-accent transition-colors mb-8 inline-block">
            ← Back to Learn
          </Link>

          <p className="font-mono text-xs text-muted mb-3">2025-01-20 · 8 min read</p>
          <h1 className="font-serif text-3xl md:text-4xl leading-tight mb-6">
            Legal BAC Limits by State: A Complete 2025 Guide
          </h1>
          <p className="text-muted text-base leading-relaxed mb-6">
            Understanding the legal blood alcohol content limit in your state is critical before 
            you get behind the wheel. Use our <Link href="/bac-calculator" className="text-accent hover:underline">BAC Calculator</Link> to 
            estimate your BAC, then compare it to the legal limit where you are.
          </p>

          <h2 className="font-serif text-2xl mt-10 mb-4">The Federal Standard: 0.08%</h2>
          <p className="text-muted text-sm leading-relaxed mb-4">
            In 1998, the US Congress established 0.08% as the national standard BAC limit for 
            drivers aged 21 and over, tying federal highway funding to state compliance. All 50 
            states now follow this standard — with one exception: Utah, which lowered its limit 
            to <strong className="text-text">0.05%</strong> in 2019, making it the strictest DUI 
            threshold in the nation.
          </p>

          <h2 className="font-serif text-2xl mt-10 mb-4">BAC Limits by State (Selected)</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full border-collapse font-mono text-xs">
              <thead>
                <tr>
                  {['State', 'Standard (21+)', 'CDL Drivers', 'Under 21'].map(h => (
                    <th key={h} className="text-left px-3 py-3 text-accent uppercase tracking-wide border-b border-border">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {stateLimits.map((row, i) => (
                  <tr key={i} className="border-b border-border/40 last:border-none hover:bg-surface/50 transition-colors">
                    <td className="px-3 py-3 text-text font-semibold">{row.state}</td>
                    <td className="px-3 py-3 text-muted" style={{ color: row.standard === '0.05%' ? 'var(--accent)' : undefined }}>{row.standard}</td>
                    <td className="px-3 py-3 text-muted">{row.cdl}</td>
                    <td className="px-3 py-3 text-muted">{row.under21}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="font-serif text-2xl mt-10 mb-4">Zero Tolerance Laws (Under 21)</h2>
          <p className="text-muted text-sm leading-relaxed mb-4">
            Every US state has a zero-tolerance or near-zero BAC limit for drivers under 21. 
            Most states set this at 0.00% or 0.02% — low enough that a single drink can 
            result in a DUI charge for an underage driver. Use the BAC Calculator with your 
            actual age in mind when assessing legal risk.
          </p>

          <h2 className="font-serif text-2xl mt-10 mb-4">Commercial Driver Limits (CDL)</h2>
          <p className="text-muted text-sm leading-relaxed mb-4">
            Commercial vehicle operators are held to a stricter standard of 
            <strong className="text-text"> 0.04% BAC</strong> in all 50 states. This applies 
            to truck drivers, bus drivers, and anyone operating a commercial motor vehicle (CMV). 
            A CDL driver can lose their license for a first offense even if their BAC is well 
            below the standard 0.08% limit.
          </p>

          <div className="mt-12 pt-8 border-t border-border">
            <p className="font-mono text-xs text-muted mb-4">Check your BAC before you drive.</p>
            <Link href="/bac-calculator"
              className="inline-block bg-accent text-bg font-mono text-xs font-semibold uppercase tracking-widest px-6 py-3 rounded-sm hover:opacity-90 transition-opacity">
              Use the BAC Calculator →
            </Link>
          </div>

        </article>
      </main>
      <Footer />
    </>
  )
}
