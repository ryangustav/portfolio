'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import styles from './Skills.module.css';
import { clsx } from 'clsx';

export default function Skills() {
  const t = useTranslations('Index.skills');

  const skillGroups = [
    {
      title: t('backend'),
      skills: [
        { name: 'Node.js', level: 90 },
        { name: 'TypeScript', level: 85 },
        { name: 'Python', level: 60 },
        { name: 'Java', level: 50 },
        { name: 'C / C++', level: 65 },
        { name: 'MySQL / MongoDB', level: 75 }
      ]
    },
    {
      title: t('frontend'),
      skills: [
        { name: 'React', level: 70 },
        { name: 'Next.js', level: 75 },
        { name: 'CSS Modules', level: 80 },
        { name: 'HTML / JS', level: 90 }
      ]
    }
  ];

  return (
    <section id="skills" className={clsx(styles.skills, 'section-padding')}>
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
          {skillGroups.map((group, gIndex) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, x: gIndex === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={clsx(styles.group, 'glass')}
            >
              <h3 className={styles.groupTitle}>{group.title}</h3>
              <div className={styles.skillList}>
                {group.skills.map((skill) => (
                  <div key={skill.name} className={styles.skillItem}>
                    <div className={styles.skillInfo}>
                      <span>{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className={styles.progressBar}>
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        viewport={{ once: true }}
                        className={styles.progressFill}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
