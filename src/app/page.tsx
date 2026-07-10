import Link from "next/link";
import { Ticket, Calendar, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-background text-foreground">
      {/* Abstract Background pattern mimicking the horror carnival vibe */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, var(--color-brand-purple) 0%, transparent 50%), radial-gradient(circle at 80% 20%, var(--color-brand-green) 0%, transparent 40%)' }} />

      <main className="flex-1 flex flex-col relative z-10">
        {/* Hero Section */}
        <section className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-20 text-center">
          <div className="glass-card-dark p-8 md:p-12 max-w-4xl mx-auto border-t-carnival-green border-t-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h2 className="text-carnival-green font-bold tracking-widest uppercase mb-2">Rifa Pro Fondos</h2>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-white drop-shadow-md">
              FIESTA DE LA <br/> <span className="text-carnival-purple">FANTASÍA</span> <span className="text-carnival-orange">2026</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              ¡Únete a nosotros para una causa increíble! Gana premios espectaculares mientras apoyas a la Promoción 2032.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
              <div className="flex items-center gap-2 glass-card px-6 py-3 border-carnival-green/30">
                <Calendar className="text-carnival-green w-6 h-6" />
                <div className="text-left">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Sorteo en Vivo</p>
                  <p className="font-bold">24 Agosto 4:00 PM</p>
                </div>
              </div>
              <div className="flex items-center gap-2 glass-card px-6 py-3 border-carnival-purple/30">
                <Ticket className="text-carnival-purple w-6 h-6" />
                <div className="text-left">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Inversión</p>
                  <p className="font-bold">10 Soles</p>
                </div>
              </div>
            </div>

            <Link href="/prizes" className="inline-flex items-center gap-2 bg-carnival-orange text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-600 transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,87,34,0.4)]">
              Ver Catálogo de Premios <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

        {/* Featured Prizes Preview Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl md:text-5xl font-bold text-center mb-4 text-white">MÁS DE <span className="text-carnival-green">30 PREMIOS</span></h3>
            <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">Échale un vistazo a algunos de los increíbles premios que podrías llevarte a casa.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Colocación de Bótox", val: "S/1,400", provider: "Dermaesthetic", color: "border-carnival-green" },
                { name: "Robot Roomba Essential", val: "S/1,299", provider: "iRobot", color: "border-carnival-purple" },
                { name: "Premio Mayor en Efectivo", val: "S/500", provider: "Promoción 2032", color: "border-carnival-orange" }
              ].map((prize, i) => (
                <div key={i} className={`glass-card-dark p-6 border-t-2 ${prize.color} hover:-translate-y-2 transition-transform duration-300`}>
                  <div className="h-48 bg-black/50 rounded-xl mb-6 flex items-center justify-center border border-white/5">
                    <span className="text-gray-600">Imagen de Premio</span>
                  </div>
                  <h4 className="text-xl font-bold mb-2 text-white">{prize.name}</h4>
                  <p className="text-gray-400 text-sm mb-4">Valorizado en: <span className="font-bold text-white">{prize.val}</span></p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">{prize.provider}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link href="/prizes" className="text-carnival-green hover:text-white transition-colors underline underline-offset-4 font-semibold">
                Ver todos los premios...
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center bg-black/50">
        <p className="text-gray-500 mb-4">Organizador: Promoción 2032</p>
        <a href="https://instagram.com/colegio.nivela" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-gray-400 hover:text-carnival-purple transition-colors font-bold">
          IG: @colegio.nivela
        </a>
      </footer>
    </div>
  );
}
