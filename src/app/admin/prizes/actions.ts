"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { put } from "@vercel/blob";

const prisma = new PrismaClient();

export async function createPrize(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const providerIg = formData.get("providerIg") as string;
  const isFeatured = formData.get("isFeatured") === "on";
  
  const file = formData.get("image") as File | null;
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
      providerIg: providerIg || null,
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
  const providerIg = formData.get("providerIg") as string;
  const isFeatured = formData.get("isFeatured") === "on";

  const file = formData.get("image") as File | null;
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
      providerIg: providerIg || null,
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
