-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_productId_fkey";

-- AlterTable
ALTER TABLE "OrderItem"
ADD COLUMN "productName" TEXT NOT NULL DEFAULT 'DefaultProductName';
