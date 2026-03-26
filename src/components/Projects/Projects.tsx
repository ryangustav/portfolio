'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import styles from './Projects.module.css';
import { clsx } from 'clsx';
import { ExternalLink, Code } from 'lucide-react';
import { Github } from '../SocialIcons';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import OtherProjects from './OtherProjects';

export default function Projects() {
  const t = useTranslations('Index.projects');
  const [showOthers, setShowOthers] = useState(false);

  const projects = [
    {
      id: 'ubus',
      github: 'https://github.com/ryangustav/ubus-api',
      tags: ['PostgreSQL', 'Docker', 'Vault', 'CI/CD']
    },
    {
      id: 'protl',
      github: 'https://github.com/ryangustav/PRorTL-AI',
      link: 'https://protl-ai.site/',
      tags: ['TypeScript', 'Gemini API', 'Node.js']
    },
    {
      id: 'obs',
      github: 'https://github.com/ryangustav/OBS-AutoSegment',
      tags: ['Python', 'Automation', 'OBS Studio']
    },
    {
      id: 'lunna',
      github: 'https://github.com/ryangustav/lunna-backend',
      tags: ['TypeScript', 'Clean Architecture', 'Discord.js']
    },
    {
      id: 'sergipe',
      github: 'https://github.com/ryangustav/sergipanidade-mobile',
      tags: ['React Native', 'Expo', 'TypeScript']
    }
  ];

  return (
    <section id="projetos" className={clsx(styles.projects, 'section-padding')}>
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

        <div className={styles.grid}>
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={clsx(styles.card, 'glass')}
            >
              <div className={styles.cardHeader}>
                <Code className={styles.projectIcon} />
                <div className={styles.links}>
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github size={20} />
                  </a>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>

              <h3 className={styles.projectTitle}>{t(`${project.id}.title`)}</h3>
              <p className={styles.projectDescription}>{t(`${project.id}.description`)}</p>

              <div className={styles.tags}>
                {project.tags.map(tag => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className={styles.toggleContainer}>
          <button 
            className={clsx(styles.toggleBtn, 'glass')}
            onClick={() => setShowOthers(!showOthers)}
          >
            {showOthers ? t('other_projects.button_hide') : t('other_projects.button_show')}
          </button>
        </div>

        <AnimatePresence>
          {showOthers && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ overflow: 'hidden' }}
            >
              <OtherProjects />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
