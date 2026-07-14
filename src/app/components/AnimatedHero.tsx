'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ScatteredPrizes from './ScatteredPrizes';

export default function AnimatedHero() {
  return (
    <section className="relative min-h-[92vh] md:min-h-screen flex flex-col items-center justify-center px-4 py-16 text-center overflow-hidden">
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
      {/* Darken + vignette for legibility */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 40%, rgba(10,10,10,0.35) 0%, rgba(10,10,10,0.85) 65%, rgba(10,10,10,0.97) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Scattered decorative prize images (poster collage, non-interactive) */}
      <ScatteredPrizes />

      {/* Central focal content */}
      <div className="relative z-20 max-w-3xl mx-auto flex flex-col items-center animate-title-pop">
        {/* Eyebrow badge */}
        <div className="mb-4 px-5 py-1.5 rounded-full bg-carnival-green/15 border-2 border-carnival-green">
          <span className="text-carnival-green font-extrabold tracking-[0.2em] uppercase text-xs md:text-sm">
            Rifa Pro Fondos
          </span>
        </div>

        {/* Central Title - dominant poster typography */}
        <h1 className="font-extrabold uppercase leading-[0.95] tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
          <span className="block text-3xl md:text-5xl lg:text-6xl text-white">Fiesta de la</span>
          <span className="block text-5xl md:text-7xl lg:text-8xl text-carnival-purple [text-shadow:_0_0_30px_rgba(160,32,240,0.6)]">
            Fantasía
          </span>
          <span className="block text-5xl md:text-7xl lg:text-8xl text-carnival-orange [text-shadow:_0_0_30px_rgba(255,87,34,0.6)]">
            2026
          </span>
        </h1>

        {/* Ribbon-style info badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:gap-4">
          <div
            className="animate-ribbon-in flex flex-col items-center px-6 py-2.5 bg-carnival-green text-black font-bold rounded-md shadow-[0_6px_0_0_rgba(0,0,0,0.4)] -rotate-2"
            style={{ animationDelay: '700ms' }}
          >
            <span className="text-[10px] uppercase tracking-wider opacity-70">Sorteo en vivo</span>
            <span className="text-sm md:text-base leading-tight">24 Agosto · 4:00 PM</span>
          </div>

          <div
            className="animate-ribbon-in flex flex-col items-center px-6 py-2.5 bg-carnival-orange text-white font-bold rounded-md shadow-[0_6px_0_0_rgba(0,0,0,0.4)] rotate-2"
            style={{ animationDelay: '800ms' }}
          >
            <span className="text-[10px] uppercase tracking-wider opacity-80">Inversión</span>
            <span className="text-sm md:text-base leading-tight">10 Soles el ticket</span>
          </div>
        </div>

        {/* Description */}
        <p
          className="animate-ribbon-in mt-6 text-sm md:text-base text-gray-300 max-w-xl leading-relaxed"
          style={{ animationDelay: '900ms' }}
        >
          ¡Únete a nosotros para una causa increíble! Gana premios espectaculares mientras apoyas a la{' '}
          <span className="font-semibold text-white">Promoción 2032</span>.
        </p>

        {/* CTA */}
        <Link
          href="/prizes"
          className="animate-ribbon-in mt-8 inline-flex items-center gap-2 bg-carnival-purple text-white px-9 py-4 rounded-full font-extrabold text-base md:text-lg uppercase tracking-wide transition-all duration-300 hover:scale-110 shadow-[0_0_35px_rgba(160,32,240,0.6)] hover:shadow-[0_0_55px_rgba(160,32,240,0.9)] group"
          style={{ animationDelay: '1000ms' }}
        >
          Ver Catálogo de Premios
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
        </Link>
      </div>
    </section>
  );
}
