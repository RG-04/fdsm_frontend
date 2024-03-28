import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import CustomerNavbarNew from "../../components/CustomerNavbarNew";
import FavoriteButton from "../../components/FavouriteButton";
import DishCard from "../../components/DishCard";


const CustomerViewRestaurant = () => {
    const { cartItems, addToCart, removeFromCart, totalPrice } = useContext(CartContext);

    const navigate = useNavigate();

    let { restaurantID } = useParams();

    const [restaurantMenu, setRestaurantMenu] = useState([]);
    const [restaurantInfo, setRestaurantInfo] = useState({ reviews: [] });
    const [isFavorite, setIsFavorite] = useState(false);
    const { authState } = useOutletContext();

    useEffect(() => {
        const url = process.env.REACT_APP_API_URL + "/customer/restaurant/" + restaurantID;

        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authState.token}`,
            },
        })
            .then((response) => {
                if (response.ok) {
                    console.log(response);
                    response.json().then((data) => {
                        console.log(data);
                        setRestaurantMenu(data.menu);
                        setRestaurantInfo(data);
                        setIsFavorite(data.isFavourite);
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

    const getQuantity = (itemID) => {
        const index = cartItems.findIndex(
            (cartItem) =>
                cartItem.restaurantID == restaurantID && cartItem.item.uid == itemID
        );
        if (index === -1) {
            return 0;
        }
        return cartItems[index].count;
    };

    const handleAddToCart = (item) => {
        addToCart(restaurantID, restaurantInfo.name, item);
        console.log("cart", cartItems);
        console.log("totalPrice", totalPrice);
    };

    const handleRemoveFromCart = (item) => {
        removeFromCart(restaurantID, restaurantInfo.name, item);
        console.log("cart", cartItems);
    };

    const toggleFavorite = () => {
        const url =
            process.env.REACT_APP_BACKEND_URL +
            "/api/customer/favouriterestaurant/" +
            restaurantID;

        fetch(url, {
            method: isFavorite ? "DELETE" : "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authState.token}`,
            },
        })
            .then((response) => {
                if (response.ok) {
                    console.log(response);
                    setIsFavorite(!isFavorite);
                } else {
                    response.json().then((data) => {
                        console.log(data);
                        alert(data.error);
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                alert("An error occurred. Please try again later.");
            });
    };

    const prices = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500];

    const [filters, setFilters] = useState({
        price: 1000000,
        search: "",
    });

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
        console.log(e);
    };

    const sieve = (filter) => {
        const sieve_inner = (item) => {
            const filter_price = () => {
                return item.price <= filter.price;
            };

            const filter_search = () => {
                if (filter.search === "") {
                    return true;
                }

                if (
                    item.name.toLowerCase().includes(filter.search.toLowerCase())
                ) {
                    return true;
                }

                return false;
            };

            return filter_price() && filter_search();
        };

        return sieve_inner;
    };

    const RestaurantHeader = () => {
        return (
            <header className="bg-blur bg-center bg-no-repeat bg-cover py-32 relative">
                {/* Favorites Button */}
                <button className="absolute top-10 right-10 bg-white p-2 rounded-full shadow-md text-red-500 text-xl hover:text-red-500 focus:outline-none">
                    <FavoriteButton isFavorite={isFavorite} toggleFavorite={toggleFavorite} />
                </button>
                <div className="container mx-auto px-4">
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                        <h2 className="text-4xl font-bold text-white mb-4">{restaurantInfo.name}</h2>
                    </div>
                </div>
            </header>
        );
    };



    return (
        <>
            <CustomerNavbarNew />
            <RestaurantHeader />

            <div className="bg-white bg-opacity-90 py-12">
    <div className="container mx-auto px-4">

        <div className="flex justify-between items-center mb-10 w-1/2 mx-auto">
            <div className="w-full max-w-md bg-white shadow-md rounded-md mr-2">
                <input type="text" placeholder="Search dishes..." name="search" onChange={handleFilterChange} className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-torange-500" />
            </div>

            <select
                className="px-4 py-2 rounded-md bg-white text-gray-800 shadow-md focus:outline-none"
                name="price"
                value={filters.price}
                onChange={handleFilterChange}
            >
                <option value="100000" className="text-gray-600">
                    Filter by Price
                </option>
                {prices.map((price) => (
                    <option
                        value={price}
                        key={"price" + price}
                        className={
                            "text-gray-800 hover:bg-torange-100" +
                            (filters.price === price ? " bg-torange-100" : "")
                        }
                    >
                        {"Price < " + price}
                    </option>
                ))}
            </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

            {restaurantMenu.filter(sieve(filters)).map((item) => (
                <DishCard
                    item={item}
                    showButton={true}
                    handleAddToCart={() => handleAddToCart(item)}
                    handleRemoveFromCart={() => handleRemoveFromCart(item)}
                    getQuantity={getQuantity}
                />
            ))}

        </div>

        <div className="flex justify-center mt-8">
            <button onClick={() => navigate("/customer/cart")} className="bg-tblack hover:bg-tblack-200 text-white font-semibold py-3 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">Proceed to Cart</button>
        </div>
    </div>
</div>

        </>
    );
}

export default CustomerViewRestaurant;