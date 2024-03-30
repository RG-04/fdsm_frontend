import { useState, useNavigate, Link } from "react-router-dom";
import React from "react";

export default ({ data, uid }) => {
    const navigate = useNavigate();

    const getStatus = () => {
        if (data.workingStatus === 0) {
            return "Not Available";
        } else if (data.workingStatus === 1) {
            return "Available";
        } else if (data.workingStatus === 2) {
            return "On Delivery";
        }
    };

    return (
        <Link
            to={"/management/delivery-agent/" + uid}
            className="block cursor-pointer"
        >
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-torange-200 cursor-pointer">
                <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-800">{data.name}</h2>
                    <p className="text-gray-500 whitespace-pre">Ph:         {data.phone}</p>
                    <p className="text-gray-500 whitespace-pre">Email:    {data.email}</p>
                    <p className="text-gray-500 whitespace-pre">Status:   {getStatus()}</p>
                </div>
            </div>
        </Link>
    )
}