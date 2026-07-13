'use client';

import Image from 'next/image';

interface ScatterItem {
  src: string;
  alt: string;
  /** Tailwind position classes (absolute positioning per breakpoint) */
  position: string;
  /** Width in px at desktop; scaled down responsively via className */
  size: string;
  rotate: number;
  floatVariant: 'a' | 'b' | 'c';
  delay: number;
  z: string;
}

const items: ScatterItem[] = [
  {
    src: '/prizes/botox/floating.svg',
    alt: '',
    position: 'left-[2%] top-[8%] md:left-[6%] md:top-[10%]',
    size: 'w-24 md:w-36 lg:w-40',
    rotate: -8,
    floatVariant: 'a',
    delay: 0,
    z: 'z-10',
  },
  {
    src: '/prizes/roomba/floating.svg',
    alt: '',
    position: 'right-[2%] top-[6%] md:right-[8%] md:top-[8%]',
    size: 'w-24 md:w-32 lg:w-36',
    rotate: 6,
    floatVariant: 'b',
    delay: 120,
    z: 'z-10',
  },
  {
    src: '/prizes/cash/floating.svg',
    alt: '',
    position: 'left-[0%] bottom-[22%] md:left-[2%] md:bottom-[24%]',
    size: 'w-28 md:w-40 lg:w-44',
    rotate: -5,
    floatVariant: 'c',
    delay: 240,
    z: 'z-10',
  },
  {
    src: '/prizes/giftcard/floating.svg',
    alt: '',
    position: 'right-[0%] bottom-[20%] md:right-[3%] md:bottom-[22%]',
    size: 'w-28 md:w-40 lg:w-44',
    rotate: 9,
    floatVariant: 'a',
    delay: 360,
    z: 'z-10',
  },
  {
    src: '/prizes/facial-cleaning/floating.svg',
    alt: '',
    position: 'left-[16%] bottom-[2%] md:left-[20%] md:bottom-[4%]',
    size: 'w-20 md:w-28 lg:w-32',
    rotate: -4,
    floatVariant: 'b',
    delay: 480,
    z: 'z-0',
  },
  {
    src: '/prizes/makeup/floating.svg',
    alt: '',
    position: 'right-[14%] bottom-[0%] md:right-[18%] md:bottom-[2%]',
    size: 'w-24 md:w-32 lg:w-36',
    rotate: 5,
    floatVariant: 'c',
    delay: 600,
    z: 'z-0',
  },
];

const floatClass: Record<ScatterItem['floatVariant'], string> = {
  a: 'animate-float-scatter-a',
  b: 'animate-float-scatter-b',
  c: 'animate-float-scatter-c',
};

export default function ScatteredPrizes() {
  return (
    <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
      {items.map((item, i) => (
        <div
          key={i}
          className={`absolute ${item.position} ${item.size} ${item.z} animate-pop-scatter`}
          style={{
            // @ts-expect-error CSS custom property
            '--pop-rotate': `${item.rotate}deg`,
            animationDelay: `${item.delay}ms`,
          }}
        >
          <div className={floatClass[item.floatVariant]}>
            <Image
              src={item.src}
              alt=""
              width={220}
              height={220}
              className="w-full h-auto drop-shadow-[0_8px_24px_rgba(0,0,0,0.6)]"
              priority={i < 2}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
