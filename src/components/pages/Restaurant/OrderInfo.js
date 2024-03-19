import React, { useState, useEffect, } from "react";
import { useParams, useNavigate } from "react-router";
import "./OrderInfo.css";
import RestaurantNavbar from "./RestaurantNavbar";
import { useRestaurantAuthContext } from "../../../hooks/useRestaurantAuthContext";

const RestaurantOrderInfo = () => {
    const { restaurantAuthState } = useRestaurantAuthContext();
    const navigate = useNavigate();

    const [order, setOrder] = useState({customer: {}, deliverer: {}, items: []});
    const uid = useParams().orderID;

    useEffect(() => {
        const url = process.env.REACT_APP_BACKEND_URL + `/api/restaurant/order/${uid}`;

        if (restaurantAuthState.token === "") {
            navigate('/restaurant/login');
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
                    setOrder(data);
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
            <>
            <div className="restaurant-order-info">
                <div className="all-container">
                    <RestaurantNavbar />

                    <div className="main-container">
                        <div className="title">Order Details</div>
                            <div className="order-details">
                                <div className="detail">
                                    <div className="detail-title">Customer:</div>
                                    <div className="detail-value">{order.customer.name}</div>
                                </div>
                                <div className="detail">
                                    <div className="detail-title">Address:</div>
                                    <div className="detail-value">{order.deliveryAddress}</div>
                                </div>
                                <div className="detail">
                                    <div className="detail-title">Delivery Agent:</div>
                                    <div className="detail-value">{order.deliverer.name}</div>
                                </div>
                                <div className="detail">
                                    <div className="detail-title">Status:</div>
                                    <div className="detail-value">{order.isCompleted ? "Delivered" : "Pending"}</div>
                                </div>
                                <div className="detail-items">
                                    <div className="detail-title items">Items</div>
                                    <div className="detail-value items">
                                        {order.items.map((item, index) => (
                                            <>
                                            <div className="item" key={index}>
                                                <div className="name">{item.dish.name}</div>
                                                <div className="quantity">Quantity: {item.quantity}</div>
                                            </div>
                                            <div className="total">
                                                <div className="total-label">Total:</div>
                                                <div className="total-price">Rs. {order.total}</div>
                                            </div>
                                            </>
                                        ))}
                                    </div>
                                </div>
                                <div className="detail">
                                    <div className="detail-title">Order Time:</div>
                                    <div className="detail-value">{order.orderTime}</div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </>
        </>
    );
}

export default RestaurantOrderInfo;