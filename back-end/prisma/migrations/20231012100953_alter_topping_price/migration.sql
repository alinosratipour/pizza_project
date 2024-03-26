/*
  Warnings:

  - You are about to drop the column `Size` on the `ToppingPrice` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ToppingPrice" DROP COLUMN "Size";

-- CreateTable
CREATE TABLE "_PizzaToToppings" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PizzaToToppings_AB_unique" ON "_PizzaToToppings"("A", "B");

-- CreateIndex
CREATE INDEX "_PizzaToToppings_B_index" ON "_PizzaToToppings"("B");

-- AddForeignKey
ALTER TABLE "ToppingPrice" ADD CONSTRAINT "ToppingPrice_id_size_fkey" FOREIGN KEY ("id_size") REFERENCES "Size"("id_size") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PizzaToToppings" ADD CONSTRAINT "_PizzaToToppings_A_fkey" FOREIGN KEY ("A") REFERENCES "Pizza"("id_pizza") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PizzaToToppings" ADD CONSTRAINT "_PizzaToToppings_B_fkey" FOREIGN KEY ("B") REFERENCES "Toppings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
