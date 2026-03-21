import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Legal BAC Limits by State 2025",
  description:
    "Selected US legal BAC limits for adult drivers, CDL drivers, and drivers under 21, including Utah's stricter threshold.",
  path: "/blog/legal-bac-limits-by-state",
});

const stateLimits = [
  { state: "Alabama", standard: "0.08%", cdl: "0.04%", under21: "0.02%" },
  { state: "Alaska", standard: "0.08%", cdl: "0.04%", under21: "0.00%" },
  { state: "Arizona", standard: "0.08%", cdl: "0.04%", under21: "0.00%" },
  { state: "California", standard: "0.08%", cdl: "0.04%", under21: "0.01%" },
  { state: "Colorado", standard: "0.08%", cdl: "0.04%", under21: "0.02%" },
  { state: "Florida", standard: "0.08%", cdl: "0.04%", under21: "0.02%" },
  { state: "Georgia", standard: "0.08%", cdl: "0.04%", under21: "0.02%" },
  { state: "Illinois", standard: "0.08%", cdl: "0.04%", under21: "0.00%" },
  { state: "New York", standard: "0.08%", cdl: "0.04%", under21: "0.02%" },
  { state: "Texas", standard: "0.08%", cdl: "0.04%", under21: "0.00%" },
  { state: "Utah", standard: "0.05%", cdl: "0.04%", under21: "0.00%" },
  { state: "Washington", standard: "0.08%", cdl: "0.04%", under21: "0.02%" },
];

export default function LegalBACLimitsPage() {
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

          <p className="mb-3 font-mono text-xs text-muted">2025-01-20 · 8 min read</p>
          <h1 className="mb-6 text-4xl leading-tight md:text-5xl">
            Legal BAC Limits by State: A Complete 2025 Guide
          </h1>
          <p className="mb-6 text-base leading-8 text-muted">
            Understanding legal BAC limits helps frame the risk of driving after
            drinking. In most of the United States, the standard limit for adult
            drivers is 0.08%, with stricter rules for Utah, commercial drivers,
            and people under 21.
          </p>

          <h2 className="mb-4 mt-10 text-2xl">The Federal Standard: 0.08%</h2>
          <p className="mb-4 text-sm leading-7 text-muted">
            All states now use 0.08% as the general limit for drivers 21 and
            over, except Utah, which lowered its limit to 0.05% in 2019.
          </p>

          <h2 className="mb-4 mt-10 text-2xl">Selected State Limits</h2>
          <div className="mb-8 overflow-x-auto rounded-sm border border-border bg-card">
            <table className="w-full border-collapse font-mono text-xs">
              <thead>
                <tr>
                  {["State", "Standard (21+)", "CDL Drivers", "Under 21"].map(
                    (heading) => (
                      <th
                        key={heading}
                        className="border-b border-border px-3 py-3 text-left uppercase tracking-wide text-accent"
                      >
                        {heading}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {stateLimits.map((row) => (
                  <tr key={row.state} className="border-b border-white/5 last:border-none">
                    <td className="px-3 py-3 text-text">{row.state}</td>
                    <td className="px-3 py-3 text-muted">{row.standard}</td>
                    <td className="px-3 py-3 text-muted">{row.cdl}</td>
                    <td className="px-3 py-3 text-muted">{row.under21}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="mb-4 mt-10 text-2xl">Zero Tolerance for Under 21</h2>
          <p className="mb-4 text-sm leading-7 text-muted">
            Under-21 limits are commonly 0.00% to 0.02%, which means a single
            drink can create legal risk even when an adult driver might still be
            under the general 0.08% threshold.
          </p>

          <h2 className="mb-4 mt-10 text-2xl">Commercial Driver Limits</h2>
          <p className="mb-4 text-sm leading-7 text-muted">
            CDL drivers are held to a stricter 0.04% standard in every state,
            reflecting the increased safety requirements for commercial vehicles.
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
