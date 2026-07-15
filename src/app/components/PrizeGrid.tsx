import FloatingPrizeCard from './FloatingPrizeCard';

interface Prize {
  id: string;
  name: string;
  providerIgLabel?: string | null;
  providerIgUsername?: string | null;
  images?: Array<{ url: string }>;
}

interface PrizeGridProps {
  prizes: Prize[];
}

const accentPattern: Array<'green' | 'purple' | 'orange'> = ['green', 'purple', 'orange'];

export default function PrizeGrid({ prizes }: PrizeGridProps) {
  if (prizes.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>Pronto anunciaremos los premios destacados.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {prizes.map((prize, index) => (
        <FloatingPrizeCard
          key={prize.id}
          id={prize.id}
          name={prize.name}
          imageUrl={prize.images?.[0]?.url}
          providerIgLabel={prize.providerIgLabel}
          accentColor={accentPattern[index % accentPattern.length]}
        />
      ))}
    </div>
  );
}
