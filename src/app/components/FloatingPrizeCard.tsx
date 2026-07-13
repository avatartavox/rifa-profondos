'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Gift } from 'lucide-react';
import { useState } from 'react';

interface FloatingPrizeCardProps {
  id: string;
  name: string;
  imageUrl?: string;
  providerIg?: string;
  entranceAnimation: 'left' | 'right' | 'bottom';
  staggerDelay: number;
  glowColor: 'green' | 'purple' | 'orange';
}

const glowColorClasses = {
  green: 'glow-green-hover border-carnival-green/50',
  purple: 'glow-purple-hover border-carnival-purple/50',
  orange: 'glow-orange-hover border-carnival-orange/50',
};

const animationClasses = {
  left: 'animate-slide-in-left',
  right: 'animate-slide-in-right',
  bottom: 'animate-slide-in-bottom',
};

const delayClasses: Record<number, string> = {
  0: 'animate-delay-100',
  1: 'animate-delay-200',
  2: 'animate-delay-300',
  3: 'animate-delay-400',
  4: 'animate-delay-500',
  5: 'animate-delay-600',
};

export default function FloatingPrizeCard({
  id,
  name,
  imageUrl,
  providerIg,
  entranceAnimation,
  staggerDelay,
  glowColor,
}: FloatingPrizeCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const entranceClass = animationClasses[entranceAnimation];
  const delayClass = delayClasses[staggerDelay] || 'animate-delay-100';
  const glowClass = glowColorClasses[glowColor];

  return (
    <div
      className={`
        group relative h-full
        ${entranceClass} ${delayClass}
        opacity-0
      `}
    >
      {/* Floating animation container */}
      <div
        className={`
          h-full flex flex-col
          animate-float-gentle
          transition-transform duration-300 ease-out
          group-hover:-translate-y-5 group-hover:scale-105
        `}
      >
        {/* Prize Card */}
        <div
          className={`
            glass-card-dark p-6 h-full flex flex-col
            border border-white/10
            ${glowClass}
            transition-all duration-300
            overflow-hidden
          `}
        >
          {/* Image Container */}
          <div className="relative h-48 md:h-56 bg-black/50 rounded-xl mb-4 flex items-center justify-center border border-white/5 overflow-hidden group-hover:border-white/20 transition-colors">
            {imageUrl ? (
              <>
                {/* Loading skeleton */}
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
                )}
                <Image
                  src={imageUrl}
                  alt={name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-contain p-4 transition-transform duration-300 group-hover:scale-110"
                  onLoad={() => setImageLoaded(true)}
                  priority={staggerDelay < 2}
                />
              </>
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-600">
                <Gift className="w-12 h-12 mb-2" />
                <span className="text-xs text-gray-500">Imagen no disponible</span>
              </div>
            )}
          </div>

          {/* Prize Info */}
          <div className="flex-1 flex flex-col">
            <h4 className="text-lg md:text-xl font-bold text-white mb-1 line-clamp-2">
              {name}
            </h4>
            <p className="text-gray-400 text-xs md:text-sm mb-4 flex-1">
              {providerIg ? `Auspicia: ${providerIg}` : 'Auspicia: Promoción 2032'}
            </p>

            {/* Highlight Badge */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <span className={`text-xs font-semibold uppercase tracking-wider ${
                glowColor === 'green' ? 'text-carnival-green' :
                glowColor === 'purple' ? 'text-carnival-purple' :
                'text-carnival-orange'
              }`}>
                Destacado
              </span>
              <Link
                href={`/prizes/${id}`}
                className="bg-white/10 px-3 py-1 rounded-full text-xs md:text-sm font-medium hover:bg-white/20 transition-colors duration-200"
              >
                Detalles
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Glow effect on hover */}
      <div
        className={`
          absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100
          transition-opacity duration-300
          pointer-events-none
          blur-xl
          ${
            glowColor === 'green' ? 'bg-carnival-green/20' :
            glowColor === 'purple' ? 'bg-carnival-purple/20' :
            'bg-carnival-orange/20'
          }
        `}
        aria-hidden="true"
      />
    </div>
  );
}
