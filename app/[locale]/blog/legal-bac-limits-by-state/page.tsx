import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LegalLimitsArticlePage from "@/components/pages/articles/LegalLimitsArticlePage";
import { buildMetadata } from "@/lib/metadata";
import { isValidLocale } from "@/i18n/config";
import { getSeoContent } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const seo = getSeoContent(locale, "legalLimits");

  return buildMetadata({
    locale,
    title: seo.title,
    description: seo.description,
    path: "/blog/legal-bac-limits-by-state",
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

  return <LegalLimitsArticlePage />;
}
