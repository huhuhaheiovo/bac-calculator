import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogIndexPage from "@/components/pages/BlogIndexPage";
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

  const seo = getSeoContent(locale, "blog");

  return buildMetadata({
    locale,
    title: seo.title,
    description: seo.description,
    path: "/blog",
  });
}

export default async function LocalizedBlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return <BlogIndexPage />;
}
