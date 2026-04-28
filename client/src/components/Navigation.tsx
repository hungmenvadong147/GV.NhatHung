import React, { useState } from 'react';
import './Navigation.css';
import { MenuItem } from '../types';

interface NavigationProps {
  menuItems: MenuItem[];
  onMenuClick: (item: MenuItem) => void;
}

const Navigation: React.FC<NavigationProps> = ({ menuItems, onMenuClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: MenuItem) => {
    onMenuClick(item);
    setIsOpen(false);
  };

  return (
    <nav className="navigation">
      <div className="container">
        <button className="hamburger" onClick={toggleMenu} aria-label="Menu">
          <span className={`hamburger-line ${isOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isOpen ? 'open' : ''}`}></span>
        </button>

        <div className={`menu-dropdown ${isOpen ? 'open' : ''}`}>
          <ul className="menu-list">
            {menuItems.map((item) => (
              <li key={item.id} className="menu-item">
                <button onClick={() => handleItemClick(item)}>
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {isOpen && <div className="menu-overlay" onClick={() => setIsOpen(false)}></div>}
    </nav>
  );
};

export default Navigation;
