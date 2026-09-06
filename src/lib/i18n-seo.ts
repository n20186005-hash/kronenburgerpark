import { routing } from '@/i18n/routing';
import { BASE_URL } from '@/lib/site-data';

// Single source of truth for language-code / locale metadata mapping.
export const HREFLANG: Record<string, string> = {
  zh: 'zh-CN',
  en: 'en',
  nl: 'nl',
  de: 'de',
};

export const HTML_LANG: Record<string, string> = {
  zh: 'zh-CN',
  en: 'en',
  nl: 'nl',
  de: 'de',
};

export const OG_LOCALE: Record<string, string> = {
  zh: 'zh_CN',
  en: 'en_US',
  nl: 'nl_NL',
  de: 'de_DE',
};

// Absolute URL of `suffix` (no leading slash) under the given locale, e.g.
// pageUrl('nl', 'privacy-policy') => 'https://kronenburgerpark.com/nl/privacy-policy'
export function pageUrl(locale: string, suffix?: string): string {
  return suffix ? `${BASE_URL}/${locale}/${suffix}` : `${BASE_URL}/${locale}`;
}

/**
 * Canonical + hreflang (alternates) for a page, generated from the routing
 * config so every locale always stays in sync. x-default follows the default locale.
 */
export function buildAlternates(locale: string, suffix?: string) {
  const languages: Record<string, string> = {};
  routing.locales.forEach((loc) => {
    languages[HREFLANG[loc] ?? loc] = pageUrl(loc, suffix);
  });
  languages['x-default'] = pageUrl(routing.defaultLocale, suffix);
  return { canonical: pageUrl(locale, suffix), languages };
}
