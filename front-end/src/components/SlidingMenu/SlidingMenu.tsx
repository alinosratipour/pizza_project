import React from 'react';
import './SlidingMenu.scss';

interface SlidingMenuProps {
  isOpen: boolean;
}

const SlidingMenu: React.FC<SlidingMenuProps> = ({ isOpen }) => {
  return (
    <div className={`sliding-menu ${isOpen ? 'open' : ''}`}>
      <ul className='Items'>
        <li><a href="#home">Home</a></li>
        <li><a href="#menu">Menu</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </div>
  );
};

export default SlidingMenu;
