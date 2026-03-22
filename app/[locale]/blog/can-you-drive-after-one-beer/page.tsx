import type {Metadata} from "next";
import {notFound} from "next/navigation";
import OneBeerDrivingArticlePage from "@/components/pages/articles/OneBeerDrivingArticlePage";
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

  const seo = getSeoContent("zh", "oneBeerDriving");

  return buildMetadata({
    locale,
    title: seo.title,
    description: seo.description,
    path: "/blog/can-you-drive-after-one-beer",
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

  return <OneBeerDrivingArticlePage />;
}
