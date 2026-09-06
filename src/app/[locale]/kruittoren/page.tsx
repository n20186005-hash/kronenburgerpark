import { getMessages, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import KruittorenContent from '@/components/KruittorenContent';
import Footer from '@/components/Footer';
import { buildAlternates, OG_LOCALE } from '@/lib/i18n-seo';
import { buildKruittorenGraph, buildFaqPage } from '@/lib/json-ld';
import { BASE_URL } from '@/lib/site-data';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const p = messages.kruittorenPage ?? {};
  const title = p.metaTitle ?? messages.meta?.title;
  const description = p.metaDescription ?? messages.meta?.description;

  return {
    title,
    description,
    alternates: buildAlternates(locale, 'kruittoren'),
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${locale}/kruittoren`,
      locale: OG_LOCALE[locale] ?? locale,
      type: 'website',
    },
  };
}

export default async function KruittorenPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = (await getMessages()) as any;
  const p = messages?.kruittorenPage;

  const ld = buildKruittorenGraph(locale, p?.metaTitle, p?.metaDescription);
  const faqLd = buildFaqPage(p?.faqItems);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}
      <Header />
      <KruittorenContent />
      <Footer />
    </>
  );
}
