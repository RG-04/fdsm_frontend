import React, { useState, useEffect } from "react";
import "./Menu.css";
import { useNavigate } from "react-router-dom";
import RestaurantNavbar from "./RestaurantNavbar";
import { useRestaurantAuthContext } from "../../../hooks/useRestaurantAuthContext";

import Form from 'react-bootstrap/Form';
import "bootstrap/dist/css/bootstrap.min.css";

const RestaurantMenu = () => {
    const { restaurantAuthState } = useRestaurantAuthContext();
    const navigate = useNavigate();
    const [restaurantMenu, setRestaurantMenu] = useState([]);
    const [currentItemList, setCurrentItemList] = useState([]);

    const [availabilities, setAvailabilities] = useState({});
    const [isChanged, setIsChanged] = useState(false);

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
                        data.map((item) => {
                            setAvailabilities((prevState) => ({ ...prevState, [item.uid]: item.isAvailable }));
                        });
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

    const handleToggleItem = (uid) => {
        setAvailabilities((prevState) => ({ ...prevState, [uid]: !prevState[uid] }));
        setIsChanged(true);
    }

    const handleChangesClick = () => {
        for (const [uid, status] of Object.entries(availabilities)) {
            const url = process.env.REACT_APP_BACKEND_URL + "/api/restaurant/menu/" + uid;

            let success = true;

            fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${restaurantAuthState.token}`,
                },
                body: JSON.stringify({
                    isAvailable: status,
                }),
            })
                .then((response) => {
                    if (response.ok) {
                        console.log(response);
                        response.json().then((data) => {
                            console.log(data);
                        });
                    } else {
                        response.json().then((data) => {
                            console.log(data);
                            alert(data.error);
                            success = false;
                        });
                    }
                })
                .catch((error) => {
                    console.log(error);
                    alert("An error occurred. Please try again later.");
                    success = false;
                });

            if (!success) {
                break;
            }
        }

        alert("Changes saved successfully.");
        setIsChanged(false);

    }

    return (
        <>
            <div className="restaurant-menu">
                <RestaurantNavbar />

                <div className="all-container">

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
                                        <Form onClick={() => { handleToggleItem(item.uid) }}>
                                            <Form.Check
                                                reverse
                                                type="switch"
                                                id="custom-switch"
                                                label=""
                                                checked={availabilities[item.uid]}
                                                className="toggle-switch"
                                            />
                                        </Form>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                    <div className="button-container">
                        <div className="new-item" onClick={() => navigate("/restaurant/newitem")}>
                            Add New Item
                        </div>
                        {isChanged ? (
                            <div className="changes-button">
                                <button className="input-button" onClick={handleChangesClick}>
                                    Save Changes
                                </button>
                            </div>
                        ) : (<> </>)}
                    </div>

                </div>
            </div>
        </>
    );
}

export default RestaurantMenu;