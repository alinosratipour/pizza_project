import { Dispatch, SetStateAction } from "react";
import { BasketItem } from "../SharedTypes";

interface UseQuantity {
  increaseQuantity: (basketItem: BasketItem) => void;
  decreaseQuantity: (basketItem: BasketItem) => void;
}

const useQuantity = (
  basket: BasketItem[],
  setBasket: Dispatch<SetStateAction<BasketItem[]>>
): UseQuantity => {
  const increaseQuantity = (basketItem: BasketItem) => {
    const updatedBasket = basket.map((item) => {
      const isSamePizza = item.id_pizza === basketItem.id_pizza;
      const isSameSize = item.size === basketItem.size;
      const isSameBase = item.base === basketItem.base;
      const isSameRemovedToppings =
        JSON.stringify(item.removedToppings) ===
        JSON.stringify(basketItem.removedToppings);

      // Check if all properties match
      if (isSamePizza && isSameSize && isSameBase && isSameRemovedToppings) {
        return { ...item, quantity: item.quantity + 1 }; // Increase quantity only for the matching item
      }
      return item; // Return the item unchanged if it doesn't match
    });
    setBasket(updatedBasket);
  };

  const decreaseQuantity = (basketItem: BasketItem) => {
    const updatedBasket = basket.map((item) => {
      const isSamePizza = item.id_pizza === basketItem.id_pizza;
      const isSameSize = item.size === basketItem.size;
      const isSameBase = item.base === basketItem.base;
      const isSameRemovedToppings =
        JSON.stringify(item.removedToppings) ===
        JSON.stringify(basketItem.removedToppings);

      // Check if all properties match
      if (isSamePizza && isSameSize && isSameBase && isSameRemovedToppings) {
        if (item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 }; // Decrease quantity only for the matching item
        }
        return null; // Return null for items that should be removed
      }
      return item; // Return the item unchanged if it doesn't match
    });

    // Filter out null values to remove any items that should be deleted
    setBasket(updatedBasket.filter((item) => item !== null) as BasketItem[]);
  };

  return {
    increaseQuantity,
    decreaseQuantity,
  };
};

export default useQuantity;
