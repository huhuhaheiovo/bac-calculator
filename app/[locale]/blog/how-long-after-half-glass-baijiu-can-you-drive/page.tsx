import type {Metadata} from "next";
import {notFound} from "next/navigation";
import HalfGlassBaijiuDrivingArticlePage from "@/components/pages/articles/HalfGlassBaijiuDrivingArticlePage";
import {buildMetadata} from "@/lib/metadata";
import {isValidLocale} from "@/i18n/config";
import {getSeoContent} from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;

  if (!isValidLocale(locale) || locale !== "zh") {
    notFound();
  }

  const seo = getSeoContent("zh", "halfGlassBaijiuDriving");

  return buildMetadata({
    locale,
    title: seo.title,
    description: seo.description,
    path: "/blog/how-long-after-half-glass-baijiu-can-you-drive",
    availableLocales: ["zh"],
  });
}

export default async function LocalizedPage({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;

  if (!isValidLocale(locale) || locale !== "zh") {
    notFound();
  }

  return <HalfGlassBaijiuDrivingArticlePage />;
}
