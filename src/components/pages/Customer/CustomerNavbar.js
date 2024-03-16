import React, { useState } from 'react';
import './CustomerNavbar.css';
import { Link } from 'react-router-dom';

const CustomerNavbar = () => {

    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const handleLogout = () => {
        // TODO
    }

    return (
        <>
            <div className="nav-bar-customer">
                <div className="navbar-logo">
                    <img className="logo" src={require("../../../imgs/logo.png")} alt="Ea2Go Logo" />
                </div>
                <div className={`menu-button ${menuVisible ? 'change' : ''}`} onClick={toggleMenu}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
                <div className={`menu-container ${menuVisible ? 'active' : ''}`} id="menuContainer">
                    <Link to="/Customer/Dashboard" className="menu-links">Dashboard</Link>
                    <Link to="/Customer/Cart" className="menu-links">Cart</Link>
                    <Link to="/Customer/Orders" className="menu-links">My Orders</Link>
                    <Link to="/Customer/Profile" className="menu-links">Profile</Link>
                    <Link to="/home" className="menu-links" onClick={handleLogout}>Logout</Link>
                </div>
            </div>
        </>
    )
}

export default CustomerNavbar;