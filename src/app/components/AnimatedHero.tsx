'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AnimatedHero() {
  // JS-driven crossfade instead of a pure CSS keyframe: guarantees the pulse
  // actually progresses (a CSS `animation` on a huge inline-SVG background
  // was silently stalling), and makes the pace trivially adjustable.
  const [bright, setBright] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setBright((b) => !b), 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden px-4 py-16 md:py-20 text-center min-h-[70vh] md:min-h-[80vh]">
      {/* Base carnival background pattern (dim state) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/patterns/bg-normal.svg"
        alt=""
        className="absolute inset-0 z-0 w-full h-full object-cover"
        aria-hidden="true"
      />
      {/* Highlighted pattern layer - crossfades in/out to create a haunting pulse.
          Neon drop-shadow bloom sells the "glowing ghosts" effect on top of
          the brighter fill-opacity baked into the asset itself. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/patterns/bg-glow.svg"
        alt=""
        className="absolute inset-0 z-0 w-full h-full object-cover"
        style={{
          opacity: bright ? 1 : 0,
          transition: 'opacity 4.3s ease-in-out',
          filter:
            'drop-shadow(0 0 12px rgba(83,236,50,0.55)) drop-shadow(0 0 12px rgba(185,13,244,0.55))',
        }}
        aria-hidden="true"
      />

      {/* Central content */}
      <div
        className="relative z-10 flex flex-col items-center animate-title-pop"
        style={{ gap: 'clamp(28px, 4.84vw, 62px)' }}
      >
        {/* Title block */}
        <div className="flex flex-col items-center w-full" style={{ gap: 'clamp(14px, 2.27vw, 29px)' }}>
          <div
            className="flex flex-col items-center uppercase text-center w-full"
            style={{ gap: 'clamp(3px, 0.39vw, 5px)' }}
          >
            <p
              className="font-(family-name:--font-display) text-white tracking-tight"
              style={{ fontSize: 'clamp(14px, 1.75vw, 22.436px)' }}
            >
              Rifa Pro Fondos
            </p>
            <p
              className="font-sans font-semibold tracking-wide"
              style={{
                fontSize: 'clamp(8px, 1.01vw, 12.971px)',
                color: '#53ec32',
                textShadow: '0 1px 6.2px #53ec32',
              }}
            >
              Organiza Promo 2032
            </p>
          </div>

          <div
            className="relative w-full"
            style={{ maxWidth: '332.532px', aspectRatio: '332.532 / 196.108' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero/logo.svg"
              alt="Fiesta de la Fantasía 2026"
              className="absolute inset-0 w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Info boxes + CTA */}
        <div className="flex flex-col items-center" style={{ gap: 'clamp(18px, 2.67vw, 34.197px)' }}>
          <div
            className="flex items-center justify-center text-white uppercase w-full"
            style={{ gap: 'clamp(16px, 2.95vw, 37.734px)' }}
          >
            <div
              className="relative flex flex-col items-center justify-center border-white"
              style={{
                backgroundColor: 'rgba(0,0,0,0.53)',
                borderWidth: 'clamp(1.5px, 0.18vw, 2.358px)',
                borderStyle: 'solid',
                borderRadius: 'clamp(4px, 0.46vw, 5.896px)',
                height: 'clamp(64px, 6.82vw, 87.26px)',
                paddingInline: 'clamp(12px, 1.47vw, 18.867px)',
                gap: 'clamp(2px, 0.28vw, 3.538px)',
                boxShadow: '0 0 clamp(6px, 0.89vw, 11.4px) #b90df4, 0 0 clamp(3px, 0.49vw, 6.3px) #b90df4, inset 0 0 clamp(3px, 0.39vw, 5px) #b90df4',
              }}
            >
              <p
                className="font-sans font-semibold tracking-wide"
                style={{ fontSize: 'clamp(8px, 1.01vw, 12.971px)', color: '#53ec32', textShadow: '0 1px 6px #53ec32' }}
              >
                Sorteo en Vivo:
              </p>
              <p
                className="font-(family-name:--font-display) leading-tight text-center"
                style={{ fontSize: 'clamp(14px, 1.66vw, 21.225px)' }}
              >
                24 Agosto
                <br />
                4:00PM
              </p>
            </div>

            <div
              className="relative flex flex-col items-center justify-center border-white"
              style={{
                backgroundColor: 'rgba(0,0,0,0.53)',
                borderWidth: 'clamp(1.5px, 0.18vw, 2.358px)',
                borderStyle: 'solid',
                borderRadius: 'clamp(4px, 0.46vw, 5.896px)',
                height: 'clamp(64px, 6.82vw, 87.26px)',
                paddingInline: 'clamp(12px, 1.47vw, 18.867px)',
                gap: 'clamp(2px, 0.28vw, 3.538px)',
                boxShadow: '0 0 clamp(6px, 0.89vw, 11.4px) #b90df4, 0 0 clamp(3px, 0.49vw, 6.3px) #b90df4, inset 0 0 clamp(3px, 0.39vw, 5px) #b90df4',
              }}
            >
              <p
                className="font-sans font-semibold tracking-wide"
                style={{ fontSize: 'clamp(8px, 1.01vw, 12.971px)', color: '#53ec32', textShadow: '0 1px 6px #53ec32' }}
              >
                Inversión:
              </p>
              <p
                className="font-(family-name:--font-display)"
                style={{ fontSize: 'clamp(14px, 1.66vw, 21.225px)' }}
              >
                10 soles
              </p>
            </div>
          </div>

          <Link
            href="/prizes"
            className="flex items-center justify-center uppercase font-sans font-bold text-white transition-transform duration-300 hover:scale-105"
            style={{
              borderRadius: 'clamp(8px, 0.98vw, 12.5px)',
              paddingInline: 'clamp(16px, 1.95vw, 25px)',
              paddingBlock: 'clamp(12px, 1.52vw, 19.444px)',
              fontSize: 'clamp(14px, 1.95vw, 25px)',
              textShadow: '0 clamp(3px, 0.43vw, 5.556px) clamp(3px, 0.43vw, 5.556px) rgba(0,0,0,0.47)',
              background:
                'radial-gradient(ellipse at center, #db84ef 0%, #c169dd 25%, #a74ecc 50%, #8c33ba 75%, #7217a8 100%)',
              boxShadow: '0 0 clamp(16px, 2.34vw, 30px) rgba(185,13,244,0.6)',
            }}
          >
            Ver Catálogo de Premios
          </Link>
        </div>
      </div>
    </section>
  );
}
