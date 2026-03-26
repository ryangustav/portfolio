'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, GitFork, ExternalLink } from 'lucide-react';
import { Github as GithubIcon } from '../SocialIcons';
import styles from './OtherProjects.module.css';
import { clsx } from 'clsx';

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  fork: boolean;
}

const EXCLUDED_REPOS = [
  'ubus-api',
  'PRorTL-AI',
  'OBS-AutoSegment',
  'lunna-backend',
  'sergipanidade-mobile',
  'portfolio', 
  'ryangustav' 
];

export default function OtherProjects() {
  const t = useTranslations('Index.projects.other_projects');
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch('https://api.github.com/users/ryangustav/repos?sort=updated&per_page=100');
        if (!res.ok) throw new Error('Failed to fetch');
        const data: Repo[] = await res.json();
        
        const filtered = data
          .filter(repo => !EXCLUDED_REPOS.includes(repo.name) && !repo.fork)
          .slice(0, 12); // Limit to 12 most recent
          
        setRepos(filtered);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
  }, []);

  if (loading) {
    return <div className={styles.loading}>{t('loading')}</div>;
  }

  if (error) {
    return <div className={styles.error}>{t('error')}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>{t('title')}</h3>
        <p className={styles.subtitle}>{t('subtitle')}</p>
      </div>

      <div className={styles.grid}>
        {repos.map((repo, index) => (
          <motion.div
            key={repo.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={clsx(styles.card, 'glass')}
          >
            <div className={styles.cardContent}>
              <div className={styles.repoHeader}>
                <GithubIcon size={18} className={styles.icon} />
                <div className={styles.links}>
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
              
              <h4 className={styles.repoName}>{repo.name}</h4>
              <p className={styles.repoDescription}>
                {repo.description || 'No description provided.'}
              </p>
              
              <div className={styles.footer}>
                <div className={styles.stats}>
                  <span title={t('stars')}>
                    <Star size={14} /> {repo.stargazers_count}
                  </span>
                  <span title={t('forks')}>
                    <GitFork size={14} /> {repo.forks_count}
                  </span>
                </div>
                {repo.language && (
                  <span className={styles.language}>{repo.language}</span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
