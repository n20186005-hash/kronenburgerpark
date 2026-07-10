import '../globals.css';
import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';

// Dynamic domain read from environment, falling back to the canonical site domain.
// This keeps the build portable across deployments and avoids hardcoding a single pSEO domain.
const SITE_DOMAIN = process.env.CURRENT_SITE_DOMAIN || 'kronenburgerpark.com';
const BASE_URL = `https://${SITE_DOMAIN}`;

const HREFLANG: Record<string, string> = {
  zh: 'zh-CN',
  en: 'en',
  nl: 'nl',
  de: 'de',
};

const OG_LOCALE: Record<string, string> = {
  zh: 'zh_CN',
  en: 'en_US',
  nl: 'nl_NL',
  de: 'de_DE',
};

const HTML_LANG: Record<string, string> = {
  zh: 'zh-CN',
  en: 'en',
  nl: 'nl',
  de: 'de',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

function buildJsonLd(locale: string, title: string, description: string) {
  const url = `${BASE_URL}/${locale}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['TouristAttraction', 'Park', 'HistoricalLandmark'],
        '@id': `${BASE_URL}/#park`,
        name: 'Kronenburgerpark',
        alternateName: 'Kronenburgerpark Nijmegen',
        description,
        url,
        image: `${BASE_URL}/gallery/kronenburgerpark%20(1).jpg`,
        touristType: ['History enthusiasts', 'Nature observers', 'Families'],
        isAccessibleForFree: true,
        publicAccess: true,
        smokingAllowed: false,
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Kronenburgersingel',
          postalCode: '6511 AL',
          addressLocality: 'Nijmegen',
          addressRegion: 'Gelderland',
          addressCountry: 'NL',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 51.8489,
          longitude: 5.8639,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            opens: '00:00',
            closes: '23:59',
          },
        ],
        containedInPlace: {
          '@type': 'City',
          name: 'Nijmegen',
          addressCountry: 'NL',
        },
        subjectOf: {
          '@type': 'HistoricalLandmark',
          name: 'Kruittoren (Powder Tower)',
          event: {
            '@type': 'Construction',
            startDate: '1425',
          },
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${BASE_URL}/#website`,
        url: BASE_URL,
        name: title,
        inLanguage: HREFLANG[locale] || locale,
        publisher: {
          '@type': 'Organization',
          name: 'Kronenburgerpark Independent Research Association',
        },
      },
    ],
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;

  const languages: Record<string, string> = {};
  routing.locales.forEach((loc) => {
    languages[HREFLANG[loc] ?? loc] = `${BASE_URL}/${loc}`;
  });
  languages['x-default'] = `${BASE_URL}/zh`;

  const selfUrl = `${BASE_URL}/${locale}`;

  return {
    title: messages.meta.title,
    description: messages.meta.description,
    alternates: {
      canonical: selfUrl,
      languages,
    },
    openGraph: {
      title: messages.meta.title,
      description: messages.meta.description,
      url: selfUrl,
      siteName: 'Kronenburgerpark',
      locale: OG_LOCALE[locale] ?? locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: messages.meta.title,
      description: messages.meta.description,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  const htmlLang = HTML_LANG[locale] ?? locale;
  const jsonLd = buildJsonLd(locale, messages.meta.title, messages.meta.description);

  return (
    <html lang={htmlLang} suppressHydrationWarning>
      <head>
        <link rel="canonical" href={`${BASE_URL}/${locale}`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX" crossOrigin="anonymous" />
        <meta name="google-adsense-account" content="ca-pub-XXXXXXXXXX" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
