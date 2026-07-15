import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { ArrowLeft, Image as ImageIcon } from "lucide-react";
import { notFound } from "next/navigation";
import InstagramIcon from "../../components/InstagramIcon";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export default async function PrizeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const prize = await prisma.prize.findUnique({
    where: { id },
    include: { images: true },
  });

  if (!prize) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden text-foreground">
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, var(--color-brand-orange) 0%, transparent 40%)' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-12">
        <Link href="/prizes" className="inline-flex items-center gap-2 text-gray-400 hover:text-white active:scale-95 transition-all mb-8">
          <ArrowLeft className="w-5 h-5" /> Volver al catálogo
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square glass-card-dark rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center">
              {prize.images.length > 0 ? (
                <img src={prize.images[0].url} alt={prize.name} className="w-full h-full object-cover" />
              ) : (
                <div className="text-gray-600 flex flex-col items-center gap-2">
                  <ImageIcon className="w-16 h-16 opacity-50" />
                  <span>Sin imagen</span>
                </div>
              )}
            </div>
            {prize.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {prize.images.slice(1).map((img, i) => (
                  <div key={i} className="aspect-square glass-card-dark rounded-xl overflow-hidden">
                    <img src={img.url} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <h1 className="font-(family-name:--font-heading) text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">{prize.name}</h1>

            <div className="glass-card p-6 border-white/5 mb-8">
              <h3 className="font-(family-name:--font-heading) text-sm uppercase tracking-wider text-carnival-green font-bold mb-2">Descripción del Premio</h3>
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{prize.description}</p>
            </div>

            {(prize.providerIgLabel || prize.providerIgUsername) && (
              <div className="flex items-center justify-between p-6 glass-card-dark border-carnival-purple/30 rounded-xl">
                <div>
                  <p className="font-(family-name:--font-heading) text-sm text-gray-400 uppercase font-bold mb-1">Auspiciador</p>
                  <p className="text-white font-medium">{prize.providerIgLabel || `@${prize.providerIgUsername}`}</p>
                </div>
                {prize.providerIgUsername && (
                  <a
                    href={`https://instagram.com/${prize.providerIgUsername}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:scale-110 active:scale-90 transition-transform"
                  >
                    <InstagramIcon className="w-[30px] h-[30px]" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
