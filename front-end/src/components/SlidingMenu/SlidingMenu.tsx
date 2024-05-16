import React from "react";
import { Link } from "react-router-dom";
import "./SlidingMenu.scss";

interface SlidingMenuProps {
  isOpen: boolean;

}

const SlidingMenu: React.FC<SlidingMenuProps> = ({ isOpen }) => {
  return (
    <div className={`sliding-menu ${isOpen ? "open" : ""}`}>
      <ul className="Items">
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
        <Link to="/pizza-menu" >Menu</Link>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>
    </div>
  );
};

export default SlidingMenu;
