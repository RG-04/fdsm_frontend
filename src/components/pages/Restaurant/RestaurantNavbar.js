import React, { useState, useContext } from 'react';
import './RestaurantNavbar.css';
import { Link } from 'react-router-dom';
import { useRestaurantAuthContext } from '../../../hooks/useRestaurantAuthContext';
import { useNavigate } from 'react-router-dom';

const RestaurantNavbar = () => {

    const [menuVisible, setMenuVisible] = useState(false);
    const { setRestaurantAuthState } = useRestaurantAuthContext();

    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const handleLogout = () => {
        setRestaurantAuthState({ token: "" });
        localStorage.removeItem('token');
        navigate('/home');
    }

    return (
        <>
            <div className="nav-bar-restaurant">
                <div className="navbar-logo">
                    <img className="logo" src={require("../../../imgs/logo.png")} alt="Ea2Go Logo" />
                </div>
                <div className={`menu-button ${menuVisible ? 'change' : ''}`} onClick={toggleMenu}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
                <div className={`menu-container ${menuVisible ? 'active' : ''}`} id="menuContainer">
                    <Link to="/restaurant/dashboard" className="menu-links">Dashboard</Link>
                    <Link to="/restaurant/orders" className="menu-links">Orders</Link>
                    <Link to="/restaurant/profile" className="menu-links">Profile</Link>
                    <Link to="/home" className="menu-links" onClick={handleLogout}>Logout</Link>
                </div>
            </div>
        </>
    )
}

export default RestaurantNavbar;