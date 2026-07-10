'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

// Section ids must match the ids used in the page components.
const SECTIONS = [
  { id: 'hero', key: 'hero' },
  { id: 'intro', key: 'intro' },
  { id: 'basicInfo', key: 'basicInfo' },
  { id: 'historyTimeline', key: 'historyTimeline' },
  { id: 'historyHeritage', key: 'historyHeritage' },
  { id: 'architecture', key: 'architecture' },
  { id: 'floraFauna', key: 'floraFauna' },
  { id: 'tickets', key: 'tickets' },
  { id: 'transport', key: 'transport' },
  { id: 'route', key: 'route' },
  { id: 'gallery', key: 'gallery' },
  { id: 'references', key: 'references' },
] as const;

export default function TableOfContents() {
  const t = useTranslations('toc');
  const [active, setActive] = useState<string>('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label={t('label')}
      className="hidden lg:block sticky top-24 self-start max-h-[80vh] overflow-y-auto pr-2"
    >
      <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>
        {t('label')}
      </p>
      <ul className="space-y-1 border-l" style={{ borderColor: 'var(--border-color)' }}>
        {SECTIONS.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className="block pl-3 py-1 text-sm transition-colors -ml-px border-l-2"
              style={{
                borderColor: active === s.id ? 'var(--accent)' : 'transparent',
                color: active === s.id ? 'var(--accent)' : 'var(--text-muted)',
                fontWeight: active === s.id ? 600 : 400,
              }}
            >
              {t(s.key)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
