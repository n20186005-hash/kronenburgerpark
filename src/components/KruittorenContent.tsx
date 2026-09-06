'use client';

import { useTranslations, useLocale, useMessages } from 'next-intl';

export default function KruittorenContent() {
  const t = useTranslations('kruittorenPage');
  const locale = useLocale();
  const m = useMessages() as any;
  const facts = (m?.kruittorenPage?.facts || []) as Array<{ label: string; value: string }>;
  const story = (m?.kruittorenPage?.storyItems || []) as Array<{
    id: string;
    title: string;
    content: string;
  }>;
  const visit = (m?.kruittorenPage?.visitItems || []) as Array<{ title: string; text: string }>;
  const faq = (m?.kruittorenPage?.faqItems || []) as Array<{ q: string; a: string }>;
  const backCtaHref = `/${locale}`;

  return (
    <main>
      {/* Hero */}
      <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-5xl mx-auto">
          <h1
            className="font-display text-4xl sm:text-5xl font-semibold mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            {t('pageTitle')}
          </h1>
          <p className="text-base sm:text-lg leading-relaxed max-w-3xl" style={{ color: 'var(--text-secondary)' }}>
            {t('pageLead')}
          </p>
          <div className="w-12 h-0.5 mt-8 mb-8" style={{ background: 'var(--accent)' }} />

          {facts.length > 0 && (
            <>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
                {t('factsTitle')}
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                {facts.map((f, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-4"
                    style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
                  >
                    <p className="text-xs mb-1.5" style={{ color: 'var(--text-muted)' }}>{f.label}</p>
                    <p className="font-display text-sm font-semibold leading-snug" style={{ color: 'var(--text-primary)' }}>
                      {f.value}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Story */}
      {story.length > 0 && (
        <section className="section-padding" style={{ background: 'var(--bg-tertiary)' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              {t('storyTitle')}
            </h2>
            {t('storyLead') && (
              <p className="mb-8" style={{ color: 'var(--text-muted)' }}>{t('storyLead')}</p>
            )}
            <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />
            <div className="space-y-6">
              {story.map((item, i) => (
                <article
                  key={item.id || i}
                  className="rounded-2xl p-6 sm:p-8"
                  style={{ background: 'var(--card-bg)', boxShadow: 'var(--card-shadow)', border: '1px solid var(--border-color)' }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-bold"
                      style={{ background: 'var(--accent)', color: 'white' }}
                    >
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="font-display text-xl sm:text-2xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                        {item.title}
                      </h3>
                      <p className="text-base leading-relaxed whitespace-pre-wrap" style={{ color: 'var(--text-secondary)' }}>
                        {item.content}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Visiting */}
      {visit.length > 0 && (
        <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
          <div className="max-w-5xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              {t('visitTitle')}
            </h2>
            {t('visitLead') && (
              <p className="mb-8" style={{ color: 'var(--text-muted)' }}>{t('visitLead')}</p>
            )}
            <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {visit.map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl p-6"
                  style={{ background: 'var(--card-bg)', boxShadow: 'var(--card-shadow)', border: '1px solid var(--border-color)' }}
                >
                  <h3 className="font-display text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {faq.length > 0 && (
        <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              {t('faqTitle')}
            </h2>
            {t('faqLead') && (
              <p className="mb-8" style={{ color: 'var(--text-muted)' }}>{t('faqLead')}</p>
            )}
            <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />
            <div className="space-y-4">
              {faq.map((item, i) => (
                <article
                  key={i}
                  className="rounded-xl p-5 sm:p-6"
                  style={{ background: 'var(--card-bg)', boxShadow: 'var(--card-shadow)', border: '1px solid var(--border-color)' }}
                >
                  <h3 className="font-display text-lg sm:text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
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
      )}

      {/* Back to the park guide */}
      <section className="py-12 px-4 sm:px-6" style={{ background: 'var(--bg-tertiary)', borderTop: '1px solid var(--border-color)' }}>
        <div
          className="max-w-4xl mx-auto rounded-2xl p-8 text-center"
          style={{ background: 'var(--accent)', color: 'white' }}
        >
          <h2 className="font-display text-2xl sm:text-3xl font-semibold mb-3">{t('backTitle')}</h2>
          <p className="text-sm sm:text-base opacity-90 mb-6 max-w-2xl mx-auto">{t('backText')}</p>
          <a
            href={backCtaHref}
            className="inline-block rounded-lg px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ background: 'white', color: 'var(--accent)' }}
          >
            {t('backCta')}
          </a>
        </div>
      </section>
    </main>
  );
}
