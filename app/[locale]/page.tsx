import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BACLandingPage from "@/components/pages/BACLandingPage";
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

  const seo = getSeoContent(locale, "home");

  return buildMetadata({
    locale,
    title: seo.title,
    description: seo.description,
    path: "/",
  });
}

export default async function LocalizedHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return <BACLandingPage pageKey="home" />;
}
