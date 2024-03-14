import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';

const CustomerDashboard = ({ customer_details }) => {

    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const handleLogout = () => {
        // TODO
    }

    return (
        <>
            <div className="customer-dashboard">

                <div className="background-image">
                    <div className="nav-bar">
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

                    <div className="main-container">
                        <div className="left-side">
                            <div className="left-div">
                                <button className="dashboard-button">Explore Offers</button>
                                <button className="dashboard-button">Order Now</button>
                                <button className="dashboard-button">Recommended</button>
                            </div>
                        </div>


                        <div className="content-side">
                            <div className="content">
                                <h1>Welcome Back, {customer_details.name}</h1>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default CustomerDashboard;