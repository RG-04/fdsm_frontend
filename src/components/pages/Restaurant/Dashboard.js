import React, { useEffect } from "react";
import './Dashboard.css';
import { Link, useNavigate } from "react-router-dom";
import RestaurantNavbar from "./RestaurantNavbar";
import { useRestaurantAuthContext } from "../../../hooks/useRestaurantAuthContext";

const RestaurantDashboard = () => {

    const { restaurantAuthState } = useRestaurantAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        const url = process.env.REACT_APP_BACKEND_URL + '/api/restaurant/info';

        if (restaurantAuthState.token === "") {
            navigate('/Restaurant/Login');
            return;
        }

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${restaurantAuthState.token}`,
            },
        }).then((response) => {
            if (response.ok) {
                console.log(response);
                response.json().then((data) => {
                    console.log(data);
                });
            } else {
                response.json().then((data) => {
                    console.log(data);
                    alert(data.error);
                });
            }
        }).catch((error) => {
            console.log(error);
            alert('An error occurred. Please try again later.');
        });
    }, []);

    return (
        <>
            <div className="restaurant-dashboard">

                <div className="background-image">

                    <RestaurantNavbar />

                    <div className="main-container">
                        <div className="left-side">
                            <div className="left-div">
                                <Link to="/Restaurant/Orders"><button className="dashboard-button">Orders</button></Link>
                                <Link to="/Restaurant/AddItem"><button className="dashboard-button">Add an item</button></Link>
                                <Link to="/Restaurant/Menu"><button className="dashboard-button">Menu</button></Link>
                            </div>
                        </div>


                        <div className="content-side">
                            <div className="content">
                                <h1>Welcome Back</h1>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default RestaurantDashboard;