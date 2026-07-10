'use client';

import { useTranslations, useMessages } from 'next-intl';
import type { ReactNode } from 'react';

export default function TransportSection() {
  const t = useTranslations('transport');
  const messages = useMessages() as any;
  const airports = (messages?.transport?.airports || []) as Array<{
    code: string;
    name: string;
    steps: string[];
  }>;
  const lastMile = (messages?.transport?.lastMile || []) as string[];
  const accessibility = (messages?.transport?.accessibility || []) as string[];

  const overviewOptions = [
    {
      key: 'fromCenter',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 22h20L12 2z" />
          <circle cx="12" cy="15" r="3" />
        </svg>
      ),
    },
    {
      key: 'fromStation',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8" />
          <path d="M12 17v4" />
        </svg>
      ),
    },
    {
      key: 'publicTransport',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="4" y="3" width="16" height="16" rx="2" />
          <path d="M4 11h16" />
          <circle cx="8" cy="15" r="1" />
          <circle cx="16" cy="15" r="1" />
        </svg>
      ),
    },
    {
      key: 'driving',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 3v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3" />
          <path d="M14 6h6a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-6" />
          <path d="M4 20h16" />
          <circle cx="7" cy="17" r="2" />
          <circle cx="17" cy="17" r="2" />
        </svg>
      ),
    },
  ];

  return (
    <section className="section-padding" id="transport">
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="text-base leading-relaxed mb-4 max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
          {t('intro')}
        </p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        {/* Airport-to-site routes */}
        <h3 className="font-display text-xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
          {t('airportTitle')}
        </h3>
        <div className="space-y-4 mb-10">
          {airports.map((a) => (
            <div
              key={a.code}
              className="rounded-xl p-5"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="text-xs font-bold px-2 py-1 rounded"
                  style={{ background: 'var(--accent)', color: 'white' }}
                >
                  {a.code}
                </span>
                <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{a.name}</h4>
              </div>
              <ol className="space-y-2">
                {a.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ background: 'var(--bg-primary)', color: 'var(--accent)' }}
                    >
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>

        {/* Local overview */}
        <h3 className="font-display text-xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
          {t('localTitle')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {overviewOptions.map((option) => (
            <TransportCard
              key={option.key}
              icon={option.icon}
              title={t(option.key as any)}
              description={t(`${option.key}Desc` as any)}
            />
          ))}
        </div>

        {/* Last mile */}
        {lastMile.length > 0 && (
          <div
            className="rounded-xl p-5 mb-6"
            style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
          >
            <h4 className="font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{t('lastMileTitle')}</h4>
            <ul className="space-y-2">
              {lastMile.map((line, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Accessibility */}
        {accessibility.length > 0 && (
          <div
            className="rounded-xl p-5"
            style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--accent)' }}
          >
            <h4 className="font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                <circle cx="12" cy="4" r="2" />
                <path d="M12 6v6m0 0l-3 7m3-7l3 7M8 10h8" />
              </svg>
              {t('accessibilityTitle')}
            </h4>
            <ul className="space-y-2">
              {accessibility.map((line, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

function TransportCard({ icon, title, description }: { icon: ReactNode; title: string; description: string }) {
  return (
    <div
      className="rounded-xl p-5 flex gap-4"
      style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
    >
      <div
        className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
        style={{ background: 'var(--accent)', color: 'white' }}
      >
        {icon}
      </div>
      <div>
        <h3 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{title}</h3>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{description}</p>
      </div>
    </div>
  );
}
