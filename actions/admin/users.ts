"use server";

import { prisma } from "@/lib/prisma";

export async function getUsers() {
  const users = await prisma.user.findMany({
    where: {
      isDeleted: false,
    },

    orderBy: {
      createdAt: "desc",
    },

    include: {
      wallet: true,
    },
  });

  return users.map((user) => ({
    ...user,

    wallet: user.wallet
      ? {
        ...user.wallet,
        balance: Number(user.wallet.balance),
      }
      : null,
  }));
}