import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { buildAlternates } from '@/lib/i18n-seo';
import { nearbyPlaces, nearbyText } from '@/lib/nearby';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const copy = nearbyText(locale);
  return { title: copy.title, description: copy.intro, alternates: buildAlternates(locale, 'nearby') };
}

export default async function NearbyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = nearbyText(locale);
  return (
    <>
      <Header />
      <main>
        <section className="px-4 pb-16 pt-32 text-white sm:px-6 sm:pb-20" style={{ background: '#234830' }}>
          <div className="mx-auto max-w-6xl">
            <a href={`/${locale}`}>Kronenburgerpark</a>
            <h1 className="font-display my-4 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl">{copy.title}</h1>
            <p className="max-w-2xl text-lg font-light text-white/90 sm:text-xl">{copy.intro}</p>
          </div>
        </section>
        <section className="section-padding">
          <ul className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {nearbyPlaces.map((place) => (
              <li key={place.slug}>
                <a className="block h-full overflow-hidden rounded-2xl border"
                  style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
                  href={`/${locale}/nearby/${place.slug}`}>
                  {place.photo && <img src={place.photo.path} alt={place.name} loading="lazy" className="aspect-[16/9] w-full object-cover" />}
                  <div className="p-5">
                    <h2 className="font-display text-xl font-semibold">{place.name}</h2>
                    <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>{place.address}</p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
