-- AddForeignKey
ALTER TABLE "PizzaPrice" ADD CONSTRAINT "PizzaPrice_id_size_fkey" FOREIGN KEY ("id_size") REFERENCES "Size"("id_size") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PizzaPrice" ADD CONSTRAINT "PizzaPrice_id_pizza_fkey" FOREIGN KEY ("id_pizza") REFERENCES "Pizza"("id_pizza") ON DELETE RESTRICT ON UPDATE CASCADE;
