// NavBar.tsx
import React from "react";
import { FaShoppingBasket } from "react-icons/fa";
import { useBasketContext } from "../Context/BasketContext";
import "./NavBar.scss";
import { useNavbarContext } from "../Context/NavbarContext";

interface TopNavBarProps {}

const TopNavBar: React.FC<TopNavBarProps> = () => {
  const { basket } = useBasketContext();
  const { handleBasketClick, hidePizzaItems } = useNavbarContext();
  const totalQuantity = basket.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="top-navbar">
      <h1 className="brand">Pizza Shop</h1>
      <div
        className={`basket-bskicon-container ${
          hidePizzaItems ? "hide-basket-icon" : ""
        }`}
        onClick={handleBasketClick}
      >
        <span className="badge">{totalQuantity}</span>
        <FaShoppingBasket className="basket-icon" />
      </div>
    </div>
  );
};

export default TopNavBar;
