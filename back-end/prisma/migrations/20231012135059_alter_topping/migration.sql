-- AddForeignKey
ALTER TABLE "ToppingOnPizza" ADD CONSTRAINT "ToppingOnPizza_idf_topping_fkey" FOREIGN KEY ("idf_topping") REFERENCES "Toppings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
