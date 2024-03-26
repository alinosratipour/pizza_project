/*
  Warnings:

  - Added the required column `id_topping` to the `ToppingPrice` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ToppingPrice" DROP CONSTRAINT "ToppingPrice_id_fkey";

-- AlterTable
ALTER TABLE "ToppingPrice" ADD COLUMN     "id_topping" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ToppingPrice" ADD CONSTRAINT "ToppingPrice_id_topping_fkey" FOREIGN KEY ("id_topping") REFERENCES "Toppings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
