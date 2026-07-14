'use client';

import Link from 'next/link';
import FigmaHeroComposition from './FigmaHeroComposition';

export default function AnimatedHero() {
  return (
    <section className="relative flex flex-col items-center justify-center px-4 py-10 md:py-16 text-center overflow-hidden">
      {/* Base carnival background pattern (dim state) */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/patterns/bg-normal.png)' }}
        aria-hidden="true"
      />
      {/* Highlighted pattern layer - crossfades in/out to create a haunting pulse */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center animate-bg-pulse-glow"
        style={{ backgroundImage: 'url(/patterns/bg-glow.png)' }}
        aria-hidden="true"
      />

      {/* Poster composition: energy ring + scattered prize photos (from Figma) */}
      <div className="relative w-full z-10">
        <FigmaHeroComposition />

        {/* Central content overlay - positioned to match Figma's Frame 19 (left478/1280, top186/728, w346/1280) */}
        <div
          className="absolute z-20 flex flex-col items-center gap-2 md:gap-[10px]"
          style={{
            left: '50%',
            top: '25.549%',
            width: 'clamp(200px, 27.031%, 346px)',
            transform: 'translateX(-50%)',
          }}
        >
          <p
            className="font-(family-name:--font-display) text-white uppercase tracking-tight text-center w-full"
            style={{ fontSize: 'clamp(8px, 1.19vw, 15px)' }}
          >
            Rifa Pro Fondos
          </p>

          <div className="relative w-full" style={{ aspectRatio: '282 / 166.3' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero/logo.svg"
              alt="Fiesta de la Fantasía 2026"
              className="absolute inset-0 w-full h-full object-contain"
            />
          </div>

          <div className="flex flex-col items-center gap-3 mt-1 w-full" style={{ gap: 'clamp(12px, 1.81vw, 23px)' }}>
            <div
              className="flex items-center justify-center text-white uppercase w-full"
              style={{ gap: 'clamp(8px, 2vw, 26px)' }}
            >
              <div
                className="border-2 border-white rounded-[5px] flex flex-col items-center justify-center"
                style={{
                  height: 'clamp(52px, 5.78vw, 74px)',
                  paddingInline: 'clamp(8px, 1.25vw, 16px)',
                  gap: 'clamp(1px, 0.23vw, 3px)',
                }}
              >
                <p
                  className="font-sans font-semibold tracking-wide whitespace-nowrap"
                  style={{ fontSize: 'clamp(6px, 0.86vw, 11px)' }}
                >
                  Sorteo en Vivo:
                </p>
                <p
                  className="font-(family-name:--font-display) leading-tight text-center"
                  style={{ fontSize: 'clamp(8px, 1.41vw, 18px)' }}
                >
                  24 Agosto
                  <br />
                  4:00PM
                </p>
              </div>
              <div
                className="border-2 border-white rounded-[5px] flex flex-col items-center justify-center"
                style={{
                  height: 'clamp(52px, 5.78vw, 74px)',
                  paddingInline: 'clamp(14px, 2.19vw, 28px)',
                  gap: 'clamp(1px, 0.23vw, 3px)',
                }}
              >
                <p
                  className="font-sans font-semibold tracking-wide whitespace-nowrap"
                  style={{ fontSize: 'clamp(6px, 0.86vw, 11px)' }}
                >
                  Inversión:
                </p>
                <p
                  className="font-(family-name:--font-display) whitespace-nowrap"
                  style={{ fontSize: 'clamp(8px, 1.41vw, 18px)' }}
                >
                  10 soles
                </p>
              </div>
            </div>

            <Link
              href="/prizes"
              className="bg-white text-[#272727] uppercase font-sans font-semibold whitespace-nowrap transition-transform duration-300 hover:scale-105 shadow-[0_0_25px_rgba(255,255,255,0.35)]"
              style={{
                borderRadius: 'clamp(6px, 0.7vw, 9px)',
                paddingInline: 'clamp(12px, 1.41vw, 18px)',
                paddingBlock: 'clamp(9px, 1.09vw, 14px)',
                fontSize: 'clamp(8px, 1.41vw, 18px)',
              }}
            >
              Ver Catálogo de Premios
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
