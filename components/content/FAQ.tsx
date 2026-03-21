"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How accurate is this BAC Calculator?",
    a: "This calculator uses the Widmark formula, a standard BAC estimation method. It is still only an estimate because food intake, hydration, medications, and metabolism can change real BAC.",
  },
  {
    q: "What counts as one standard drink?",
    a: "A standard US drink contains 0.6 fluid ounces or about 14 grams of pure alcohol. That is about one 12 oz beer, one 5 oz glass of wine, or one 1.5 oz shot of spirits.",
  },
  {
    q: "How long does it take for BAC to return to zero?",
    a: "A common average metabolism rate is 0.015% BAC per hour. Coffee, water, and cold showers do not speed this up. Only time lowers BAC.",
  },
  {
    q: "Can I use this to decide if I am safe to drive?",
    a: "No. This tool is for education only. Never use an app to decide whether to drive after drinking.",
  },
  {
    q: "Why does biological sex affect the result?",
    a: "The Widmark formula uses different distribution constants because body composition and alcohol distribution differ on average between males and females.",
  },
  {
    q: "Does eating food lower my BAC?",
    a: "Food does not lower BAC already in your bloodstream, but it can slow alcohol absorption and reduce peak BAC.",
  },
  {
    q: "What is the Widmark formula?",
    a: "It estimates BAC from alcohol consumed, body weight, a distribution constant, and elapsed time. It is widely used as a practical estimation method.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="border-b border-border py-16">
      <div className="mx-auto w-full max-w-5xl px-6">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent">
          Help
        </p>
        <h2 className="mb-4 text-3xl md:text-4xl">BAC Calculator FAQ</h2>
        <p className="mb-10 max-w-2xl text-sm leading-relaxed text-muted">
          Common questions about blood alcohol content, the Widmark formula,
          and responsible drinking.
        </p>

        <div className="divide-y divide-border rounded-sm border border-border bg-card">
          {faqs.map((faq, index) => {
            const isOpen = open === index;

            return (
              <div key={faq.q} className="px-5 py-4">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="flex w-full items-start justify-between gap-4 text-left"
                >
                  <span className="text-base leading-snug text-text">
                    {faq.q}
                  </span>
                  <span className="font-mono text-lg text-accent">
                    {isOpen ? "-" : "+"}
                  </span>
                </button>
                {isOpen ? (
                  <p className="max-w-3xl pt-4 text-sm leading-relaxed text-muted">
                    {faq.a}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
