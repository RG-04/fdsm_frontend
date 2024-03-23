import React, { useState, useEffect } from "react";
import "./Orders.css";
import { useNavigate } from "react-router-dom";
import CustomerNavbar from "./CustomerNavbar";
import RateRestaurant from "./RateRestaurant";
import RateDeliveryAgent from "./RateDeliveryAgent";
import { useCustomerAuthContext } from "../../../hooks/useCustomerAuthContext";

const CustomerOrders = () => {

  const { customerAuthState } = useCustomerAuthContext();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);

  useEffect(() => {
    if (customerAuthState.token === "") {
      navigate("/customer/login");
    }

    const url = process.env.REACT_APP_BACKEND_URL + "/api/customer/orders";

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${customerAuthState.token}`,
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
        navigate("/customer/login");
        alert("An error occurred. Please try again later.");
      });
  }, []);

  const handleOrderInfoClick = (uid) => {
    navigate(`/customer/order/${uid}`);
  };

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
              <div className="order-buttons">
                <div className="track-order">
                  <button className="order-list-button">Track Order</button>
                </div>
                <div className="order-info">
                  <button className="order-list-button" onClick={() => handleOrderInfoClick(order.uid)}>More Info</button>
                </div>
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
              <div className="date">{order.orderTime.split("T")[0]}</div>
              <div className="order-buttons">
                <div className="order-info">
                  <button className="order-list-button" onClick={() => handleOrderInfoClick(order.uid)}>More Info</button>
                </div>
                {!order.isRestaurantRated ? (<div className="review-restaurant">
                  <button className="order-list-button" onClick={() => handleRateRestaurant(order.restaurant, order)}>Rate Restaurant</button>
                </div>) : (<></>)}
                {!order.isDelivererRated ? (<div className="review-delivery-agent">
                  <button className="order-list-button" onClick={() => handleRateDeliveryAgent(order.deliverer, order)}>Rate Delivery Agent</button>
                </div>) : (<></>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const [rateRes, setRateRes] = useState(false);
  const [resInfo, setResInfo] = useState({});
  const [orderInfo, setOrderInfo] = useState({});

  const handleRateRestaurant = (restaurantInfo, order) => {
    setRateRes(true);
    setResInfo(restaurantInfo);
    setOrderInfo(order);
  }

  const [rateDA, setRateDA] = useState(false);
  const [daInfo, setDAInfo] = useState({});

  const handleRateDeliveryAgent = (deliveryAgentInfo, order) => {
    setRateDA(true);
    setDAInfo(deliveryAgentInfo);
    setOrderInfo(order);
  }

  return (
    <>
      <div className="customer-orders">
        <div className="all-container">
          <CustomerNavbar />
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

      {rateRes ? <RateRestaurant restaurantInfo={resInfo} setRateRes={setRateRes} customerAuthState={customerAuthState} orderInfo={orderInfo} /> : <></>}
      {rateDA ? <RateDeliveryAgent deliveryAgentInfo={daInfo} setRateDA={setRateDA} customerAuthState={customerAuthState} orderInfo={orderInfo} /> : <></>}
    </>
  );
};

export default CustomerOrders;