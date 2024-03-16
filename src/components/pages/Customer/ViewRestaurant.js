import React, { useState, useEffect, useContext } from 'react';
import './ViewRestaurant.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CartContext } from '../../CartContext';
import CustomerNavbar from './CustomerNavbar';

const ViewRestaurant = ({ all_restaurants_info, all_restaurants_menu }) => {

    const { cartItems, addToCart, removeFromCart, totalPrice } = useContext(CartContext);

    const navigate = useNavigate();

    let { restaurantID } = useParams();
    restaurantID = Number(restaurantID);
    const restaurantInfo = all_restaurants_info.filter(restaurant => restaurant.id === restaurantID)[0];
    all_restaurants_menu.map(menu => console.log(menu.restaurant_id, restaurantID));
    const restaurantMenu = all_restaurants_menu.filter(menu => menu.restaurant_id === restaurantID)[0].items;

    const prices = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500]

    const [currentItemList, setCurrentItemList] = useState(restaurantMenu);
    const [sortPrice, setSortPrice] = useState(0);

    const handleSearchBar = (searchVal) => {
        if (searchVal === "") {
            setCurrentItemList(restaurantMenu);
            return;
        }
        setCurrentItemList(restaurantMenu.filter(item => item.name.toLowerCase().includes(searchVal.toLowerCase())));
    }

    const handleSortByPrice = (price) => {
        if (price === "0") {
            setSortPrice(price);
            setCurrentItemList(restaurantMenu);
            return;
        }
        setSortPrice(price);
        setCurrentItemList(restaurantMenu.filter(item => item.price <= price));
    }

    const getQuantity = (itemID) => {
        const index = cartItems.findIndex((cartItem) => (cartItem.restaurantID == restaurantID && cartItem.item.id == itemID));
        if (index === -1) {
            return 0;
        }
        return cartItems[index].count;
    }

    const handleAddToCart = (item) => {
        addToCart(restaurantID, restaurantInfo.name, item);
        console.log("cart", cartItems);
        console.log("totalPrice", totalPrice);
    }

    const handleRemoveFromCart = (item) => {
        removeFromCart(restaurantID, restaurantInfo.name, item);
        console.log("cart", cartItems);
    }

    return (
        <>
            <div className="customer-view-restaurant">
                {/* <div className="background-image">
                    <img src={restaurantInfo.imageSrc} alt="Restaurant Image" />
                </div> */}
                {/* TODO */}

                <div className="all-container">
                    
                    <CustomerNavbar />

                    <div className="proceed">
                        <button onClick={() => navigate('/Customer/Cart')}>Proceed to Cart</button>
                    </div>

                    <div className="main-container">
                        <div className="restaurant-name">
                            <h1>{restaurantInfo.name}</h1>
                        </div>

                        <div className="search-container">
                            <input type="text" placeholder="Search for dishes..." onChange={(e) => handleSearchBar(e.target.value)} />
                        </div>

                        <div className="sort-container">
                            <label htmlFor="sort">Sort By:</label>
                            <select className="sorter" value={sortPrice} onChange={(e) => handleSortByPrice(e.target.value)}>
                                <option value="0">Price</option>
                                {prices.map((price) => (
                                    <option value={price}>
                                        {"< " + price}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="item-list">
                            {currentItemList.map(item => (
                                <div className="item" key={item.id}>
                                    <div className="item-name">{item.name}</div>
                                    <div className="item-price">Rs. {item.price}</div>
                                    <div className="quantity-box">
                                        <div className="quantity-change" onClick={() => handleRemoveFromCart(item)}>-</div>
                                        <div className="quantity">{getQuantity(item.id)}</div>
                                        <div className="quantity-change" onClick={() => handleAddToCart(item)}>+</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ViewRestaurant;