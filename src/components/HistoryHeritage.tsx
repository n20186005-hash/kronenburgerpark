import { useTranslations, useMessages } from 'next-intl';

export default function HistoryHeritage() {
  const t = useTranslations('historyHeritage');
  const messages = useMessages() as any;
  const items = (messages?.historyHeritage?.items || []) as Array<{
    id: string;
    title: string;
    content: string;
  }>;

  return (
    <section id="historyHeritage" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-6" style={{ background: 'var(--accent)' }} />
        {t('intro') && (
          <p
            className="text-base leading-relaxed mb-10 max-w-2xl"
            style={{ color: 'var(--text-secondary)' }}
          >
            {t('intro')}
          </p>
        )}

        <div className="space-y-6">
          {items.map((item, i) => (
            <div
              key={item.id}
              className="rounded-2xl p-6 sm:p-8"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-bold"
                  style={{ background: 'var(--accent)', color: 'white' }}
                >
                  {i + 1}
                </div>
                <div>
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
