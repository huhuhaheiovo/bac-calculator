import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div className="max-w-sm">
            <p className="mb-2 font-mono text-sm font-semibold text-accent">
              bac-calculator.com
            </p>
            <p className="font-mono text-xs leading-relaxed text-muted">
              Free BAC calculator powered by the Widmark formula.
              <br />
              No ads. No login. No data collected.
            </p>
          </div>

          <div className="flex gap-12">
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
                Tools
              </p>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/bac-calculator"
                    className="font-mono text-xs text-muted transition-colors hover:text-text"
                  >
                    BAC Calculator
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
                Learn
              </p>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/blog/how-bac-is-calculated"
                    className="font-mono text-xs text-muted transition-colors hover:text-text"
                  >
                    How BAC Is Calculated
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog/legal-bac-limits-by-state"
                    className="font-mono text-xs text-muted transition-colors hover:text-text"
                  >
                    Legal Limits by State
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog/bac-calculator-vs-breathalyzer"
                    className="font-mono text-xs text-muted transition-colors hover:text-text"
                  >
                    BAC vs Breathalyzer
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <p className="max-w-3xl font-mono text-xs leading-relaxed text-muted/70">
            This BAC calculator is provided for educational purposes only. It is
            not medical or legal advice. Never use an app to decide whether to
            drive after drinking. If you need help with alcohol use, contact
            SAMHSA at 1-800-662-4357.
          </p>
        </div>
      </div>
    </footer>
  );
}
