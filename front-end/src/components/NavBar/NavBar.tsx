import React from "react";
import { FaShoppingBasket } from "react-icons/fa";
import classNames from "classnames";
import { useBasketContext } from "../Context/BasketContext";
import { useNavbarContext } from "../Context/NavbarContext";
import "./NavBar.scss";

interface TopNavBarProps {}

const TopNavBar: React.FC<TopNavBarProps> = () => {
  const { basket } = useBasketContext();
  const { handleBasketClick, hidePizzaItems } = useNavbarContext();
  const totalQuantity = basket.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const basketContainerClasses = classNames("basket-bskicon-container", {
    "hide-basket-icon": hidePizzaItems,
  });
  return (
    <div className="top-navbar">
      <h1 className="brand">Pizza Shop</h1>
      <div className={basketContainerClasses} onClick={handleBasketClick}>
        <span className="badge">{totalQuantity}</span>
        <FaShoppingBasket className="basket-icon" />
      </div>
    </div>
  );
};

export default TopNavBar;
