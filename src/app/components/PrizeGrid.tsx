'use client';

import FloatingPrizeCard from './FloatingPrizeCard';

interface Prize {
  id: string;
  name: string;
  providerIg?: string;
  images?: Array<{ url: string }>;
}

interface PrizeGridProps {
  prizes: Prize[];
}

// Define animation patterns for variety
const animationPattern: Array<'left' | 'right' | 'bottom'> = [
  'left',    // Botox
  'right',   // Roomba
  'left',    // Cash
  'right',   // Giftcard
  'bottom',  // Facial Cleaning
  'bottom',  // Makeup
];

// Define glow colors for variety
const glowColorPattern: Array<'green' | 'purple' | 'orange'> = [
  'green',   // Botox
  'purple',  // Roomba
  'orange',  // Cash
  'green',   // Giftcard
  'purple',  // Facial Cleaning
  'orange',  // Makeup
];

export default function PrizeGrid({ prizes }: PrizeGridProps) {
  // Ensure we have exactly the prizes we want to display
  const displayPrizes = prizes.slice(0, 6);

  if (displayPrizes.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>Pronto anunciaremos los premios destacados.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {displayPrizes.map((prize, index) => (
        <FloatingPrizeCard
          key={prize.id}
          id={prize.id}
          name={prize.name}
          imageUrl={prize.images?.[0]?.url}
          providerIg={prize.providerIg}
          entranceAnimation={animationPattern[index]}
          staggerDelay={index}
          glowColor={glowColorPattern[index]}
        />
      ))}
    </div>
  );
}
