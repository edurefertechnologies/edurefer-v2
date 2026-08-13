/*
  Warnings:

  - The values [PACKAGE] on the enum `ProductType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ProductType_new" AS ENUM ('PDF', 'COURSE', 'AI_CREDITS');
ALTER TABLE "Product" ALTER COLUMN "type" TYPE "ProductType_new" USING ("type"::text::"ProductType_new");
ALTER TYPE "ProductType" RENAME TO "ProductType_old";
ALTER TYPE "ProductType_new" RENAME TO "ProductType";
DROP TYPE "public"."ProductType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "credits" INTEGER;
