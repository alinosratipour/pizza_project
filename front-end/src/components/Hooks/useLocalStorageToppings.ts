import { useEffect } from "react";
import { ToppingType } from "../SharedTypes";

const EDITE_TOPPINGS_STORAGE_KEY = "toppings";

export const useLocalStorageToppings = (
  removedToppings: ToppingType[],
  setRemovedToppings: (toppings: ToppingType[]) => void
) => {
  useEffect(() => {
    const storedRemovedToppings = localStorage.getItem(EDITE_TOPPINGS_STORAGE_KEY);
    if (storedRemovedToppings) {
      setRemovedToppings(JSON.parse(storedRemovedToppings));
    }
  }, [setRemovedToppings]);

  useEffect(() => {
    localStorage.setItem(EDITE_TOPPINGS_STORAGE_KEY, JSON.stringify(removedToppings));
  }, [removedToppings]);
};

