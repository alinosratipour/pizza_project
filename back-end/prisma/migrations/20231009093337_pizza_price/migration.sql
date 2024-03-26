-- CreateTable
CREATE TABLE "PizzaPrice" (
    "id" SERIAL NOT NULL,
    "id_size" INTEGER NOT NULL,
    "id_pizza" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PizzaPrice_pkey" PRIMARY KEY ("id")
);
