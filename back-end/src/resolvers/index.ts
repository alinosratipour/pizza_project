import getAllPizzasListResolver from "./querys/getAllPizzasListResolver";
import getpizzaWithRelatedToppingsResolver from "./querys/getpizzaWithRelatedToppingsResolver";
import getpizzasWithSizesAndPricesResolver from "./querys/getpizzasWithSizesAndPricesResolver";
import getSizesWithBasesResolver from "./querys/getSizesWithBasesResolver";
import getToppingPricesBySizeResolver from "./querys/getToppingPricesBySizeResolver";
import getBasesBySizeResolver from "./querys/getBasesBySizeResolver";
import getToppingsOnPizzaResolver from "./querys/getToppingsOnPizzaResolver";
import registerUserResolver from "./mutations/registerUserResolver";
import loginUserResolver from "./mutations/loginUserResolver";
import signUpUserResolver from "./mutations/signUpUserResolver";
import updateUserResolver from "./mutations/updateUserResolver";
import getUserDetailsResolver from "./querys/getUserDetailsResolver";
import createOrderResolver from "./mutations/createOrderResolver";

const resolvers = {
  Query: {
    getAllPizzasList: getAllPizzasListResolver,
    getpizzaWithRelatedToppings: getpizzaWithRelatedToppingsResolver,
    getpizzasWithSizesAndPrices: getpizzasWithSizesAndPricesResolver,
    getSizesWithBases: getSizesWithBasesResolver,
    getToppingPricesBySize: getToppingPricesBySizeResolver,
    getBasesPricesBySize: getBasesBySizeResolver,
    getToppingsOnPizza: getToppingsOnPizzaResolver,
    getUserDetails: getUserDetailsResolver,
  },
  Mutation: {
    registerUser: registerUserResolver,
    loginUser: loginUserResolver,
    signUpUser: signUpUserResolver,
    updateUser: updateUserResolver,
    createOrder: createOrderResolver,
  },
};

export default resolvers;
