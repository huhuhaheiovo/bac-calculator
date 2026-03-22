"use client";

import {useLocale, useTranslations} from "next-intl";
import {startTransition} from "react";
import {usePathname, useRouter} from "@/i18n/navigation";
import {type Locale, locales} from "@/i18n/config";

export default function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const t = useTranslations("localeSwitcher");
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(nextLocale: Locale) {
    if (nextLocale === locale) {
      return;
    }

    startTransition(() => {
      router.replace(pathname, {locale: nextLocale});
    });
  }

  return (
    <div
      className="inline-flex shrink-0 rounded-[0.35rem] border border-border bg-surface/70 p-1"
      role="group"
      aria-label={t("label")}
    >
      {locales.map((entry) => {
        const isActive = entry === locale;

        return (
          <button
            key={entry}
            type="button"
            onClick={() => switchLocale(entry)}
            aria-pressed={isActive}
            className={`min-w-[3.1rem] rounded-[0.2rem] px-2.5 py-1.5 font-mono text-[11px] uppercase transition-all sm:min-w-[3.5rem] sm:px-3 ${
              isActive
                ? "bg-accent text-black"
                : "text-muted hover:bg-white/[0.03] hover:text-text"
            } ${entry === "zh" ? "tracking-[0.04em]" : "tracking-[0.1em] sm:tracking-[0.16em]"}`}
          >
            {t(entry)}
          </button>
        );
      })}
    </div>
  );
}
