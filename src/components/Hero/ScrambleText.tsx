'use client';

import { useState, useEffect, useCallback } from 'react';

const chars = '!<>-_\\/[]{}—=+*^?#________';

interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function ScrambleText({ text, className, delay = 0 }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const scramble = useCallback(() => {
    let frame = 0;
    const totalFrames = 40;
    const interval = 40;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;

      const scrambled = text
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          if (progress > index / text.length) return char;
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      setDisplayText(scrambled);

      if (frame >= totalFrames) {
        setDisplayText(text);
        clearInterval(timer);
        setIsAnimating(false);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [text]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsAnimating(true);
      scramble();
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay, scramble]);

  return (
    <span className={className} style={{ position: 'relative', display: 'inline-block' }}>
      <span style={{ visibility: 'hidden' }}>{text}</span>
      <span className={className} style={{ position: 'absolute', left: 0, top: 0, width: '100%', whiteSpace: 'nowrap' }}>
        {displayText || text}
      </span>
    </span>
  );
}
