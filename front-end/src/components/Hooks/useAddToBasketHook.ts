import { useEffect, useState } from "react";
import { Pizza, ToppingType } from "../SharedTypes";
import { calculateToppingsTotal } from "../../utils";
import { useToppingsRemovalFromPizza } from "../store/ToppingOnPizzaStore ";
import { useBasketContext } from "../Context/BasketContext";

interface UseAddToBasketProps {
  selectedToppings?: ToppingType[];
}
const EDITE_TOPPINGS_STORAGE_KEY = "toppings";
const useAddToBasket = ({ selectedToppings }: UseAddToBasketProps) => {
  const { removedToppings, setRemovedToppings } = useToppingsRemovalFromPizza();
  const [selectedSizePrice, setSelectedSizePrice] = useState<
    number | undefined
  >(0);
  const [selectedBasePrice, setSelectedBasePrice] = useState<
    number | undefined
  >(0);

  const { basket, setBasket } = useBasketContext();

  useEffect(() => {
    const storedRemovedToppings = localStorage.getItem(
      EDITE_TOPPINGS_STORAGE_KEY
    );
    if (storedRemovedToppings) {
      setRemovedToppings(JSON.parse(storedRemovedToppings));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem(
      EDITE_TOPPINGS_STORAGE_KEY,
      JSON.stringify(removedToppings)
    );
  }, [removedToppings]);

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
    return basket.findIndex(
      (item) =>
        item.id_pizza === pizza.id_pizza &&
        item.size === size &&
        item.base === base
    );
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

    if (areToppingsSame) {
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

  const calculateTotalPrice = () => {
    const pizzasTotalPrice = basket.reduce((total, item) => {
      const pizzaPrice =
        (item.price || 0) * item.quantity +
        (item.basePrice || 0) * item.quantity +
        (item.toppingsTotal || 0) * item.quantity;
      return total + pizzaPrice;
    }, 0);

    return Number(pizzasTotalPrice.toFixed(2));
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
