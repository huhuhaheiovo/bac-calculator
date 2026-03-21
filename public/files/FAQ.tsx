'use client'
// components/content/FAQ.tsx

import { useState } from 'react'

const faqs = [
  {
    q: 'How accurate is this BAC Calculator?',
    a: 'Our BAC Calculator uses the Widmark formula — the standard method used by forensic toxicologists and law enforcement agencies worldwide. While it provides a scientifically validated estimate, individual variations in metabolism, food intake, hydration, medications, and health conditions can cause real BAC to differ by ±15–20%. Always treat BAC Calculator results as an educational estimate, not a precise measurement.',
  },
  {
    q: 'What counts as one standard drink in the BAC Calculator?',
    a: 'In the United States, one standard drink contains 0.6 fl oz (14g) of pure alcohol. This equals one 12 oz regular beer at 5% ABV, one 5 oz glass of wine at 12% ABV, or one 1.5 oz shot of spirits at 40% ABV. Our BAC Calculator uses these standard measurements for each drink type selection.',
  },
  {
    q: 'How long does it take for BAC to return to zero?',
    a: 'The average person metabolizes alcohol at approximately 0.015% BAC per hour, though this varies by individual. At a BAC of 0.08%, it takes roughly 5–6 hours to reach 0.00%. Coffee, cold showers, food, and water do not speed up metabolism — only time lowers BAC. Our BAC Calculator factors in elapsed time automatically using this rate.',
  },
  {
    q: 'Can I use the BAC Calculator to decide if I\'m safe to drive?',
    a: 'No. This BAC Calculator is strictly for educational and awareness purposes. Individual impairment can occur at BAC levels well below the legal limit, and the Widmark formula produces estimates that may not match your actual blood alcohol content. Never use a BAC Calculator — or any app — to decide whether to drive after drinking. Always arrange a designated driver, take public transit, or use a rideshare service.',
  },
  {
    q: 'Why does biological sex affect the BAC Calculator result?',
    a: 'Biological sex affects BAC through two mechanisms. Women typically have a higher percentage of body fat, which does not absorb alcohol, reducing the effective volume of distribution. Women also tend to produce lower levels of alcohol dehydrogenase (ADH), the enzyme responsible for breaking down alcohol. The Widmark formula in our BAC Calculator uses sex-specific distribution constants (r = 0.68 for males, r = 0.55 for females) to account for these physiological differences.',
  },
  {
    q: 'Does eating food lower my BAC?',
    a: 'Food does not lower BAC once alcohol is already in your bloodstream — but it significantly slows absorption when consumed before or during drinking. A full stomach can delay peak BAC and reduce its maximum level. This is why the BAC Calculator\'s Widmark formula is most accurate when you drink on an empty stomach; if you ate a large meal, your actual BAC may be lower than the estimate shown.',
  },
  {
    q: 'What is the Widmark formula used in this BAC Calculator?',
    a: 'The Widmark formula is: BAC = (Alcohol in grams / Body weight in grams × r) × 100 − (0.015 × hours elapsed). The variable r is a sex-specific distribution constant (0.68 for males, 0.55 for females) that accounts for differences in body water content. Developed by Swedish physician Erik Widmark in the 1930s, it remains the gold standard for BAC estimation in forensic toxicology.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-16 border-b border-border">
      <div className="max-w-3xl mx-auto px-6">
        <p className="font-mono text-xs text-accent uppercase tracking-widest mb-3">Help</p>
        <h2 className="font-serif text-2xl md:text-3xl mb-4">BAC Calculator FAQ</h2>
        <p className="text-muted text-sm leading-relaxed max-w-xl mb-10">
          Common questions about blood alcohol content, the BAC Calculator, the Widmark formula,
          and responsible drinking.
        </p>

        <div className="divide-y divide-border">
          {faqs.map((faq, i) => (
            <div key={i} className="py-5">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left flex items-start justify-between gap-4 group"
              >
                <span className="text-text text-base font-medium leading-snug group-hover:text-accent transition-colors">
                  {faq.q}
                </span>
                <span className="font-mono text-lg text-accent flex-shrink-0 mt-0.5 transition-transform duration-200"
                  style={{ transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                  +
                </span>
              </button>

              <div className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: open === i ? '400px' : '0px', opacity: open === i ? 1 : 0 }}>
                <p className="text-muted text-sm leading-relaxed pt-4 max-w-2xl">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
