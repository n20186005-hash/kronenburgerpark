import TopicVisitDetails from '@/components/TopicVisitDetails';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TopicContent from '@/components/TopicContent';
import { buildTopicGraph } from '@/lib/json-ld';
import { buildTopicMetadata } from '@/lib/topic-seo';

const NAMESPACE = 'sehenswuerdigkeitenNijmegen';
const SUFFIX = 'sehenswuerdigkeiten-nijmegen';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildTopicMetadata(locale, NAMESPACE, SUFFIX);
}

export default async function SehenswuerdigkeitenPage({
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
      href: `/${locale}/altstadt-nijmegen`,
      label: messages?.altstadtNijmegen?.pageTitle ?? 'Altstadt Nijmegen',
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
      <TopicVisitDetails topic={NAMESPACE} locale={locale} />
      <Footer />
    </>
  );
}
