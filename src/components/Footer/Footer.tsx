'use client';

import { useTranslations } from 'next-intl';
import styles from './Footer.module.css';
import { clsx } from 'clsx';
import { MessageSquare } from 'lucide-react';
import { Github, Instagram, Linkedin } from '../SocialIcons';
import ContactForm from '../Contact/ContactForm';

export default function Footer() {
  const t = useTranslations('Index.contact');
  const currentYear = new Date().getFullYear();

  const socials = [
    { icon: <MessageSquare size={20} />, href: 'https://discord.com/users/852880352313868298', label: 'Discord' },
    { icon: <Github size={20} />, href: 'https://github.com/ryangustav/', label: 'GitHub' },
    { icon: <Instagram size={20} />, href: 'https://www.instagram.com/ryanzin.dev/', label: 'Instagram' },
    { icon: <Linkedin size={20} />, href: 'https://www.linkedin.com/in/ryan-gustavo-609246329', label: 'LinkedIn' }
  ];

  return (
    <footer id="contato" className={clsx(styles.footer, 'section-padding')}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.info}>
            <h2 className="gradient-text">{t('title')}</h2>
            <p>{t('subtitle')}</p>
          </div>

          <div className={styles.socials}>
            {socials.map((social, index) => (
              <a 
                key={index} 
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className={clsx(styles.socialBtn, 'glass')}
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>

          <div className={styles.formSection}>
            <ContactForm />
          </div>

          <div className={styles.email}>
            <p className={styles.label}>{t('email')}</p>
            <button 
              className={clsx(styles.emailCopy, 'glass')}
              onClick={() => {
                navigator.clipboard.writeText('ryang6329@gmail.com');
                alert('Email copiado!');
              }}
            >
              ryang6329@gmail.com
              <span className={styles.hint}>{t('copy')}</span>
            </button>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {currentYear} Ryan Gustavo. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
