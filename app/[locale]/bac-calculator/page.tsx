import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BACLandingPage from "@/components/pages/BACLandingPage";
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
    title: t("calculatorTitle"),
    description: t("calculatorDescription"),
    path: "/bac-calculator",
  });
}

export default async function LocalizedBACPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return <BACLandingPage />;
}
