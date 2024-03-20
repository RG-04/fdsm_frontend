import React, { useState, useEffect } from "react";
import "./Orders.css";
import { useNavigate } from "react-router-dom";
import DeliveryAgentNavbar from "./DeliveryAgentNavbar";
import { useDeliveryAgentAuthContext } from "../../../hooks/useDeliveryAgentAuthContext";

const DeliveryAgentOrders = () => {
    const { deliveryAgentAuthState } = useDeliveryAgentAuthContext();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [pendingOrders, setPendingOrders] = useState([]);
    const [deliveredOrders, setDeliveredOrders] = useState([]);

    useEffect(() => {
        if (deliveryAgentAuthState.token === "") {
            navigate("/delivery-agent/login");
        }

        const url = process.env.REACT_APP_BACKEND_URL + "/api/deliverer/orders";

        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${deliveryAgentAuthState.token}`,
            },
        })
            .then((response) => {
                if (response.ok) {
                    console.log(response);
                    response.json().then((data) => {
                        console.log(data);
                        setOrders(data);
                        setPendingOrders(
                            data.filter((order) => order.isCompleted === false)
                        );
                        setDeliveredOrders(
                            data.filter((order) => order.isCompleted === true)
                        );
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
                navigate("/delivery-agent/login");
                alert("An error occurred. Please try again later.");
            });
    }, []);

    const handleOrderInfoClick = (uid) => {
        navigate(`/delivery-agent/order/${uid}`);
    }

    const PendingOrders = () => {
        return (
            <div className="main-container">
                <div className="orders">
                    <div className="title">Pending Orders</div>
                    {pendingOrders.map((order, index) => (
                        <div className="order" key={index}>
                            <div className="restaurant">{order.restaurant.name}</div>
                            <div className="items">
                                {order.items.map((item, index) => (
                                    <div className="item" key={index}>
                                        <div className="name">{item.dish.name}</div>
                                        <div className="quantity">Quantity: {item.quantity}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="date">{order.orderTime.split("T")[0]}</div>
                            <div className="order-info">
                                <button className="order-list-button" onClick={() => handleOrderInfoClick(order.uid)}>More Info</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const DeliveredOrders = () => {
        return (
            <div className="main-container">
                <div className="orders">
                    <div className="title">Delivered Orders</div>
                    {deliveredOrders.map((order, index) => (
                        <div className="order" key={index}>
                            <div className="restaurant">{order.restaurant.name}</div>
                            <div className="items">
                                {order.items.map((item, index) => (
                                    <div className="item" key={index}>
                                        <div className="name">{item.dish.name}</div>
                                        <div className="price">Rs. {item.dish.price}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="date">{order.orderTime}</div>
                            <div className="order-info">
                                <button className="order-list-button" onClick={() => handleOrderInfoClick(order.uid)}>More Info</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="delivery-agent-orders">
                <div className="all-container">
                    <DeliveryAgentNavbar />
                    {pendingOrders.length === 0 && deliveredOrders.length === 0 ? (
                        <div className="main-container">
                            <div className="title">No Orders</div>
                        </div>
                    ) : (
                        <></>
                    )}
                    {pendingOrders.length !== 0 ? <PendingOrders /> : <></>}
                    {deliveredOrders.length !== 0 ? <DeliveredOrders /> : <></>}
                </div>
            </div>
        </>
    );
};

export default DeliveryAgentOrders;
