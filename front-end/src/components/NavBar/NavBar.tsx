// NavBar.tsx
import React from "react";
import { FaShoppingBasket } from "react-icons/fa";
import { useBasketContext } from "../Context/BasketContext";
import "./NavBar.scss";

interface TopNavBarProps {
  // You can define any additional props you need
}
const handleBasketClick = () => {
  // Handle basket click action here
  console.log("Basket clicked!");
};


const TopNavBar: React.FC<TopNavBarProps> = () => {
  const { basket } = useBasketContext();

  const totalQuantity = basket.reduce((total, item) => total + item.quantity, 0);
  return (
    <div className="top-navbar">
      <h1 className="brand">Pizza Shop</h1>

      <span className="badge">{totalQuantity}</span>
      <FaShoppingBasket className="basket-icon" onClick={handleBasketClick} />
    </div>
  );
};

export default TopNavBar;
