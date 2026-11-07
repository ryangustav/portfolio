'use client';

import { useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { Link } from '@/i18n/routing';
import type { ArticleMeta } from '@/lib/articles';
import { formatDate } from './formatDate';
import styles from './Articles.module.css';

export default function ArticleList({ articles }: { articles: ArticleMeta[] }) {
  const t = useTranslations('Articles');
  const locale = useLocale();
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const tags = useMemo(
    () => Array.from(new Set(articles.flatMap((a) => a.tags))).sort(),
    [articles]
  );

  const visible = activeTag ? articles.filter((a) => a.tags.includes(activeTag)) : articles;

  if (articles.length === 0) {
    return <p className={styles.empty}>{t('empty')}</p>;
  }

  return (
    <>
      {tags.length > 1 && (
        <div className={styles.filters} role="group" aria-label={t('filterLabel')}>
          <button
            className={clsx(styles.filter, activeTag === null && styles.filterActive)}
            onClick={() => setActiveTag(null)}
            aria-pressed={activeTag === null}
          >
            {t('all')}
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              className={clsx(styles.filter, activeTag === tag && styles.filterActive)}
              onClick={() => setActiveTag(tag)}
              aria-pressed={activeTag === tag}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      <div className={styles.list}>
        {visible.map((article, index) => (
          <motion.div
            key={article.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <Link href={`/articles/${article.slug}`} className={clsx(styles.card, 'glass')}>
              <div className={styles.meta}>
                <time dateTime={article.date}>{formatDate(article.date, locale)}</time>
                <span aria-hidden>·</span>
                <span>{t('minRead', { minutes: article.readingTime })}</span>
                {article.draft && <span className={styles.draft}>draft</span>}
              </div>
              <h2 className={styles.cardTitle}>{article.title}</h2>
              <p className={styles.cardDescription}>{article.description}</p>
              <div className={styles.tags}>
                {article.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </>
  );
}
