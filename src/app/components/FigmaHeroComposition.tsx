'use client';

import Image from 'next/image';

type BlendMode = 'normal' | 'plus-lighter';

interface Layer {
  src: string;
  blend: BlendMode;
  opacity?: number;
  fit?: 'cover' | 'contain'; // 'contain' for crisp cutouts whose native aspect differs from the group box
}

interface FloatItem {
  key: string;
  left: number; // percent, relative to the 1280x728 composition
  top: number; // percent
  width: number; // percent
  height: number; // percent
  layers: Layer[]; // bottom -> top paint order, matching Figma's layer stack
  z?: number;
}

// Positions are percentages of the 1280x728 Figma frame, converted from
// the exact node coordinates so the whole composition scales as one unit.
// Each item is a "sandwich" of layers (bottom -> top), matching Figma's
// per-layer blend mode exactly: 'normal' (regular/crisp cutout) or
// 'plus-lighter' (glow/aura pass, additive blend over the layer below).
const items: FloatItem[] = [
  {
    key: 'soccer',
    left: 20.156,
    top: 41.346,
    width: 16.447,
    height: 28.917,
    layers: [
      { src: '/hero/soccer-bottom-regular.png', blend: 'normal' },
      { src: '/hero/soccer-top-blend.png', blend: 'plus-lighter', opacity: 0.76 },
    ],
  },
  {
    key: 'bills-main',
    left: 23.047,
    top: 12.912,
    width: 17.656,
    height: 31.044,
    layers: [
      { src: '/hero/bills-main-bottom-blend.png', blend: 'plus-lighter', opacity: 0.52 },
      { src: '/hero/bills-main-top-regular.png', blend: 'normal' },
    ],
  },
  {
    key: 'waist-trainer',
    left: 65.078,
    top: 43.819,
    width: 14.531,
    height: 25.549,
    layers: [
      { src: '/hero/waist-bottom-blend.png', blend: 'plus-lighter', opacity: 0.76 },
      { src: '/hero/waist-top-regular.png', blend: 'normal' },
    ],
  },
  {
    key: 'roomba',
    left: 59.531,
    top: 11.47,
    width: 20.781,
    height: 36.538,
    layers: [
      { src: '/hero/roomba-bottom-blend.png', blend: 'plus-lighter' },
      { src: '/hero/roomba-middle-regular.png', blend: 'normal' },
      { src: '/hero/roomba-bottom-blend.png', blend: 'plus-lighter', opacity: 0.24 },
    ],
  },
  {
    key: 'ramen',
    left: 43.75,
    top: 71.703,
    width: 14.375,
    height: 28.229,
    layers: [
      { src: '/hero/ramen-bottom-blend.png', blend: 'plus-lighter' },
      { src: '/hero/ramen-middle-regular.png', blend: 'normal' },
      { src: '/hero/ramen-bottom-blend.png', blend: 'plus-lighter', opacity: 0.2 },
    ],
  },
  {
    key: 'skincare',
    left: 42.656,
    top: -2.61,
    width: 18.438,
    height: 32.418,
    layers: [
      { src: '/hero/skincare-bottom-blend.png', blend: 'plus-lighter' },
      { src: '/hero/skincare-middle-regular.png', blend: 'normal' },
      { src: '/hero/skincare-bottom-blend.png', blend: 'plus-lighter', opacity: 0.3 },
    ],
  },
  {
    key: 'giftcard',
    left: 28.281,
    top: 64.835,
    width: 13.828,
    height: 24.313,
    layers: [
      { src: '/hero/giftcard-bottom-blend.png', blend: 'plus-lighter', opacity: 0.57 },
      { src: '/hero/giftcard-middle-regular.png', blend: 'normal', fit: 'contain' },
      { src: '/hero/giftcard-bottom-blend.png', blend: 'plus-lighter', opacity: 0.28 },
    ],
  },
  {
    key: 'makeup',
    left: 58.984,
    top: 66.621,
    width: 10.938,
    height: 19.231,
    layers: [
      { src: '/hero/makeup-bottom-blend.png', blend: 'plus-lighter' },
      { src: '/hero/makeup-middle-regular.png', blend: 'normal', fit: 'contain' },
      { src: '/hero/makeup-top-blend.png', blend: 'plus-lighter', opacity: 0.25 },
    ],
  },
];

export default function FigmaHeroComposition() {
  return (
    <div className="relative w-full mx-auto overflow-hidden" style={{ maxWidth: 1280, aspectRatio: '1280 / 728' }}>
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

      {/* Floating prize items scattered around the ring - each a layered sandwich */}
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
            // The float animation's `transform` creates a new stacking context on
            // this wrapper, which would otherwise trap each layer's mix-blend-mode
            // to only see its siblings inside this box (never the real page
            // background behind it). Screen-blending the whole composited item
            // against that real backdrop here fixes the residual dark box around
            // transparent regions of the base cutout.
            mixBlendMode: 'screen',
          }}
          aria-hidden="true"
        >
          <div className="relative w-full h-full">
            {item.layers.map((layer, i) => (
              <Image
                key={i}
                src={layer.src}
                alt=""
                fill
                sizes="20vw"
                className={`pointer-events-none ${layer.fit === 'contain' ? 'object-contain' : 'object-cover'}`}
                style={layer.blend === 'plus-lighter' ? { mixBlendMode: 'plus-lighter', opacity: layer.opacity ?? 1 } : undefined}
                priority
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
