import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import CustomerNavbar from './CustomerNavbar';

const CustomerDashboard = ({ customer_details }) => {

    return (
        <>
            <div className="customer-dashboard">

                <div className="background-image">

                    <CustomerNavbar />

                    <div className="main-container">
                        <div className="left-side">
                            <div className="left-div">
                                <Link to="/Customer/Offers"><button className="dashboard-button">Explore Offers</button></Link>
                                <Link to="/Customer/RestaurantList"><button className="dashboard-button">Order Now!</button></Link>
                                <Link to="/Customer/Recommended"><button className="dashboard-button">Recommended</button></Link>
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