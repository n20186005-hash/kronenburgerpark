import type { MetadataRoute } from 'next';
import { SITE_DOMAIN, ATTRACTION_FULL_NAME } from '@/lib/site-data';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${ATTRACTION_FULL_NAME} - Visitor Guide & Location`,
    short_name: ATTRACTION_FULL_NAME,
    description: `Independent visitor guide to ${ATTRACTION_FULL_NAME} in Nijmegen, Gelderland, Netherlands: location map, history, Kruittoren tower, wildlife and travel tips.`,
    id: '/',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#faf8f4',
    theme_color: '#234830',
    categories: ['travel', 'parks', 'tourism'],
    lang: 'en',
    dir: 'ltr',
    shortcuts: [
      {
        name: 'Map & Directions',
        short_name: 'Map',
        url: '/#map',
        icons: [{ src: '/icons/icon-192.png', sizes: '192x192' }],
      },
      {
        name: 'Photo Gallery',
        short_name: 'Gallery',
        url: '/#gallery',
        icons: [{ src: '/icons/icon-192.png', sizes: '192x192' }],
      },
    ],
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      {
        src: '/icons/icon-maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
