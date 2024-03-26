import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const toppingOnPizzaData = [
  { id_pizza: 1, idf_topping: 1 }, 
  { id_pizza: 1, idf_topping: 2 }, 
  { id_pizza: 2, idf_topping: 3 }, 
  { id_pizza: 2, idf_topping: 4 }, 
  { id_pizza: 2, idf_topping: 5 }, 
  { id_pizza: 2, idf_topping: 6 }, 
 
];

async function main() {
  const createToppingOnPizza = toppingOnPizzaData.map(async (data) => {
    return prisma.toppingOnPizza.create({
      data: {
        id_pizza: data.id_pizza,
        idf_topping: data.idf_topping,
      },
    });
  });

  await Promise.all(createToppingOnPizza);
  console.log('ToppingOnPizza records created successfully');
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
