import React, { useState } from 'react';
import './HamburgerMenu.scss';

interface HamburgerMenuProps {
  onClick: () => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ onClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    onClick(); // Call the passed function to toggle the sliding menu
  };

  return (
    <div className="hamburger-menu" onClick={toggleMenu}>
      <div className={`burger ${isOpen ? 'open' : ''}`}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </div>
  );
};

export default HamburgerMenu;
