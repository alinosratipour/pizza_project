import React, { useState } from "react";
import { FaShoppingBasket } from "react-icons/fa";
import classNames from "classnames";
import { useBasketContext } from "../Context/BasketContext";
import { useNavbarContext } from "../Context/NavbarContext";
import "./NavBar.scss";
import MenuBar from "../MenuBar/MenuBar";
import HamburgerMenu from "../UI-Liberary/HamburgerMenu/HamburgerMenu";
import SlidingMenu from "../SlidingMenu/SlidingMenu";
import { Link } from "react-router-dom";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  const { basket } = useBasketContext();
  const { handleBasketClick, hidePizzaItems } = useNavbarContext();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const totalQuantity = basket.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const basketContainerClasses = classNames("basket-bskicon-container", {
    "hide-basket-icon": hidePizzaItems,
  });
  return (
    <div className="top-navbar">
      <div className="Mobile-Menu">
        <HamburgerMenu isOpen={menuOpen} onClick={toggleMenu} />
      </div>
      <h1 className="brand"><Link className="brand-link"  to="/">Pizza Shop</Link></h1>
      <div className={basketContainerClasses} onClick={handleBasketClick}>
        <span className="badge">{totalQuantity}</span>
        <FaShoppingBasket className="basket-icon" />
      </div>
      <div className="MenuBar-Wrapper">
        <MenuBar />
      </div>
      <div className="Slid-Menu">
        <SlidingMenu isOpen={menuOpen} closeMenu={closeMenu} />
      </div>
    </div>
  );
};

export default NavBar;
