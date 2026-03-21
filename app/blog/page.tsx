import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "BAC Calculator Blog - Learn About Blood Alcohol Content",
  description:
    "Research-backed articles about BAC, legal limits, the Widmark formula, and how calculator estimates compare to breathalyzers.",
  path: "/blog",
});

const posts = [
  {
    slug: "how-bac-is-calculated",
    title: "How BAC Is Calculated: The Widmark Formula Explained",
    excerpt:
      "A deep dive into the formula behind BAC estimates, what the variables mean, and where the model has limits.",
    date: "2025-01-15",
    readTime: "6 min",
  },
  {
    slug: "legal-bac-limits-by-state",
    title: "Legal BAC Limits by State: A Complete 2025 Guide",
    excerpt:
      "Selected US state limits, commercial driver thresholds, and under-21 zero tolerance policies.",
    date: "2025-01-20",
    readTime: "8 min",
  },
  {
    slug: "bac-calculator-vs-breathalyzer",
    title: "BAC Calculator vs Breathalyzer: Which Is More Accurate?",
    excerpt:
      "How BAC calculators compare with breathalyzers and blood tests for speed, accuracy, and legal use.",
    date: "2025-02-01",
    readTime: "5 min",
  },
];

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section className="border-b border-border py-20">
          <div className="mx-auto w-full max-w-3xl px-6">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accent">
              Learn
            </p>
            <h1 className="mb-4 text-4xl md:text-5xl">
              BAC and blood alcohol content explained clearly.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-muted">
              Research-backed articles about how BAC calculators work, legal
              driving thresholds, and the science of alcohol metabolism.
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="mx-auto w-full max-w-3xl divide-y divide-border px-6">
            {posts.map((post) => (
              <article key={post.slug} className="py-8">
                <Link href={`/blog/${post.slug}`} className="group block">
                  <p className="mb-2 font-mono text-xs text-muted">
                    {post.date} · {post.readTime} read
                  </p>
                  <h2 className="mb-2 text-2xl transition-colors group-hover:text-accent">
                    {post.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-muted">
                    {post.excerpt}
                  </p>
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
