'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import styles from './Header.module.css';
import { Globe, Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import Logo from '../Logo/Logo';
import NextLink from 'next/link';

export default function Header() {
  const t = useTranslations('Index.nav');
  const locale = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };

    if (isLangOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLangOpen]);

  const locales = [
    { id: 'pt', label: 'PT' },
    { id: 'en', label: 'EN' },
    { id: 'es', label: 'ES' }
  ];

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  // Absolute paths so the section anchors also work from other pages (e.g. /articles)
  const navLinks = [
    { href: `/${locale}#inicio`, label: t('home') },
    { href: `/${locale}#sobremim`, label: t('about') },
    { href: `/${locale}#projetos`, label: t('projects') },
    { href: `/${locale}#skills`, label: t('experience') },
    { href: `/${locale}/articles`, label: t('articles') },
    { href: `/${locale}#contato`, label: t('contact') }
  ];

  return (
    <header className={clsx(styles.header, 'glass')}>
      <nav className={clsx(styles.nav, 'container')}>
        <Link href="/" className={styles.logo}>
          <Logo height="2.5rem" />
        </Link>

        {/* Desktop Nav */}
        <ul className={styles.desktopNav}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <NextLink href={link.href} className={styles.navLink}>{link.label}</NextLink>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <div className={styles.languageSwitcher} ref={dropdownRef}>
            <button 
              className={styles.langBtn}
              onClick={() => setIsLangOpen(!isLangOpen)}
              aria-label="Select Language"
            >
              <Globe size={18} />
              <span>{locales.find(l => l.id === locale)?.label}</span>
              <ChevronDown size={14} className={clsx(styles.chevron, isLangOpen && styles.chevronOpen)} />
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.ul 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className={clsx(styles.langDropdown, 'glass')}
                >
                  {locales.map((loc) => (
                    <li key={loc.id}>
                      <button 
                        onClick={() => {
                          handleLanguageChange(loc.id);
                          setIsLangOpen(false);
                        }}
                        className={clsx(styles.langOption, locale === loc.id && styles.activeLang)}
                      >
                        {loc.label}
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
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
                  <NextLink
                    href={link.href}
                    className={styles.navLink}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </NextLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
