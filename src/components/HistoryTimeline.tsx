'use client';

import { useTranslations, useMessages } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

export default function HistoryTimeline() {
  const t = useTranslations('historyTimeline');
  const messages = useMessages() as any;
  const items = (messages?.historyTimeline?.items || []) as Array<{
    year: string;
    title: string;
    desc: string;
  }>;

  const [visible, setVisible] = useState<number[]>([]);
  const refs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number((entry.target as HTMLElement).dataset.idx);
          if (entry.isIntersecting) {
            setVisible((v) => (v.includes(idx) ? v : [...v, idx]));
          }
        });
      },
      { threshold: 0.25 }
    );
    refs.current.forEach((r) => r && observer.observe(r));
    return () => observer.disconnect();
  }, [items.length]);

  return (
    <section id="historyTimeline" className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6 text-center"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-6 mx-auto" style={{ background: 'var(--accent)' }} />
        {t('intro') && (
          <p
            className="text-base leading-relaxed mb-12 text-center max-w-2xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            {t('intro')}
          </p>
        )}

        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-5 sm:left-1/2 sm:-translate-x-1/2 top-0 bottom-0 w-0.5"
            style={{ background: 'var(--border-color)' }}
          />

          <div className="space-y-10">
            {items.map((item, i) => (
              <div
                key={i}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                data-idx={i}
                className={`timeline-item ${visible.includes(i) ? 'is-visible' : ''} relative flex flex-col sm:flex-row items-start gap-4 sm:gap-0`}
              >
                {/* Year node */}
                <div className="flex items-center gap-4 sm:w-1/2 sm:justify-end sm:pr-10 sm:order-1">
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold z-10"
                    style={{ background: 'var(--accent)', color: 'white' }}
                  >
                    {item.year}
                  </div>
                </div>

                {/* Content card */}
                <div className="sm:w-1/2 sm:pl-10 sm:order-2 w-full pl-14 sm:pl-10">
                  <div
                    className="rounded-xl p-5 sm:p-6"
                    style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
                  >
                    <h3
                      className="font-display text-lg sm:text-xl font-semibold mb-2"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
