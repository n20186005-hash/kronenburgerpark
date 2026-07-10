import { setRequestLocale } from 'next-intl/server';
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
import MapEmbed from '@/components/MapEmbed';
import References from '@/components/References';
import Footer from '@/components/Footer';
import TableOfContents from '@/components/TableOfContents';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
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
              <MapEmbed />
            </div>
          </div>
        </div>
      </main>
      <References />
      <Footer />
    </>
  );
}
