import getAllPizzasListResolver from "./getAllPizzasListResolver";
//import getpizzaWithRelatedToppings from "./getpizzaWithRelatedToppingsResolver";
import getpizzaWithRelatedToppingsResolver from "./getpizzaWithRelatedToppingsResolver";
//import getToppingPricesForSizesResolver from "./ getToppingPricesForSizesResolver ";
import getpizzasWithSizesAndPricesResolver from "./getpizzasWithSizesAndPricesResolver";
import getSizesWithBasesResolver from "./getSizesWithBasesResolver"
import getToppingPricesBySizeResolver  from "./getToppingPricesBySizeResolver"
import getBasesBySizeResolver from "./getBasesBySizeResolver"
import getToppingsOnPizzaResolver from "./getToppingsOnPizzaResolver"
const resolvers = {
  Query: {
    getAllPizzasList:getAllPizzasListResolver,
    getpizzaWithRelatedToppings:getpizzaWithRelatedToppingsResolver,
   // getToppingPricesForSizes: getToppingPricesForSizesResolver, 
    getpizzasWithSizesAndPrices: getpizzasWithSizesAndPricesResolver,
    getSizesWithBases:getSizesWithBasesResolver,
    getToppingPricesBySize:getToppingPricesBySizeResolver, 
    getBasesPricesBySize:getBasesBySizeResolver,
    getToppingsOnPizza:getToppingsOnPizzaResolver

  },
};

export default resolvers;
