'use client';

import { useTranslations, useMessages } from 'next-intl';

type SourceItem = { title: string; publisher: string; url: string };

function hostnameOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

export default function SourcesSection() {
  const t = useTranslations('sources');
  const messages = useMessages() as any;
  const items: SourceItem[] = messages?.sources?.items || [];

  if (!items.length) return null;

  return (
    <section id="sources" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-2xl sm:text-3xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-4" style={{ background: 'var(--accent)' }} />
        {t('intro') && (
          <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
            {t('intro')}
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((item, i) => {
            const hostname = hostnameOf(item.url);
            const isOfficial = hostname.endsWith('.nl') || hostname === 'holland.com';
            return (
              <a
                key={i}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl p-4 sm:p-5 transition-transform hover:-translate-y-0.5"
                style={{
                  background: 'var(--card-bg)',
                  boxShadow: 'var(--card-shadow)',
                  border: '1px solid var(--border-color)',
                }}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span
                    className="text-xs font-semibold uppercase tracking-wide"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {hostname}
                  </span>
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                    style={
                      isOfficial
                        ? { background: 'var(--accent)', color: '#fff' }
                        : { background: 'var(--tag-bg)', color: 'var(--tag-text)' }
                    }
                  >
                    {isOfficial ? 'Official' : 'Reference'}
                  </span>
                </div>
                <p className="text-sm font-medium leading-snug" style={{ color: 'var(--text-primary)' }}>
                  {item.title}
                </p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                  {item.publisher}
                </p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
