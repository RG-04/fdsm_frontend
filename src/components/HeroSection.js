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
              <Link to="/customer/login" className="card">Customer Login</Link>
              <Link to="/restaurant/login" className="card">Restaurant Login</Link>
              <Link to="/delivery-agent/login" className="card">Delivery Agent Login</Link>
              <Link to="/admin/login" className="card">Admin Login</Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default HeroSection;