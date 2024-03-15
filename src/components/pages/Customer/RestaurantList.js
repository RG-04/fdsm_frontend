import React, { useState, useEffect } from 'react';
import './RestaurantList.css';
import { Link, useNavigate } from 'react-router-dom';

const CustomerRestaurantList = ({ all_restaurants_info }) => {

    const navigate = useNavigate();

    const [menuVisible, setMenuVisible] = useState(false);
    const [restaurants_info, setRestaurantsInfo] = useState(all_restaurants_info);
    const cuisines = ["Italian", "Chinese"]

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const handleLogout = () => {
        // TODO
    }

    const handleRestaurantClick = (restaurant) => {
        navigate(`/Customer/ViewRestaurant/${restaurant.id}`);
        console.log(restaurant);
    }

    return (
        <>
            <div className="restaurant-list-page">

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
                        <div className="search-container">
                            <input type="text" placeholder="Search for restaurants..." />
                        </div>
                        <div className="restaurant-list">
                            {restaurants_info.map(restaurant => (
                                <div className="restaurant" key={restaurant.id} onClick={() => handleRestaurantClick(restaurant)}>
                                    <div className="restaurant-img">
                                        {/* <img src={require(restaurant.imageSrc)} alt="Restaurant Image" /> */}
                                        <img src={restaurant.imageSrc} alt="Restaurant Image" />
                                    </div>
                                    <div className="restaurant-info">
                                        <h3>{restaurant.name}</h3>
                                        <p>Rating: {restaurant.rating}</p>
                                        <p>Cuisine: {restaurant.cuisine}</p>
                                        <p>Timings: {restaurant.timings}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CustomerRestaurantList;