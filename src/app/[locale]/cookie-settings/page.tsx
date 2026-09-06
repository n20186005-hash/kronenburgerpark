import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/i18n-seo';
import CookieSettingsClient from './CookieSettingsClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    alternates: buildAlternates(locale, 'cookie-settings'),
  };
}

export default async function CookiePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CookieSettingsClient />;
}
