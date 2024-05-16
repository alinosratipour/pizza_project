import React from 'react';
import './HamburgerMenu.scss';

interface HamburgerMenuProps {
  isOpen: boolean;
  onClick: () => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isOpen, onClick }) => {
  return (
    <div className="hamburger-menu" onClick={onClick}>
      <div className={`burger ${isOpen ? 'open' : ''}`}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </div>
  );
};

export default HamburgerMenu;
