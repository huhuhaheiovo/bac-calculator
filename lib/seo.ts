import seoContent from "@/lib/seo-content.json";
import type {Locale} from "@/i18n/config";

export type SeoPageKey = keyof typeof seoContent.en;

export function getSeoContent(locale: Locale, page: SeoPageKey) {
  return seoContent[locale][page];
}
