/*
  Warnings:

  - You are about to drop the `PizzaSize` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "PizzaSize";

-- CreateTable
CREATE TABLE "ToppingPrice" (
    "id" SERIAL NOT NULL,
    "id_size" INTEGER NOT NULL,
    "Size" TEXT NOT NULL,
    "price_topping" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ToppingPrice_pkey" PRIMARY KEY ("id")
);
