// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
  return (
    <nav>
      <Link to="/">
        Home</Link>
    </nav>
  );
};

export default Navbar;
