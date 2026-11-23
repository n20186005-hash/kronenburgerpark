import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { buildAlternates } from '@/lib/i18n-seo';
import { nearbyConnections, nearbyPlaces, nearbyText, placeMap } from '@/lib/nearby';
import { managementText, nearbyEditorial } from '@/lib/nearby-editorial';
import { visitGuide } from '@/lib/nearby-visit';
import type { Locale } from '@/i18n/routing';

type Props = { params: Promise<{ locale: Locale; slug: string }> };

export function generateStaticParams() {
  return nearbyPlaces.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const place = nearbyPlaces.find((entry) => entry.slug === slug);
  if (!place) notFound();
  const description = place.description[locale];
  const alternates = buildAlternates(locale, `nearby/${slug}`);
  const images = place.photo ? [place.photo.path] : [];
  return {
    title: place.name, description, alternates,
    openGraph: { title: place.name, description, url: alternates.canonical, images },
    twitter: { title: place.name, description, images },
  };
}

export default async function PlacePage({ params }: Props) {
  const { locale, slug } = await params;
  const place = nearbyPlaces.find((entry) => entry.slug === slug);
  if (!place) notFound();

  setRequestLocale(locale);
  const copy = nearbyText(locale);
  const kind = place.kind as keyof typeof copy.kinds;
  const mapAddress = place.mapAddress ?? place.address;
  const map = placeMap(place.name, mapAddress);
  const editorial = nearbyEditorial(locale);
  const faq = place.faq[locale];
  const guide = visitGuide(place, locale, copy.hours[kind]);
  const { t } = guide;
  const directions = new URL('https://www.google.com/maps/dir/');
  directions.search = new URLSearchParams({
    api: '1',
    origin: 'Station Nijmegen, Stationsplein, Nijmegen',
    destination: new URL(map).searchParams.get('query') ?? mapAddress,
    travelmode: place.address.endsWith(', Nijmegen') ? 'walking' : 'transit',
  }).toString();
  const connections = nearbyConnections(slug);
  const localWalk = new URL('https://www.google.com/maps/dir/');
  localWalk.search = new URLSearchParams({
    api: '1',
    origin: place.approach,
    destination: new URL(map).searchParams.get('query') ?? mapAddress,
    travelmode: 'walking',
  }).toString();

  return (
    <>
      <Header />
      <main>
        <section className="relative isolate overflow-hidden text-white" style={{ background: '#234830' }}>
          {place.photo && <img src={place.photo.path} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" />}
          <div className="absolute inset-0 -z-10" style={{ background: 'var(--hero-overlay)' }} />
          <div className="mx-auto flex min-h-[65svh] max-w-6xl flex-col justify-end px-4 pb-14 pt-32 sm:px-6 sm:pb-20">
            <a className="self-start underline underline-offset-4" href={`/${locale}/nearby`}>{copy.title}</a>
            <p className="mt-6 text-sm">{copy.kinds[kind]}</p>
            <h1 className="font-display mt-1 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl">{place.name}</h1>
            <p className="mt-3 max-w-2xl text-lg font-light text-white/90 sm:text-xl">{place.tagline[locale]}</p>
            <p className="mt-3">{place.address}</p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-white/90">
              <a href="#hours" className="underline underline-offset-4">{t.hours}</a>
              <a href="#reviews" className="underline underline-offset-4">{t.rating}</a>
            </div>
            <p className="mt-2 max-w-2xl text-sm text-white/90">{guide.hours}</p>
            <a className="mt-5 self-start rounded-full bg-white/15 px-5 py-2.5 font-semibold text-white backdrop-blur-sm hover:bg-white/25" href={map}>{copy.maps}</a>
          </div>
        </section>
        <section className="px-5 py-10 sm:px-8 sm:py-14" style={{ background: 'var(--bg-secondary)' }}>
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-3xl font-semibold">{editorial.about} {place.name}</h2>
            <div className="mt-4 h-0.5 w-12" style={{ background: 'var(--accent)' }} />
            <p className="mt-4 max-w-3xl leading-relaxed">{managementText(locale, slug, place.operator)}</p>
            <a href={place.source} className="mt-3 inline-block text-sm underline underline-offset-4">{copy.source}</a>
          </div>
        </section>
        <div className="section-padding">
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[3fr_2fr]">
            <article className="space-y-8">
              <section>
                <h2 className="font-display mb-3 text-3xl font-semibold">{t.intro} · {place.name}</h2>
                <p className="leading-relaxed">{place.description[locale]}</p>
              </section>
              <section className="rounded-2xl border p-5 sm:p-6" style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
                <h2 className="font-display mb-3 text-2xl font-semibold">{editorial.advice}</h2>
                <p><strong>{t.time}</strong> · {guide.duration}</p>
                <p className="mt-2"><strong>{editorial.arrival}</strong> · {place.approach}</p>
              </section>
              <section>
                <h2 className="font-display mb-3 text-2xl font-semibold">{t.highlights}</h2>
                <p>{place.tagline[locale]}</p>
              </section>
              <section id="hours" className="scroll-mt-20">
                <h2 className="font-display mb-3 text-2xl font-semibold">{t.hours}</h2>
                <p>{guide.hours}</p>
                {guide.hoursUrl && <a href={guide.hoursUrl} className="mt-2 inline-block underline underline-offset-4">{t.programme}</a>}
              </section>
              <section>
                <h2 className="font-display mb-3 text-2xl font-semibold">{t.tickets}</h2>
                <p>{guide.ticket}</p>
                {guide.ticketUrl && <a href={guide.ticketUrl} className="mt-2 inline-block underline underline-offset-4">{t.prices}</a>}
              </section>
              <section>
                <h2 className="font-display mb-3 text-2xl font-semibold">{copy.transport}</h2>
                <p>{place.address.endsWith(', Nijmegen') ? copy.walk : copy.regional}</p>
                <a href={directions.href} className="mt-2 inline-block underline underline-offset-4">{copy.directions}</a>
              </section>
              <section>
                <h2 className="font-display mb-3 text-2xl font-semibold">{t.experience}</h2>
                <p className="leading-relaxed">{place.history[locale]}</p>
              </section>
              <section>
                <h2 className="font-display mb-3 text-2xl font-semibold">{editorial.route}</h2>
                <ol className="list-decimal space-y-3 pl-5">
                  <li><strong>{editorial.arrival}</strong>
                    <div><a href={place.approach === mapAddress ? map : localWalk.href} className="underline underline-offset-4">{place.approach}</a></div>
                  </li>
                  <li><a href="#viewpoint" className="underline underline-offset-4">{editorial.viewpoint}</a></li>
                  {connections.length > 0 && (
                    <li><strong>{copy.next}</strong>
                      <ul className="mt-1 space-y-1">
                        {connections.map((stop) => (
                          <li key={stop.slug}><a className="underline underline-offset-4" href={`/${locale}/nearby/${stop.slug}`}>{stop.name}</a></li>
                        ))}
                      </ul>
                    </li>
                  )}
                </ol>
              </section>
              <section>
                <h2 className="font-display mb-3 text-2xl font-semibold">{t.notice}</h2>
                <p>{guide.notice}</p>
              </section>
              <section id="viewpoint" className="scroll-mt-20">
                <h2 className="font-display mb-3 text-2xl font-semibold">{editorial.viewpoint}</h2>
                <figure>
                  <img src={place.photo.path} alt={place.name} loading="lazy"
                    className="max-h-[32rem] w-full rounded-2xl object-contain"
                    style={{ background: 'var(--bg-secondary)' }} />
                  <figcaption className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {place.name} · <a href={place.photo.credit} className="underline underline-offset-4">{copy.photo}</a>
                    {' · '}{place.photo.author}{' · '}
                    {place.photo.licence.startsWith('https://')
                      ? <a href={place.photo.licence} className="underline underline-offset-4">{place.photo.licence.replace(/^https:\/\/creativecommons.org\//, '').replace(/\/$/, '')}</a>
                      : ({ zh: '公有领域', en: 'Public domain', nl: 'Publiek domein', de: 'Gemeinfrei' }[locale])}
                  </figcaption>
                </figure>
                <p className="mt-3 leading-relaxed">{place.viewpoint[locale]}</p>
              </section>
              <section>
                <h2 className="font-display mb-3 text-2xl font-semibold">{t.stay}</h2>
                <p>{guide.lodging}</p>
              </section>
              <section id="reviews" className="scroll-mt-20">
                <h2 className="font-display mb-3 text-2xl font-semibold">{copy.reviews}</h2>
                <a href={map} className="underline underline-offset-4">{copy.current}</a>
              </section>
              <section>
                <h2 className="font-display mb-3 text-2xl font-semibold">{t.guide}</h2>
                <address className="not-italic">{place.address}</address>
                {place.mapAddress && <p className="mt-1">{editorial.arrival} · {place.mapAddress}</p>}
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
                  <a href={map} className="underline underline-offset-4">{copy.maps}</a>
                  <a href={directions.href} className="underline underline-offset-4">{copy.directions}</a>
                </div>
              </section>
              <section>
                <h2 className="font-display mb-3 text-2xl font-semibold">{editorial.faq}</h2>
                <dl className="space-y-4">
                  <div><dt className="font-semibold">{editorial.hoursQuestion}</dt><dd>{guide.hours}</dd></div>
                  <div><dt className="font-semibold">{faq.question}</dt><dd>{faq.answer}</dd></div>
                </dl>
              </section>
            </article>
            <aside className="order-first self-start rounded-2xl border p-6 md:order-none" style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
              <h2 className="font-display mb-4 text-2xl font-semibold">{editorial.details}</h2>
              <table className="w-full text-left text-sm">
                <tbody className="divide-y" style={{ borderColor: 'var(--border-color)' }}>
                  {[
                    [t.type, copy.kinds[kind]],
                    [copy.location, place.address],
                    [copy.operator, place.operator],
                    [t.time, guide.duration],
                    [t.hours, guide.hours],
                    [t.tickets, guide.ticket],
                  ].map(([label, value]) => (
                    <tr key={label}>
                      <th scope="row" className="py-3 pr-3 align-top font-semibold">{label}</th>
                      <td className="py-3 align-top">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-5 flex flex-col items-start gap-2 text-sm">
                <a href={place.source} className="underline underline-offset-4">{copy.source}</a>
                <a href={map} className="underline underline-offset-4">{copy.maps}</a>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
