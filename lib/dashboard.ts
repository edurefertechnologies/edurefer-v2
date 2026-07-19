import { prisma } from "@/lib/prisma";

export async function getDashboardStats(userId: string) {
  // Temporary implementation
  // Next modules will replace these with real Prisma queries.

  return {
    walletBalance: 0,
    aiCredits: 300,
    courses: 0,
    referrals: 0,
  };
}