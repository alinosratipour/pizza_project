import getAllPizzasListResolver from "./querys/getAllPizzasListResolver";
import getpizzaWithRelatedToppingsResolver from "./querys/getpizzaWithRelatedToppingsResolver";
import getpizzasWithSizesAndPricesResolver from "./querys/getpizzasWithSizesAndPricesResolver";
import getSizesWithBasesResolver from "./querys/getSizesWithBasesResolver";
import getToppingPricesBySizeResolver from "./querys/getToppingPricesBySizeResolver";
import getBasesBySizeResolver from "./querys/getBasesBySizeResolver";
import getToppingsOnPizzaResolver from "./querys/getToppingsOnPizzaResolver";
import registerUserResolver from "./mutations/registerUserResolver";

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
