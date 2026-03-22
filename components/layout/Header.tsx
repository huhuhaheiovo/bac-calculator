import {getTranslations} from "next-intl/server";
import LocaleSwitcher from "@/components/layout/LocaleSwitcher";
import {Link} from "@/i18n/navigation";

export default async function Header() {
  const t = await getTranslations("header");

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-[rgba(10,14,15,0.9)] backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-mono text-sm font-semibold tracking-wide text-accent">
          bac calculator <span className="text-muted"></span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/bac-calculator"
            className="font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-text"
          >
            {t("calculator")}
          </Link>
          <Link
            href="/blog"
            className="font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-text"
          >
            {t("learn")}
          </Link>
          <LocaleSwitcher />
          <span className="rounded-sm border border-border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            {t("free")}
          </span>
        </nav>
      </div>
    </header>
  );
}
