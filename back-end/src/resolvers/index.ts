import getAllPizzasListResolver from "./getAllPizzasListResolver";
import getpizzaWithRelatedToppingsResolver from "./getpizzaWithRelatedToppingsResolver";
import getpizzasWithSizesAndPricesResolver from "./getpizzasWithSizesAndPricesResolver";
import getSizesWithBasesResolver from "./getSizesWithBasesResolver";
import getToppingPricesBySizeResolver from "./getToppingPricesBySizeResolver";
import getBasesBySizeResolver from "./getBasesBySizeResolver";
import getToppingsOnPizzaResolver from "./getToppingsOnPizzaResolver";
import registerUserResolver from "./registerUserResolver";

const resolvers = {
  Query: {
    getAllPizzasList: getAllPizzasListResolver,
    getpizzaWithRelatedToppings: getpizzaWithRelatedToppingsResolver,
    getpizzasWithSizesAndPrices: getpizzasWithSizesAndPricesResolver,
    getSizesWithBases: getSizesWithBasesResolver,
    getToppingPricesBySize: getToppingPricesBySizeResolver,
    getBasesPricesBySize: getBasesBySizeResolver,
    getToppingsOnPizza: getToppingsOnPizzaResolver,
  },
  Mutation: {
    registerUser: registerUserResolver,
  },
};

export default resolvers;
