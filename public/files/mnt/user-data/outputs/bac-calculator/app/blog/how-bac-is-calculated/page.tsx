// app/blog/how-bac-is-calculated/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata } from '@/lib/metadata'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = buildMetadata({
  title: 'How BAC Is Calculated: The Widmark Formula Explained | bac-calculators.org',
  description: 'Learn how every BAC Calculator works — the Widmark formula, distribution constants, metabolism rate, and why results vary between individuals.',
  path: '/blog/how-bac-is-calculated',
})

export default function HowBACIsCalculated() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <article className="max-w-2xl mx-auto px-6 py-16">

          <Link href="/blog" className="font-mono text-xs text-muted hover:text-accent transition-colors mb-8 inline-block">
            ← Back to Learn
          </Link>

          <p className="font-mono text-xs text-muted mb-3">2025-01-15 · 6 min read</p>
          <h1 className="font-serif text-3xl md:text-4xl leading-tight mb-6">
            How BAC Is Calculated: The Widmark Formula Explained
          </h1>
          <p className="text-muted text-base leading-relaxed mb-6">
            Every online BAC Calculator — including ours — is built on the same foundation: 
            the <strong className="text-text">Widmark formula</strong>, developed by Swedish 
            physician Erik M.P. Widmark in the 1930s. Understanding how this formula works 
            helps you interpret BAC Calculator results accurately and appreciate their limitations.
          </p>

          <h2 className="font-serif text-2xl mt-10 mb-4">The Core Formula</h2>
          <div className="bg-card border border-border rounded-sm p-5 font-mono text-sm text-accent mb-6">
            BAC = (A / (W × r)) × 100 − (0.015 × T)
          </div>
          <p className="text-muted text-sm leading-relaxed mb-4">Where:</p>
          <ul className="space-y-2 mb-6 text-sm text-muted">
            <li><strong className="text-text font-mono">A</strong> — Total alcohol consumed in grams</li>
            <li><strong className="text-text font-mono">W</strong> — Body weight in grams</li>
            <li><strong className="text-text font-mono">r</strong> — Widmark distribution constant (0.68 male / 0.55 female)</li>
            <li><strong className="text-text font-mono">T</strong> — Time elapsed since drinking began, in hours</li>
            <li><strong className="text-text font-mono">0.015</strong> — Average hourly BAC metabolism rate</li>
          </ul>

          <h2 className="font-serif text-2xl mt-10 mb-4">The Distribution Constant (r)</h2>
          <p className="text-muted text-sm leading-relaxed mb-4">
            The variable <em>r</em> represents how alcohol distributes through body tissues. 
            Alcohol dissolves in water but not fat — so individuals with a higher percentage 
            of body water relative to fat will have lower peak BAC. This is why the BAC 
            Calculator uses different constants for biological males (0.68) and females (0.55): 
            women typically carry a higher proportion of body fat, resulting in less body water 
            to dilute alcohol.
          </p>

          <h2 className="font-serif text-2xl mt-10 mb-4">Converting Drinks to Grams of Alcohol</h2>
          <p className="text-muted text-sm leading-relaxed mb-4">
            One US standard drink contains 0.6 fl oz of pure ethanol, which equals approximately 
            <strong className="text-text"> 14 grams</strong>. Our BAC Calculator converts each 
            drink type to its alcohol content in grams before applying the formula. A 12 oz beer 
            at 5% ABV contains roughly 14g of alcohol; a 5 oz glass of wine at 12% ABV contains 
            the same.
          </p>

          <h2 className="font-serif text-2xl mt-10 mb-4">The Metabolism Rate</h2>
          <p className="text-muted text-sm leading-relaxed mb-4">
            The liver metabolizes alcohol at approximately <strong className="text-text">0.015% BAC 
            per hour</strong> on average, regardless of body weight, sex, or how much water you drink. 
            This is why no amount of coffee, exercise, or cold showers will sober you up faster — 
            only time reduces BAC. Our BAC Calculator subtracts this rate from raw BAC based on 
            the hours elapsed you enter.
          </p>

          <h2 className="font-serif text-2xl mt-10 mb-4">Limitations of Any BAC Calculator</h2>
          <p className="text-muted text-sm leading-relaxed mb-4">
            The Widmark formula is the gold standard for BAC estimation, but it has real limitations. 
            It does not account for food consumed (which slows absorption significantly), individual 
            variation in metabolism enzymes, medications, hydration levels, or liver health. Real-world 
            BAC can vary ±15–20% from any BAC Calculator estimate. Always treat results as educational 
            approximations, not clinical measurements.
          </p>

          <div className="mt-12 pt-8 border-t border-border">
            <p className="font-mono text-xs text-muted mb-4">Ready to calculate your BAC?</p>
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
