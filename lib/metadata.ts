import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import { defaultLocale, locales, type Locale, getLocalizedPath } from "@/i18n/config";

export function buildMetadata({
  locale,
  title,
  description,
  path,
  ogImage = "/og-image.png",
  availableLocales = locales,
}: {
  locale: Locale;
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  availableLocales?: readonly Locale[];
}): Metadata {
  const localizedPath = getLocalizedPath(locale, path);
  const url = `${SITE_URL}${localizedPath}`;
  const languages = Object.fromEntries(
    availableLocales.map((supportedLocale) => [
      supportedLocale,
      `${SITE_URL}${getLocalizedPath(supportedLocale, path)}`,
    ]),
  );

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...languages,
        "x-default": `${SITE_URL}${getLocalizedPath(
          availableLocales.includes(defaultLocale) ? defaultLocale : availableLocales[0],
          path,
        )}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "BAC Calculator",
      type: "website",
      images: [
        {
          url: `${SITE_URL}${ogImage}`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}${ogImage}`],
    },
  };
}

export const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "BAC Calculator",
  description:
    "Free online BAC calculator using the Widmark formula to estimate blood alcohol content.",
  url: `${SITE_URL}/bac-calculator`,
  applicationCategory: "HealthApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
  },
  publisher: {
    "@type": "Organization",
    name: "BAC Calculator",
    url: SITE_URL,
  },
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How accurate is this BAC Calculator?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This calculator uses the Widmark formula, a standard BAC estimation method. Individual metabolism and food intake can still shift real BAC, so use it as an educational estimate only.",
      },
    },
    {
      "@type": "Question",
      name: "What is the Widmark formula used in this BAC Calculator?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Widmark formula estimates blood alcohol content from alcohol consumed, body weight, a distribution constant, and elapsed time. This BAC Calculator uses that model because it remains the most common practical method for educational BAC estimation.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take BAC to return to zero?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "On average, BAC declines by about 0.015 percent per hour. Time is the only reliable way to lower BAC.",
      },
    },
    {
      "@type": "Question",
      name: "What counts as one standard drink?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A standard US drink contains about 0.6 fluid ounces or 14 grams of pure alcohol, such as a 12 oz beer, 5 oz wine, or 1.5 oz shot of spirits.",
      },
    },
    {
      "@type": "Question",
      name: "Why does biological sex affect the BAC Calculator result?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Widmark formula uses different distribution constants because alcohol distributes differently on average across body composition, which changes the estimated blood alcohol content.",
      },
    },
    {
      "@type": "Question",
      name: "Does eating food lower my BAC?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Food does not lower alcohol already in your bloodstream, but it can slow absorption and reduce peak BAC.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use the BAC Calculator to decide if I am safe to drive?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. This calculator is for education only. Never use an app to decide whether to drive after drinking.",
      },
    },
  ],
};
