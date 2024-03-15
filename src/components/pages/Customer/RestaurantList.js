import React, { useState, useEffect } from 'react';
import './RestaurantList.css';
import { Link, useNavigate } from 'react-router-dom';

const CustomerRestaurantList = ({ all_restaurants_info }) => {

    const navigate = useNavigate();

    const [menuVisible, setMenuVisible] = useState(false);
    const [restaurants_info, setRestaurantsInfo] = useState(all_restaurants_info);

    const [searchBar, setSearchBar] = useState("");
    const [sortCuisine, setSortCuisine] = useState("all");
    const [sortRating, setSortRating] = useState("all");


    const cuisines = ["Italian", "Chinese"]
    const ratings = [2, 3, 3.5, 4, 4.5, 5]

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

    const handleSortByCuisine = (cuisine) => {
        setSortCuisine(cuisine);
        if (cuisine === "all") {
            setRestaurantsInfo(all_restaurants_info);
        } else {
            setRestaurantsInfo(all_restaurants_info.filter(restaurant => restaurant.cuisine === cuisine));
        }
    }

    const handleSortByRating = (rating) => {
        setSortRating(rating);
        setRestaurantsInfo(all_restaurants_info.filter(restaurant => restaurant.rating >= rating));
    }

    const handleSearchBar = (searchVal) => {
        setSearchBar(searchVal);
        setRestaurantsInfo(all_restaurants_info.filter(restaurant => restaurant.name.toLowerCase().includes(searchVal.toLowerCase())));
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
                            <input type="text" placeholder="Search for restaurants..." onChange={(e) => handleSearchBar(e.target.value)}/>
                        </div>
                        <div className="sort-container">
                            <label htmlFor="sort">Sort By:</label>

                            <select className="sorter" value={sortCuisine} onChange={(e) => handleSortByCuisine(e.target.value)}>
                                <option value="all">All Cuisines</option>
                                {cuisines.map((cuisine) => (
                                    <option key={cuisine} value={cuisine}>
                                        {cuisine}
                                    </option>
                                ))}
                            </select>
                            <select className="sorter" value={sortRating} onChange={(e) => handleSortByRating(e.target.value)}>
                                <option value="0">Rating</option>
                                {ratings.map((rating) => (
                                    <option value={rating}>
                                        {"> " + rating}
                                    </option>
                                ))}
                            </select>
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