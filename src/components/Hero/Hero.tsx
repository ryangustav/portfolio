'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';
import { clsx } from 'clsx';
import { Code2, ShieldCheck, Terminal } from 'lucide-react';

export default function Hero() {
  const t = useTranslations('Index.hero');

  return (
    <section id="inicio" className={clsx(styles.hero, 'section-padding')}>
      <div className={clsx(styles.content, 'container')}>
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={styles.textSide}
        >
          <div className={styles.badge}>
            <Terminal size={14} />
            <span>Developer & Ethical Hacker</span>
          </div>
          
          <h1 className={styles.title}>
            {t('title')} <br />
            <span className="gradient-text">Fullstack Engineer</span>
          </h1>
          
          <p className={styles.subtitle}>
            {t('subtitle')}
          </p>
          
          <div className={styles.ctaGroup}>
            <a href="#projetos" className={clsx(styles.primaryBtn, 'glass')}>
              {t('cta')}
            </a>
            <div className={styles.socialIcons}>
              <Code2 className={styles.icon} />
              <ShieldCheck className={styles.icon} />
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className={styles.imageSide}
        >
          <div className={styles.blob}></div>
          <div className={clsx(styles.glassCard, 'glass')}>
            <pre className={styles.code}>
              <code>{`{
  "name": "Ryan Gustavo",
  "role": "Fullstack",
  "hobbies": ["Coding", "Hacking"],
  "status": "Available"
}`}</code>
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
