import { useTranslations, useMessages } from 'next-intl';

export default function References() {
  const t = useTranslations('references');
  const messages = useMessages() as any;
  const items = (messages?.references?.items || []) as Array<{
    title: string;
    publisher: string;
    url: string;
  }>;

  if (!items.length) return null;

  return (
    <section id="references" className="section-padding" style={{ background: 'var(--bg-tertiary)' }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-2xl sm:text-3xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-4" style={{ background: 'var(--accent)' }} />
        {t('intro') && (
          <p
            className="text-sm leading-relaxed mb-8"
            style={{ color: 'var(--text-secondary)' }}
          >
            {t('intro')}
          </p>
        )}

        <ol className="space-y-4">
          {items.map((item, i) => (
            <li key={i} className="flex gap-3">
              <span
                className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: 'var(--bg-primary)', color: 'var(--accent)' }}
              >
                {i + 1}
              </span>
              <div>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium hover:underline"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {item.title}
                </a>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {item.publisher}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
