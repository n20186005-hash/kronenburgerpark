import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TopicContent from '@/components/TopicContent';
import { buildTopicGraph } from '@/lib/json-ld';
import { buildTopicMetadata } from '@/lib/topic-seo';

const NAMESPACE = 'parkerenKronenburgerpark';
const SUFFIX = 'parkeren-kronenburgerpark';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildTopicMetadata(locale, NAMESPACE, SUFFIX);
}

export default async function ParkerenPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = (await getMessages()) as any;
  const p = messages?.[NAMESPACE];
  if (!p || !p.pageTitle) notFound();

  const ld = buildTopicGraph(
    locale,
    SUFFIX,
    p.metaTitle ?? p.pageTitle,
    p.metaDescription ?? p.pageLead,
    p.faqItems
  );

  const related = [
    {
      href: `/${locale}/dierenweide-kronenburgerpark`,
      label: messages?.dierenweideKronenburgerpark?.pageTitle ?? 'Dierenweide Kronenburgerpark',
    },
    { href: `/${locale}`, label: 'Kronenburgerpark' },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      <Header />
      <TopicContent namespace={NAMESPACE} related={related} />
      <Footer />
    </>
  );
}
