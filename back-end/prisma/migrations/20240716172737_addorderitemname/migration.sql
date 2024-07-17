-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Pizza"("id_pizza") ON DELETE RESTRICT ON UPDATE CASCADE;
