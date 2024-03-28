import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomerNavbarNew from "../../components/CustomerNavbarNew";
import { useOutletContext } from "react-router-dom";
import Loader from "../../components/Loader";

const CustomerDashboard = () => {
    const { authState } = useOutletContext();
    const navigate = useNavigate();
    const [customerDetails, setCustomerDetails] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const url = process.env.REACT_APP_API_URL + "/customer/info";

        if (authState.token === "") {
            navigate("/customer/login");
            return;
        }

        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authState.token}`,
            },
        })
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        setCustomerDetails(data);
                        setLoading(false);
                    });
                } else {
                    response.json().then((data) => {
                        alert(data.error);
                        setLoading(false);
                    });
                }
            })
            .catch((error) => {
                console.log(error);

                navigate("/customer");
                alert("An error occurred. Please try again later.");
                setLoading(false);
            });
    }
        , [authState.token]);

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <CustomerNavbarNew />

            <div className="bg-white bg-opacity-80 rounded-lg shadow-lg p-8 mx-auto max-w-xl mt-32 text-center">
                <h2 className="text-4xl font-semibold text-gray-800">Welcome Back, {customerDetails.name}!</h2>
                <p className="text-gray-600 mt-4">What would you like to do today?</p>

                <div className="mt-8 space-y-4">
                    <Link to="restaurants" className="bg-torange-400 hover:bg-torange-600 text-white font-semibold py-2 px-6 mx-2 rounded-lg shadow-md cursor-pointer transition duration-300">Order Now!</Link>
                    <Link to="#" className="bg-torange-400 hover:bg-torange-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md cursor-pointer transition duration-300">Recommended</Link>
                </div>
            </div>
        </>
    );
}

export default CustomerDashboard;