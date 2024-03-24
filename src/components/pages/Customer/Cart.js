import React, { useState, useEffect, useContext } from "react";
import "./Cart.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CartContext } from "../../../contexts/CartContext";
import CustomerNavbar from "./CustomerNavbar";
import { useCustomerAuthContext } from "../../../hooks/useCustomerAuthContext";
import { requestOrders } from "../../../helpers/RequestOrders";

const Cart = () => {
  const { customerAuthState } = useCustomerAuthContext();
  const [customerInfo, setCustomerInfo] = useState({});

  useEffect(() => {
    if (customerAuthState.token === "") {
      navigate("/customer/login");
    }

    const url = process.env.REACT_APP_BACKEND_URL + "/api/customer/info";

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${customerAuthState.token}`,
      },
    }).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          console.log(data);
          setCustomerInfo(data);
          setAddress(data.address);
        });
      } else {
        response.json().then((data) => {
          console.log(data);
          alert(data.error);
        });
      }
    });
  }, []);

  const { cartItems, addToCart, removeFromCart, totalPrice } =
    useContext(CartContext);

  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [address, setAddress] = useState("");

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const getQuantity = (restaurantID, itemID) => {
    const index = cartItems.findIndex(
      (cartItem) =>
        cartItem.restaurantID == restaurantID && cartItem.item.id == itemID
    );
    if (index === -1) {
      return 0;
    }
    return cartItems[index].count;
  };

  const handleAddToCart = (restaurantID, restaurantName, item) => {
    console.log("cart", item);
    addToCart(restaurantID, restaurantName, item);
  };

  const handleRemoveFromCart = (restaurantID, restaurantName, item) => {
    console.log("cart", cartItems);
    removeFromCart(restaurantID, restaurantName, item);
  };

  const handleRestaurantClick = (restaurantID) => {
    navigate(`/customer/restaurants/${restaurantID}`);
  };

  const handleProceed = () => {
    if (paymentMethod === "Cash") {
      requestOrders(cartItems, customerAuthState.token, address).then(
        ({ successfulOrders }) => {
          cartItems.map((cartItem) => {
            if (successfulOrders.includes(cartItem.restaurantID)) {
              removeFromCart(
                cartItem.restaurantID,
                cartItem.restaurantName,
                cartItem.item
              );
            }
          });
          navigate("/customer/orders");
        }
      );
    }
  };

  return (
    <>
      <div className="customer-cart">
        <div className="all-container">
          <CustomerNavbar />

          {cartItems.length === 0 ? (
            <div className="main-container">
              <div className="title">
                <h1>Cart is Empty!</h1>
              </div>
            </div>
          ) : (
            <>
              <div className="proceed" onClick={() => handleProceed()}>
                Proceed to Pay Rs. {totalPrice}
              </div>

              <div className="main-container cart-list">
                <div className="title">
                  <h1>Cart</h1>
                </div>

                <div className="item-list">
                  {cartItems.map((cartItem) => (
                    <>
                      <div className="item">
                        <div
                          className="restaurant-name"
                          onClick={() =>
                            handleRestaurantClick(cartItem.restaurantID)
                          }
                        >
                          {cartItem.restaurantName}
                        </div>
                        <div className="item-wrapper">
                          <div className="item-name">{cartItem.item.name}</div>
                          <div className="item-price">
                            Rs. {cartItem.item.price}
                          </div>
                          <div className="quantity-box">
                            <div
                              className="quantity-change"
                              onClick={() =>
                                handleRemoveFromCart(
                                  cartItem.restaurantID,
                                  cartItem.restaurantName,
                                  cartItem.item
                                )
                              }
                            >
                              -
                            </div>
                            <div className="quantity">
                              {getQuantity(
                                cartItem.restaurantID,
                                cartItem.item.id
                              )}
                            </div>
                            <div
                              className="quantity-change"
                              onClick={() =>
                                handleAddToCart(
                                  cartItem.restaurantID,
                                  cartItem.restaurantName,
                                  cartItem.item
                                )
                              }
                            >
                              +
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              </div>

              <div className="main-container payment-list">
                <div className="payment-title">
                  <h2>Choose a Payment Method:</h2>
                </div>
                <div className="payment-methods">
                  <div
                    className={`payment-method cash ${paymentMethod === "Cash" ? "selected" : ""
                      }`}
                    onClick={() => setPaymentMethod("Cash")}
                  >
                    <label htmlFor="cash">Cash</label>
                  </div>
                  <div
                    className={`payment-method card ${paymentMethod === "Card" ? "selected" : ""
                      }`}
                    onClick={() => setPaymentMethod("Card")}
                  >
                    <label htmlFor="card">Card</label>
                  </div>
                </div>
              </div>
              <div className="main-container address">
                <div className="address-title">
                  <h2>Enter Address:</h2>
                </div>
                <div className="address-input">
                  <input type="text" value={address} placeholder="Address" onChange={handleAddressChange}/>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
