"use client";

import {startTransition} from "react";
import {useLocale, useTranslations} from "next-intl";
import {usePathname, useRouter} from "@/i18n/navigation";
import {type Locale, locales} from "@/i18n/config";

export default function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const t = useTranslations("localeSwitcher");
  const router = useRouter();
  const pathname = usePathname();

  return (
    <label className="flex items-center gap-2 rounded-sm border border-border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
      <span className="sr-only">{t("label")}</span>
      <select
        aria-label={t("label")}
        className="w-auto border-0 bg-transparent p-0 text-[11px] uppercase tracking-[0.2em] text-accent"
        value={locale}
        onChange={(event) => {
          const nextLocale = event.target.value as Locale;
          startTransition(() => {
            router.replace(pathname, {locale: nextLocale});
          });
        }}
      >
        {locales.map((entry) => (
          <option key={entry} value={entry}>
            {t(entry)}
          </option>
        ))}
      </select>
    </label>
  );
}
