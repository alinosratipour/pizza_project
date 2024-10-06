import { useState } from "react";
import { BasketItem, Pizza, ToppingType } from "../SharedTypes";
import { calculateToppingsTotal } from "../../utils";
import { useToppingsRemovalFromPizza } from "../store/ToppingOnPizzaStore ";
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
    const existingPizzaIndex = findExistingPizzaIndex(pizza, size, base);

    if (existingPizzaIndex !== -1) {
      handleExistingPizza(existingPizzaIndex, pizza, size, base);
    } else {
      addNewPizza(pizza, size, base);
    }
  };

  const findExistingPizzaIndex = (pizza: Pizza, size: string, base: string) => {
    const isSamePizza = (item: BasketItem) =>
      item.id_pizza === pizza.id_pizza &&
      item.size === size &&
      item.base === base;

    return basket.findIndex(isSamePizza);
  };

  const handleExistingPizza = (
    index: number,
    pizza: Pizza,
    size: string,
    base: string
  ) => {
    const existingPizza = basket[index];
    const areToppingsSame =
      JSON.stringify(existingPizza.toppings) ===
      JSON.stringify(selectedToppings);
      const hasRemovedToppings = removedToppings.length > 0;
    if (areToppingsSame && !hasRemovedToppings) {
      // Update quantity if toppings are the same
      const updatedBasket = [...basket];
      updatedBasket[index].quantity += 1;
      setBasket(updatedBasket);
    } else {
      // Add as new item if toppings are different
      addNewPizzaWithToppings(pizza, size, base);
    }
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

  const addNewPizzaWithToppings = (
    pizza: Pizza,
    size: string,
    base: string
  ) => {
    const extraToppingsCost = calculateExtraToppingsCost();
    const newPizzaWithPrice = createPizzaObject(
      pizza,
      size,
      base,
      extraToppingsCost,
      1
    );

    setBasket([...basket, newPizzaWithPrice]);
  };

  const createPizzaObject = (
    pizza: Pizza,
    size: string,
    base: string,
    toppingsCost: number,
    quantity: number
  ) => ({
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

    return parseFloat(pizzasTotalPrice.toFixed(2)); // Use parseFloat for clarity
  };

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
