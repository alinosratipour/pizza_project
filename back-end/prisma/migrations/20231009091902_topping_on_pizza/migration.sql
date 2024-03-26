-- CreateTable
CREATE TABLE "ToppingOnPizza" (
    "id" SERIAL NOT NULL,
    "id_pizza" INTEGER NOT NULL,
    "idf_topping" INTEGER NOT NULL,

    CONSTRAINT "ToppingOnPizza_pkey" PRIMARY KEY ("id")
);
