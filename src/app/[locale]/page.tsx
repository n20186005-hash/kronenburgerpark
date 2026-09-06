import { getMessages, setRequestLocale } from 'next-intl/server';
import { buildParkGraph, buildFaqPage } from '@/lib/json-ld';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import BasicInfo from '@/components/BasicInfo';
import HistoryTimeline from '@/components/HistoryTimeline';
import HistoryHeritage from '@/components/HistoryHeritage';
import ArchitectureSection from '@/components/ArchitectureSection';
import HoursSection from '@/components/HoursSection';
import TicketsSection from '@/components/TicketsSection';
import TransportSection from '@/components/TransportSection';
import InfoSection from '@/components/InfoSection';
import FloraFauna from '@/components/FloraFauna';
import RouteSection from '@/components/RouteSection';
import PhotoSpotsSection from '@/components/PhotoSpotsSection';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import FaqSection from '@/components/FaqSection';
import WeatherSection from '@/components/WeatherSection';
import AmenitiesSection from '@/components/AmenitiesSection';
import MapEmbed from '@/components/MapEmbed';
import References from '@/components/References';
import SourcesSection from '@/components/SourcesSection';
import Footer from '@/components/Footer';
import TableOfContents from '@/components/TableOfContents';

// Revalidate every 10 minutes so the embedded weather data stays reasonably fresh.
export const revalidate = 600;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = (await getMessages()) as any;
  const parkLd = buildParkGraph(locale, messages.meta?.title, messages.meta?.description);
  const faqLd = buildFaqPage(messages?.faq?.items);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(parkLd) }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}
      <Header />
      <main>
        <Hero />
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="lg:flex lg:gap-10">
            <TableOfContents />
            <div className="flex-1 min-w-0">
              <Intro />
              <BasicInfo />
              <HistoryTimeline />
              <HistoryHeritage />
              <ArchitectureSection />
              <HoursSection />
              <TicketsSection />
              <TransportSection />
              <InfoSection />
              <FloraFauna />
              <RouteSection />
              <PhotoSpotsSection />
              <Gallery />
              <Reviews />
              <FaqSection />
              <WeatherSection locale={locale} />
              <AmenitiesSection />
              <MapEmbed />
            </div>
          </div>
        </div>
      </main>
      <References />
      <SourcesSection />
      <Footer />
    </>
  );
}
