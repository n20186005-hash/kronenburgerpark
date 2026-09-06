'use client';

import { useTranslations, useMessages } from 'next-intl';

type FaqItem = { q: string; a: string };

export default function FaqSection() {
  const t = useTranslations('faq');
  const messages = useMessages() as any;
  const items: FaqItem[] = messages?.faq?.items || [];

  if (!items.length) return null;

  return (
    <section id="faq" className="section-padding" style={{ background: 'var(--bg-tertiary)' }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        {t('intro') && (
          <p className="mb-8" style={{ color: 'var(--text-muted)' }}>
            {t('intro')}
          </p>
        )}
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="space-y-4">
          {items.map((item, i) => (
            <article
              key={i}
              className="rounded-xl p-5 sm:p-6"
              style={{
                background: 'var(--card-bg)',
                boxShadow: 'var(--card-shadow)',
                border: '1px solid var(--border-color)',
              }}
            >
              <h3
                className="font-display text-lg sm:text-xl font-semibold mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                {item.q}
              </h3>
              <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {item.a}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
