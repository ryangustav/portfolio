import React from 'react';

interface LogoProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

// Outlined "RG" monogram. Each letter is drawn as a thick centerline (white in the mask)
// with a thinner centerline cut out of it (black), which leaves only the contour.
// Overlapping letters merge their contours. Bottom ends are closed by clipping the
// inner cut 14px above the outer edge.
const R_BODY = 'M300,690 V396 H400 C455,396 485,425 485,460 C485,497 455,522 400,522 H300';
const R_LEG = 'M392,522 L497,690';
const G_OUTER = 'M700,433 A108,120 0 1 0 686.4,601.9 C706,583 725,565 725,545 V515 H640';
const G_INNER = 'M690.7,422.2 A108,120 0 1 0 686.4,601.9 C706,583 725,565 725,545 V515 H654';

export default function Logo({ className, width = 'auto', height = '2rem' }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="268 360 490 302"
      className={className}
      width={width}
      height={height}
      role="img"
      aria-label="Ryan Gustavo"
    >
      <defs>
        <linearGradient id="rgLogoGradient" gradientUnits="userSpaceOnUse" x1="275" y1="370" x2="750" y2="655">
          <stop offset="0" stopColor="#12a2ff" />
          <stop offset="0.5" stopColor="#6a5cf0" />
          <stop offset="1" stopColor="#9b27e0" />
        </linearGradient>
        <clipPath id="rgLogoClipOuter">
          <rect x="0" y="0" width="1000" height="655" />
        </clipPath>
        <clipPath id="rgLogoClipInner">
          <rect x="0" y="0" width="1000" height="641" />
        </clipPath>
        <mask id="rgLogoMask" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="1000">
          <g fill="none" stroke="#fff" strokeWidth="50" clipPath="url(#rgLogoClipOuter)">
            <path d={R_BODY} />
            <path d={R_LEG} />
            <path d={G_OUTER} />
          </g>
          <g fill="none" stroke="#000" strokeWidth="22" clipPath="url(#rgLogoClipInner)">
            <path d={R_BODY} />
            <path d={R_LEG} />
            <path d={G_INNER} />
          </g>
        </mask>
      </defs>

      <rect x="268" y="360" width="490" height="302" fill="url(#rgLogoGradient)" mask="url(#rgLogoMask)" />
    </svg>
  );
}
