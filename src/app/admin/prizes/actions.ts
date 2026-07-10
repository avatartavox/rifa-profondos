"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export async function createPrize(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const providerIg = formData.get("providerIg") as string;
  const isFeatured = formData.get("isFeatured") === "on";
  
  // Here we would handle the Vercel Blob upload if a file is present.
  // const file = formData.get("image") as File;
  // let imageUrl = "";
  // if (file.size > 0) {
  //   const blob = await put(file.name, file, { access: 'public' });
  //   imageUrl = blob.url;
  // }

  await prisma.prize.create({
    data: {
      name,
      description,
      providerIg: providerIg || null,
      isFeatured,
      // If we had an imageUrl, we would create a related PrizeImage record here
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

  await prisma.prize.update({
    where: { id },
    data: {
      name,
      description,
      providerIg: providerIg || null,
      isFeatured,
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
