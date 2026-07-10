import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { ArrowLeft, Gift } from "lucide-react";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export default async function PrizesPage() {
  const prizes = await prisma.prize.findMany({
    include: { images: true },
    orderBy: { order: "asc" },
  });

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 10% 20%, var(--color-brand-purple) 0%, transparent 40%), radial-gradient(circle at 90% 80%, var(--color-brand-green) 0%, transparent 40%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center gap-4 mb-12">
          <Link href="/" className="text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">Catálogo de <span className="text-carnival-green">Premios</span></h1>
        </div>

        {prizes.length === 0 ? (
          <div className="text-center py-20 glass-card-dark">
            <Gift className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl text-white font-bold">Aún no hay premios</h2>
            <p className="text-gray-400">Vuelve pronto para ver los increíbles premios que estaremos sorteando.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {prizes.map((prize) => (
              <Link href={`/prizes/${prize.id}`} key={prize.id} className="block group">
                <div className="glass-card-dark h-full flex flex-col p-4 border border-white/5 group-hover:border-carnival-purple/50 transition-all duration-300 group-hover:-translate-y-2">
                  <div className="h-48 rounded-lg bg-black/50 mb-4 overflow-hidden relative">
                    {prize.images.length > 0 ? (
                      <img src={prize.images[0].url} alt={prize.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Gift className="w-10 h-10 text-gray-700" />
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{prize.name}</h3>
                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <span className="text-xs uppercase text-gray-500">{prize.providerIg || "Promoción 2032"}</span>
                    <span className="text-carnival-green font-semibold text-sm group-hover:text-carnival-orange transition-colors">Ver Detalles &rarr;</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
