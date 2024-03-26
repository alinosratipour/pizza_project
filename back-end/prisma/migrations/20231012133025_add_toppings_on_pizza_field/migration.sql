/*
  Warnings:

  - You are about to drop the `_PizzaToToppings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PizzaToToppings" DROP CONSTRAINT "_PizzaToToppings_A_fkey";

-- DropForeignKey
ALTER TABLE "_PizzaToToppings" DROP CONSTRAINT "_PizzaToToppings_B_fkey";

-- DropTable
DROP TABLE "_PizzaToToppings";

-- AddForeignKey
ALTER TABLE "ToppingOnPizza" ADD CONSTRAINT "ToppingOnPizza_id_pizza_fkey" FOREIGN KEY ("id_pizza") REFERENCES "Pizza"("id_pizza") ON DELETE RESTRICT ON UPDATE CASCADE;
