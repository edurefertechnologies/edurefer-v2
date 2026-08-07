/*
  Warnings:

  - Added the required column `reason` to the `AITransaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MessageStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "AITransactionReason" AS ENUM ('COURSE_PURCHASE', 'REFERRAL', 'DAILY_BONUS', 'ADMIN_BONUS', 'AI_USAGE', 'REFUND');

-- CreateEnum
CREATE TYPE "MessageRole" AS ENUM ('USER', 'ASSISTANT');

-- AlterEnum
ALTER TYPE "AIService" ADD VALUE 'EDUREFER_ASSISTANT';

-- AlterTable
ALTER TABLE "AITransaction" ADD COLUMN     "reason" "AITransactionReason" NOT NULL;

-- AlterTable
ALTER TABLE "AIWallet" ADD COLUMN     "dailyFreeCredits" INTEGER NOT NULL DEFAULT 5,
ADD COLUMN     "lastDailyReward" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "AIMessage" (
    "id" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,
    "role" "MessageRole" NOT NULL,
    "content" TEXT NOT NULL,
    "creditsUsed" INTEGER NOT NULL DEFAULT 0,
    "promptTokens" INTEGER,
    "completionTokens" INTEGER,
    "totalTokens" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "MessageStatus" NOT NULL DEFAULT 'COMPLETED',

    CONSTRAINT "AIMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AIMessage_conversationId_idx" ON "AIMessage"("conversationId");

-- AddForeignKey
ALTER TABLE "AIMessage" ADD CONSTRAINT "AIMessage_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "AIConversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
