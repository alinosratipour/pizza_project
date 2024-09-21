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
    if (size !== undefined) {
      // Check if a pizza with the same size and base exists
      const existingPizzaIndex = basket.findIndex(
        (item) =>
          item.id_pizza === pizza.id_pizza &&
          item.size === size &&
          item.base === base
      );
  
      if (existingPizzaIndex !== -1) {
        // If the pizza exists with the same size and base, check toppings
        const existingPizza = basket[existingPizzaIndex];
        const areToppingsSame = JSON.stringify(existingPizza.toppings) === JSON.stringify(selectedToppings);
  
        if (areToppingsSame) {
          // Same size, base, and toppings: update quantity
          const updatedBasket = [...basket];
          updatedBasket[existingPizzaIndex].quantity += 1;
          setBasket(updatedBasket);
        } else {
          // Same size and base but different toppings: add as new item
          const extraToppingsCost = calculateExtraToppingsCost();
          const newPizzaWithPrice = {
            id_pizza: pizza.id_pizza,
            name: pizza.name,
            price: selectedSizePrice || 0,
            quantity: 1,
            size: size,
            base: base,
            basePrice: selectedBasePrice,
            toppings: selectedToppings,
            toppingsTotal: extraToppingsCost,
            removedToppings: removedToppings,
          };
  
          setBasket([...basket, newPizzaWithPrice]);
        }
      } else {
        // If no match found for size and base, add as new item
        const extraToppingsCost = calculateExtraToppingsCost();
        const pizzaWithPrice = {
          id_pizza: pizza.id_pizza,
          name: pizza.name,
          price: selectedSizePrice || 0,
          quantity: 1,
          size: size,
          base: base,
          basePrice: selectedBasePrice,
          toppings: selectedToppings,
          toppingsTotal: extraToppingsCost,
          removedToppings: removedToppings,
        };
  
        setBasket([...basket, pizzaWithPrice]);
      }
    }
  };
  

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
