-- CreateTable
CREATE TABLE "Pizza" (
    "id_pizza" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "top_quantity" INTEGER NOT NULL,
    "description" TEXT,
    "image" TEXT,

    CONSTRAINT "Pizza_pkey" PRIMARY KEY ("id_pizza")
);

-- CreateTable
CREATE TABLE "Size" (
    "id_size" SERIAL NOT NULL,
    "p_size" TEXT NOT NULL,
    "price_topping" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Size_pkey" PRIMARY KEY ("id_size")
);

-- CreateTable
CREATE TABLE "Base" (
    "id_base" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "increase_price" INTEGER NOT NULL,

    CONSTRAINT "Base_pkey" PRIMARY KEY ("id_base")
);

-- CreateTable
CREATE TABLE "BasePrice" (
    "id" SERIAL NOT NULL,
    "id_size" INTEGER NOT NULL,
    "id_base" INTEGER NOT NULL,
    "price_base" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "BasePrice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PizzaSize" (
    "id" SERIAL NOT NULL,
    "id_size" INTEGER NOT NULL,
    "Size" TEXT NOT NULL,
    "price_topping" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PizzaSize_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BasePrice" ADD CONSTRAINT "BasePrice_id_size_fkey" FOREIGN KEY ("id_size") REFERENCES "Size"("id_size") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BasePrice" ADD CONSTRAINT "BasePrice_id_base_fkey" FOREIGN KEY ("id_base") REFERENCES "Base"("id_base") ON DELETE RESTRICT ON UPDATE CASCADE;
