import React from "react";
import { Link, useOutletContext } from "react-router-dom";

export default ({ order }) => {
  const { endpoint } = useOutletContext();
  console.log(endpoint);
  return (
    <>
      <Link
        to={endpoint + "/order/" + order.uid}
        className="lnk cursor-pointer"
      >
        <div className="order-card flex flex-row items-center bg-white shadow-md rounded-md overflow-hidden mb-5 hover:translate-y-[-5px] transition-transform duration-300 ease-in-out hover:shadow-torange-200">
          <img
            src={process.env.REACT_APP_BACKEND_URL + order.restaurant.image}
            alt="Restaurant Image"
            className="w-48 h-48 object-cover p-4"
          />
          <div className="flex-grow p-4">
            <h3 className="text-xl font-semibold text-gray-800">
              {order.restaurant.name}
            </h3>
            <p className="text-gray-600 mt-2">
              Ordered on: {order.orderTime.split("T")[0]}
            </p>
            <div className="flex justify-between items-center mt-4">
              <div>
                <h4 className="text-lg font-semibold">Items:</h4>
                <ul>
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.dish.name} - {item.quantity}x
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-gray-600">Rs. {order.total}</p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};
