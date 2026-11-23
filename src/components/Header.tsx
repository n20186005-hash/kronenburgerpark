'use client';

import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';

const sections = ['gallery', 'reviews', 'map', 'nearby'] as const;

export default function Header() {
  const t = useTranslations('header');
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const nearby = pathname?.startsWith(`/${locale}/nearby`);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const solid = scrolled || (!nearby && pathname !== `/${locale}`);
  const foreground = solid ? 'var(--text-primary)' : '#fff';

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
      style={{
        background: solid ? 'var(--bg-secondary)' : 'linear-gradient(rgba(15,32,21,.82), rgba(15,32,21,.24))',
        borderBottom: solid ? '1px solid var(--border-color)' : '1px solid transparent',
        color: foreground,
      }}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 px-4 sm:px-6 md:grid-cols-[auto_1fr_auto] md:gap-x-5">
        <a href={`/${locale}`} className="flex min-h-14 items-center font-display text-base font-semibold tracking-tight sm:text-lg md:min-h-16">
          Kronenburgerpark
        </a>
        <nav className="col-span-2 flex min-h-10 items-stretch justify-center gap-1 border-t border-current/15 pb-1 sm:gap-3 md:col-span-1 md:min-h-16 md:border-0 md:pb-0"
          aria-label={t('navigation')}>
          {sections.map((section) => (
            <a
              key={section}
              href={section === 'nearby' ? `/${locale}/nearby` : `/${locale}/#${section}`}
              aria-current={section === 'nearby' && nearby ? 'location' : undefined}
              className="flex items-center whitespace-nowrap rounded-md px-2 text-xs font-medium hover:underline aria-[current=location]:underline sm:text-sm md:px-2.5 underline-offset-4"
            >
              {t(section)}
            </a>
          ))}
        </nav>
        <div className="col-start-2 row-start-1 flex items-center gap-1.5 md:col-start-3">
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
