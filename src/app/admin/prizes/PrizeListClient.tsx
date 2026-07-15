"use client";

import { Prize } from "@prisma/client";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import Link from "next/link";
import { GripVertical } from "lucide-react";
import { useState, useTransition } from "react";
import { reorderPrizes } from "./actions";

export default function PrizeListClient({ initialPrizes }: { initialPrizes: Prize[] }) {
  const [prizes, setPrizes] = useState(initialPrizes);
  const [isPending, startTransition] = useTransition();

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(prizes);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Optimistically update UI
    setPrizes(items);

    // Save to DB
    const bulkUpdateData = items.map((item, index) => ({
      id: item.id,
      order: index,
    }));

    startTransition(async () => {
      await reorderPrizes(bulkUpdateData);
    });
  };

  return (
    <div className="glass-card-dark overflow-hidden relative">
      {isPending && (
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-10">
          <div className="w-6 h-6 border-2 border-carnival-green border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      <table className="w-full text-left">
        <thead className="bg-white/5 border-b border-white/10">
          <tr>
            <th className="p-4 w-12"></th>
            <th className="p-4 font-semibold text-gray-300">Nombre</th>
            <th className="p-4 font-semibold text-gray-300">Auspiciador</th>
            <th className="p-4 font-semibold text-gray-300">Destacado</th>
            <th className="p-4 font-semibold text-gray-300">Acciones</th>
          </tr>
        </thead>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="prizes">
            {(provided) => (
              <tbody 
                {...provided.droppableProps} 
                ref={provided.innerRef}
                className="divide-y divide-white/5"
              >
                {prizes.map((prize, index) => (
                  <Draggable key={prize.id} draggableId={prize.id} index={index}>
                    {(provided, snapshot) => (
                      <tr 
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`hover:bg-white/5 transition-colors ${snapshot.isDragging ? 'bg-white/10 shadow-xl' : ''}`}
                      >
                        <td className="p-4 text-gray-500 cursor-grab active:cursor-grabbing" {...provided.dragHandleProps}>
                          <GripVertical className="w-5 h-5" />
                        </td>
                        <td className="p-4 font-medium">{prize.name}</td>
                        <td className="p-4 text-gray-400">{prize.providerIgLabel || '-'}</td>
                        <td className="p-4">
                          {prize.isFeatured ? (
                            <span className="bg-carnival-purple/20 text-carnival-purple px-2 py-1 rounded text-xs">Sí</span>
                          ) : (
                            <span className="bg-white/10 text-gray-400 px-2 py-1 rounded text-xs">No</span>
                          )}
                        </td>
                        <td className="p-4">
                          <Link href={`/admin/prizes/${prize.id}/edit`} className="text-carnival-orange text-sm cursor-pointer hover:underline active:opacity-70 transition-opacity">
                            Editar
                          </Link>
                        </td>
                      </tr>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </tbody>
            )}
          </Droppable>
        </DragDropContext>
      </table>
    </div>
  );
}
