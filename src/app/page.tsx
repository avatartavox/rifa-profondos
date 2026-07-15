import { PrismaClient } from "@prisma/client";
import AnimatedHero from "./components/AnimatedHero";
import PrizeGrid from "./components/PrizeGrid";
import InstagramIcon from "./components/InstagramIcon";
import Link from "next/link";

const prisma = new PrismaClient();
export const dynamic = "force-dynamic";

export default async function Home() {
  const featuredPrizes = await prisma.prize.findMany({
    where: { isFeatured: true },
    orderBy: { order: "asc" },
    include: { images: true },
  });

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-background text-foreground">
      <main className="flex-1 flex flex-col relative z-10">
        {/* Hero Section with Animations */}
        <AnimatedHero />

        {/* Featured Prizes Preview Section */}
        <section className="py-16 md:py-24 px-4 relative">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12 md:mb-16">
              <h2 className="font-(family-name:--font-heading) text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                MÁS DE <span className="text-carnival-green">30 PREMIOS</span>
              </h2>
              <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto">
                Échale un vistazo a algunos de los increíbles premios que podrías llevarte a casa. Todos los
                premios están disponibles y garantizados.
              </p>
            </div>

            {/* Prize Grid with Floating Animations */}
            <div className="mb-12 md:mb-16">
              <PrizeGrid prizes={featuredPrizes} />
            </div>

            {/* View All Link */}
            {featuredPrizes.length > 0 && (
              <div className="text-center">
                <Link
                  href="/prizes"
                  className="inline-flex items-center gap-2 text-carnival-green hover:text-carnival-orange active:scale-95 transition-all underline underline-offset-4 font-semibold text-base md:text-lg"
                >
                  Ver todos los premios →
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 md:py-12 text-center bg-black/50 relative z-10">
        <p className="text-gray-500 mb-3 text-sm md:text-base">Organizador: Promoción 2032</p>
        <a
          href="https://instagram.com/colegio.nivela"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-carnival-purple active:scale-95 transition-all font-bold text-sm md:text-base"
        >
          <InstagramIcon className="w-5 h-5" /> @colegio.nivela
        </a>
        <div className="mt-6 flex items-center justify-center gap-2 text-gray-500 text-xs md:text-sm">
          <span>Implementado por</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/flexigon.png" alt="Flexigon" className="h-4 md:h-5 w-auto opacity-80" />
        </div>
      </footer>
    </div>
  );
}
