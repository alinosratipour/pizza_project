/*
  Warnings:

  - Added the required column `updatedAt` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
-- ALTER TABLE "Address" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
-- Add the updatedAt column with a default value of the current timestamp
ALTER TABLE "Address" ADD COLUMN "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW();

-- Optionally, if you need to drop the default after setting the initial values
ALTER TABLE "Address" ALTER COLUMN "updatedAt" DROP DEFAULT;
