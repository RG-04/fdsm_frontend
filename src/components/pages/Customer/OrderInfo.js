import React, { useState, useEffect, } from "react";
import { useParams, useNavigate } from "react-router";
import "./OrderInfo.css";
import CustomerNavbar from "./CustomerNavbar";
import RouteMap from "../../RouteMap";
import { useCustomerAuthContext } from "../../../hooks/useCustomerAuthContext";

const CustomerOrderInfo = () => {
    const { customerAuthState } = useCustomerAuthContext();
    const navigate = useNavigate();

    const [order, setOrder] = useState({ restaurant: {}, deliverer: { location: {}}, items: [] , customer: { location: {} }});
    const uid = useParams().orderID;

    useEffect(() => {
        const url = process.env.REACT_APP_BACKEND_URL + `/api/customer/order/${uid}`;

        if (customerAuthState.token === "") {
            navigate('/customer/login');
            return;
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
                    setOrder(data);
                    console.log("hello", data.customer.location, data.deliverer.location)
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
                <div className="customer-order-info">
                    <div className="all-container">
                        <CustomerNavbar />

                        <div className="main-container">
                            <div className="title">Order Details</div>
                            <div className="order-details">
                                <div className="detail">
                                    <div className="detail-title">Restaurant:</div>
                                    <div className="detail-value">{order.restaurant.name}</div>
                                </div>
                                <div className="detail">
                                    <div className="detail-title">Delivery Address:</div>
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
                                            </>
                                        ))}
                                    </div>
                                    <div className="total">
                                        <div className="total-label">Total:</div>
                                        <div className="total-price">Rs. {order.total}</div>
                                    </div>
                                </div>
                                <div className="detail">
                                    <div className="detail-title">Order Time:</div>
                                    <div className="detail-value">{order.orderTime}</div>
                                </div>
                                {order.isCompleted ? (<></>) : (
                                    <>
                                        <div className="detail">
                                            <div className="detail-title">Estimated Delivery Time:</div>
                                            <div className="detail-value">{order.etd}</div>
                                        </div>
                                        <div className="detail">
                                            <div className="detail-title">Delivery OTP:</div>
                                            <div className="detail-value">{order.otp}</div>
                                        </div>
                                    </>)}
                            </div>
                        </div>

                        {order.customer.name && !order.isCompleted ? (
                            <div className="main-container map">
                                <div className="title">Track Your Order</div>
                                <div className="map-div">
                                    <RouteMap start={order.deliverer.location} destination={order.customer.location}/>
                                </div>
                                <div className="refresh">
                                    <button className="refresh-button" onClick={() => window.location.reload()}>Refresh</button>
                                </div>
                            </div>

                        ) : (<></>)}
                    </div>
                </div>
            </>
        </>
    );
}

export default CustomerOrderInfo;