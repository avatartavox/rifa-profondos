import { createPrize } from "../actions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SubmitButton from "../../../components/SubmitButton";

export default function NewPrizePage() {
  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/prizes" className="text-gray-400 hover:text-white active:scale-95 transition-all">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="font-(family-name:--font-heading) text-3xl font-bold">Agregar Nuevo Premio</h1>
      </div>

      <div className="glass-card-dark p-6 max-w-2xl">
        <form action={createPrize} className="space-y-6" encType="multipart/form-data">
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
            <label htmlFor="providerIgLabel" className="block text-sm font-medium text-gray-300 mb-2">Nombre del Auspiciador</label>
            <input
              type="text"
              name="providerIgLabel"
              id="providerIgLabel"
              className="w-full bg-black border border-white/20 rounded-md p-3 text-white focus:border-carnival-green focus:outline-none"
              placeholder="Ej. Flexigon"
            />
          </div>

          <div>
            <label htmlFor="providerIgUsername" className="block text-sm font-medium text-gray-300 mb-2">Usuario de Instagram</label>
            <input
              type="text"
              name="providerIgUsername"
              id="providerIgUsername"
              className="w-full bg-black border border-white/20 rounded-md p-3 text-white focus:border-carnival-green focus:outline-none"
              placeholder="Ej. flexigon.io"
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-300 mb-2">Imagen del Premio</label>
            <input 
              type="file" 
              name="image" 
              id="image" 
              accept="image/*"
              className="w-full bg-black border border-white/20 rounded-md p-2 text-white focus:border-carnival-green focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-carnival-green file:text-black hover:file:bg-green-400"
            />
            <p className="text-xs text-gray-500 mt-2">Tamaño máximo: 4.5MB.</p>
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" name="isFeatured" id="isFeatured" className="w-4 h-4 rounded border-white/20" />
            <label htmlFor="isFeatured" className="text-sm font-medium text-gray-300">Destacar en la página de inicio</label>
          </div>

          <div className="pt-4 border-t border-white/10">
            <SubmitButton
              pendingLabel="Guardando..."
              className="w-full bg-carnival-green text-black font-bold py-3 rounded-md hover:bg-green-400 transition-colors"
            >
              Guardar Premio
            </SubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
}
