import React, { useState, useEffect } from 'react';
import './RestaurantList.css';
import { useNavigate } from 'react-router-dom';
import CustomerNavbar from './CustomerNavbar';
import { useCustomerAuthContext } from '../../../hooks/useCustomerAuthContext';

const CustomerRestaurantList = ({ all_restaurants_info }) => {

    const navigate = useNavigate();

    const cuisines = ["Italian", "Chinese"];
    const ratings = [2, 3, 3.5, 4, 4.5, 5];
    
    const [searchBar, setSearchBar] = useState("");
    const [sortCuisine, setSortCuisine] = useState("all");
    const [sortRating, setSortRating] = useState("all");
    

    const [allRestaurantsInfo, setAllRestaurantsInfo] = useState(all_restaurants_info);
    const [restaurantsInfo, setRestaurantsInfo] = useState(allRestaurantsInfo);

    const { customerAuthState } = useCustomerAuthContext();

    useEffect(() => {
        const url = process.env.REACT_APP_BACKEND_URL + '/api/customer/restaurants';

        if (customerAuthState.token === "") {
            navigate('/Customer/Login');
        }
        
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${customerAuthState.token}`,
            },
        }).then((response) => {
            if (response.ok) {
                console.log(response);
                response.json().then((data) => {
                    console.log(data);
                    setAllRestaurantsInfo(data);
                    setRestaurantsInfo(data);
                });
            } else {
                response.json().then((data) => {
                    console.log(data);
                    alert(data.error);
                });
            }
        }).catch((error) => {
            console.log(error);
            navigate('/Customer/Login');
            alert('An error occurred. Please try again later.');
        });
    }, []);


    const handleRestaurantClick = (restaurant) => {
        navigate(`/Customer/ViewRestaurant/${restaurant.uid}`);
        console.log(restaurant);
    }

    const handleSortByCuisine = (cuisine) => {
        setSortCuisine(cuisine);
        if (cuisine === "all") {
            setRestaurantsInfo(allRestaurantsInfo);
        } else {
            setRestaurantsInfo(allRestaurantsInfo.filter(restaurant => restaurant.cuisine === cuisine));
        }
    }

    const handleSortByRating = (rating) => {
        setSortRating(rating);
        setRestaurantsInfo(allRestaurantsInfo.filter(restaurant => restaurant.rating >= rating));
    }

    const handleSearchBar = (searchVal) => {
        setSearchBar(searchVal);
        setRestaurantsInfo(allRestaurantsInfo.filter(restaurant => restaurant.name.toLowerCase().includes(searchVal.toLowerCase())));
    }

    return (
        <>
            <div className="restaurant-list-page">

                <div className="background-image">
                    <CustomerNavbar />

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
                            {restaurantsInfo.map(restaurant => (
                                <div className="restaurant" key={restaurant.id} onClick={() => handleRestaurantClick(restaurant)}>
                                    <div className="restaurant-img">
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