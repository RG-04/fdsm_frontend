import React, { useState, useContext } from 'react';
import './DeliveryAgentNavbar.css';
import { Link } from 'react-router-dom';
import { useDeliveryAgentAuthContext } from '../../../hooks/useDeliveryAgentAuthContext';
import { useNavigate } from 'react-router-dom';

const DeliveryAgentNavbar = () => {

    const [menuVisible, setMenuVisible] = useState(false);
    const { setDeliveryAgentAuthState } = useDeliveryAgentAuthContext();

    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const handleLogout = () => {
        setDeliveryAgentAuthState({ token: '' });
        localStorage.removeItem('token');
        navigate('/home');
    }

    return (
        <>
            <div className="nav-bar-delivery-agent">
                <div className="navbar-logo">
                    <img className="logo" src={require("../../../imgs/logo.png")} alt="Ea2Go Logo" />
                </div>
                <div className={`menu-button ${menuVisible ? 'change' : ''}`} onClick={toggleMenu}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
                <div className={`menu-container ${menuVisible ? 'active' : ''}`} id="menuContainer">
                    <Link to="/delivery-agent/dashboard" className="menu-links">Dashboard</Link>
                    <Link to="/delivery-agent/orders" className="menu-links">Orders</Link>
                    <Link to="/delivery-agent/profile" className="menu-links">Profile</Link>
                    <Link to="/home" className="menu-links" onClick={handleLogout}>Logout</Link>
                </div>
            </div>
        </>
    )
}

export default DeliveryAgentNavbar;