import { getTranslations } from 'next-intl/server';
import { fetchWeather } from '@/lib/weather';
import { buildAdvice } from '@/lib/weather-advice';

const GROUP_KEYS = [
  { key: 'outfit', label: 'groupOutfit' },
  { key: 'activity', label: 'groupActivity' },
  { key: 'items', label: 'groupItems' },
] as const;

export default async function WeatherSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'weather' });
  const weather = await fetchWeather();

  if (!weather) return null;

  const weekDayFmt = new Intl.DateTimeFormat(locale, { weekday: 'short' });
  const dayFmt = new Intl.DateTimeFormat(locale, { day: 'numeric' });
  const timeFmt = new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Amsterdam',
  });
  const todayIso = weather.daily[0]?.date ?? '';

  const condKey = (code: string) => `conds.${code}` as any;
  const txt = (group: string, key: string) => t(`advice.${group}.${key}` as any);

  const dayLabel = (dateStr: string) => {
    const d = new Date(`${dateStr}T00:00:00`);
    return `${weekDayFmt.format(d)} ${dayFmt.format(d)}`;
  };

  const today = weather.daily[0];
  const plan = today
    ? buildAdvice({
        condition: weather.current.condition,
        feelsLike: weather.current.feelsLike,
        max: today.max,
        min: today.min,
        precipProbability: today.precipProbability,
        windKmh: weather.current.windKmh,
        uvMax: today.uvMax,
      })
    : null;

  const groups = GROUP_KEYS.map((g) => ({
    ...g,
    items: plan ? plan[g.key] : [],
  })).filter((g) => g.items.length > 0);

  return (
    <section id="weather" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
          {t('subtitle')}
        </p>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,380px)_1fr] gap-6">
          {/* Current conditions */}
          <div
            className="rounded-2xl p-6"
            style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--card-shadow)',
            }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-wider mb-2"
              style={{ color: 'var(--text-muted)' }}
            >
              {t('current')}
            </p>
            <div className="mb-1">
              <span
                className="font-display font-bold leading-none"
                style={{ fontSize: '4rem', color: 'var(--text-primary)' }}
              >
                {weather.current.temperature}°
              </span>
            </div>
            <p className="text-lg mb-5" style={{ color: 'var(--accent)' }}>
              {t(condKey(weather.current.condition))}
            </p>

            <dl className="space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <dt style={{ color: 'var(--text-muted)' }}>{t('feelsLike')}</dt>
                <dd style={{ color: 'var(--text-secondary)' }}>{weather.current.feelsLike}°C</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt style={{ color: 'var(--text-muted)' }}>{t('precip')}</dt>
                <dd style={{ color: 'var(--text-secondary)' }}>{today?.precipProbability ?? 0}%</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt style={{ color: 'var(--text-muted)' }}>{t('wind')}</dt>
                <dd style={{ color: 'var(--text-secondary)' }}>{weather.current.windKmh} km/h</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt style={{ color: 'var(--text-muted)' }}>{t('updated')}</dt>
                <dd style={{ color: 'var(--text-secondary)' }}>
                  {timeFmt.format(new Date(weather.updatedAt))}
                </dd>
              </div>
            </dl>
          </div>

          {/* 7-day forecast */}
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-wider mb-3"
              style={{ color: 'var(--text-muted)' }}
            >
              {t('forecast')}
            </p>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {weather.daily.map((day) => {
                const isToday = day.date === todayIso;
                return (
                  <div
                    key={day.date}
                    className="min-w-[92px] flex-1 rounded-xl px-3 py-4 text-center"
                    style={
                      isToday
                        ? { background: 'var(--accent)', color: '#fff' }
                        : {
                            background: 'var(--card-bg)',
                            border: '1px solid var(--border-color)',
                          }
                    }
                  >
                    <p
                      className="text-xs font-medium mb-2"
                      style={{ color: isToday ? '#fff' : 'var(--text-primary)' }}
                    >
                      {dayLabel(day.date)}
                    </p>
                    <p
                      className="text-xs mb-2 leading-tight min-h-[30px]"
                      style={{ color: isToday ? '#fff' : 'var(--text-secondary)' }}
                    >
                      {t(condKey(day.condition))}
                    </p>
                    <p
                      className="font-display font-semibold text-lg"
                      style={{ color: isToday ? '#fff' : 'var(--text-primary)' }}
                    >
                      {day.max}°
                      <span style={{ opacity: 0.7 }}> / {day.min}°</span>
                    </p>
                    <p
                      className="text-[11px] mt-1"
                      style={{
                        color: isToday ? 'rgba(255,255,255,0.9)' : 'var(--text-muted)',
                      }}
                    >
                      {t('precip')} {day.precipProbability}%
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Smart visitor advice */}
        {plan && groups.length > 0 && (
          <div
            className="mt-10 rounded-2xl p-6 sm:p-8"
            style={{
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
            }}
            data-act={groups.map((g) => g.items.length).join(',')}
          >
            <h3
              className="font-display text-xl font-semibold mb-4 flex items-center gap-3"
              style={{ color: 'var(--text-primary)' }}
            >
              <span
                className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                style={{ background: 'var(--accent)', color: '#fff' }}
              >
                {t('advice.heading')}
              </span>
            </h3>

            {/* Risk zone: only when real risks exist */}
            {plan.risks.length > 0 && (
              <div
                className="rounded-xl p-4 mb-5"
                style={{
                  background: 'rgba(220,38,38,0.08)',
                  border: '1px solid rgba(220,38,38,0.35)',
                }}
              >
                <p
                  className="text-sm font-bold uppercase tracking-wide mb-2"
                  style={{ color: '#dc2626' }}
                >
                  {t('advice.riskTitle')}
                </p>
                <ul className="space-y-1.5">
                  {plan.risks.map((key) => (
                    <li key={key} className="flex gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <span aria-hidden style={{ color: '#dc2626', fontWeight: 700 }}>
                        !
                      </span>
                      <span>{txt('risks', key)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {groups.map((group) => (
                <div
                  key={group.key}
                  className="rounded-xl p-4"
                  style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}
                >
                  <p
                    className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2"
                    style={{ color: 'var(--accent)' }}
                  >
                    {t(`advice.${group.label}`)}
                  </p>
                  <ul className="space-y-2">
                    {group.items.map((key) => (
                      <li key={key} className="flex gap-2 text-sm leading-relaxed">
                        <span
                          aria-hidden
                          className="mt-[7px] inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: 'var(--accent)' }}
                        />
                        <span style={{ color: 'var(--text-secondary)' }}>{txt(group.key, key)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {plan.risks.length === 0 && (
              <p className="text-xs mt-4 flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
                <span
                  aria-hidden
                  className="inline-block w-1.5 h-1.5 rounded-full"
                  style={{ background: '#22c55e' }}
                />
                {t('advice.noWarning')}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
