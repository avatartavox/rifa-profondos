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
            width: 'clamp(200px, 27.031%, 320px)',
            transform: 'translateX(-50%)',
          }}
        >
          <p className="font-(family-name:--font-display) text-white uppercase text-[11px] sm:text-sm md:text-base tracking-tight text-center w-full">
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

          <div className="flex flex-col items-center gap-4 md:gap-[29px] mt-1 md:mt-2 w-full">
            <div className="flex gap-2 sm:gap-4 md:gap-8 items-center justify-center text-white uppercase w-full">
              <div className="border-2 border-white rounded-[5px] flex flex-col items-center justify-center gap-1 px-2 py-2 sm:px-4 sm:py-3">
                <p className="font-sans font-semibold text-[7px] sm:text-[9px] md:text-[11px] tracking-wide whitespace-nowrap">
                  Sorteo en Vivo:
                </p>
                <p className="font-(family-name:--font-display) text-[9px] sm:text-xs md:text-[18px] leading-tight text-center">
                  24 Agosto
                  <br />
                  4:00PM
                </p>
              </div>
              <div className="border-2 border-white rounded-[5px] flex flex-col items-center justify-center gap-1 px-3 py-2 sm:px-6 sm:py-3">
                <p className="font-sans font-semibold text-[7px] sm:text-[9px] md:text-[11px] tracking-wide whitespace-nowrap">
                  Inversión:
                </p>
                <p className="font-(family-name:--font-display) text-[9px] sm:text-xs md:text-[18px] whitespace-nowrap">
                  10 soles
                </p>
              </div>
            </div>

            <Link
              href="/prizes"
              className="bg-white text-[#272727] uppercase font-sans font-semibold rounded-[9px] px-3 py-2 sm:px-4.5 sm:py-3.5 text-[9px] sm:text-xs md:text-[18px] whitespace-nowrap transition-transform duration-300 hover:scale-105 shadow-[0_0_25px_rgba(255,255,255,0.35)]"
            >
              Ver Catálogo de Premios
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
