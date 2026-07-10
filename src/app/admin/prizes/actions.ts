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
