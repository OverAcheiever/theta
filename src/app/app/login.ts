"use server";
import prisma from "@/utils/prisma";

export const login = async (publickey: string) => {
  const user = await prisma.user.findUnique({
    where: {
      publickey,
    },
    select: {
      id: true,
    },
  });

  if (!user) {
    return await prisma.user.create({
      data: {
        publickey,
      },
    });
  }

  return;
};
