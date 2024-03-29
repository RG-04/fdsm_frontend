import React from "react";

export default (props = { showButton: false }) => {

    const item = props.item;

    const Button = (handleAddToCart, handleRemoveFromCart, getQuantity) => {
        return (
            <div className="flex items-center space-x-2">
                        <button className="bg-gray-200 text-torange-400 px-2 py-1 rounded-full" onClick={() => handleRemoveFromCart(item)}><i className="fas fa-minus"></i></button>
                        <span className="text-gray-800 font-semibold">{getQuantity(item.uid)}</span>
                        <button className="bg-gray-200 text-torange-400 px-2 py-1 rounded-full" onClick={() => handleAddToCart(item)}><i className="fas fa-plus"></i></button>
                    </div>
        )
    };

    return (
        <div className="bg-white shadow-md rounded-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-torange-200">
                <img src={process.env.REACT_APP_BACKEND_URL + item.image} alt="Dish Image" className="w-full h-48 object-cover" />
                <div className="p-4 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
                        <p className="text-gray-600 mt-2">Rs. {item.price}</p>
                    </div>
                    {props.showButton ? Button(props.handleAddToCart, props.handleRemoveFromCart, props.getQuantity) : <></>}
                </div>
        </div>
    )

};
