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

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.flatMap((locale) =>
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
}
