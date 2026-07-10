import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export default async function AdminPrizesPage() {
  const prizes = await prisma.prize.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gestión de Premios</h1>
        <Link href="/admin/prizes/new" className="bg-carnival-green text-black px-4 py-2 rounded font-bold flex items-center gap-2 hover:bg-green-400 transition-colors">
          <Plus className="w-4 h-4" /> Nuevo Premio
        </Link>
      </div>

      <div className="glass-card-dark overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 border-b border-white/10">
            <tr>
              <th className="p-4 font-semibold text-gray-300">Nombre</th>
              <th className="p-4 font-semibold text-gray-300">Auspiciador</th>
              <th className="p-4 font-semibold text-gray-300">Destacado</th>
              <th className="p-4 font-semibold text-gray-300">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {prizes.map(prize => (
              <tr key={prize.id} className="hover:bg-white/5 transition-colors">
                <td className="p-4 font-medium">{prize.name}</td>
                <td className="p-4 text-gray-400">{prize.providerIg || '-'}</td>
                <td className="p-4">
                  {prize.isFeatured ? (
                    <span className="bg-carnival-purple/20 text-carnival-purple px-2 py-1 rounded text-xs">Sí</span>
                  ) : (
                    <span className="bg-white/10 text-gray-400 px-2 py-1 rounded text-xs">No</span>
                  )}
                </td>
                <td className="p-4 text-carnival-orange text-sm cursor-pointer hover:underline">Editar</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
