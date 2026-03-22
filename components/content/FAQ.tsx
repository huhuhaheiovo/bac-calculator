"use client";

import { useState } from "react";
import {useTranslations} from "next-intl";

type FAQItem = {
  q: string;
  a: string;
};

export default function FAQ() {
  const t = useTranslations("faq");
  const items = t.raw("items") as FAQItem[];
  const [openItems, setOpenItems] = useState<Set<number>>(
    () => new Set(items.map((_, index) => index)),
  );

  function toggle(index: number) {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  return (
    <section className="border-b border-border py-16">
      <div className="mx-auto w-full max-w-5xl px-6">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent">
          {t("eyebrow")}
        </p>
        <h2 className="mb-4 text-3xl md:text-4xl">{t("title")}</h2>
        <p className="mb-10 max-w-2xl text-sm leading-relaxed text-muted">
          {t("description")}
        </p>

        <div className="divide-y divide-border rounded-sm border border-border bg-card">
          {items.map((faq, index) => {
            const isOpen = openItems.has(index);

            return (
              <div key={faq.q} className="px-5 py-4">
                <button
                  type="button"
                  onClick={() => toggle(index)}
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
