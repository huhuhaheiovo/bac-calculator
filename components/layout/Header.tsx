import {getTranslations} from "next-intl/server";
import LocaleSwitcher from "@/components/layout/LocaleSwitcher";
import {Link} from "@/i18n/navigation";

export default async function Header() {
  const t = await getTranslations("header");

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-[rgba(10,14,15,0.9)] backdrop-blur">
      <div className="mx-auto w-full max-w-5xl px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="shrink-0 whitespace-nowrap font-mono text-xl font-semibold tracking-tight text-accent sm:text-sm sm:tracking-wide"
          >
            bac calculator
          </Link>
          <div className="hidden sm:flex sm:items-center sm:gap-4">
            <LocaleSwitcher />
            <span className="whitespace-nowrap rounded-sm border border-border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              {t("free")}
            </span>
          </div>
        </div>

        <nav className="mt-4 flex items-center justify-between gap-3 border-t border-white/8 pt-4 sm:mt-0 sm:border-0 sm:pt-0">
          <div className="flex min-w-0 items-center gap-4 sm:gap-6">
            <Link
              href="/bac-calculator"
              className="whitespace-nowrap font-mono text-xs uppercase tracking-[0.12em] text-muted transition-colors hover:text-text sm:tracking-[0.2em]"
            >
              {t("calculator")}
            </Link>
            <Link
              href="/blog"
              className="whitespace-nowrap font-mono text-xs uppercase tracking-[0.12em] text-muted transition-colors hover:text-text sm:tracking-[0.2em]"
            >
              {t("learn")}
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:hidden">
            <LocaleSwitcher />
            <span className="whitespace-nowrap rounded-sm border border-border px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
              {t("free")}
            </span>
          </div>
        </nav>
      </div>
    </header>
  );
}
