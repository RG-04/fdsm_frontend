import React, { useState, useEffect } from 'react';
import '../App.css';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';


const Navbar = () => {
  return (
    <>
      <div className="navbar-main">
        <nav className="navbar">
          <div className="navbar-container">
            <div className="navbar-logo">
              <img className="logo" src={require("../imgs/logo.png")} alt="Ea2Go Logo" />
            </div>
            <div className="navbar-links">
              <Link to="/home" className="nav-link">Home</Link>
              <HashLink to="/home#about" className="nav-link">About Us</HashLink>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;