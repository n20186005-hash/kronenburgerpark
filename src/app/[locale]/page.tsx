import { nearbyEditorial } from '@/lib/nearby-editorial';
import type { Locale } from '@/i18n/routing';
import { nearbyPlaces, nearbyText } from '@/lib/nearby';
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
  const featuredPlaces = ['lange-hezelstraat', 'stevenskerk', 'valkhofpark', 'de-bastei', 'waalkade', 'spiegelwaal'];
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
              <section id="nearby" className="section-padding">
                <h2 className="mb-3 font-display text-3xl font-semibold">{nearbyText(locale).title}</h2>
                <p>{nearbyText(locale).intro}</p>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {featuredPlaces.map((slug) => {
                    const place = nearbyPlaces.find((entry) => entry.slug === slug);
                    if (!place) return null;
                    return (
                      <li key={slug}>
                        <a href={`/${locale}/nearby/${slug}`}
                          className="block rounded-xl border p-4 font-semibold underline-offset-4 hover:underline"
                          style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
                          {place.name}
                        </a>
                      </li>
                    );
                  })}
                </ul>
                <a className="mt-5 inline-block font-semibold underline underline-offset-4" href={`/${locale}/nearby`}>
                  {nearbyEditorial(locale as Locale).all}
                </a>
              </section>
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
