import React, { useState, useEffect, useContext } from 'react';
import './ViewRestaurant.css';
import { useNavigate, useParams } from 'react-router-dom';
import { CartContext } from '../../../contexts/CartContext';
import CustomerNavbar from './CustomerNavbar';
import { CustomerAuthContext } from '../../../contexts/CustomerAuthContext';

const ViewRestaurant = ({ all_restaurants_info, all_restaurants_menu }) => {

    const { cartItems, addToCart, removeFromCart, totalPrice } = useContext(CartContext);

    const navigate = useNavigate();

    let { restaurantID } = useParams();
    // restaurantID = Number(restaurantID);
    // const restaurantInfo = all_restaurants_info.filter(restaurant => restaurant.id === restaurantID)[0];
    // all_restaurants_menu.map(menu => console.log(menu.restaurant_id, restaurantID));
    // const restaurantMenu = all_restaurants_menu.filter(menu => menu.restaurant_id === restaurantID)[0].items;

    
    const [restaurantMenu, setRestaurantMenu] = useState([]);
    const [restaurantInfo, setRestaurantInfo] = useState({});
    const [currentItemList, setCurrentItemList] = useState(restaurantMenu);
    
    const { customerAuthState } = useContext(CustomerAuthContext);

    useEffect(() => {
        const url = process.env.REACT_APP_BACKEND_URL + '/api/customer/restaurant/' + restaurantID;

        if (customerAuthState.token === "") {
            navigate('/Customer/Login');
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
                    setRestaurantMenu(data.menu);
                    setRestaurantInfo(data);
                    setCurrentItemList(data.menu);
                });
            } else {
                response.json().then((data) => {
                    console.log(data);
                    alert(data.error);
                });
            }
        }).catch((error) => {
            console.log(error);
            navigate('/Customer/Login');
            alert('An error occurred. Please try again later.');
        });

    }, []);

    const prices = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500]

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
        const index = cartItems.findIndex((cartItem) => (cartItem.restaurantID == restaurantID && cartItem.item.uid == itemID));
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

                    <div className="proceed" onClick={() => navigate('/Customer/Cart')}>
                        Proceed to Cart
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
                                <div className="item" key={item.uid}>
                                    <div className="item-name">{item.name}</div>
                                    <div className="item-price">Rs. {item.price}</div>
                                    <div className="quantity-box">
                                        <div className="quantity-change" onClick={() => handleRemoveFromCart(item)}>-</div>
                                        <div className="quantity">{getQuantity(item.uid)}</div>
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