import React, { useState, useEffect } from "react";
import "./Menu.css";
import { useNavigate } from "react-router-dom";
import RestaurantNavbar from "./RestaurantNavbar";
import { useRestaurantAuthContext } from "../../../hooks/useRestaurantAuthContext";

const RestaurantMenu = () => {
    const { restaurantAuthState } = useRestaurantAuthContext();
    const navigate = useNavigate();
    const [restaurantMenu, setRestaurantMenu] = useState([]);
    const [currentItemList, setCurrentItemList] = useState([]);

    useEffect(() => {
        if (restaurantAuthState.token === "") {
            navigate("/restaurant/login");
        }

        const url = process.env.REACT_APP_BACKEND_URL + "/api/restaurant/menu";

        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${restaurantAuthState.token}`,
            },
        })
            .then((response) => {
                if (response.ok) {
                    console.log(response);
                    response.json().then((data) => {
                        console.log(data);
                        setRestaurantMenu(data);
                        setCurrentItemList(data);
                    });
                } else {
                    response.json().then((data) => {
                        console.log(data);
                        alert(data.error);
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                navigate("/restaurant/login");
                alert("An error occurred. Please try again later.");
            });
    }, []);


    const handleSearchBar = (searchVal) => {
        if (searchVal === "") {
            setCurrentItemList(restaurantMenu);
            return;
        }
        setCurrentItemList(
            restaurantMenu.filter((item) =>
                item.name.toLowerCase().includes(searchVal.toLowerCase())
            )
        );
    };

    return (
        <>
            <div className="restaurant-menu">
                <RestaurantNavbar />

                <div className="all-container">

                    <div className="new-item" onClick={() => navigate("/restaurant/newitem")}>
                        Add New Item
                    </div>

                    <div className="main-container">

                        <div className="search-container">
                            <input
                                type="text"
                                placeholder="Search for dishes..."
                                onChange={(e) => handleSearchBar(e.target.value)}
                            />
                        </div>

                        <div className="item-list">
                            {currentItemList.map((item) => (
                                <div className="item" key={item.uid}>
                                    <div className="item-name">{item.name}</div>
                                    <div className="item-price">Rs. {item.price}</div>
                                    <div className="toggle-box">
                                        
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RestaurantMenu;