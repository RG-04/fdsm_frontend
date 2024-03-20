import React, { useState, useEffect, } from "react";
import { useParams, useNavigate } from "react-router";
import "./OrderInfo.css";
import DeliveryAgentNavbar from "./DeliveryAgentNavbar";
import { useDeliveryAgentAuthContext } from "../../../hooks/useDeliveryAgentAuthContext";

const DeliveryAgentOrderInfo = () => {
    const { deliveryAgentAuthState } = useDeliveryAgentAuthContext();
    const navigate = useNavigate();

    const [order, setOrder] = useState({ customer: {}, restaurant: {}, items: [] });
    const uid = useParams().orderID;

    useEffect(() => {
        const url = process.env.REACT_APP_BACKEND_URL + `/api/deliverer/order/${uid}`;

        if (deliveryAgentAuthState.token === "") {
            navigate('/delivery-agent/login');
            return;
        }

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${deliveryAgentAuthState.token}`,
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
                <div className="delivery-agent-order-info">
                    <div className="all-container">
                        <DeliveryAgentNavbar />

                        <div className="main-container">
                            <div className="title">Order Details</div>
                            <div className="order-details">
                                <div className="detail">
                                    <div className="detail-title">Customer:</div>
                                    <div className="detail-value">{order.customer.name}</div>
                                </div>
                                <div className="detail">
                                    <div className="detail-title">Delivery Address:</div>
                                    <div className="detail-value">{order.deliveryAddress}</div>
                                </div>
                                <div className="detail">
                                    <div className="detail-title">Restaurant Address:</div>
                                    <div className="detail-value">{order.restaurant.address}</div>
                                </div>
                                <div className="detail">
                                    <div className="detail-title">Restaurant:</div>
                                    <div className="detail-value">{order.restaurant.name}</div>
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
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </>
    );
}

export default DeliveryAgentOrderInfo;