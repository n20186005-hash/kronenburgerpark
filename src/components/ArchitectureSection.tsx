import { useTranslations, useMessages } from 'next-intl';

export default function ArchitectureSection() {
  const t = useTranslations('architecture');
  const messages = useMessages() as any;
  const items = (messages?.architecture?.items || []) as Array<{
    id: string;
    title: string;
    content: string;
  }>;
  const facts = (messages?.architecture?.facts || []) as Array<{ label: string; value: string }>;

  return (
    <section className="section-padding" style={{ background: 'var(--bg-primary)' }} id="architecture">
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="text-base leading-relaxed mb-6 max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
          {t('intro')}
        </p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        {t('schematicCaption') && (
          <figure className="mb-10 rounded-2xl overflow-hidden" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
            <div className="p-6 flex items-center justify-content-center" style={{ background: 'var(--bg-secondary)' }}>
              <svg viewBox="0 0 320 220" className="w-full max-w-md mx-auto" role="img" aria-label={t('schematicAlt') as string}>
                {/* Rampart ground line */}
                <rect x="0" y="170" width="320" height="50" fill="var(--accent)" opacity="0.12" />
                <line x1="10" y1="170" x2="310" y2="170" stroke="var(--accent)" strokeWidth="2" />
                {/* Circular tower body */}
                <circle cx="160" cy="120" r="60" fill="var(--bg-primary)" stroke="var(--accent)" strokeWidth="3" />
                <circle cx="160" cy="120" r="34" fill="var(--bg-secondary)" stroke="var(--border-color)" strokeWidth="2" />
                {/* Cannonball deflection arrows */}
                <line x1="20" y1="50" x2="95" y2="100" stroke="var(--text-muted)" strokeWidth="2" strokeDasharray="4 3" markerEnd="url(#arrow)" />
                <line x1="300" y1="50" x2="225" y2="100" stroke="var(--text-muted)" strokeWidth="2" strokeDasharray="4 3" markerEnd="url(#arrow)" />
                {/* Inner powder store vault */}
                <path d="M160 86 a34 34 0 0 1 0 68" fill="none" stroke="var(--accent)" strokeWidth="1.5" opacity="0.6" />
                <text x="160" y="124" textAnchor="middle" fontSize="11" fill="var(--text-muted)">powder vault</text>
                <text x="160" y="200" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">round plan · c.1425</text>
                <defs>
                  <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                    <path d="M0,0 L6,3 L0,6 Z" fill="var(--text-muted)" />
                  </marker>
                </defs>
              </svg>
            </div>
            <figcaption className="px-6 pb-5 text-sm text-center" style={{ color: 'var(--text-muted)' }}>
              {t('schematicCaption')}
            </figcaption>
          </figure>
        )}

        {/* Fact sheet */}
        {facts.length > 0 && (
          <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10"
          >
            {facts.map((f, i) => (
              <div
                key={i}
                className="rounded-xl p-4 text-center"
                style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
              >
                <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>{f.label}</p>
                <p className="font-display text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{f.value}</p>
              </div>
            ))}
          </div>
        )}

        <div className="space-y-6">
          {items.map((item) => (
            <div
              key={item.id}
              id={item.id}
              className="rounded-2xl p-6 sm:p-8 scroll-mt-24"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <h3
                className="font-display text-xl sm:text-2xl font-semibold mb-3"
                style={{ color: 'var(--text-primary)' }}
              >
                {item.title}
              </h3>
              <p
                className="text-base leading-relaxed whitespace-pre-wrap"
                style={{ color: 'var(--text-secondary)' }}
              >
                {item.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
