/*
  Warnings:

  - You are about to drop the column `source` on the `WalletTransaction` table. All the data in the column will be lost.
  - Changed the type of `type` on the `WalletTransaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."TransactionType" AS ENUM ('CREDIT', 'DEBIT');

-- DropIndex
DROP INDEX "public"."WalletTransaction_walletId_idx";

-- AlterTable
ALTER TABLE "public"."WalletTransaction" DROP COLUMN "source",
DROP COLUMN "type",
ADD COLUMN     "type" "public"."TransactionType" NOT NULL;
