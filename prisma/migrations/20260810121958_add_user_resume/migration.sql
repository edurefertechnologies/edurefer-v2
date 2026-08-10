-- CreateTable
CREATE TABLE "UserResume" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'My Resume',
    "template" TEXT NOT NULL DEFAULT 'professional',
    "data" JSONB NOT NULL,
    "pdfUrl" TEXT,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserResume_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserResume_userId_idx" ON "UserResume"("userId");

-- CreateIndex
CREATE INDEX "UserResume_userId_isDefault_idx" ON "UserResume"("userId", "isDefault");

-- AddForeignKey
ALTER TABLE "UserResume" ADD CONSTRAINT "UserResume_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
