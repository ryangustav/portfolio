import React from 'react';

interface LogoProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

export default function Logo({ className, width = 'auto', height = '2rem' }: LogoProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 400 300" 
      className={className}
      width={width}
      height={height}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="gradModernSohRG" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#0e4399', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#701199', stopOpacity: 1 }} />
        </linearGradient>
        <mask id="logoMask">
          <rect width="400" height="300" fill="white" />
          <path d="M80,180 L320,100 L320,120 L80,200 Z" fill="black" />
        </mask>
      </defs>
      
      <g mask="url(#logoMask)" fill="url(#gradModernSohRG)" transform="translate(10, 20) scale(1.1)">
        <path d="M90,80 h70 c30,0 45,15 45,35 c0,15 -10,25 -20,30 L215,200 h-35 L150,150 H120 V200 H90 V80 Z M120,105 v25 h35 c10,0 15,-5 15,-12 c0,-8 -5,-13 -15,-13 H120 Z" />
        <path d="M230,80 h70 v25 h-65 c-10,0 -15,5 -15,15 v40 c0,10 5,15 15,15 h40 v-25 H255 v-20 h45 v65 H230 c-30,0 -45,-15 -45,-35 v-40 c0,-20 15,-35 45,-35 Z" />
      </g>
    </svg>
  );
}
