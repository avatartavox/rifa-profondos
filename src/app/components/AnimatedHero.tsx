'use client';

import Link from 'next/link';
import { Calendar, Ticket, ArrowRight } from 'lucide-react';

export default function AnimatedHero() {
  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-20 text-center relative overflow-hidden">
      {/* Enhanced background pattern with animation */}
      <div
        className="absolute inset-0 z-0 opacity-15 pointer-events-none animate-pulse"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 50%, var(--color-brand-purple) 0%, transparent 50%), radial-gradient(circle at 80% 20%, var(--color-brand-green) 0%, transparent 40%), radial-gradient(circle at 20% 80%, var(--color-brand-orange) 0%, transparent 50%)',
        }}
        aria-hidden="true"
      />

      <div className="glass-card-dark p-8 md:p-12 max-w-4xl mx-auto border-t-carnival-green border-t-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 relative z-10">
        {/* Subtitle */}
        <div className="inline-block mb-6 px-4 py-2 rounded-full bg-carnival-green/20 border border-carnival-green/50">
          <h2 className="text-carnival-green font-bold tracking-widest uppercase text-sm md:text-base">
            Rifa Pro Fondos 2026
          </h2>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold mb-8 tracking-tight text-white drop-shadow-lg">
          <span className="block mb-2">FIESTA DE LA</span>
          <span className="block mb-2">
            <span className="text-carnival-purple drop-shadow-md">FANTASÍA</span>
          </span>
          <span className="block">
            <span className="text-carnival-orange drop-shadow-md">2026</span>
          </span>
        </h1>

        {/* Description */}
        <p className="text-base md:text-lg lg:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          ¡Únete a nosotros para una causa increíble! Gana premios espectaculares mientras apoyas a la
          <span className="font-semibold text-white"> Promoción 2032</span>.
        </p>

        {/* Info Cards */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 md:gap-6 mb-12">
          {/* Date Card */}
          <div className="group flex items-center gap-3 glass-card px-6 py-4 border-carnival-green/30 hover:border-carnival-green/60 transition-colors duration-300 cursor-default">
            <Calendar className="text-carnival-green w-6 h-6 group-hover:animate-pulse" />
            <div className="text-left">
              <p className="text-xs text-gray-400 uppercase font-semibold tracking-wide">Sorteo en Vivo</p>
              <p className="font-bold text-white text-sm md:text-base">24 Agosto 4:00 PM</p>
            </div>
          </div>

          {/* Investment Card */}
          <div className="group flex items-center gap-3 glass-card px-6 py-4 border-carnival-purple/30 hover:border-carnival-purple/60 transition-colors duration-300 cursor-default">
            <Ticket className="text-carnival-purple w-6 h-6 group-hover:animate-pulse" />
            <div className="text-left">
              <p className="text-xs text-gray-400 uppercase font-semibold tracking-wide">Inversión</p>
              <p className="font-bold text-white text-sm md:text-base">10 Soles</p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <Link
          href="/prizes"
          className="inline-flex items-center gap-2 bg-carnival-orange text-white px-8 py-4 rounded-full font-bold text-base md:text-lg hover:bg-orange-600 transition-all duration-300 hover:scale-110 shadow-[0_0_30px_rgba(255,87,34,0.5)] hover:shadow-[0_0_50px_rgba(255,87,34,0.8)] group"
        >
          Ver Catálogo de Premios
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
        </Link>

        {/* Decorative elements */}
        <div className="mt-12 flex items-center justify-center gap-2 text-carnival-green/50 text-sm">
          <span>✨</span>
          <span>Más de 30 premios espectaculares</span>
          <span>✨</span>
        </div>
      </div>
    </section>
  );
}
