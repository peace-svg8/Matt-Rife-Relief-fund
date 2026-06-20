import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <a href="#" className="logo" style={{ fontSize: '1.2rem' }}>
          Matt Rife Relief <span>Fund</span>
        </a>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><a href="#home" onClick={() => setMenuOpen(false)}>Home</a></li>
          <li><a href="#mission" onClick={() => setMenuOpen(false)}>About</a></li>
          <li><a href="#campaigns" onClick={() => setMenuOpen(false)}>Campaigns</a></li>
          <li><a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a></li>
          <li><a href="#impact" onClick={() => setMenuOpen(false)}>Impact</a></li>

          <li><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
          <li><a href="#donate" className="nav-donate-btn" onClick={() => setMenuOpen(false)}>Donate Now ❤</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
