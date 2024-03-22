import React, { useState, useContext } from 'react';
import './ManagementNavbar.css';
import { Link } from 'react-router-dom';
import { useManagementAuthContext } from '../../../hooks/useManagementAuthContext';
import { useNavigate } from 'react-router-dom';

const ManagementNavbar = () => {

    const [menuVisible, setMenuVisible] = useState(false);
    const { setManagementAuthState } = useManagementAuthContext();

    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const handleLogout = () => {
        setManagementAuthState({ token: '' });
        localStorage.removeItem('token');
        navigate('/home');
    }

    return (
        <>
            <div className="nav-bar-management">
                <div className="navbar-logo">
                    <img className="logo" src={require("../../../imgs/logo.png")} alt="Ea2Go Logo" />
                </div>
                <div className={`menu-button ${menuVisible ? 'change' : ''}`} onClick={toggleMenu}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
                <div className={`menu-container ${menuVisible ? 'active' : ''}`} id="menuContainer">
                    <Link to="/management/dashboard" className="menu-links">Dashboard</Link>
                    <Link to="/management/profile" className="menu-links">Profile</Link>
                    <Link to="/home" className="menu-links" onClick={handleLogout}>Logout</Link>
                </div>
            </div>
        </>
    )
}

export default ManagementNavbar;