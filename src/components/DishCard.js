import React from "react";

export default (props = { showButton: false, showToggle: false }) => {

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

    const Toggle = (handleToggleItem, uid, availabilities) => {
        return (
            <div>
                <input
                    className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-torange-500 checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                    type="checkbox"
                    role="switch"
                    id={uid}
                    checked={availabilities[uid]}
                    onChange={() => handleToggleItem(uid)} />
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
                {props.showToggle ? Toggle(props.handleToggleItem, item.uid, props.availabilities) : <></>}
            </div>
        </div>
    )

};
