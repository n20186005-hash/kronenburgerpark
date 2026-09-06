import {
  BASE_URL,
  ATTRACTION_FULL_NAME,
  ATTRACTION_SHORT_NAME,
  CITY_NAME,
  STATE_PROVINCE,
  COUNTRY_NAME,
  COUNTRY_CODE,
  POSTAL_CODE,
  STREET_ADDRESS,
  PLUS_CODE,
  PHONE,
  LATITUDE,
  LONGITUDE,
  MAPS_SHARE_URL,
  LOCAL_TOURISM_URL,
  HERITAGE_URL,
  WIKIPEDIA_URL,
  HERO_IMAGE_URL,
  SECOND_IMAGE_URL,
  RATING_VALUE,
  RATING_COUNT,
} from '@/lib/site-data';
import { HREFLANG } from '@/lib/i18n-seo';

export type FaqItem = { q?: string; a?: string };

/** Graph for the homepage: the park itself + website + breadcrumbs. */
export function buildParkGraph(locale: string, title: string, description: string) {
  const url = `${BASE_URL}/${locale}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['TouristAttraction', 'Park', 'HistoricalLandmark'],
        '@id': `${BASE_URL}/#attraction`,
        name: ATTRACTION_FULL_NAME,
        alternateName: [
          ATTRACTION_SHORT_NAME,
          `${CITY_NAME} ${ATTRACTION_FULL_NAME}`,
          'Kronenburgerpark Nijmegen',
        ],
        description,
        url,
        image: [HERO_IMAGE_URL, SECOND_IMAGE_URL],
        telephone: PHONE,
        isAccessibleForFree: true,
        openingHours: 'Mo-Su 00:00-23:59',
        priceRange: '€0',
        publicAccess: true,
        smokingAllowed: false,
        touristType: ['History enthusiasts', 'Nature observers', 'Families'],
        address: {
          '@type': 'PostalAddress',
          streetAddress: STREET_ADDRESS,
          postalCode: POSTAL_CODE,
          addressLocality: CITY_NAME,
          addressRegion: STATE_PROVINCE,
          addressCountry: COUNTRY_CODE,
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: LATITUDE,
          longitude: LONGITUDE,
        },
        hasMap: MAPS_SHARE_URL,
        sameAs: [MAPS_SHARE_URL, WIKIPEDIA_URL, LOCAL_TOURISM_URL, HERITAGE_URL],
        additionalProperty: {
          '@type': 'PropertyValue',
          name: 'Plus Code',
          value: PLUS_CODE,
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: RATING_VALUE,
          reviewCount: RATING_COUNT,
          bestRating: '5',
          worstRating: '1',
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
            ],
            opens: '00:00',
            closes: '23:59',
          },
        ],
        containedInPlace: {
          '@type': 'City',
          name: CITY_NAME,
          address: {
            '@type': 'PostalAddress',
            addressLocality: CITY_NAME,
            addressRegion: STATE_PROVINCE,
            addressCountry: COUNTRY_CODE,
          },
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
        name: ATTRACTION_FULL_NAME,
        inLanguage: HREFLANG[locale] || locale,
        publisher: {
          '@type': 'Organization',
          name: 'Kronenburgerpark Independent Heritage Research Association',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: ATTRACTION_FULL_NAME,
            item: `${BASE_URL}/${locale}`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: CITY_NAME,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: COUNTRY_NAME,
          },
        ],
      },
    ],
  };
}

/** FAQPage wrapper for any list of visible Q&A items (returns null when empty). */
export function buildFaqPage(items?: FaqItem[] | null) {
  const cleaned = (items || []).filter((item) => item?.q && item?.a);
  if (!cleaned.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: cleaned.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}

/** Graph for the dedicated Kruittoren landing page. */
export function buildKruittorenGraph(
  locale: string,
  title: string,
  description: string
) {
  const towerUrl = `${BASE_URL}/${locale}/kruittoren`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['TouristAttraction', 'LandmarksOrHistoricalBuildings'],
        '@id': `${BASE_URL}/#kruittoren`,
        name: 'Kruittoren',
        alternateName: [
          'Kruittoren Nijmegen',
          'Kruittoren Kronenburgerpark',
          'Powder Tower',
        ],
        description,
        url: towerUrl,
        address: {
          '@type': 'PostalAddress',
          streetAddress: STREET_ADDRESS,
          postalCode: POSTAL_CODE,
          addressLocality: CITY_NAME,
          addressRegion: STATE_PROVINCE,
          addressCountry: COUNTRY_CODE,
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: LATITUDE,
          longitude: LONGITUDE,
        },
        hasMap: MAPS_SHARE_URL,
        containedInPlace: {
          '@type': ['Park', 'TouristAttraction'],
          name: ATTRACTION_FULL_NAME,
          url: `${BASE_URL}/${locale}`,
        },
        additionalProperty: [
          {
            '@type': 'PropertyValue',
            name: 'Construction',
            value: 'c. 1425',
          },
          {
            '@type': 'PropertyValue',
            name: 'Heritage status',
            value: 'Rijksmonument',
          },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${BASE_URL}/#website`,
        url: BASE_URL,
        name: title,
        inLanguage: HREFLANG[locale] || locale,
        publisher: {
          '@type': 'Organization',
          name: 'Kronenburgerpark Independent Heritage Research Association',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: ATTRACTION_FULL_NAME,
            item: `${BASE_URL}/${locale}`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Kruittoren',
            item: towerUrl,
          },
        ],
      },
    ],
  };
}
