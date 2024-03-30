import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import Loader from "../../components/Loader";

const RestaurantDashboard = () => {
    const { authState } = useOutletContext();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const url = process.env.REACT_APP_API_URL + "/restaurant/info";

        let ignore = false;

        if (authState.token === "") {
            navigate("/restaurant/login");
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
                if (ignore) {
                    return;
                }

                if (response.ok) {
                    response.json().then((data) => {
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
                if (ignore) {
                    return;
                }

                console.log(error);

                navigate("/restaurant");
                alert("An error occurred. Please try again later.");
                setLoading(false);
            });

        return () => {
            ignore = true;
        };
    }, [authState.token]);

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <div className="bg-white bg-opacity-80 rounded-lg shadow-lg p-8 mx-auto max-w-xl mt-32 text-center">
                <h2 className="text-4xl font-semibold text-gray-800">
                    Welcome Back, Partner!
                </h2>
                <p className="text-gray-600 mt-4">What would you like to do today?</p>

                <div className="mt-8 space-y-4">
                    <Link
                        to="orders"
                        className="bg-torange-400 hover:bg-torange-600 text-white font-semibold py-2 px-6 mx-2 rounded-lg shadow-md cursor-pointer transition duration-300"
                    >
                        Orders
                    </Link>
                    <Link
                        to="newitem"
                        className="bg-torange-400 hover:bg-torange-600 text-white font-semibold py-2 px-6 mx-2 rounded-lg shadow-md cursor-pointer transition duration-300"
                    >
                        Add an Item
                    </Link>
                    <Link
                        to="menu"
                        className="bg-torange-400 hover:bg-torange-600 text-white font-semibold py-2 px-6 mx-2 rounded-lg shadow-md cursor-pointer transition duration-300"
                    >
                        Menu
                    </Link>
                </div>
            </div>
        </>
    );
};

export default RestaurantDashboard;
