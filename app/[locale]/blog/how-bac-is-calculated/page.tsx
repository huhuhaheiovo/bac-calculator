import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HowBacArticlePage from "@/components/pages/articles/HowBacArticlePage";
import { buildMetadata } from "@/lib/metadata";
import { getTranslations } from "next-intl/server";
import { isValidLocale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "meta" });

  return buildMetadata({
    locale,
    title: t("howBacTitle"),
    description: t("howBacDescription"),
    path: "/blog/how-bac-is-calculated",
  });
}

export default async function LocalizedPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return <HowBacArticlePage />;
}
