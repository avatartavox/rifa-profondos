import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { Plus } from "lucide-react";
import PrizeListClient from "./PrizeListClient";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export default async function AdminPrizesPage() {
  const prizes = await prisma.prize.findMany({
    orderBy: { order: "asc" }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gestión de Premios</h1>
        <Link href="/admin/prizes/new" className="bg-carnival-green text-black px-4 py-2 rounded font-bold flex items-center gap-2 hover:bg-green-400 transition-colors">
          <Plus className="w-4 h-4" /> Nuevo Premio
        </Link>
      </div>

      <PrizeListClient initialPrizes={prizes} />
    </div>
  )
}
