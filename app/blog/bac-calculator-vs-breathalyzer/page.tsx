import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "BAC Calculator vs Breathalyzer: Which Is More Accurate?",
  description:
    "Compare BAC calculators, personal breathalyzers, and blood tests across accuracy, speed, cost, and legal reliability.",
  path: "/blog/bac-calculator-vs-breathalyzer",
});

const comparison = [
  {
    aspect: "Method",
    calc: "Widmark formula",
    breath: "Breath sensor estimate",
    blood: "Laboratory blood test",
  },
  {
    aspect: "Accuracy",
    calc: "Approximate estimate",
    breath: "Better with certified devices",
    blood: "Most accurate",
  },
  {
    aspect: "Cost",
    calc: "Free",
    breath: "Device purchase required",
    blood: "Medical or lab fee required",
  },
  {
    aspect: "Legal use",
    calc: "Educational only",
    breath: "May be admissible depending on device and process",
    blood: "Strongest legal evidence",
  },
  {
    aspect: "Speed",
    calc: "Instant",
    breath: "Instant",
    blood: "Delayed",
  },
];

export default function BACCalculatorVsBreathalyzerPage() {
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

          <p className="mb-3 font-mono text-xs text-muted">2025-02-01 · 5 min read</p>
          <h1 className="mb-6 text-4xl leading-tight md:text-5xl">
            BAC Calculator vs Breathalyzer: Which Is More Accurate?
          </h1>
          <p className="mb-6 text-base leading-8 text-muted">
            BAC calculators, breathalyzers, and blood tests all answer similar
            questions in different ways. They vary significantly in accuracy,
            cost, convenience, and legal reliability.
          </p>

          <h2 className="mb-4 mt-10 text-2xl">Comparison at a Glance</h2>
          <div className="mb-8 overflow-x-auto rounded-sm border border-border bg-card">
            <table className="w-full border-collapse font-mono text-xs">
              <thead>
                <tr>
                  {["", "BAC Calculator", "Breathalyzer", "Blood Test"].map(
                    (heading, index) => (
                      <th
                        key={`${heading}-${index}`}
                        className={`border-b border-border px-3 py-3 text-left uppercase tracking-wide ${
                          index === 0 ? "text-muted" : "text-accent"
                        }`}
                      >
                        {heading}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.aspect} className="border-b border-white/5 last:border-none">
                    <td className="px-3 py-3 text-text">{row.aspect}</td>
                    <td className="px-3 py-3 text-muted">{row.calc}</td>
                    <td className="px-3 py-3 text-muted">{row.breath}</td>
                    <td className="px-3 py-3 text-muted">{row.blood}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="mb-4 mt-10 text-2xl">Why Calculators Are Less Accurate</h2>
          <p className="mb-4 text-sm leading-7 text-muted">
            A calculator only knows the information you enter. It cannot measure
            alcohol in your breath or blood, so it must assume average
            metabolism rates and standard drink sizes.
          </p>

          <h2 className="mb-4 mt-10 text-2xl">Breathalyzers: Better, Not Perfect</h2>
          <p className="mb-4 text-sm leading-7 text-muted">
            Personal breathalyzers usually provide a better estimate than a
            calculator, but calibration, breathing pattern, and recent alcohol
            exposure in the mouth can still affect readings.
          </p>

          <h2 className="mb-4 mt-10 text-2xl">Blood Tests: The Gold Standard</h2>
          <p className="mb-4 text-sm leading-7 text-muted">
            Laboratory blood tests are the most accurate measurement and carry
            the strongest legal weight, but they are not instant and are not
            practical for casual use.
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
