'use client';

import Image from 'next/image';

interface FloatItem {
  key: string;
  base: string;
  glow?: string;
  glowOpacity?: number;
  left: number; // percent
  top: number; // percent
  width: number; // percent
  height: number; // percent
  z?: number;
}

// Positions are percentages of the 1280x728 Figma frame, converted from
// the exact node coordinates so the whole composition scales as one unit.
const items: FloatItem[] = [
  {
    key: 'bills-bottom',
    base: '/hero/bills-bottom.png',
    left: 46.797,
    top: 98.011,
    width: 16.447,
    height: 28.917,
    z: 10,
  },
  {
    key: 'soccer',
    base: '/hero/soccer-base.png',
    glow: '/hero/soccer-glow.png',
    glowOpacity: 0.76,
    left: 20.156,
    top: 41.346,
    width: 16.447,
    height: 28.917,
    z: 10,
  },
  {
    key: 'bills-main',
    base: '/hero/bills-main-base.png',
    glow: '/hero/bills-main-glow.png',
    glowOpacity: 0.52,
    left: 23.047,
    top: 12.912,
    width: 17.656,
    height: 31.044,
    z: 10,
  },
  {
    key: 'waist-trainer',
    base: '/hero/waist-base.png',
    glow: '/hero/waist-glow.png',
    glowOpacity: 0.76,
    left: 65.078,
    top: 43.819,
    width: 14.531,
    height: 25.549,
    z: 10,
  },
  {
    key: 'roomba',
    base: '/hero/roomba.png',
    glow: '/hero/roomba-glow.png',
    glowOpacity: 0.5,
    left: 59.531,
    top: 11.47,
    width: 20.781,
    height: 36.538,
    z: 10,
  },
  {
    key: 'ramen',
    base: '/hero/ramen.png',
    glow: '/hero/ramen-glow.png',
    glowOpacity: 0.5,
    left: 43.75,
    top: 71.703,
    width: 14.375,
    height: 28.229,
    z: 10,
  },
  {
    key: 'skincare',
    base: '/hero/skincare.png',
    glow: '/hero/skincare-glow.png',
    glowOpacity: 0.5,
    left: 42.656,
    top: -2.61,
    width: 18.438,
    height: 32.418,
    z: 10,
  },
  {
    key: 'giftcard',
    base: '/hero/giftcard.png',
    glow: '/hero/giftcard-glow.png',
    glowOpacity: 0.57,
    left: 28.281,
    top: 64.835,
    width: 13.828,
    height: 24.313,
    z: 10,
  },
  {
    key: 'makeup',
    base: '/hero/makeup.png',
    glow: '/hero/makeup-glow.png',
    glowOpacity: 0.6,
    left: 58.984,
    top: 66.621,
    width: 10.938,
    height: 19.231,
    z: 10,
  },
];

export default function FigmaHeroComposition() {
  return (
    <div
      className="relative w-full mx-auto"
      style={{ maxWidth: 1280, aspectRatio: '1280 / 728' }}
    >
      {/* Mystical energy ring behind everything */}
      <div
        className="absolute animate-ring-spin"
        style={{
          left: '19.531%',
          top: '-5.082%',
          width: '62.656%',
          height: '110.165%',
          mixBlendMode: 'screen',
        }}
        aria-hidden="true"
      >
        <Image src="/hero/ring.png" alt="" fill sizes="60vw" className="object-cover pointer-events-none" priority />
      </div>

      {/* Floating prize items scattered around the ring */}
      {items.map((item) => (
        <div
          key={item.key}
          className="absolute pointer-events-none animate-item-float"
          style={{
            left: `${item.left}%`,
            top: `${item.top}%`,
            width: `${item.width}%`,
            height: `${item.height}%`,
            zIndex: item.z ?? 10,
          }}
          aria-hidden="true"
        >
          <div className="relative w-full h-full">
            <Image src={item.base} alt="" fill sizes="20vw" className="object-cover pointer-events-none" priority />
            {item.glow && (
              <Image
                src={item.glow}
                alt=""
                fill
                sizes="20vw"
                className="object-cover pointer-events-none"
                style={{ mixBlendMode: 'plus-lighter', opacity: item.glowOpacity ?? 0.6 }}
                priority
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
