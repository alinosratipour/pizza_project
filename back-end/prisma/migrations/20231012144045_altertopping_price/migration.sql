-- AddForeignKey
ALTER TABLE "ToppingPrice" ADD CONSTRAINT "ToppingPrice_id_fkey" FOREIGN KEY ("id") REFERENCES "Toppings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
