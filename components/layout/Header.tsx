import {getTranslations} from "next-intl/server";
import LocaleSwitcher from "@/components/layout/LocaleSwitcher";
import {Link} from "@/i18n/navigation";

export default async function Header() {
  const t = await getTranslations("header");

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-[rgba(10,14,15,0.9)] backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-x-5 gap-y-3 px-4 py-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-4 sm:gap-8">
          <Link
            href="/"
            className="shrink-0 whitespace-nowrap font-mono text-lg font-semibold tracking-[0.08em] text-accent sm:text-sm sm:tracking-[0.14em]"
          >
            bac calculator
          </Link>
          <nav className="flex min-w-0 items-center gap-3 sm:gap-6">
            <Link
              href="/bac-calculator"
              className="rounded-[0.2rem] px-1 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted transition-colors hover:text-text focus-visible:text-text sm:text-xs sm:tracking-[0.18em]"
            >
              {t("calculator")}
            </Link>
            <Link
              href="/blog"
              className="rounded-[0.2rem] px-1 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-muted transition-colors hover:text-text focus-visible:text-text sm:text-xs sm:tracking-[0.18em]"
            >
              {t("learn")}
            </Link>
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <LocaleSwitcher />
          <span className="whitespace-nowrap rounded-[0.35rem] border border-border px-2.5 py-[0.55rem] font-mono text-[10px] uppercase tracking-[0.12em] text-muted sm:px-3 sm:text-[11px] sm:tracking-[0.2em]">
            {t("free")}
          </span>
        </div>
      </div>
    </header>
  );
}
