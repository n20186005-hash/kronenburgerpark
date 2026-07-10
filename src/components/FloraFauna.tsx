'use client';

import { useTranslations, useMessages } from 'next-intl';
import { useState } from 'react';

const ICONS: Record<string, string> = {
  waterfowl: '🦢',
  squirrel: '🐿️',
  peacock: '🦚',
  goat: '🐐',
  deer: '🦌',
  tree: '🌳',
  bird: '🐦',
};

export default function FloraFauna() {
  const t = useTranslations('floraFauna');
  const messages = useMessages() as any;
  const cards = (messages?.floraFauna?.cards || []) as Array<{
    name: string;
    latin: string;
    desc: string;
    icon: string;
  }>;

  const [flipped, setFlipped] = useState<number | null>(null);

  return (
    <section id="floraFauna" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6 text-center"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-6 mx-auto" style={{ background: 'var(--accent)' }} />
        {t('intro') && (
          <p
            className="text-base leading-relaxed mb-10 text-center max-w-2xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            {t('intro')}
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <div
              key={i}
              className={`flip-card ${flipped === i ? 'is-flipped' : ''}`}
              onClick={() => setFlipped(flipped === i ? null : i)}
              role="button"
              tabIndex={0}
              aria-label={card.name}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setFlipped(flipped === i ? null : i);
                }
              }}
            >
              <div className="flip-inner">
                {/* Front */}
                <div
                  className="flip-front flex flex-col items-center justify-center p-6 text-center"
                  style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
                >
                  <div className="text-5xl mb-4" aria-hidden="true">
                    {ICONS[card.icon] || '🌿'}
                  </div>
                  <h3
                    className="font-display text-xl font-semibold mb-1"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {card.name}
                  </h3>
                  <p className="text-xs italic mb-3" style={{ color: 'var(--text-muted)' }}>
                    {card.latin}
                  </p>
                  <span className="text-xs" style={{ color: 'var(--accent)' }}>
                    {t('tapHint')}
                  </span>
                </div>

                {/* Back */}
                <div
                  className="flip-back flex flex-col items-center justify-center p-6 text-center"
                  style={{ background: 'var(--accent)', color: 'white' }}
                >
                  <h3 className="font-display text-lg font-semibold mb-2">{card.name}</h3>
                  <p className="text-xs italic mb-3 opacity-80">{card.latin}</p>
                  <p className="text-sm leading-relaxed">{card.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
