import getAllPizzasListResolver from "./getAllPizzasListResolver";
//import getpizzaWithRelatedToppings from "./getpizzaWithRelatedToppingsResolver";
import getpizzaWithRelatedToppingsResolver from "./getpizzaWithRelatedToppingsResolver";
import getpizzasWithSizesAndPricesResolver from "./getpizzasWithSizesAndPricesResolver";
import getSizesWithBasesResolver from "./getSizesWithBasesResolver"
import getToppingPricesBySizeResolver  from "./getToppingPricesBySizeResolver"
import getBasesBySizeResolver from "./getBasesBySizeResolver"
import getToppingsOnPizzaResolver from "./getToppingsOnPizzaResolver"
import createUserResolver from "./createUserResolver";


const resolvers = {
  Query: {
    getAllPizzasList:getAllPizzasListResolver,
    getpizzaWithRelatedToppings:getpizzaWithRelatedToppingsResolver,
    getpizzasWithSizesAndPrices: getpizzasWithSizesAndPricesResolver,
    getSizesWithBases:getSizesWithBasesResolver,
    getToppingPricesBySize:getToppingPricesBySizeResolver, 
    getBasesPricesBySize:getBasesBySizeResolver,
    getToppingsOnPizza:getToppingsOnPizzaResolver,
    

  },
  Mutation: {
    ...createUserResolver.Mutation, // Merge in the createUser mutation resolver

  },
};

export default resolvers;
