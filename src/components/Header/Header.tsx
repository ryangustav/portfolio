'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import styles from './Header.module.css';
import { Globe, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { clsx } from 'clsx';

export default function Header() {
  const t = useTranslations('Index.nav');
  const locale = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const locales = [
    { id: 'pt', label: 'PT' },
    { id: 'en', label: 'EN' },
    { id: 'es', label: 'ES' }
  ];

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  const navLinks = [
    { href: '#inicio', label: t('home') },
    { href: '#sobremim', label: t('about') },
    { href: '#projetos', label: t('projects') },
    { href: '#skills', label: t('experience') },
    { href: '#contato', label: t('contact') }
  ];

  return (
    <header className={clsx(styles.header, 'glass')}>
      <nav className={clsx(styles.nav, 'container')}>
        <Link href="/" className={styles.logo}>
          <span className="gradient-text">RG</span>
        </Link>

        {/* Desktop Nav */}
        <ul className={styles.desktopNav}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className={styles.navLink}>{link.label}</a>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <div className={styles.languageSwitcher}>
            <Globe size={18} />
            <select 
              onChange={(e) => handleLanguageChange(e.target.value)}
              className={styles.select}
              value={locale}
            >
              {locales.map((loc) => (
                <option key={loc.id} value={loc.id}>{loc.label}</option>
              ))}
            </select>
          </div>

          <button 
            className={styles.mobileMenuBtn}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className={clsx(styles.mobileNav, 'glass')}>
            <ul>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href} 
                    className={styles.navLink}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
