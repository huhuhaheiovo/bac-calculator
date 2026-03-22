// app/blog/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata } from '@/lib/metadata'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = buildMetadata({
  title: 'BAC Calculator Blog – Learn About Blood Alcohol Content | baccalculator.me',
  description: 'Articles about blood alcohol content, the BAC Calculator formula, legal limits by state, and responsible drinking science.',
  path: '/blog',
})

const posts = [
  {
    slug: 'how-bac-is-calculated',
    title: 'How BAC Is Calculated: The Widmark Formula Explained',
    excerpt: 'A deep dive into the science behind every BAC Calculator — how the Widmark formula works, what the variables mean, and its limitations.',
    date: '2025-01-15',
    readTime: '6 min',
  },
  {
    slug: 'legal-bac-limits-by-state',
    title: 'Legal BAC Limits by State: A Complete 2025 Guide',
    excerpt: 'Every US state\'s legal blood alcohol limit for driving, commercial vehicles, and drivers under 21. Updated for 2025.',
    date: '2025-01-20',
    readTime: '8 min',
  },
  {
    slug: 'bac-calculator-vs-breathalyzer',
    title: 'BAC Calculator vs Breathalyzer: Which Is More Accurate?',
    excerpt: 'How online BAC Calculators compare to roadside breathalyzers and lab blood tests — accuracy, legality, and practical differences.',
    date: '2025-02-01',
    readTime: '5 min',
  },
]

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section className="py-20 border-b border-border">
          <div className="max-w-3xl mx-auto px-6">
            <p className="font-mono text-xs text-accent uppercase tracking-widest mb-4">Learn</p>
            <h1 className="font-serif text-4xl mb-4">BAC & Blood Alcohol Content — The Science</h1>
            <p className="text-muted text-base max-w-lg leading-relaxed">
              Research-backed articles about how BAC Calculators work, legal limits, and
              the science of alcohol metabolism.
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-3xl mx-auto px-6 divide-y divide-border">
            {posts.map(post => (
              <article key={post.slug} className="py-8 group">
                <Link href={`/blog/${post.slug}`}>
                  <p className="font-mono text-xs text-muted mb-2">
                    {post.date} · {post.readTime} read
                  </p>
                  <h2 className="font-serif text-xl mb-2 group-hover:text-accent transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-muted text-sm leading-relaxed">{post.excerpt}</p>
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
