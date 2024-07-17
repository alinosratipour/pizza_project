// BasketReview.tsx
import React from "react";
import { BasketItem, ToppingType } from "../SharedTypes";

interface BasketReviewProps {
  basket: BasketItem[];
  totalPrice: number;
}

const BasketReview: React.FC<BasketReviewProps> = ({ basket, totalPrice }) => {
  return (
    <div className="basketReview">
      <h2 className="title">Review Your Order</h2>

      {basket.map((item: BasketItem, index: number) => (
        <div key={index} className="basketItem">
          <p className="pizzaName">{item.name}</p>
          <div className="wrapper">
            <div className="subItemsLeft">
              <p>
                <strong>Size:</strong> {item.size}
              </p>
              <p>
                <strong>Base:</strong> {item.base}
              </p>
              <p>
                <strong>Price:</strong> £{(item.price ?? 0).toFixed(2)}
              </p>
            </div>
            <div className="subItemsRight">
              <p>
                <strong>Quantity:</strong> {item.quantity}
              </p>
              {item.toppings && (
                <p>
                  <strong>Extra Toppings:</strong>{" "}
                  {item.toppings
                    .map((topping: ToppingType) => topping.name)
                    .join(", ")}
                </p>
              )}
              {item.removedToppings && item.removedToppings.length > 0 && (
                <p>
                  <strong>Removed Toppings:</strong>{" "}
                  {item.removedToppings
                    .map((removedTopping: ToppingType) => removedTopping.name)
                    .join(", ")}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
      <h2>Total Price: £{totalPrice.toFixed(2)}</h2>
    </div>
  );
};

export default BasketReview;
