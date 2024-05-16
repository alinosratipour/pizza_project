import React from "react";
import { Link } from "react-router-dom";
import "./SlidingMenu.scss";

interface SlidingMenuProps {
  isOpen: boolean;
  closeMenu: () => void;
}

const SlidingMenu: React.FC<SlidingMenuProps> = ({ isOpen, closeMenu }) => {
  return (
    <div className={`sliding-menu ${isOpen ? "open" : ""}`}>
      <ul className="Items">
        <li>
        <Link to="/" onClick={closeMenu}>Home</Link>
        </li>
        <li>
          <Link to="/pizza-menu" onClick={closeMenu}>Menu</Link>
        </li>
        <li>
        <Link to="/" onClick={closeMenu}>Contact</Link>
        </li>
      </ul>
    </div>
  );
};

export default SlidingMenu;
