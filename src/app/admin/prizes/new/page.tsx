import { createPrize } from "../actions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewPrizePage() {
  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/prizes" className="text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-3xl font-bold">Agregar Nuevo Premio</h1>
      </div>

      <div className="glass-card-dark p-6 max-w-2xl">
        <form action={createPrize} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Nombre del Premio</label>
            <input 
              type="text" 
              name="name" 
              id="name" 
              required
              className="w-full bg-black border border-white/20 rounded-md p-3 text-white focus:border-carnival-green focus:outline-none"
              placeholder="Ej. Colocación de Bótox"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">Descripción</label>
            <textarea 
              name="description" 
              id="description" 
              required
              rows={4}
              className="w-full bg-black border border-white/20 rounded-md p-3 text-white focus:border-carnival-green focus:outline-none"
              placeholder="Detalles y valor del premio..."
            />
          </div>

          <div>
            <label htmlFor="providerIg" className="block text-sm font-medium text-gray-300 mb-2">Auspiciador (Instagram URL o usuario)</label>
            <input 
              type="text" 
              name="providerIg" 
              id="providerIg" 
              className="w-full bg-black border border-white/20 rounded-md p-3 text-white focus:border-carnival-green focus:outline-none"
              placeholder="Ej. Dermaesthetic"
            />
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" name="isFeatured" id="isFeatured" className="w-4 h-4 rounded border-white/20" />
            <label htmlFor="isFeatured" className="text-sm font-medium text-gray-300">Destacar en la página de inicio</label>
          </div>

          <div className="pt-4 border-t border-white/10">
            <button 
              type="submit"
              className="w-full bg-carnival-green text-black font-bold py-3 rounded-md hover:bg-green-400 transition-colors"
            >
              Guardar Premio
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
