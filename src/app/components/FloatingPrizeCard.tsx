'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Gift } from 'lucide-react';
import { useState } from 'react';

interface FloatingPrizeCardProps {
  id: string;
  name: string;
  imageUrl?: string;
  providerIg?: string | null;
  accentColor: 'green' | 'purple' | 'orange';
}

const borderClasses = {
  green: 'border-t-carnival-green',
  purple: 'border-t-carnival-purple',
  orange: 'border-t-carnival-orange',
};

const textClasses = {
  green: 'text-carnival-green',
  purple: 'text-carnival-purple',
  orange: 'text-carnival-orange',
};

export default function FloatingPrizeCard({
  id,
  name,
  imageUrl,
  providerIg,
  accentColor,
}: FloatingPrizeCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className={`glass-card-dark p-6 border-t-2 ${borderClasses[accentColor]} hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full`}
    >
      {/* Image Container */}
      <div className="relative h-48 bg-black/50 rounded-xl mb-6 flex items-center justify-center border border-white/5 overflow-hidden">
        {imageUrl ? (
          <>
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
            )}
            <Image
              src={imageUrl}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover opacity-80"
              onLoad={() => setImageLoaded(true)}
            />
          </>
        ) : (
          <Gift className="w-10 h-10 text-gray-700" />
        )}
      </div>

      {/* Prize Info */}
      <h4 className="text-xl font-bold mb-2 text-white">{name}</h4>
      <p className="text-gray-400 text-sm mb-4">
        {providerIg ? `Auspicia: ${providerIg}` : 'Auspicia: Promoción 2032'}
      </p>

      <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/10">
        <span className={`text-sm font-semibold uppercase tracking-wider ${textClasses[accentColor]}`}>
          Destacado
        </span>
        <Link
          href={`/prizes/${id}`}
          className="bg-white/10 px-3 py-1 rounded-full text-sm font-medium hover:bg-white/20 transition-colors"
        >
          Ver Detalles
        </Link>
      </div>
    </div>
  );
}
