import type { Metadata } from 'next';
import { buildSingleLocaleAlternates, OG_LOCALE } from '@/lib/i18n-seo';
import { BASE_URL } from '@/lib/site-data';

/**
 * Builds Metadata for a single-language topic landing page. The page title and
 * description are taken from the topic's own message namespace, falling back to
 * the homepage meta when needed.
 */
export async function buildTopicMetadata(
  locale: string,
  namespace: string,
  suffix: string
): Promise<Metadata> {
  const messages = (await import(`@/messages/${locale}.json`)).default as any;
  const p = messages[namespace] ?? {};
  const title = p.metaTitle ?? p.pageTitle ?? messages.meta?.title;
  const description = p.metaDescription ?? p.pageLead ?? messages.meta?.description;
  const url = `${BASE_URL}/${locale}/${suffix}`;

  return {
    title,
    description,
    alternates: buildSingleLocaleAlternates(locale, suffix),
    openGraph: {
      title,
      description,
      url,
      locale: OG_LOCALE[locale] ?? locale,
      type: 'article',
    },
  };
}
