import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import wlogo from '../Images/wlogo.png';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <div className="menusection">
        <div>
          <img src={wlogo} alt="" width="150px" height="37px" />
        </div>
        <div className="menu-toggle" onClick={toggleMenu}>
          <span className="menu-icon">&#9776;</span> {/* Hamburger icon */}
        </div>
        <div className={`menuoption ${isMenuOpen ? 'open' : ''}`}>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/news">News</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
