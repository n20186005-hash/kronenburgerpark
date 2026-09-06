import { useTranslations, useLocale } from 'next-intl';
import {
  STREET_ADDRESS,
  POSTAL_CODE,
  CITY_NAME,
  COUNTRY_NAME,
  PHONE,
  MAPS_SHARE_URL,
} from '@/lib/site-data';

const EXPLORE_ANCHORS = ['tickets', 'transport', 'gallery', 'faq'] as const;

export default function Footer() {
  const t = useTranslations('footer');
  const toc = useTranslations('toc');
  const locale = useLocale();

  return (
    <footer
      className="py-12 px-4 sm:px-6"
      style={{ background: 'var(--bg-tertiary)', borderTop: '1px solid var(--border-color)' }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Official resources */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
              Kronenburgerpark
            </h3>
            <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
              {t('officialResourcesTitle')}
            </p>
            <div className="flex flex-col gap-2">
              <a href="https://www.nijmegen.nl/" target="_blank" rel="noopener noreferrer" className="hover:underline text-sm" style={{ color: 'var(--accent)' }}>
                {t('officialLinks.nijmegen')}
              </a>
              <a href="https://www.gelderland.nl/en" target="_blank" rel="noopener noreferrer" className="hover:underline text-sm" style={{ color: 'var(--accent)' }}>
                {t('officialLinks.gelderland')}
              </a>
              <a href="https://www.cultureelerfgoed.nl/" target="_blank" rel="noopener noreferrer" className="hover:underline text-sm" style={{ color: 'var(--accent)' }}>
                {t('officialLinks.cultureelErfgoed')}
              </a>
              <a href="https://en.intonijmegen.com/" target="_blank" rel="noopener noreferrer" className="hover:underline text-sm" style={{ color: 'var(--accent)' }}>
                {t('officialLinks.intonijmegen')}
              </a>
              <a href="https://www.overheid.nl/" target="_blank" rel="noopener noreferrer" className="hover:underline text-sm" style={{ color: 'var(--accent)' }}>
                {t('officialLinks.overheid')}
              </a>
              <a href="https://www.nederlandwereldwijd.nl/" target="_blank" rel="noopener noreferrer" className="hover:underline text-sm" style={{ color: 'var(--accent)' }}>
                {t('officialLinks.nederlandWereldwijd')}
              </a>
            </div>
          </div>

          {/* Descriptive internal quick links (SEO anchor text) */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              {t('exploreTitle')}
            </h3>
            <nav aria-label={t('exploreTitle')} className="flex flex-col gap-2">
              {EXPLORE_ANCHORS.map((id) => (
                <a
                  key={id}
                  href={`/${locale}/#${id}`}
                  className="hover:underline text-sm"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {toc(id)}
                </a>
              ))}
            </nav>
          </div>

          {/* NAP — must match the Google Business Profile exactly */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              {t('contactTitle')}
            </h3>
            <address className="not-italic text-sm space-y-1" style={{ color: 'var(--text-secondary)' }}>
              <p>
                {STREET_ADDRESS}, {POSTAL_CODE} {CITY_NAME}
              </p>
              <p>{COUNTRY_NAME}</p>
              <p>
                <a href={`tel:${PHONE}`} className="hover:underline" style={{ color: 'var(--text-secondary)' }}>
                  {PHONE}
                </a>
              </p>
              <p>
                <a
                  href={MAPS_SHARE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                  style={{ color: 'var(--accent)' }}
                >
                  {CITY_NAME} · Google Maps
                </a>
              </p>
            </address>
          </div>
        </div>

        <div
          className="pt-6 text-center text-sm space-y-3"
          style={{ borderTop: '1px solid var(--border-color)', color: 'var(--text-muted)' }}
        >
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            <a href={`/${locale}/privacy-policy`} style={{ color: 'var(--text-secondary)' }} className="hover:underline">
              {t('privacy')}
            </a>
            <a href={`/${locale}/terms-of-service`} style={{ color: 'var(--text-secondary)' }} className="hover:underline">
              {t('terms')}
            </a>
            <a href={`/${locale}/cookie-settings`} style={{ color: 'var(--text-secondary)' }} className="hover:underline">
              {t('cookies')}
            </a>
          </div>
          <p>{t('rights')}</p>
          <p className="text-xs max-w-3xl mx-auto leading-relaxed">{t('disclaimer')}</p>
          <p className="text-xs max-w-3xl mx-auto leading-relaxed">{t('imageCredits')}</p>
        </div>
      </div>
    </footer>
  );
}
