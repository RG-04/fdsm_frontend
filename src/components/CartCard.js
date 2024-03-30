import React from "react";

export default ({ cartItem, handleAddToCart, handleRemoveFromCart, getQuantity }) => {

    return (
        <div className="flex flex-row items-center bg-white shadow-md rounded-md overflow-hidden">
            <img src={process.env.REACT_APP_BACKEND_URL + cartItem.item.image} alt="Dish Image" className="w-48 h-48 object-cover p-4" />
            <div className="flex-grow p-4">
                <h3 className="text-xl font-semibold text-gray-800">{cartItem.item.name}</h3>
                <p className="text-gray-600 mt-2">{cartItem.restaurantName}</p>
                <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center">
                        <button className="text-gray-500 focus:outline-none" onClick={() =>
                            handleRemoveFromCart(
                                cartItem.restaurantID,
                                cartItem.restaurantName,
                                cartItem.item
                            )
                        }>-</button>
                        <span className="mx-4">{getQuantity(
                            cartItem.restaurantID,
                            cartItem.item.uid
                        )}</span>
                        <button className="text-gray-500 focus:outline-none" onClick={() =>
                            handleAddToCart(
                                cartItem.restaurantID,
                                cartItem.restaurantName,
                                cartItem.item
                            )
                        }>+</button>
                    </div>
                    <p className="text-gray-600">Rs. {cartItem.item.price}</p>
                </div>
            </div>
        </div>
    );
};