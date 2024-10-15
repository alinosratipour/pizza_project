import { useState } from "react";
import { v4 as uuidv4 } from "uuid"; // Import uuid for generating unique IDs
import { BasketItem, Pizza, ToppingType } from "../SharedTypes";
import { calculateToppingsTotal } from "../../utils";
import { useToppingsRemovalFromPizza } from "../store/ToppingOnPizzaStore";
import { useBasketContext } from "../Context/BasketContext";
import { useLocalStorageToppings } from "./useLocalStorageToppings";

interface UseAddToBasketProps {
  selectedToppings?: ToppingType[];
}

const useAddToBasket = ({ selectedToppings }: UseAddToBasketProps) => {
  const { removedToppings, setRemovedToppings } = useToppingsRemovalFromPizza();
  const [selectedSizePrice, setSelectedSizePrice] = useState<
    number | undefined
  >(0);
  const [selectedBasePrice, setSelectedBasePrice] = useState<
    number | undefined
  >(0);

  const { basket, setBasket } = useBasketContext();
  useLocalStorageToppings(removedToppings, setRemovedToppings);

  const calculateExtraToppingsCost = () => {
    const extraToppingsQuantity = calculateToppingsTotal(
      selectedToppings ?? [],
      removedToppings.length
    );
    return selectedToppings
      ? selectedToppings
          .map((topping) => (topping.price || 0) * extraToppingsQuantity)
          .find((cost) => cost !== 0) || 0
      : 0;
  };

  const addToBasket = (pizza: Pizza, size: string, base: string) => {
    if (size === undefined) return;
    addNewPizza(pizza, size, base);
  };

  const addNewPizza = (pizza: Pizza, size: string, base: string) => {
    const extraToppingsCost = calculateExtraToppingsCost();
    const pizzaWithPrice = createPizzaObject(
      pizza,
      size,
      base,
      extraToppingsCost,
      1
    );

    setBasket([...basket, pizzaWithPrice]);
  };

  const createPizzaObject = (
    pizza: Pizza,
    size: string,
    base: string,
    toppingsCost: number,
    quantity: number
  ): BasketItem => ({
    uniqueId: uuidv4(), // Assign a unique ID to each pizza item
    id_pizza: pizza.id_pizza,
    name: pizza.name,
    price: selectedSizePrice || 0,
    quantity: quantity,
    size: size,
    base: base,
    basePrice: selectedBasePrice,
    toppings: selectedToppings,
    toppingsTotal: toppingsCost,
    removedToppings: removedToppings,
  });

  const calculatePizzaPrice = (item: BasketItem) => {
    const price = item.price || 0;
    const basePrice = item.basePrice || 0;
    const toppingsTotal = item.toppingsTotal || 0;

    return (price + basePrice + toppingsTotal) * item.quantity;
  };

  const calculateTotalPrice = () => {
    const pizzasTotalPrice = basket.reduce((total, item) => {
      return total + calculatePizzaPrice(item);
    }, 0);

    return parseFloat(pizzasTotalPrice.toFixed(2));
  };
console.log(basket);


  return {
    addToBasket,
    calculateTotalPrice,
    calculateExtraToppingsCost,
    removedToppings,
    setRemovedToppings,
    basket,
    setBasket,
    selectedBasePrice,
    selectedSizePrice,
    setSelectedBasePrice,
    setSelectedSizePrice,
  };
};

export default useAddToBasket;
