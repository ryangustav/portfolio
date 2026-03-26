'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import styles from './ContactForm.module.css';
import { clsx } from 'clsx';

export default function ContactForm() {
  const t = useTranslations('Index.contact.form');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('https://formspree.io/f/mbdpjzvg', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={styles.container}
    >
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div className={styles.inputGroup}>
            <label htmlFor="name">{t('name')}</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder={t('name_placeholder')}
              required
              className="glass"
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">{t('email')}</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder={t('email_placeholder')}
              required
              className="glass"
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="message">{t('message')}</label>
          <textarea
            id="message"
            name="message"
            placeholder={t('message_placeholder')}
            required
            rows={5}
            className="glass"
          />
        </div>

        <button 
          type="submit" 
          disabled={status === 'sending' || status === 'success'}
          className={clsx(styles.submitBtn, 'glass', status === 'success' && styles.success)}
        >
          {status === 'idle' && (
            <>
              {t('send')} <Send size={18} />
            </>
          )}
          {status === 'sending' && t('sending')}
          {status === 'success' && (
            <>
              {t('success')} <CheckCircle size={18} />
            </>
          )}
          {status === 'error' && (
            <>
              {t('error')} <AlertCircle size={18} />
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
}
