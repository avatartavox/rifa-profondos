import { updatePrize, deletePrize } from "../../actions";
import Link from "next/link";
import { ArrowLeft, Trash2 } from "lucide-react";
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

export default async function EditPrizePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const prize = await prisma.prize.findUnique({
    where: { id: resolvedParams.id },
    include: { images: true }
  });

  if (!prize) {
    notFound();
  }

  // Pre-bind the id to the server actions
  const updatePrizeWithId = updatePrize.bind(null, prize.id);
  const deletePrizeWithId = deletePrize.bind(null, prize.id);

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/prizes" className="text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-3xl font-bold flex-1">Editar Premio</h1>
        <form action={deletePrizeWithId}>
          <button 
            type="submit"
            className="flex items-center gap-2 bg-red-500/20 text-red-400 px-4 py-2 rounded font-bold hover:bg-red-500 hover:text-white transition-colors"
          >
            <Trash2 className="w-4 h-4" /> Eliminar
          </button>
        </form>
      </div>

      <div className="glass-card-dark p-6 max-w-2xl">
        <form action={updatePrizeWithId} className="space-y-6" encType="multipart/form-data">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Nombre del Premio</label>
            <input 
              type="text" 
              name="name" 
              id="name" 
              defaultValue={prize.name}
              required
              className="w-full bg-black border border-white/20 rounded-md p-3 text-white focus:border-carnival-green focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">Descripción</label>
            <textarea 
              name="description" 
              id="description" 
              defaultValue={prize.description}
              required
              rows={4}
              className="w-full bg-black border border-white/20 rounded-md p-3 text-white focus:border-carnival-green focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="providerIg" className="block text-sm font-medium text-gray-300 mb-2">Auspiciador (Instagram URL o usuario)</label>
            <input 
              type="text" 
              name="providerIg" 
              id="providerIg" 
              defaultValue={prize.providerIg || ""}
              className="w-full bg-black border border-white/20 rounded-md p-3 text-white focus:border-carnival-green focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              name="isFeatured" 
              id="isFeatured" 
              defaultChecked={prize.isFeatured}
              className="w-4 h-4 rounded border-white/20" 
            />
            <label htmlFor="isFeatured" className="text-sm font-medium text-gray-300">Destacar en la página de inicio</label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Imagen del Premio</label>
            {prize.images.length > 0 && (
              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-2">Imagen actual:</p>
                <img 
                  src={prize.images[0].url} 
                  alt={prize.name} 
                  className="h-40 w-auto object-cover rounded-lg border border-white/10"
                />
                <p className="text-xs text-gray-500 mt-2">Sube una nueva imagen para reemplazarla.</p>
              </div>
            )}
            <input 
              type="file" 
              name="image" 
              id="image" 
              accept="image/*"
              className="w-full bg-black border border-white/20 rounded-md p-2 text-white focus:border-carnival-green focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-carnival-green file:text-black hover:file:bg-green-400"
            />
            <p className="text-xs text-gray-500 mt-2">Tamaño máximo: 4.5MB.</p>
          </div>

          <div className="pt-4 border-t border-white/10">
            <button 
              type="submit"
              className="w-full bg-carnival-green text-black font-bold py-3 rounded-md hover:bg-green-400 transition-colors"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
