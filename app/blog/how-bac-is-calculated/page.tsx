import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "How BAC Is Calculated: The Widmark Formula Explained",
  description:
    "Learn how BAC calculators use the Widmark formula, distribution constants, and metabolism rate to estimate blood alcohol content.",
  path: "/blog/how-bac-is-calculated",
});

export default function HowBACIsCalculatedPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <article className="mx-auto w-full max-w-3xl px-6 py-16">
          <Link
            href="/blog"
            className="mb-8 inline-block font-mono text-xs text-muted transition-colors hover:text-accent"
          >
            Back to Learn
          </Link>

          <p className="mb-3 font-mono text-xs text-muted">2025-01-15 · 6 min read</p>
          <h1 className="mb-6 text-4xl leading-tight md:text-5xl">
            How BAC Is Calculated: The Widmark Formula Explained
          </h1>
          <p className="mb-6 text-base leading-8 text-muted">
            Every online BAC calculator is built on the same foundation: the
            Widmark formula. Understanding how that formula works helps you
            interpret estimates more realistically and see where the model has
            limits.
          </p>

          <h2 className="mb-4 mt-10 text-2xl">The Core Formula</h2>
          <div className="mb-6 rounded-sm border border-border bg-card p-5 font-mono text-sm text-accent">
            BAC = (A / (W x r)) x 100 - (0.015 x T)
          </div>
          <ul className="mb-6 space-y-2 text-sm text-muted">
            <li>
              <strong className="text-text">A</strong> is total alcohol consumed
              in grams.
            </li>
            <li>
              <strong className="text-text">W</strong> is body weight in grams.
            </li>
            <li>
              <strong className="text-text">r</strong> is the Widmark
              distribution constant.
            </li>
            <li>
              <strong className="text-text">T</strong> is hours elapsed since
              drinking began.
            </li>
          </ul>

          <h2 className="mb-4 mt-10 text-2xl">The Distribution Constant</h2>
          <p className="mb-4 text-sm leading-7 text-muted">
            The distribution constant estimates how alcohol disperses through
            body water. Because body composition differs on average, the
            standard Widmark model uses different constants for males and
            females.
          </p>

          <h2 className="mb-4 mt-10 text-2xl">Converting Drinks to Alcohol</h2>
          <p className="mb-4 text-sm leading-7 text-muted">
            A standard US drink contains about 14 grams of pure alcohol. BAC
            calculators first convert drink count and drink type into grams of
            alcohol before applying the formula.
          </p>

          <h2 className="mb-4 mt-10 text-2xl">The Metabolism Rate</h2>
          <p className="mb-4 text-sm leading-7 text-muted">
            The liver metabolizes alcohol over time, and a commonly used average
            is 0.015% BAC per hour. That is why only time lowers BAC in a
            meaningful way.
          </p>

          <h2 className="mb-4 mt-10 text-2xl">Limitations of Any Calculator</h2>
          <p className="mb-4 text-sm leading-7 text-muted">
            Food, medication, hydration, genetics, and drink size variation can
            all move actual BAC away from the estimate. Treat any calculator as
            a guide for awareness, not a precise measurement.
          </p>

          <div className="mt-12 border-t border-border pt-8">
            <Link
              href="/bac-calculator"
              className="inline-block rounded-sm bg-accent px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-black"
            >
              Use the BAC Calculator
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
