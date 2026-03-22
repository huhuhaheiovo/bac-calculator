import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { defaultLocale, locales, getLocalizedPath } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", priority: 1, changeFrequency: "monthly" as const },
    { path: "/bac-calculator", priority: 1, changeFrequency: "monthly" as const },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
    {
      path: "/blog/how-bac-is-calculated",
      priority: 0.7,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/blog/legal-bac-limits-by-state",
      priority: 0.7,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/blog/bac-calculator-vs-breathalyzer",
      priority: 0.7,
      changeFrequency: "monthly" as const,
    },
  ];

  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${SITE_URL}${getLocalizedPath(locale, route.path)}`,
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: locale === defaultLocale ? route.priority : route.priority - 0.1,
      alternates: {
        languages: Object.fromEntries(
          locales.map((entry) => [entry, `${SITE_URL}${getLocalizedPath(entry, route.path)}`]),
        ),
      },
    })),
  );
}
