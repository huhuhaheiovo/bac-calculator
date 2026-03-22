import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { defaultLocale, locales, getLocalizedPath } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", priority: 1, changeFrequency: "monthly" as const, routeLocales: locales },
    { path: "/bac-calculator", priority: 1, changeFrequency: "monthly" as const, routeLocales: locales },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const, routeLocales: locales },
    {
      path: "/blog/how-bac-is-calculated",
      priority: 0.7,
      changeFrequency: "monthly" as const,
      routeLocales: locales,
    },
    {
      path: "/blog/legal-bac-limits-by-state",
      priority: 0.7,
      changeFrequency: "monthly" as const,
      routeLocales: locales,
    },
    {
      path: "/blog/bac-calculator-vs-breathalyzer",
      priority: 0.7,
      changeFrequency: "monthly" as const,
      routeLocales: locales,
    },
    {
      path: "/blog/can-you-drive-after-one-beer",
      priority: 0.7,
      changeFrequency: "monthly" as const,
      routeLocales: ["zh"] as const,
    },
    {
      path: "/blog/how-long-after-half-glass-baijiu-can-you-drive",
      priority: 0.7,
      changeFrequency: "monthly" as const,
      routeLocales: ["zh"] as const,
    },
  ];

  return routes.flatMap((route) =>
    route.routeLocales.map((locale) => ({
      url: `${SITE_URL}${getLocalizedPath(locale, route.path)}`,
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: locale === defaultLocale ? route.priority : route.priority - 0.1,
      alternates: {
        languages: Object.fromEntries(
          route.routeLocales.map((entry) => [
            entry,
            `${SITE_URL}${getLocalizedPath(entry, route.path)}`,
          ]),
        ),
      },
    })),
  );
}
