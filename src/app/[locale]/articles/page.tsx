import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header/Header';
import ArticleList from '@/components/Articles/ArticleList';
import styles from '@/components/Articles/Articles.module.css';
import { getAllArticles } from '@/lib/articles';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Articles');
  return {
    title: `${t('title')} · Ryan Gustavo`,
    description: t('subtitle'),
  };
}

export default async function ArticlesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('Articles');
  const articles = await getAllArticles(locale);

  return (
    <main>
      <Header />
      <section className={styles.page}>
        <div className="container">
          <header className={styles.header}>
            <h1 className={`${styles.title} gradient-text`}>{t('title')}</h1>
            <p className={styles.subtitle}>{t('subtitle')}</p>
          </header>
          <ArticleList articles={articles} />
        </div>
      </section>
    </main>
  );
}
