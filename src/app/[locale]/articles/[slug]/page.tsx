import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header/Header';
import { Link } from '@/i18n/routing';
import { formatDate } from '@/components/Articles/formatDate';
import styles from '@/components/Articles/Articles.module.css';
import prose from '@/components/Articles/Prose.module.css';
import { getArticle } from '@/lib/articles';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};

  return {
    title: `${article.title} · Ryan Gustavo`,
    description: article.description,
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.description,
      publishedTime: article.date,
      tags: article.tags,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const t = await getTranslations('Articles');

  return (
    <main>
      <Header />
      <section className={styles.page}>
        <article className={`${styles.article} container`} lang="en">
          <Link href="/articles" className={styles.back}>
            <ArrowLeft size={16} />
            {t('back')}
          </Link>

          <header className={styles.articleHeader}>
            <div className={styles.meta}>
              <time dateTime={article.date}>{formatDate(article.date, locale)}</time>
              <span aria-hidden>·</span>
              <span>{t('minRead', { minutes: article.readingTime })}</span>
              {article.draft && <span className={styles.draft}>draft</span>}
            </div>
            <h1 className={styles.articleTitle}>{article.title}</h1>
            <div className={styles.tags}>
              {article.tags.map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          </header>

          <div className={prose.prose}>{article.content}</div>
        </article>
      </section>
    </main>
  );
}
