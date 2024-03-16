import React, { useState, useEffect, useContext } from 'react';
import './Cart.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CartContext } from '../../CartContext';
import CustomerNavbar  from './CustomerNavbar';

const ViewRestaurant = ({ all_restaurants_info }) => {

    const { cartItems, addToCart, removeFromCart, totalPrice } = useContext(CartContext);

    const restaurants_info = [(cartItems.map(cartItem => all_restaurants_info.filter(restaurant => restaurant.id === cartItem.restaurantID)[0]))];

    const navigate = useNavigate();

    const [paymentMethod, setPaymentMethod] = useState("Cash");

    const getQuantity = (restaurantID, itemID) => {
        const index = cartItems.findIndex((cartItem) => (cartItem.restaurantID == restaurantID && cartItem.item.id == itemID));
        if (index === -1) {
            return 0;
        }
        return cartItems[index].count;
    }

    const handleAddToCart = (restaurantID, restaurantName, item) => {
        console.log("cart", item);
        addToCart(restaurantID, restaurantName, item);
    }

    const handleRemoveFromCart = (restaurantID, restaurantName, item) => {
        console.log("cart", cartItems);
        removeFromCart(restaurantID, restaurantName, item);
    }

    const handleRestaurantClick = (restaurantID) => {
        navigate(`/Customer/ViewRestaurant/${restaurantID}`);
    }

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
                            <div className="proceed">
                                <button onClick={() => navigate('/Customer/Cart')}>Proceed to Pay Rs. {totalPrice}</button>
                            </div>

                            <div className="main-container">
                                <div className="title">
                                    <h1>Cart</h1>
                                </div>

                                <div className="item-list">
                                    {cartItems.map(cartItem => (
                                        <>
                                            <div className="item">
                                                <div className="restaurant-name" onClick={() => handleRestaurantClick(cartItem.restaurantID)}>{cartItem.restaurantName}</div>
                                                <div className="item-wrapper">
                                                    <div className="item-name">{cartItem.item.name}</div>
                                                    <div className="item-price">Rs. {cartItem.item.price}</div>
                                                    <div className="quantity-box">
                                                        <div className="quantity-change" onClick={() => handleRemoveFromCart(cartItem.restaurantID, cartItem.restaurantName, cartItem.item)}>-</div>
                                                        <div className="quantity">{getQuantity(cartItem.restaurantID, cartItem.item.id)}</div>
                                                        <div className="quantity-change" onClick={() => handleAddToCart(cartItem.restaurantID, cartItem.restaurantName, cartItem.item)}>+</div>
                                                    </div>
                                                </div>

                                            </div>
                                        </>
                                    ))}
                                </div>
                            </div>

                            <div className="main-container">
                                <div className="payment-title">
                                    <h2>Choose a Payment Method:</h2>
                                </div>
                                <div className="payment-methods">
                                    <div className="payment-method">
                                        <input type="radio" id="cash" name="payment" value="Cash" checked={paymentMethod === "Cash"} onChange={() => setPaymentMethod("Cash")} />
                                        <label htmlFor="cash">Cash</label>
                                    </div>
                                    <div className="payment-method">
                                        <input type="radio" id="card" name="payment" value="Card" checked={paymentMethod === "Card"} onChange={() => setPaymentMethod("Card")} />
                                        <label htmlFor="card">Card</label>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default ViewRestaurant;