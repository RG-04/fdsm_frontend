import React from "react";

export default ({ data, handleDeleteOffer, isProcessing }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1">
            <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">{data.code}</h2>
                <p className="text-gray-600">Discount: {data.discount} %</p>
                <p className="text-gray-400 text-md">Available to all customers</p>
                <button onClick={() => handleDeleteOffer(data)} disabled={isProcessing}
                    className="mt-2 text-grey-800 text-xl hover:text-red-500 font-semibold transition duration-300 w-full text-center">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        </div>
    )
}