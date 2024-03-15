import React, { useState, useEffect } from 'react';
import '../App.css';
import './HeroSection.css';
import { Link } from 'react-router-dom';


const HeroSection = () => {
  return (
    <>
      <div className="hero-section">
        <main className="main-content">
          <div className="background-image">
            <div className="card-container">
              <Link to="/Customer/Login" className="card">Customer Login</Link>
              <Link to="/Restaurant/Login" className="card">Restaurant Login</Link>
              <Link to="/DeliveryAgent/Login" className="card">Delivery Agent Login</Link>
              <Link to="/Admin/Login" className="card">Admin Login</Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default HeroSection;