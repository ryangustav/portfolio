'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import styles from './About.module.css';
import { clsx } from 'clsx';
import { User, MapPin, Code2, GraduationCap } from 'lucide-react';

export default function About() {
  const t = useTranslations('Index.about');

  return (
    <section id="sobremim" className={clsx(styles.about, 'section-padding')}>
      <div className="container">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={styles.sectionTitle}
        >
          {t('title')}
        </motion.h2>

        <div className={styles.bento}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className={clsx(styles.item, styles.main, 'glass')}
          >
            <User className={styles.icon} />
            <h3>{t('subtitle')}</h3>
            <p>{t('text1')}</p>
            <p>{t('text2')}</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className={clsx(styles.item, styles.secondary, 'glass')}
          >
            <MapPin className={styles.icon} />
            <p>Aracaju, Sergipe, Brasil</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className={clsx(styles.item, styles.secondary, 'glass')}
          >
            <Code2 className={styles.icon} />
            <p>{t('text3')}</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className={clsx(styles.item, styles.wide, 'glass')}
          >
            <GraduationCap className={styles.icon} />
            <p>{t('text4')}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
