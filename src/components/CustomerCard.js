import { useState, useNavigate } from "react-router-dom";
import React from "react";

export default ({ data, uid }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1">
            <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">{data.name}</h2>
                <p className="text-gray-600">Ph: {data.phone}</p>
                <p className="text-gray-600">Email: {data.email}</p>
                <p className="text-gray-600 text-ellipsis overflow-hidden text-nowrap">Address: {data.address}</p>
                <button onClick={() => navigate("/management/customer/" + uid + "/orders")} className="mt-2 bg-torange-500 hover:bg-torange-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300">Show Orders</button>
            </div>
        </div>
    )
}