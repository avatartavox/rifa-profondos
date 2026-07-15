"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { put } from "@vercel/blob";

const prisma = new PrismaClient();

// Keep in sync with next.config.ts experimental.serverActions.bodySizeLimit
const MAX_IMAGE_SIZE = 4.5 * 1024 * 1024;

export async function createPrize(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const providerIgLabel = formData.get("providerIgLabel") as string;
  const providerIgUsername = formData.get("providerIgUsername") as string;
  const isFeatured = formData.get("isFeatured") === "on";

  const file = formData.get("image") as File | null;
  if (file && file.size > MAX_IMAGE_SIZE) {
    throw new Error("La imagen supera el límite de 4.5MB. Por favor sube una imagen más liviana.");
  }

  let imageUrl = "";
  if (file && file.size > 0) {
    try {
      const blob = await put(`prizes/${Date.now()}-${file.name}`, file, {
        access: 'public',
        token: process.env.BLOB_READ_WRITE_TOKEN
      });
      imageUrl = blob.url;
    } catch (err) {
      console.error("[Blob Upload Error createPrize]", err);
      throw err;
    }
  }

  await prisma.prize.create({
    data: {
      name,
      description,
      providerIgLabel: providerIgLabel || null,
      providerIgUsername: providerIgUsername || null,
      isFeatured,
      images: imageUrl ? {
        create: {
          url: imageUrl
        }
      } : undefined
    }
  });

  revalidatePath("/admin/prizes");
  revalidatePath("/prizes");
  revalidatePath("/");
  
  redirect("/admin/prizes");
}

export async function updatePrize(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const providerIgLabel = formData.get("providerIgLabel") as string;
  const providerIgUsername = formData.get("providerIgUsername") as string;
  const isFeatured = formData.get("isFeatured") === "on";

  const file = formData.get("image") as File | null;
  if (file && file.size > MAX_IMAGE_SIZE) {
    throw new Error("La imagen supera el límite de 4.5MB. Por favor sube una imagen más liviana.");
  }

  let imageUrl = "";
  if (file && file.size > 0) {
    try {
      const blob = await put(`prizes/${Date.now()}-${file.name}`, file, {
        access: 'public',
        token: process.env.BLOB_READ_WRITE_TOKEN
      });
      imageUrl = blob.url;
    } catch (err) {
      console.error("[Blob Upload Error updatePrize]", err);
      throw err;
    }
  }

  if (imageUrl) {
    // Delete existing images first if we're replacing
    await prisma.prizeImage.deleteMany({
      where: { prizeId: id }
    });
  }

  await prisma.prize.update({
    where: { id },
    data: {
      name,
      description,
      providerIgLabel: providerIgLabel || null,
      providerIgUsername: providerIgUsername || null,
      isFeatured,
      ...(imageUrl && {
        images: {
          create: {
            url: imageUrl
          }
        }
      })
    }
  });

  revalidatePath("/admin/prizes");
  revalidatePath("/prizes");
  revalidatePath("/");
  redirect("/admin/prizes");
}

export async function deletePrize(id: string) {
  await prisma.prize.delete({
    where: { id }
  });

  revalidatePath("/admin/prizes");
  revalidatePath("/prizes");
  revalidatePath("/");
  redirect("/admin/prizes");
}

export async function reorderPrizes(items: { id: string; order: number }[]) {
  const transactions = items.map((item) =>
    prisma.prize.update({
      where: { id: item.id },
      data: { order: item.order },
    })
  );

  await prisma.$transaction(transactions);
  
  revalidatePath("/admin/prizes");
  revalidatePath("/prizes");
  revalidatePath("/");
}
