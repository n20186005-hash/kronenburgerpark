import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { BASE_URL } from '@/lib/site-data';
import { HREFLANG } from '@/lib/i18n-seo';

const PAGES = [
  { suffix: '', changeFrequency: 'daily' as const, priority: 1 },
  { suffix: 'kruittoren', changeFrequency: 'monthly' as const, priority: 0.8 },
  { suffix: 'privacy-policy', changeFrequency: 'monthly' as const, priority: 0.4 },
  { suffix: 'terms-of-service', changeFrequency: 'monthly' as const, priority: 0.4 },
  { suffix: 'cookie-settings', changeFrequency: 'monthly' as const, priority: 0.3 },
];

// Single-language topic landing pages (the locale is fixed by the content).
const SINGLE_LOCALE_PAGES = [
  {
    locale: 'de',
    suffix: 'altstadt-nijmegen',
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  },
  {
    locale: 'de',
    suffix: 'sehenswuerdigkeiten-nijmegen',
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  },
  {
    locale: 'nl',
    suffix: 'parkeren-kronenburgerpark',
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  },
  {
    locale: 'nl',
    suffix: 'dierenweide-kronenburgerpark',
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const multilingual = routing.locales.flatMap((locale) =>
    PAGES.map((page) => {
      const url = page.suffix
        ? `${BASE_URL}/${locale}/${page.suffix}`
        : `${BASE_URL}/${locale}`;
      return {
        url,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((loc) => [
              HREFLANG[loc] ?? loc,
              page.suffix
                ? `${BASE_URL}/${loc}/${page.suffix}`
                : `${BASE_URL}/${loc}`,
            ])
          ),
        },
      };
    })
  );

  const singleLocale = SINGLE_LOCALE_PAGES.map((page) => {
    const url = `${BASE_URL}/${page.locale}/${page.suffix}`;
    return {
      url,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: {
          [HREFLANG[page.locale] ?? page.locale]: url,
          'x-default': url,
        },
      },
    };
  });

  return [...multilingual, ...singleLocale];
}
