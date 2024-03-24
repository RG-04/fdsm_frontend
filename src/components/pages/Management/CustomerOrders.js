import React, { useState, useEffect } from "react";
import "./CustomerOrders.css";
import { useNavigate, useParams } from "react-router-dom";
import ManagementNavbar from "./ManagementNavbar";
import { useManagementAuthContext } from "../../../hooks/useManagementAuthContext";

const ManagementCustomerOrders = () => {

    const { managementAuthState } = useManagementAuthContext();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [pendingOrders, setPendingOrders] = useState([]);
    const [deliveredOrders, setDeliveredOrders] = useState([]);
    const [customerInfo, setCustomerInfo] = useState({});

    const { customerID } = useParams();

    useEffect(() => {
        if (managementAuthState.token === "") {
            navigate("/management/login");
        }

        const url = process.env.REACT_APP_BACKEND_URL + "/api/management/orders/customer/" + customerID;

        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${managementAuthState.token}`,
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
                navigate("/management/login");
                alert("An error occurred. Please try again later.");
            });

        
            const url2 = process.env.REACT_APP_BACKEND_URL + "/api/management/customer/" + customerID;
            fetch(url2, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${managementAuthState.token}`,
              },
            })
              .then((response) => {
                if (response.ok) {
                  console.log(response);
                  response.json().then((data) => {
                    console.log(data);
                    setCustomerInfo(data);
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
                navigate("/management/login");
                alert("An error occurred. Please try again later.");
              });

    }, []);

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
                                        <div className="price">Rs. {item.dish.price}</div>
                                        <div className="quantity">Quantity: {item.quantity}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="date">{order.orderTime.split("T")[0]}</div>
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
                            <div className="date">{order.orderTime.split("T")[0]}</div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="management-customer-orders">
                <div className="all-container">
                    <ManagementNavbar />

                    <div className="main-container">
                        <div className="title">Orders for: {customerInfo.name}</div>
                    </div>

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

export default ManagementCustomerOrders;